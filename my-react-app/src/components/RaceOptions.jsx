import React from "react";
import "./RaceOptions.css";

const RaceOptions = () => {
  return (
    <section className="race-options">

      <div className="race-card">
        <h2>Sprint</h2>
        <ul className="race-legs">
          <li><strong>Paddle:</strong> 1.5 mile course around the island</li>
          <li><strong>Run:</strong> 2 miles of trail around the lake</li>
          <li><strong>Shoot:</strong> 3 arrows from 15 feet</li>
        </ul>
        <button className="register-btn">Register</button>
      </div>

      <div className="race-card">
        <h2>Distance</h2>
        <ul className="race-legs">
          <li><strong>Paddle:</strong> 2 mile course on the lake</li>
          <li><strong>Run:</strong> 5 miles of trail around the lake</li>
          <li><strong>Shoot:</strong> 3 arrows from 30 feet</li>
        </ul>
        <button className="register-btn">Register</button>
      </div>
    </section>
  );
};

export default RaceOptions;
