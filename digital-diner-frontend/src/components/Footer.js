// src/components/Footer.js
import React from 'react';
// import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} The Digital Diner. All rights reserved.</p>
        <div className="footer-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;