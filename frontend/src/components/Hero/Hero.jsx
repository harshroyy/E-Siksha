// src/components/Hero/Hero.jsx
import React from "react";
import "./Hero.css"; // You might need to create a Hero.css file

const images = [
  {
    url: "https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
  },
];

function Hero() {
  const imageUrl = images[0].url;
  const imageText = images[0].text;
  const imageCaption = images[0].caption;

  return (
    <div className="min-h-screen bg-white">
      <div className="hero-image-container">
        <img src={imageUrl} alt={imageText} className="hero-image" />
        <div className="hero-caption">
          <h5>{imageText}</h5>
          <p>{imageCaption}</p>
        </div>
      </div>
      {/* Other components that should be part of the Hero can stay here */}
    </div>
  );
}

export default Hero;
