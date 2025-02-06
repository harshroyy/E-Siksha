import React from "react";
import { motion } from "framer-motion";
import "../Header/Header.css"

function Header() {
  return (
    <div className="containerofheader">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="header"
      >
        <div id="header">
          {/* Logo & School Name */}
          <div className="logo-container">
            <img
              id="logo"
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              alt="Logo"
              className="logo"
            />
            <span className="hero-title">
              UCHCHA MADHYAMIK VIDYALAYA, NURJAMAPUR
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="nav">
            {["Home", "About Us", "Login"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="nav-item"
              >
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="nav-link"
                >
                  {item}
                </a>
                <span className="nav-underline" />
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.header>
    </div>
  );
}

export default Header;