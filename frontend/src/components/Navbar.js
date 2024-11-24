// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from './logo.jpg';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <img src={logo} alt="Library Manager Logo" className="navbar-logo" />
      <h1>Library Manager</h1>
      <div className="nav-links"> 
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/addbook">Add Book</Link>}
        {isAuthenticated ? (
          <>
            <Link to="/myprofile">My Books</Link>
            <button onClick={onLogout}>Logout</button>
          </>
          
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        

      </div>
    </nav>
  );
};

export default Navbar;