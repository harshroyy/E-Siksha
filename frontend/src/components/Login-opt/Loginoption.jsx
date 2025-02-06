import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Users, Headphones } from "lucide-react";
import { Carousel } from "react-bootstrap";
import "../Login-opt/LoginOptions.css";
const Loginoption = () => {
  return (
    <section className="login-options" id="loginsection">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="about-us-title"
        >
          LOGIN OPTIONS
        </motion.h2>

        <div className="login-cards">
          {[
            { title: "Teacher Login", icon: User },
            { title: "Student Login", icon: Users },
            { title: "Admin Login", icon: Headphones },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="login-card"
            >
              <a href={`#${item.title.toLowerCase().replace(" ", "-")}`}>
                <div className="login-icon">
                  <item.icon className="icon" />
                </div>
                <span className="login-title">{item.title}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loginoption;
