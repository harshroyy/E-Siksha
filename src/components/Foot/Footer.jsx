import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - School Name & Tagline */}
        <div className="footer-section">
          <h2>UCHCHA MADHYAMIK VIDYALAYA</h2>
          <p className="tagline">"Education for a Brighter Future"</p>
        </div>

        {/* Middle Section - Contact Details */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> +91 98765 43210</p>
          <p><FaEnvelope /> info@uchhamadhyamik.edu.in</p>
          <p><FaMapMarkerAlt /> Nurjamapur, Bihar, India</p>
        </div>

        {/* Right Section - Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 UCHCHA MADHYAMIK VIDYALAYA | All Rights Reserved</p>
        <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
