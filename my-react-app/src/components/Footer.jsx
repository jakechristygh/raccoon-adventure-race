import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#race-options">Register</a></li>
            <li><a href="#race-description">Race Info</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#race-legs">Race Legs</a></li>        
            <li><a href="#results">Results</a></li>

          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@raccoonadventurerace.com</p>
          <p>Phone: (319) 540-1089</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><img src="/images/social/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/images/social/instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="/images/social/twitter.png" alt="Twitter" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Raccoon Adventure Race. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
