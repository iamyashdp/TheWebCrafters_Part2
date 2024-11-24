// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import MyProfile from './components/MyProfile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/editbook/:bookId" element={<EditBook />} />
        <Route path="/myprofile" element={<MyProfile />} />

      </Routes>
    </Router>
  );
};

export default App;