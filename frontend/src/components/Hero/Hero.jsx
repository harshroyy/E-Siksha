import React from "react";
import { Link } from "react-router-dom"; // If using React Router

function Hero() {
  return (
    <div className="h-[90vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 to-white">
      {/* Text Content */}
      <div className="w-full mb-12 md:mb-0 lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12">
        <h1 className="mt-2 text-2xl lg:text-3xl font-semibold text-blue-600 text-center lg:text-left transition duration-300" style={{ fontFamily: 'Cormorant, sans-serif' }}>
          Welcome to
        </h1>
        <h1 className="text-4xl lg:text-6xl font-bold text-blue-800 text-center lg:text-left animate-fadeIn" style={{ fontFamily: 'Cormorant, sans-serif' }}>
          UCHCHA MADHYAMIK
        </h1>
        {/* <h1 className="text-4xl lg:text-6xl font-bold text-blue-800 text-center lg:text-left animate-fadeIn">
          MADHYAMIK
        </h1> */}
        <h1 className="text-4xl lg:text-6xl font-bold text-blue-800 text-center lg:text-left animate-fadeIn"style={{ fontFamily: 'Cormorant, sans-serif' }}>
          VIDYALAYA
        </h1>

        <p className="mt-2 text-[1.75rem] font-semibold text-blue-600 text-center lg:text-left transition duration-300"style={{ fontFamily: 'Cormorant, sans-serif' }}>
          NURJAMAPUR
        </p>

        <p className="mt-2 mb-4 md:mb-0 lg:text-2l italic text-gray-500 lg:text-left">
          "Education is the most powerful weapon which you can use to change the world"
        </p>

        <Link
          to="/admissions" // Update the link destination
          className="mt-2 text-blue-600 bg-white text-xl lg:text-2xl font-semibold border border-white px-12 py-3 hover:bg-blue-700 rounded-full transition duration-300 shadow-lg no-underline"
        >
          Explore
        </Link>

      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-auto flex items-center justify-center lg:pr-12 p-4">
        <img
          src="/heroimg.png" // Replace with your image path
          alt="School Hero Image"
          className="w-full h-auto lg:w-auto lg:h-auto object-cover"
          style={{ maxHeight: '120%', maxWidth: '120%', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

export default Hero;