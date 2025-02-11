import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./class.css";

const classData = {
  1: [
    { name: "Aarav", roll: 1, attendance: true, class: 1, score: 85, profilePic: "" },
    { name: "Siya", roll: 2, attendance: true, class: 1, score: 90, profilePic: "" },
  ],
  2: [
    { name: "Kabir", roll: 1, attendance: false, class: 2, score: 70, profilePic: "" },
    { name: "Ishita", roll: 2, attendance: true, class: 2, score: 92, profilePic: "" },
  ],
};

const ClassDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [data, setData] = useState(classData);
  const navigate = useNavigate();

  const toggleAttendance = (classNum, roll) => {
    setData((prevData) => ({
      ...prevData,
      [classNum]: prevData[classNum].map((student) =>
        student.roll === roll ? { ...student, attendance: !student.attendance } : student
      ),
    }));
  };

  return (
    <div className="container">
      <motion.nav className="navbar" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        {[...Array(12).keys()].map((i) => (
          <button key={i + 1} className={`nav-button ${selectedClass === i + 1 ? "active" : ""}`} onClick={() => setSelectedClass(i + 1)}>
            Class {i + 1}
          </button>
        ))}
      </motion.nav>

      {selectedClass && (
        <motion.div className="table-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2>Student List for Class {selectedClass}</h2>
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Attendance</th>
                <th>Class</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data[selectedClass]?.map((student) => (
                <tr key={student.roll}>
                  <td className="profile-pic">
                    {student.profilePic ? (
                      <img src={student.profilePic} alt="Profile" className="profile-img" />
                    ) : (
                      <FaUserCircle className="default-icon" />
                    )}
                  </td>
                  <td className="clickable" onClick={() => navigate(`/studentprofile/${student.roll}`)}>{student.name}</td>
                  <td>{student.roll}</td>
                  <td className="clickable" onClick={() => toggleAttendance(selectedClass, student.roll)}>
                    {student.attendance ? "✅" : "❌"}
                  </td>
                  <td>{student.class}</td>
                  <td className="clickable"><a href={`/score/${student.roll}`}>{student.score}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ClassDashboard;