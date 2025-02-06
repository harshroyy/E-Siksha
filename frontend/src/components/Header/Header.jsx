import React from "react";
import './Header.css';

function Header() {
  return (
    <div className="containerofheader">
      <header className="header">
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
            {["Home", "About Us", "Login"].map((item) => (
              <div
                key={item}
                className="nav-item"
              >
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="nav-link"
                >
                  {item}
                </a>
                <span className="nav-underline" />
              </div>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
