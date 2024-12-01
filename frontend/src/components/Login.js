// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('Login failed. Please check your network connection.');
      }
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
      </form>
    </div>
  );
};

export default Login;