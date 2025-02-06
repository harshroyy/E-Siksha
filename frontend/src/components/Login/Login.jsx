import React from "react";
import { User, Users, Headphones } from "lucide-react";
import "../Login/Login.css";

const Loginoption = () => {
  return (
    <section className="login-options" id="loginsection">
      <div className="container px-4 mx-auto">
        <h2 className="about-us-title">
          LOGIN OPTIONS
        </h2>

        <div className="login-cards">
          {[
            { title: "Teacher Login", icon: User },
            { title: "Student Login", icon: Users },
            { title: "Admin Login", icon: Headphones },
          ].map((item) => (
            <div
              key={item.title}
              className="login-card"
            >
              <a href={`#${item.title.toLowerCase().replace(" ", "-")}`}>
                <div className="login-icon">
                  <item.icon className="icon" />
                </div>
                <span className="login-title">{item.title}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loginoption;
