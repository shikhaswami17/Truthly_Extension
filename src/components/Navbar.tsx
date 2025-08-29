import React from 'react';

interface NavbarProps {
  onNav: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNav }) => (
  <nav className="flex justify-between items-center px-8 py-4 shadow-sm">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">T</div>
      <span className="font-bold text-xl text-indigo-700">Truthly</span>
    </div>
    <div className="space-x-6 text-gray-700">
      <button onClick={() => onNav('home')} className="hover:text-indigo-600 transition-colors">Home</button>
      <button onClick={() => onNav('features')} className="hover:text-indigo-600 transition-colors">Features</button>
      <button onClick={() => onNav('feedback')} className="hover:text-indigo-600 transition-colors">Feedback</button>
      <button onClick={() => onNav('team')} className="hover:text-indigo-600 transition-colors">Team</button>
    </div>
  </nav>
);

export default Navbar;
