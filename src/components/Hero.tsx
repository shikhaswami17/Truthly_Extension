import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  newsInput: string;
  setNewsInput: (val: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // Remove onCheck from props
}

const Hero: React.FC<HeroProps> = ({ newsInput, setNewsInput, onKeyPress }) => {
  const navigate = useNavigate();

  const handleCheckCredibility = () => {
    if (!newsInput.trim()) {
      alert('Please enter a news link or text to analyze.');
      return;
    }
    navigate('/result', { state: { searchUrl: newsInput.trim() } });
  };

  return (
    <section id="home" className="text-center py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <h1 className="text-5xl font-bold text-gray-900">
        Truth. Verified <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">in Seconds.</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Paste any news link or text — our AI checks credibility, explains why, and shows trusted sources.
      </p>
      <div className="mt-8 max-w-xl mx-auto flex shadow-xl rounded-2xl overflow-hidden border border-purple-100">
        <input 
          type="text" 
          value={newsInput}
          onChange={e => setNewsInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Paste news link or text here..." 
          className="flex-grow px-6 py-4 outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        />
        <button 
          onClick={handleCheckCredibility}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 font-medium hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Check Credibility
        </button>
      </div>
      <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-700">
        <span className="text-emerald-600 font-medium">● AI-Powered Analysis</span>
        <span className="text-purple-600 font-medium">● Real-time Verification</span>
        <span className="text-blue-600 font-medium">● Trusted Sources</span>
      </div>
    </section>
  );
};

export default Hero;