import React, { useState } from 'react';

interface CustomFeedbackSectionProps {
  onSubmit: (userLabel: string, evidence: string) => void;
  onCancel: () => void;
}

const CustomFeedbackSection: React.FC<CustomFeedbackSectionProps> = ({ onSubmit, onCancel }) => {
  const [userLabel, setUserLabel] = useState('');
  const [evidence, setEvidence] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userLabel, evidence);
    setUserLabel('');
    setEvidence('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 mt-4">
      <h3 className="text-lg font-semibold text-white mb-3">Help Us Improve</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Your Label/Reason</label>
          <input
            type="text"
            value={userLabel}
            onChange={e => setUserLabel(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white border border-purple-400 focus:ring-2 focus:ring-purple-500"
            placeholder="Why do you disagree?"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Evidence (optional)</label>
          <textarea
            value={evidence}
            onChange={e => setEvidence(e.target.value)}
            className="w-full p-2 rounded bg-gray-900 text-white border border-purple-400 focus:ring-2 focus:ring-purple-500"
            placeholder="Provide links or details..."
            rows={3}
          />
        </div>
        <div className="flex gap-4">
          <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">Submit</button>
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CustomFeedbackSection;
