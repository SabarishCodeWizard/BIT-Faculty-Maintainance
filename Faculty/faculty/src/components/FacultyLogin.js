import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyLogin.css';

const FacultyLogin = () => {
  const [facultyId, setFacultyId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/faculty/${facultyId}`);
  };

  return (
    <div>
      <h1>Faculty Login</h1>
      <input placeholder="Faculty ID" onChange={(e) => setFacultyId(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default FacultyLogin;
