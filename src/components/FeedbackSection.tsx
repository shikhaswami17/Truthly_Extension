import React from 'react';

interface FeedbackSectionProps {
  feedbackText: string;
  setFeedbackText: (val: string) => void;
  isSubmittingFeedback: boolean;
  onSubmit: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedbackText, setFeedbackText, isSubmittingFeedback, onSubmit }) => (
  <section id="feedback" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Help Us Improve</h2>
      <p className="mt-2 text-gray-600">Your feedback makes Truthly more accurate for everyone</p>
      <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
        <div className="max-w-md mx-auto">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Share Your Thoughts</h3>
          <textarea 
            value={feedbackText}
            onChange={e => setFeedbackText(e.target.value)}
            placeholder="Tell us how we can improve our fact-checking..."
            className="w-full p-4 border border-purple-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            rows={4}
          />
          <button 
            onClick={onSubmit}
            disabled={isSubmittingFeedback}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default FeedbackSection;
