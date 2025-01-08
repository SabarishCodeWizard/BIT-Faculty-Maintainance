import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacultyLogin from './components/FacultyLogin';
import FacultyPage from './components/FacultyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FacultyLogin />} />
        <Route path="/faculty/:faculty_id" element={<FacultyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
