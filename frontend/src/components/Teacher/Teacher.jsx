import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Teacher.css";

const teachers = [
  { name: "Mr. Rajesh Kumar", subject: "Mathematics", qualification: "M.Sc, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Ms. Ananya Sharma", subject: "Physics", qualification: "M.Sc, PhD", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Dr. Prakash Verma", subject: "Chemistry", qualification: "PhD in Chemistry", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Mrs. Sneha Iyer", subject: "Biology", qualification: "M.Sc, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Mr. Arvind Joshi", subject: "English", qualification: "MA, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Ms. Pooja Mehra", subject: "History", qualification: "MA, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Dr. Ramesh Singh", subject: "Economics", qualification: "PhD in Economics", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Mrs. Kavita Desai", subject: "Computer Science", qualification: "M.Tech", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Mr. Aditya Verma", subject: "Geography", qualification: "M.Sc, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
  { name: "Ms. Priya Nair", subject: "Political Science", qualification: "MA, B.Ed", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg" },
];

const chunkSize = 4; // Number of teachers per slide
const teacherSlides = Array.from({ length: Math.ceil(teachers.length / chunkSize) }, (_, index) =>
  teachers.slice(index * chunkSize, index * chunkSize + chunkSize)
);

const Teacher = () => {
  return (
    <div className="teachersection">
      <section className="teachers">
      <div className="container px-4 mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="teachers-title">
          Our Teachers
        </motion.h2>
        <Carousel controls={true} indicators={true} interval={3000} className="teacher-carousel">
          {teacherSlides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="teacher-slide">
                {slide.map((teacher, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
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
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
    </div>
  );
};

export default Teacher;
