import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Header/Header.css";

function Header({ scrollToLogin }) {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/"); // ✅ Navigate to home first

    // ✅ Delay scrolling to ensure page is loaded
    setTimeout(() => {
      if (scrollToLogin) {
        scrollToLogin();
      }
    }, 500); // ✅ Adjust delay if needed
  };

  return (
    <div className="containerofheader">
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="header">
        <div id="header">
          <div className="logo-container">
            <img id="logo" src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="Logo" className="logo" />
            <span className="hero-title">UCHCHA MADHYAMIK VIDYALAYA, NURJAMAPUR</span>
          </div>

          <nav className="nav">
            <span className="nav-link"><Link to="/" className="nav-link">Home</Link></span>
            <span className="nav-link"><Link to="/about-us" className="nav-link">About Us</Link></span>

            {/* ✅ Call handleLoginClick on button click */}
            <button className="nav-link login-button" onClick={handleLoginClick}>
              Login
            </button>
          </nav>
        </div>
      </motion.header>
    </div>
  );
}

export default Header;
