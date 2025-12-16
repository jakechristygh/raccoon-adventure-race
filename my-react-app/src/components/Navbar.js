import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          RAR
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/race-info">Race Info</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/results">Results</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
