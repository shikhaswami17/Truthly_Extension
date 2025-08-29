// filepath: /home/shikha17/Documents/Truthly/src/components/DynamicResult.tsx
import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, AlertTriangle, ExternalLink, ThumbsUp, ThumbsDown,
  Brain, Target, FileText, Activity, Server, Clock, TrendingUp, Zap, Users,
  ArrowLeft, Shield, Search
} from 'lucide-react';
import LoadingState from './LoadingState';
import CustomFeedbackSection from './CustomFeedbackSection';

// Keep all your existing interfaces unchanged
interface APIFlags {
  model_loaded: boolean;
  text_processed: boolean;
  inference_successful: boolean;
}

interface TrackingInfo {
  request_id: number;
  timestamp: string;
  processing_node: string;
}

interface EnsembleDetails {
  total_models: number;
  active_predictions: number;
  model_votes: {
    real: number;
    fake: number;
  };
  predictions: Array<{
    model: string;
    label: string;
    confidence: number;
    reasoning: string;
    fake_prob?: number;
    real_prob?: number;
    is_toxic?: boolean;
    sentiment?: string;
  }>;
}

interface AnalysisResult {
  url?: string;
  title: string;
  label: 'Trustworthy' | 'Untrustworthy';
  confidence: number;
  summary: string;
  reasoning: string;
  probabilities?: {
    fake: number;
    real: number;
  };
  model: string;
  analyzedAt: string;
  source: string;
  processing_time?: number;
  model_status?: string;
  api_flags?: APIFlags;
  tracking_info?: TrackingInfo;
  ensemble_details?: EnsembleDetails;
}

interface BackendResponse {
  success: boolean;
  data: AnalysisResult;
  error?: string;
  api_flags?: APIFlags;
}

interface SystemHealth {
  status: string;
  uptime?: string;
  total_requests?: number;
  success_rate?: number;
  ensemble_info?: {
    loaded_models: string[];
    failed_models: string[];
    total_loaded: number;
    total_failed: number;
  };
}

interface DynamicResultProps {
  searchUrl: string;
  onBack: () => void;
}

const DynamicResult: React.FC<DynamicResultProps> = ({ searchUrl, onBack }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [lastAnalyzedUrl, setLastAnalyzedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (searchUrl !== lastAnalyzedUrl) {
      analyzeUrl();
      fetchSystemHealth();
      setLastAnalyzedUrl(searchUrl);
    }
  }, [searchUrl, lastAnalyzedUrl]);

  const analyzeUrl = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: searchUrl }),
      });

      const responseData: BackendResponse = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || 'Failed to analyze URL');
      }

      setResult(responseData.data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      const response = await fetch('http://localhost:5001/health');
      const healthData = await response.json();
      setSystemHealth(healthData);
    } catch (err) {
      console.error('Failed to fetch system health:', err);
    }
  };

  const handleFeedback = async (feedback: 'agree' | 'disagree', userLabel?: string, evidence?: string) => {
    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'enhanced_analysis_feedback',
          content: {
            url: searchUrl,
            feedback,
            originalLabel: result?.label,
            userLabel,
            evidence,
            confidence: result?.confidence,
            model: result?.model,
            request_id: result?.tracking_info?.request_id
          }
        }),
      });
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-teal-500';
      case 'processing': return 'text-yellow-500';
      case 'loading': return 'text-blue-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Activity className="h-4 w-4" />;
      case 'loading': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const isTrustworthy = result.label === 'Trustworthy';
  const confidenceColor = result.confidence >= 80 ? 'text-green-600' :
                          result.confidence >= 60 ? 'text-yellow-600' : 'text-red-600';
  const hasSummary = result.summary && result.summary !== 'Summary not available for this content.' && result.summary.length > 10;

  // Muted color scheme
  const cardBgColor = isTrustworthy ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isTrustworthy ? 'border-green-200' : 'border-red-200';
  const textColor = isTrustworthy ? 'text-green-800' : 'text-red-800';
  const badgeBg = isTrustworthy ? 'bg-green-100' : 'bg-red-100';
  const badgeText = isTrustworthy ? 'text-green-800' : 'text-red-800';
  const iconColor = isTrustworthy ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Search</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Truthly</span>
            </div>

            <div className="w-24"> {/* Spacer for centering */}</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Status Banner */}
        {systemHealth && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(systemHealth.status)}>
                    {getStatusIcon(systemHealth.status)}
                  </div>
                  <span className="font-medium">System Status: {systemHealth.status.toUpperCase()}</span>
                </div>
                {systemHealth.uptime && (
                  <span className="text-sm text-gray-500">Uptime: {systemHealth.uptime}</span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {systemHealth.success_rate !== undefined && (
                  <span>Success Rate: {systemHealth.success_rate}%</span>
                )}
                {systemHealth.ensemble_info && (
                  <span>Models: {systemHealth.ensemble_info.total_loaded}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Result Card with Muted Colors */}
        <div className={`${cardBgColor} ${borderColor} border rounded-xl p-8 mb-6`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{result.title}</h1>
            {result.url && (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-1"
              >
                <span>{result.url}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Status Display with Muted Colors */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center space-x-3 px-4 py-3 ${badgeBg} rounded-xl`}>
              {isTrustworthy ? (
                <CheckCircle className={`h-6 w-6 ${iconColor}`} />
              ) : (
                <XCircle className={`h-6 w-6 ${iconColor}`} />
              )}
              <span className={`text-lg font-semibold ${badgeText}`}>{result.label}</span>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600">Confidence:</span>
                <span className={`text-xl font-bold ${confidenceColor}`}>{result.confidence}%</span>
              </div>
              {result.probabilities && (
                <div className="text-sm text-gray-500">
                  Real: {result.probabilities.real}% | Fake: {result.probabilities.fake}%
                </div>
              )}
              {result.processing_time && (
                <div className="text-sm text-gray-500">
                  Processed in {result.processing_time}s
                </div>
              )}
            </div>
          </div>

          {/* Multi-Model Ensemble Details */}
          {result.ensemble_details && (
            <div className="mb-6 p-4 bg-white/50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-teal-600" />
                Multi-Model Ensemble ({result.ensemble_details.active_predictions} Models Active)
              </h3>
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Trustworthy: {result.ensemble_details.model_votes.real}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Suspicious: {result.ensemble_details.model_votes.fake}</span>
                </div>
              </div>
              <div className="space-y-3">
                {result.ensemble_details.predictions.map((prediction, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{prediction.model}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prediction.label === 'Trustworthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {prediction.label}
                        </span>
                        <span className="text-sm font-medium">{prediction.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{prediction.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Status Flags */}
          {result.api_flags && (
            <div className="mb-6 p-4 bg-white/50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Server className="h-5 w-5 mr-2 text-teal-600" />
                API Status Flags
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(result.api_flags.model_loaded ? 'healthy' : 'failed')}>
                    {getStatusIcon(result.api_flags.model_loaded ? 'healthy' : 'failed')}
                  </div>
                  <span className="text-sm">Model Loaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(result.api_flags.text_processed ? 'healthy' : 'failed')}>
                    {getStatusIcon(result.api_flags.text_processed ? 'healthy' : 'failed')}
                  </div>
                  <span className="text-sm">Text Processed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(result.api_flags.inference_successful ? 'healthy' : 'failed')}>
                    {getStatusIcon(result.api_flags.inference_successful ? 'healthy' : 'failed')}
                  </div>
                  <span className="text-sm">Inference Complete</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Model Info */}
          <div className="mb-6 p-4 bg-white/50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-teal-600" />
              AI Analysis Details
            </h3>
            <div className="text-sm text-gray-600">
              <p>Analyzed by: {result.model || 'AI Model'}
                {result.ensemble_details && ` (${result.ensemble_details.total_models} models)`}
              </p>
              {result.tracking_info && (
                <p>Request ID: #{result.tracking_info.request_id}</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {hasSummary && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-teal-600" />
              Content Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>
        )}

        {/* Reasoning Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Target className="h-5 w-5 mr-2 text-teal-600" />
            AI Analysis
          </h3>
          <p className="text-gray-700 leading-relaxed">{result.reasoning}</p>
        </div>

        {/* Feedback Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Was this analysis helpful?</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                handleFeedback('agree');
                setShowFeedback(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-all duration-300"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all duration-300"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <CustomFeedbackSection
            onSubmit={(userLabel, evidence) => {
              handleFeedback('disagree', userLabel, evidence);
              setShowFeedback(false);
            }}
            onCancel={() => setShowFeedback(false)}
          />
        )}

        {/* Technical Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Technical Details</h3>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all duration-300"
            >
              {showTechnicalDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>

          {showTechnicalDetails && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-900">Analyzed at:</span>
                  <p className="text-gray-600">{new Date(result.analyzedAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Source:</span>
                  <p className="text-gray-600">{result.source}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Model:</span>
                  <p className="text-gray-600">{result.model}</p>
                </div>
                {result.processing_time && (
                  <div>
                    <span className="font-medium text-gray-900">Processing time:</span>
                    <p className="text-gray-600">{result.processing_time}s</p>
                  </div>
                )}
              </div>

              {result.tracking_info && (
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <span className="font-medium text-gray-900">Request ID:</span>
                    <p className="text-gray-600">#{result.tracking_info.request_id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Processing node:</span>
                    <p className="text-gray-600">{result.tracking_info.processing_node}</p>
                  </div>
                </div>
              )}

              {result.probabilities && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Raw Probabilities:</span>
                  <p className="text-gray-600">Real: {result.probabilities.real}%, Fake: {result.probabilities.fake}%</p>
                </div>
              )}

              {systemHealth?.ensemble_info && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Ensemble System Status</span>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-900">Loaded Models: {systemHealth.ensemble_info.total_loaded}</p>
                      <p className="text-gray-600 text-xs">{(systemHealth.ensemble_info.loaded_models ?? []).join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-900">Failed Models: {systemHealth.ensemble_info.total_failed}</p>
                      {(systemHealth.ensemble_info.failed_models ?? []).length > 0 && (
                        <p className="text-gray-600 text-xs">{(systemHealth.ensemble_info.failed_models ?? []).join(', ')}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicResult;
