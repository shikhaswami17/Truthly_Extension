import React from 'react';

export type AnalysisResult = {
  status: 'verified' | 'misleading' | 'fake';
  confidence: number;
  reason: string;
  sources: string[];
};

interface ResultDisplayProps {
  result: AnalysisResult;
}

const statusConfig = {
  verified: { color: 'text-green-600', icon: '🟢', label: 'Verified' },
  misleading: { color: 'text-yellow-600', icon: '🟡', label: 'Misleading' },
  fake: { color: 'text-red-600', icon: '🟥', label: 'Fake News' }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const config = statusConfig[result.status];
  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg text-left opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">
      <div className={`flex items-center space-x-2 ${config.color} font-bold text-lg`}>
        <span>{config.icon} {config.label}</span>
        <span className="ml-auto text-gray-700">Confidence: <strong>{result.confidence}%</strong></span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p><strong>Reason:</strong> {result.reason}</p>
        <p className="mt-2">
          <strong>Sources:</strong>{' '}
          {result.sources.map((source, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded mr-1">
              {source}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
