///Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>©2024 The WebCrafters Library Manager. All rights reserved.</p>
      <p>
        Check out the source code on{' '}
        <a href="https://github.com/iamyashdp/TheWebCrafters_Part2" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>.
      </p>
    </footer>
  );
};

export default Footer;