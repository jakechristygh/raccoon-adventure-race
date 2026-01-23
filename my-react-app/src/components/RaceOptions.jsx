import React from "react";
import "./RaceOptions.css";
import { Link } from "react-router-dom";


const RaceOptions = () => {
  return (
    <section className="race-options">

      <div className="race-card">
        <h2>Sprint</h2>
        <ul className="race-legs">
          <li><strong>Paddle:</strong> 1.5 mile course around the island</li>
          <li><strong>Run:</strong> 2.5 miles of trail around the lake</li>
          <li><strong>Shoot:</strong> 3 arrows from 15 feet</li>
        </ul>
        <Link to="/register" className="register-btn">Register</Link>  
      </div>

      <div className="race-card">
        <h2>Distance</h2>
        <ul className="race-legs">
          <li><strong>Paddle:</strong> 2 mile course on the lake</li>
          <li><strong>Run:</strong> 5 miles of trail around the lake</li>
          <li><strong>Shoot:</strong> 3 arrows from 30 feet</li>
        </ul>
        <Link to="/register" className="register-btn">Register</Link>  
      </div>
    </section>
  );
};

export default RaceOptions;
