import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// Initialize Firebase app
initializeApp(firebaseConfig);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redirect to admin page after successful login
    } catch (err) {
      console.error('Login Error:', err.code, err.message);
      alert(`Login failed: ${err.message}`);
      
      // Detailed error handling
      switch (err.code) {
        case 'auth/invalid-email':
          alert('The email address is invalid.');
          break;
        case 'auth/user-disabled':
          alert('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          alert('No user found with this email.');
          break;
        case 'auth/wrong-password':
          alert('The password is incorrect.');
          break;
        case 'auth/invalid-credential':
          alert('The credentials provided are invalid.');
          break;
        default:
          alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
