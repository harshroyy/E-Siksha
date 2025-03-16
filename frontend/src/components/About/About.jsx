import React from "react";
import "./About.css";

const AboutUs = () => {
  return (
    <section className="py-24" style={{ backgroundColor: '#3E3E51' }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-3xl text-gray-100 mb-4">
              About Our School
            </h2>
          </div>

          {/* Content Container */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Section: Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/aboutimg.png"
                alt="About Us"
                className="w-full h-auto rounded-lg object-cover"
                style={{ minHeight: '400px' }}
              />
            </div>

            {/* Right Section: Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-200">
                Nurturing Minds, Shaping Futures
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Our school provides a nurturing environment where every student's potential is recognized and cultivated. We believe in creating an atmosphere that encourages curiosity, creativity, and critical thinking. Our holistic educational approach, experienced faculty members, and state-of-the-art facilities ensure that students receive the best possible education to prepare them for the future.
              </p>

              <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-800 transition duration-300 ease-in-out shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;