import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="mb-[4.5rem]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F8FF] shadow-md h-[4.5rem]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-2 md:px-6">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 h-full" style={{ marginLeft: '-2rem' }}>
            <img
              src="logo3.png"
              alt="Logo"
              className="mt-2 w-[9rem] h-[9rem] rounded-md object-cover"
            />
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Home Link */}
            <div className="relative group py-2">
              <Link
                to="/"
                className="text-m font-medium text-gray-800 transition hover:text-[#1a237e] tracking-wide no-underline"
              >
                Home
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a237e] transition-all duration-300 group-hover:w-full"></span>
            </div>

            {/* About Us Link */}
            <div className="relative group py-2">
              <Link
                to="/#about"
                className="text-m font-medium text-gray-800 transition hover:text-[#1a237e] tracking-wide no-underline"
              >
                About Us
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a237e] transition-all duration-300 group-hover:w-full"></span>
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="text-white bg-blue-600 text-base lg:text-lg font-semibold border border-blue-600 px-6 py-2 hover:bg-blue-700 rounded-full transition duration-300 shadow-lg no-underline"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;