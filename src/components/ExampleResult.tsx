import React from 'react';

const ExampleResult: React.FC = () => (
  <section className="py-16 text-center">
    <h2 className="text-2xl font-semibold text-gray-800">Example Analysis Result</h2>
    <p className="text-gray-500">Here's how Truthly analyzes and presents fact-check results</p>
    <div className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg text-left">
      <div className="flex items-center space-x-2 text-red-600 font-bold text-lg">
        <span>🟥 Fake News</span>
        <span className="ml-auto text-gray-700">Confidence: <strong>87%</strong></span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p><strong>Reason:</strong> Misleading claims about vaccines without scientific evidence. The article contains multiple factual inaccuracies and references discredited studies.</p>
        <p className="mt-2"><strong>Sources:</strong> 
          <span className="px-2 py-1 bg-gray-100 rounded mr-1">WHO</span>
          <span className="px-2 py-1 bg-gray-100 rounded mr-1">Snopes</span>
          <span className="px-2 py-1 bg-gray-100 rounded">Reuters Fact Check</span>
        </p>
      </div>
    </div>
  </section>
);

export default ExampleResult;
