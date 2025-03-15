import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Teacher from "./components/Teacher/Teacher";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StudentDashboard from "./components/Dashboard/Student/Student_Dashboard";
import TeacherDashboard from "./components/Dashboard/Teacher/Teacher_Dashboard";
import AdminDashboard from "./components/Dashboard/Admin/Admin_Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <About />
              <Teacher />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;