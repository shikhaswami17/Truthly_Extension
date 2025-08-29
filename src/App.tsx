// filepath: /home/shikha17/Documents/Truthly/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TruthlyApp from './components/TruthlyApp';
import DynamicResult from './components/DynamicResult';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TruthlyApp />} />
        <Route path="/result" element={<DynamicResultWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper to pass props from location state
import { useLocation, useNavigate } from 'react-router-dom';

function DynamicResultWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchUrl } = location.state || {};

  if (!searchUrl) {
    navigate('/');
    return null;
  }

  return (
    <DynamicResult 
      searchUrl={searchUrl} 
      onBack={() => navigate('/')} 
    />
  );
}

export default App;
