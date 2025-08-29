// filepath: /home/shikha17/Documents/Truthly/src/components/TruthlyApp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Globe, Mic, BarChart3, Shield, Users, TrendingUp, 
  ExternalLink, CheckCircle, XCircle, ChevronDown, ChevronUp,
  Clock, Eye, AlertTriangle, Award, Zap, Heart, DollarSign,
  Target, Filter, Calendar, BookOpen
} from 'lucide-react';

const TruthlyApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const projectImpacts = [
    { icon: Shield, label: 'Media Trust Restored', value: '89%', color: 'text-teal-600' },
    { icon: Users, label: 'Political Gaps Bridged', value: '76%', color: 'text-blue-600' },
    { icon: Target, label: 'Bias Reduction', value: '82%', color: 'text-green-600' },
    { icon: AlertTriangle, label: 'Falsehoods Reduced', value: '94%', color: 'text-red-600' },
    { icon: Heart, label: 'Well-being Improved', value: '71%', color: 'text-pink-600' },
    { icon: DollarSign, label: 'Economy Boost', value: '$2.4B', color: 'text-yellow-600' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/result', { state: { searchUrl: searchQuery.trim() } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 opacity-5">
          <Globe className="h-32 w-32 text-gray-400" />
        </div>
        <div className="absolute top-40 right-32 opacity-5">
          <Mic className="h-24 w-24 text-gray-400" />
        </div>
        <div className="absolute bottom-32 left-32 opacity-5">
          <BarChart3 className="h-28 w-28 text-gray-400" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <Search className="h-36 w-36 text-gray-400" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Truthly</span>
              <span className="text-sm text-gray-500 ml-2">AI-Powered Fact-Checking</span>
            </div>
            
            <nav className="flex items-center space-x-8">
              <button className="text-gray-700 hover:text-teal-600 font-medium">How It Works</button>
              <button className="text-gray-700 hover:text-teal-600 font-medium">API</button>
              <button className="text-gray-700 hover:text-teal-600 font-medium">About</button>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Truth in the Age of
            <span className="text-teal-600"> Information</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered fact-checking that helps you navigate misinformation with confidence. 
            Verify news, analyze claims, and make informed decisions.
          </p>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Paste a news article URL, claim, or search for topics..."
                      className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-2"
                >
                  <span>Fact-Check</span>
                  <Zap className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-teal-500" />
                  <span>Multi-source Verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Expert-level Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Impact Section */}
      <section className="relative z-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Measurable Impact on Information Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform has transformed how people interact with news and information, 
              creating a more informed and connected society.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectImpacts.map((impact, index) => {
              const IconComponent = impact.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 ${impact.color}`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${impact.color}`}>
                    {impact.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {impact.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Measured across our user base of 2M+ active fact-checkers worldwide
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional-Grade Fact-Checking
            </h2>
            <p className="text-xl text-gray-600">
              Built for journalists, researchers, and informed citizens
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                News-Quality Analysis
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Source Credibility Scoring</h4>
                    <p className="text-gray-600">Analyze publisher reputation, bias indicators, and historical accuracy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Claim Verification</h4>
                    <p className="text-gray-600">Cross-reference facts against authoritative databases and expert sources</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Media Authenticity</h4>
                    <p className="text-gray-600">Detect manipulated images, deepfakes, and doctored content</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      BBC
                    </div>
                    <span className="font-medium">BBC News</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium text-sm">Verified</span>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Climate Change Report Shows Accelerating Trends</h4>
                <p className="text-gray-600 text-sm mb-4">Latest IPCC findings indicate faster warming than previously projected...</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Confidence:</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                  <button className="text-teal-600 hover:text-teal-800">View Analysis</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Truthly</span>
              </div>
              <p className="text-gray-400">
                Empowering informed decisions through advanced fact-checking technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">How It Works</button></li>
                <li><button className="hover:text-white transition-colors">API Documentation</button></li>
                <li><button className="hover:text-white transition-colors">Browser Extension</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Research Papers</button></li>
                <li><button className="hover:text-white transition-colors">Media Guidelines</button></li>
                <li><button className="hover:text-white transition-colors">Educational Content</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Truthly. Building trust in information.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TruthlyApp;
