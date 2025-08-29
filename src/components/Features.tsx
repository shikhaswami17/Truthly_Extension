import React from 'react';

const Features: React.FC = () => (
  <section id="features" className="py-20 bg-gray-50 text-center">
    <h2 className="text-3xl font-bold text-gray-800">Why Truthly</h2>
    <p className="mt-2 text-gray-500 max-w-xl mx-auto">
      Cutting-edge technology meets community wisdom to deliver the most accurate news verification available.
    </p>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
      <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
        <div className="text-indigo-600 text-3xl mb-2">⚡</div>
        <h3 className="font-semibold text-lg">AI-Powered</h3>
        <p className="text-gray-500 text-sm mt-2">Detect fake news instantly using advanced machine learning algorithms trained on millions of articles.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
        <div className="text-green-600 text-3xl mb-2">🔍</div>
        <h3 className="font-semibold text-lg">Source Verification</h3>
        <p className="text-gray-500 text-sm mt-2">Cross-reference claims with trusted news sources, academic papers, and official statements.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
        <div className="text-blue-600 text-3xl mb-2">📊</div>
        <h3 className="font-semibold text-lg">Transparency</h3>
        <p className="text-gray-500 text-sm mt-2">See exactly why content is flagged with detailed explanations and confidence scores.</p>
      </div>
    </div>
  </section>
);

export default Features;
