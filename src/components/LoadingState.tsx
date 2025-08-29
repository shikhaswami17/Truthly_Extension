import React from 'react';

const LoadingState: React.FC = () => (
  <div className="mt-8">
    <div className="flex items-center justify-center space-x-2 text-indigo-600">
      <div className="w-2 h-2 bg-indigo-600 rounded-full pulse-dot"></div>
      <div className="w-2 h-2 bg-indigo-600 rounded-full pulse-dot" style={{animationDelay: '0.2s'}}></div>
      <div className="w-2 h-2 bg-indigo-600 rounded-full pulse-dot" style={{animationDelay: '0.4s'}}></div>
      <span className="ml-2">Analyzing content...</span>
    </div>
  </div>
);

export default LoadingState;
