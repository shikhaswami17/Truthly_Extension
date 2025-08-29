import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">T</div>
            <span className="font-bold text-xl">Truthly</span>
          </div>
          <p className="text-gray-400 text-sm">Fighting misinformation with AI-powered fact-checking technology.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button className="hover:text-white transition-colors">How it Works</button></li>
            <li><button className="hover:text-white transition-colors">API Access</button></li>
            <li><button className="hover:text-white transition-colors">Browser Extension</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button className="hover:text-white transition-colors">About Us</button></li>
            <li><button className="hover:text-white transition-colors">Careers</button></li>
            <li><button className="hover:text-white transition-colors">Press</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button className="hover:text-white transition-colors">Help Center</button></li>
            <li><button className="hover:text-white transition-colors">Contact Us</button></li>
            <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 Truthly. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
