import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-8 bg-white border-t border-blue-200">
      <div className="container px-4 mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About Us</h3>
            <p className="text-xs text-gray-600">
              Dedicated to providing quality education with passionate educators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-[#2563EB] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-[#2563EB] transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-[#2563EB] transition-colors">
                  Teachers
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-[#2563EB] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-3">
              <a
                href="#"
                className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-[#2563EB] hover:text-[#1E40AF] transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;