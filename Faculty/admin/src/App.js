import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import AnalyticsDashboard from './components/AnalyticsDashboard'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin" element={<AnalyticsDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
