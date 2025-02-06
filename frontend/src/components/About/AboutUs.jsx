import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { User, Users, Headphones } from 'lucide-react';
import { Carousel } from 'react-bootstrap';
import "./AboutUs.css"
const AboutUs = () => {
    const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  return (
    <section className="about-us">
        <div className="container px-4 mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="about-us-title"
          >
            ABOUT US
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="about-us-content"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ delay: i * 0.2 }}
                className="about-us-line"
              />
            ))}
            <p className="about-us-text">About us - details of the school and all</p>
          </motion.div>
        </div>
      </section>
  )
}

export default AboutUs
