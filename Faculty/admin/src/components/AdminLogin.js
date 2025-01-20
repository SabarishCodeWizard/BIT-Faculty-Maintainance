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
      // Use signInWithEmailAndPassword with popup flow
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log('Login successful:', userCredential.user);
      alert("Login successful!");
      
      // Navigate to admin dashboard
      navigate('/admin');
    } catch (err) {
      console.error('Login Error:', err.code, err.message);
      
      // Display user-friendly error messages
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
    <div className="login-container">
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
