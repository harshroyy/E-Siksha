import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";

const teachers = [
  { name: "Mr. Rajesh Kumar", subject: "Mathematics", qualification: "M.Sc, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Ms. Ananya Sharma", subject: "Physics", qualification: "M.Sc, PhD", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Dr. Prakash Verma", subject: "Chemistry", qualification: "PhD in Chemistry", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Mrs. Sneha Iyer", subject: "Biology", qualification: "M.Sc, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Mr. Arvind Joshi", subject: "English", qualification: "MA, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Ms. Pooja Mehra", subject: "History", qualification: "MA, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Dr. Ramesh Singh", subject: "Economics", qualification: "PhD in Economics", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Mrs. Kavita Desai", subject: "Computer", qualification: "M.Tech", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Mr. Aditya Verma", subject: "Geography", qualification: "M.Sc, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
  { name: "Ms. Priya Nair", subject: "Civics", qualification: "MA, B.Ed", photo: "https://www.citypng.com/public/uploads/preview/school-teacher-vector-round-icon-png-701751694970269elfvf55jlg.png" },
];

const chunkSize = 3; // Number of teachers per slide
const teacherSlides = Array.from({ length: Math.ceil(teachers.length / chunkSize) }, (_, index) =>
  teachers.slice(index * chunkSize, index * chunkSize + chunkSize)
);

const Teacher = () => {
  return (
    <div
      className="w-full py-16"
      style={{
        backgroundColor: "#3E3E51", // Background color
      }}
    >
      <section className="text-center">
        <div className="container px-4 mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 "
          >
            <h2 className="text-4xl text-gray-100 mb-4">
              Meet Our Expert Teachers
            </h2>
            <p className="text-gray-300 italic max-w-3xl mx-auto">
              Our highly qualified and passionate educators are here to guide students toward academic excellence.
            </p>
          </motion.div>

          {/* Carousel Section */}
          <Carousel
            controls={true}
            indicators={true}
            interval={4000}
            className="max-w-7xl mx-auto"
            prevIcon={
              <span className="carousel-control-prev-icon text-3xl bg-[#3E3E51] text-white rounded-xl p-2 shadow-lg">
                <i className="fas fa-chevron-left"></i>
              </span>
            }
            nextIcon={
              <span className="carousel-control-next-icon text-3xl bg-[#3E3E51] text-white rounded-xl p-2 shadow-lg">
                <i className="fas fa-chevron-right"></i>
              </span>
            }
          >
            {teacherSlides.map((slide, index) => (
              <Carousel.Item key={index} className="pb-12">
                <div className="flex justify-center gap-8">
                  {slide.map((teacher, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl p-6 text-center shadow-md w-72 hover:shadow-lg transition-all duration-300 border border-blue-200"
                    >
                      {/* Teacher Image */}
                      <div className="relative mb-6">
                        <div className="w-36 h-36 mx-auto">
                          <img
                            src={teacher.photo}
                            alt={teacher.name}
                            className="w-full h-full rounded-full object-cover border-4 border-[#93C5FD]"
                          />
                        </div>

                        {/* Subject Tag */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                            {teacher.subject}
                          </span>
                        </div>
                      </div>

                      {/* Teacher Name and Qualification */}
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {teacher.qualification}
                      </p>

                      {/* Contact Icons */}
                      <div className="flex justify-center space-x-4">
                        <button className="text-[#2563EB] hover:text-[#1E40AF] transition-colors text-lg">
                          <i className="fas fa-envelope"></i>
                        </button>
                        <button className="text-[#2563EB] hover:text-[#1E40AF] transition-colors text-lg">
                          <i className="fas fa-phone"></i>
                        </button>
                      </div>
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