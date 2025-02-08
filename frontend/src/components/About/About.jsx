import React from "react";

const AboutUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Our School
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Section: Image */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-purple-200 rounded-lg"></div>
                <img
                  src="/about-us-image.jpg"
                  alt="About Us"
                  className="relative w-full h-auto rounded-lg shadow-xl object-cover"
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>

            {/* Right Section: Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Nurturing Minds, Shaping Futures
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Our school provides a nurturing environment where every student's potential
                is recognized and cultivated. We believe in creating an atmosphere that
                encourages curiosity, creativity, and critical thinking.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <p className="text-gray-700">Holistic Educational Approach</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <p className="text-gray-700">Experienced Faculty Members</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <p className="text-gray-700">State-of-the-art Facilities</p>
                </div>
              </div>

              <button className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md">
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