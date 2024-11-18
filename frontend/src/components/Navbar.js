// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <h1>Library Manager</h1>
      <div className="nav-links"> 
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/myprofile">My Profile</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {isAuthenticated && <Link to="/addbook">Add Book</Link>}

      </div>
    </nav>
  );
};

export default Navbar;