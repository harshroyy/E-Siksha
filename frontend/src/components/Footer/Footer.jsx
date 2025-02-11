import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-8">
      {/* Social Media Section */}
      <div className="flex justify-center space-x-6 mb-6">
        <a href="#" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaFacebookF size={20} className="text-gray-400" /> {/* Facebook Blue */}
        </a>
        <a href="#" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaTwitter size={20} className="text-gray-400" /> {/* Twitter Blue */}
        </a>
        <a href="#" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaGoogle size={20} className="text-gray-400" /> {/* Google Red */}
        </a>
        <a href="https://www.instagram.com/harsh_royy/" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaInstagram size={20} className="text-gray-400" /> {/* Instagram Pink */}
        </a>
        <a href="#" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaLinkedinIn size={20} className="text-gray-400" /> {/* LinkedIn Blue */}
        </a>
        <a href="#" className="p-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-110">
          <FaGithub size={20} className="text-gray-400" /> {/* GitHub Black */}
        </a>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 ">
        <p className="text-sm text-gray-400 py-2">
          © 2024 Copyright : Roy
        </p>
      </div>
    </footer>
  );
}

export default Footer;