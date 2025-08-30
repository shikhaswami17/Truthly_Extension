// Content script for Google search results fact-checking
class TruthlyExtension {
    constructor() {
        this.serverUrl = 'http://localhost:5000';
        this.frontendUrl = 'http://localhost:3000';
        this.processingResults = new Set();
        this.cache = new Map();
        this.settings = { enabled: true, autoAnalyze: true, cacheResults: true };
        this.init();
    }

    async init() {
        console.log('Truthly Extension: Initializing...');
        await this.loadSettings();
        if (!this.settings.enabled) {
            console.log('Truthly Extension: Disabled by user settings');
            return;
        }
        
        this.waitForSearchResults();
        
        const observer = new MutationObserver(() => {
            if (this.settings.enabled) {
                this.waitForSearchResults();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
        });
    }

    async loadSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['enabled', 'autoAnalyze', 'cacheResults'], (result) => {
                this.settings = {
                    enabled: result.enabled !== false,
                    autoAnalyze: result.autoAnalyze !== false,
                    cacheResults: result.cacheResults !== false
                };
                resolve();
            });
        });
    }

    handleMessage(message, sender, sendResponse) {
        switch (message.type) {
            case 'SETTINGS_UPDATED':
                this.settings = message.settings;
                if (!this.settings.enabled) {
                    this.removeAllLabels();
                } else {
                    this.waitForSearchResults();
                }
                break;
            case 'CLEAR_CACHE':
                this.cache.clear();
                this.removeAllLabels();
                if (this.settings.enabled) {
                    this.waitForSearchResults();
                }
                break;
        }
    }

    removeAllLabels() {
        document.querySelectorAll('.truthly-label, .truthly-loading').forEach(el => el.remove());
        document.querySelectorAll('[data-truthly-processing]').forEach(el => {
            delete el.dataset.truthlyProcessing;
        });
    }

    waitForSearchResults() {
        setTimeout(() => {
            this.processSearchResults();
        }, 1000);
    }

    processSearchResults() {
        if (!this.settings.enabled) return;
        
        const searchResults = document.querySelectorAll('[data-ved]');
        searchResults.forEach((result, index) => {
            if (this.shouldProcessResult(result)) {
                this.processSearchResult(result, index);
            }
        });
    }

    shouldProcessResult(result) {
        if (result.querySelector('.truthly-label')) return false;
        if (result.dataset.truthlyProcessing === 'true') return false;
        
        const linkElement = result.querySelector('a[href]');
        if (!linkElement) return false;
        
        const url = linkElement.href;
        if (url.includes('google.com') || url.includes('maps.google.com') || 
            url.includes('images.google.com') || url.startsWith('javascript:')) {
            return false;
        }
        return true;
    }

    async processSearchResult(result, index) {
        try {
            result.dataset.truthlyProcessing = 'true';
            const linkElement = result.querySelector('a[href]');
            const titleElement = result.querySelector('h3') || result.querySelector('[role="heading"]');
            
            if (!linkElement || !titleElement) return;
            
            const url = linkElement.href;
            const title = titleElement.textContent.trim();
            
            const cacheKey = url;
            if (this.cache.has(cacheKey)) {
                this.displayLabel(result, this.cache.get(cacheKey), url);
                return;
            }
            
            this.addLoadingIndicator(result);
            
            // Use BART/LLaMA endpoint specifically for extension
            const analysis = await this.analyzeUrlExtension(url, title);
            
            if (analysis && analysis.success && analysis.data) {
                if (this.settings.cacheResults) {
                    this.cache.set(cacheKey, analysis.data);
                }
                this.displayLabel(result, analysis.data, url);
            } else {
                this.displayErrorLabel(result, url);
            }
        } catch (error) {
            console.error('Truthly Extension: Error processing result', error);
            this.displayErrorLabel(result, url);
        } finally {
            result.dataset.truthlyProcessing = 'false';
            this.removeLoadingIndicator(result);
        }
    }

    async analyzeUrlExtension(url, title) {
        try {
            console.log(`Truthly Extension: Analyzing ${url} with BART/LLaMA`);
            
            // Use the extension-specific endpoint that uses BART and LLaMA
            const response = await fetch(`${this.serverUrl}/api/analyze-extension`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url, title: title }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Extension analysis response:', data);
            return data;
        } catch (error) {
            console.error('Truthly Extension: Analysis failed', error);
            return { success: false, error: error.message };
        }
    }

    addLoadingIndicator(result) {
        const existing = result.querySelector('.truthly-loading');
        if (existing) return;
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'truthly-loading';
        loadingDiv.innerHTML = `
            <div class="truthly-spinner"></div>
            <span>Checking trustworthiness...</span>
        `;
        this.insertLabel(result, loadingDiv);
    }

    removeLoadingIndicator(result) {
        const loading = result.querySelector('.truthly-loading');
        if (loading) loading.remove();
    }

    displayLabel(result, analysis, url) {
        let isTrustworthy = false;
        let confidence = 0;
        let summary = '';
        
        if (analysis.label) {
            isTrustworthy = analysis.label.toLowerCase() === 'trustworthy' || 
                          analysis.label.toLowerCase() === 'real';
            confidence = Math.round(analysis.confidence || 0);
            summary = analysis.summary || 'No summary available';
        } else {
            console.warn('Unknown analysis format:', analysis);
            this.displayErrorLabel(result, url);
            return;
        }
        
        const labelDiv = document.createElement('div');
        labelDiv.className = `truthly-label ${isTrustworthy ? 'trustworthy' : 'untrustworthy'}`;
        
        // Updated HTML structure to match screenshot exactly
        labelDiv.innerHTML = `
            <div class="truthly-content">
                <div class="truthly-status">
                    <div class="truthly-icon">${isTrustworthy ? '✓' : '⚠'}</div>
                    <div class="truthly-text">Trustworthy</div>
                    <div class="truthly-confidence">${confidence}%</div>
                </div>
                <div class="truthly-actions">
                    <button class="truthly-feedback-btn" data-analysis='${JSON.stringify(analysis)}' data-url="${url}">Feedback</button>
                </div>
            </div>
            <div class="truthly-tooltip">
                <div class="truthly-tooltip-content">
                    <div class="tooltip-confidence">Confidence: ${confidence}%</div>
                    <div class="tooltip-summary">${summary}</div>
                    <div class="tooltip-model">Model: ${analysis.model || 'BART/LLaMA'}</div>
                    <div class="tooltip-feedback-prompt">Click "Feedback" to help improve accuracy</div>
                </div>
            </div>
        `;
        
        // Add event listener only for feedback button
        const feedbackBtn = labelDiv.querySelector('.truthly-feedback-btn');
        
        feedbackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Send message to open extension popup for feedback
            chrome.runtime.sendMessage({
                type: 'OPEN_FEEDBACK',
                analysis: JSON.parse(e.target.dataset.analysis),
                url: e.target.dataset.url
            });
        });
        
        this.insertLabel(result, labelDiv);
    }

    displayErrorLabel(result, url) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'truthly-label error';
        labelDiv.innerHTML = `
            <div class="truthly-content">
                <div class="truthly-status">
                    <div class="truthly-icon">?</div>
                    <div class="truthly-text">Analysis Failed</div>
                </div>
                <div class="truthly-actions">
                    <button class="truthly-retry-btn" data-url="${url}">Retry</button>
                </div>
            </div>
            <div class="truthly-tooltip">
                <div class="truthly-tooltip-content">
                    <div class="tooltip-summary">Unable to analyze this content. Click retry or refresh the page.</div>
                </div>
            </div>
        `;
        
        const retryBtn = labelDiv.querySelector('.truthly-retry-btn');
        retryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            labelDiv.remove();
            delete result.dataset.truthlyProcessing;
            this.processSearchResult(result, 0);
        });
        
        this.insertLabel(result, labelDiv);
    }

    insertLabel(result, labelElement) {
        // Find the best insertion point - after the title/description content
        const titleElement = result.querySelector('h3') || result.querySelector('[role="heading"]');
        const snippetElement = result.querySelector('[data-content-feature]') || 
                              result.querySelector('.VwiC3b') || 
                              result.querySelector('[data-ved] > div:last-child');
        
        let insertionPoint = null;
        
        if (snippetElement) {
            // Insert after the snippet/description
            insertionPoint = snippetElement;
        } else if (titleElement && titleElement.parentElement) {
            // Insert after the title container
            insertionPoint = titleElement.parentElement;
        } else {
            // Fallback: insert at the beginning of the result
            insertionPoint = result.firstElementChild;
        }
        
        if (insertionPoint && insertionPoint.parentElement) {
            // Create a wrapper div to ensure proper positioning
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'margin: 4px 0; clear: both; display: block;';
            wrapper.appendChild(labelElement);
            
            insertionPoint.parentElement.insertBefore(wrapper, insertionPoint.nextSibling);
        } else {
            // Ultimate fallback
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'margin: 4px 0; clear: both; display: block;';
            wrapper.appendChild(labelElement);
            result.appendChild(wrapper);
        }
    }
}

// Initialize extension
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TruthlyExtension());
} else {
    new TruthlyExtension();
}