import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // React Icons
import "./Teachers.css";

const teachers = [
  { name: "Mr. Rajesh Kumar", subject: "Mathematics", qualification: "M.Sc, B.Ed", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Ms. Ananya Sharma", subject: "Physics", qualification: "M.Sc, PhD", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Dr. Prakash Verma", subject: "Chemistry", qualification: "PhD in Chemistry", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Mrs. Sneha Iyer", subject: "Biology", qualification: "M.Sc, B.Ed", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Mr. Arvind Joshi", subject: "English", qualification: "MA, B.Ed", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Ms. Pooja Mehra", subject: "History", qualification: "MA, B.Ed", photo: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Dr. Ramesh Singh", subject: "Economics", qualification: "PhD in Economics", photo: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "Mrs. Kavita Desai", subject: "Computer Science", qualification: "M.Tech", photo: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Mr. Aditya Verma", subject: "Geography", qualification: "M.Sc, B.Ed", photo: "https://randomuser.me/api/portraits/men/9.jpg" },
  { name: "Ms. Priya Nair", subject: "Political Science", qualification: "MA, B.Ed", photo: "https://randomuser.me/api/portraits/women/10.jpg" }
];

const chunkSize = 5;
const slides = Array.from({ length: Math.ceil(teachers.length / chunkSize) }, (_, index) =>
  teachers.slice(index * chunkSize, index * chunkSize + chunkSize)
);

const Teacher = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="teacher-section">
      <h2 className="teachers-title">Our Teachers</h2>
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>
          <AiOutlineLeft />
        </button>
        <div className="teacher-slide">
          {slides[currentIndex].map((teacher, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="teacher-card"
            >
              <img src={teacher.photo} alt={teacher.name} className="teacher-photo" />
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject">{teacher.subject}</p>
              <p className="teacher-qualification">{teacher.qualification}</p>
            </motion.div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={nextSlide}>
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default Teacher;
