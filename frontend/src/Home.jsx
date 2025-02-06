import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Users, Headphones } from "lucide-react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./components/About/AboutUs";
import Teacher from "./components/Teach/Teacher";
import Loginoption from "./components/Login-opt/Loginoption";

const images = [
  {
    url: "https://muffingroup.com/blog/wp-content/uploads/2021/08/Round-Rock-Independent-School-District.jpg",
    text: "Image 1",
    caption: "Caption for Image 1",
  },
  {
    url: "https://muffingroup.com/blog/wp-content/uploads/2021/08/beschoo.jpg",
    text: "Image 2",
    caption: "Caption for Image 2",
  },
  {
    url: "https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0=",
    text: "Image 3",
    caption: "Caption for Image 3",
  },
  {
    url: "https://img.freepik.com/free-vector/large-school-building-scene_1308-32058.jpg",
    text: "Image 4",
    caption: "Caption for Image 4",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image.url} alt={image.text} className="carousel-image" />
            <div className="carousel-caption">
              <h5>{image.text}</h5>
              <p>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-white" ref={targetRef}>
      <ImageCarousel />
      <Loginoption />
      <About />
      <Teacher />
    </div>
  );
}

export default Home;