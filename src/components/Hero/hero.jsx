import React from "react";
import { Link } from "react-router-dom";
import "./hero.css"; // Import the CSS file

function Hero() {
  return (
    <div className="hero-container">
      {/* Text Content */}
      <div className="hero-text">
        <h1 className="hero-title">Welcome to</h1>
        <h1 className="hero-main-title">UCHCHA MADHYAMIK</h1>
        <h1 className="hero-main-title">VIDYALAYA</h1>
        <p className="hero-subtitle">NURJAMAPUR</p>
        <p className="hero-quote">
          "Education is the most powerful weapon which you can use to change the world"
        </p>

        <Link to="/admissions" className="hero-button">
          Explore
        </Link>
      </div>

      {/* Image Section */}
      <div className="hero-image-container">
        <img src="/hero1.png" alt="School Hero" className="hero-image" />
      </div>
    </div>
  );
}

export default Hero;
