import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/race-info">Race Info</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/results">Results</Link></li>

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
