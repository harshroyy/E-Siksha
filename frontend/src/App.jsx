import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!token || (allowedRole && role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('-dashboard');
  
  // Don't render Header/Footer for dashboard pages
  if (isDashboard) {
    return children;
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Layout>
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
        
        {/* Protected routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;