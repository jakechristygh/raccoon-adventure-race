// src/components/Hero.jsx
import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div
      className="hero"
      style={{
        background: "url('/images/lake.jpg') center/cover no-repeat",
        height: "55vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div className="hero-content">
        <h1>Raccoon Adventure Race</h1>
        <h2>Paddle - Run - Shoot</h2>
        <p>Raccoon River Park</p>
        <h3>May 23 2026  9:00 A.M.</h3>
        
      </div>
    </div>
  );
};

export default Hero;
