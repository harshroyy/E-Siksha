import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutUs = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
    layoutEffect: false, // Ensures smooth animation
  });

  // Framer Motion Animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      className="py-20 mt-16 bg-gradient-to-b from-purple-100 via-white to-white relative"
      ref={targetRef}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-12"
        >
          ABOUT US
        </motion.h2>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Animated Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ delay: i * 0.2 }}
              className="h-[2px] border-t-2 border-dashed border-blue-200 my-2"
            />
          ))}

          {/* About Us Text */}
          <motion.p
            style={{ opacity, scale }}
            className="text-gray-600 text-sm md:text-base mt-6"
          >
            Our school provides a nurturing environment for students to grow,
            learn, and achieve their potential. We focus on holistic education
            and fostering creativity to prepare students for their future.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;