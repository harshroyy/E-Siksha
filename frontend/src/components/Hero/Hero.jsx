import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="relative h-[90vh] flex items-center"
      style={{
        backgroundImage: "url('https://imgur.com/stxqSay.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Text Content */}
      <div className="relative container mx-auto px-6 lg:px-16">
        <div className="max-w-2xl">
          {/* <h2
            className="text-2xl lg:text-3xl font-semibold text-white mb-2"
            style={{ fontFamily: "Cormorant, sans-serif" }}
          >
            Welcome to
          </h2> */}
          <div className="space-y-1">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white animate-fadeIn leading-tight"
              style={{ fontFamily: "Cormorant, sans-serif" }}
            >
              UCHCHA MADHYAMIK
            </h1>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white animate-fadeIn leading-tight"
              style={{ fontFamily: "Cormorant, sans-serif" }}
            >
              VIDYALAYA
            </h1>
          </div>

          <h3
            className="mt-4 text-3xl font-semibold text-white"
            style={{ fontFamily: "Cormorant, sans-serif" }}
          >
            NURJAMAPUR
          </h3>

          {/* <p className="mt-6 text-xl italic text-gray-200 max-w-xl">
            "Education is the most powerful weapon which you can use to change the world"
          </p> */}

          <Link
            to="/admissions"
            className="mt-8 inline-block px-12 py-3 text-blue-800 bg-white text-xl font-semibold rounded-full hover:bg-blue-700 hover:text-white transition duration-300 shadow-lg"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;