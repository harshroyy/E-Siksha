import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center h-40 text-white text-center" style={{ backgroundColor: '#282834' }}>
      {/* Social Media Section */}
      <div className="footer-container">
        <a href="#" className="social-icon">
          <FaFacebookF size={20} className="text-gray-400" />
        </a>
        <a href="#" className="social-icon">
          <FaTwitter size={20} className="text-gray-400" />
        </a>
        <a href="#" className="social-icon">
          <FaGoogle size={20} className="text-gray-400" />
        </a>
        <a href="https://www.instagram.com/harsh_royy/" className="social-icon">
          <FaInstagram size={20} className="text-gray-400" />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedinIn size={20} className="text-gray-400" />
        </a>
        <a href="#" className="social-icon">
          <FaGithub size={20} className="text-gray-400" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;