// Popup script for Truthly extension settings
class TruthlyPopup {
  constructor() {
    this.serverUrl = 'http://localhost:5000';
    this.frontendUrl = 'http://localhost:3000';
    this.settings = {
      enabled: true,
      autoAnalyze: true,
      cacheResults: true
    };
    this.stats = {
      analyzedCount: 0,
      trustworthyCount: 0
    };
    
    this.init();
  }

  async init() {
    try {
      await this.loadSettings();
      await this.loadStats();
      await this.checkServerStatus();
      this.setupEventListeners();
      this.renderUI();
    } catch (error) {
      console.error('Popup initialization error:', error);
      this.showError('Failed to initialize popup');
    }
  }

  // ... (rest of your popup methods with HTML entities fixed)
  
  setupEventListeners() {
    // Toggle switches
    const enableToggle = document.getElementById('enableToggle');
    const autoAnalyzeToggle = document.getElementById('autoAnalyzeToggle');
    const cacheToggle = document.getElementById('cacheToggle');

    if (enableToggle) {
      enableToggle.addEventListener('click', () => this.toggleSetting('enabled'));
    }
    if (autoAnalyzeToggle) {
      enableToggle.addEventListener('click', () => this.toggleSetting('autoAnalyze'));
    }
    if (cacheToggle) {
      cacheToggle.addEventListener('click', () => this.toggleSetting('cacheResults'));
    }

    // ... rest of event listeners
  }
  
  // ... (rest of your methods)
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TruthlyPopup();
});
