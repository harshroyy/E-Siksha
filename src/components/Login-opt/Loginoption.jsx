import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Users, Headphones } from "lucide-react";
import "../Login-opt/LoginOptions.css";

// ✅ Use forwardRef to receive ref from App.jsx
const Loginoption = forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <section ref={ref} className="login-options" id="loginsection">
      <div className="container px-4 mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="about-us-title">
          LOGIN OPTIONS
        </motion.h2>

        <div className="login-cards">
          {[
            { title: "Teacher Login", icon: User, role: "Teacher" },
            { title: "Student Login", icon: Users, role: "Student" },
            { title: "Admin Login", icon: Headphones, role: "Admin" },
          ].map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="login-card"
              onClick={() => navigate(`/login/${item.role.toLowerCase()}`)}
            >
              <div className="login-icon">
                <item.icon className="icon" />
              </div>
              <span className="login-title">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Loginoption;
