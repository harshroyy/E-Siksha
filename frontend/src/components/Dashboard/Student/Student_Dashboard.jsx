import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Student_Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Using your existing API endpoint structure
        const response = await axios.get("http://localhost:5000/api/students/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStudent(response.data.student);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student information. Please try again.");
        setLoading(false);

        // Redirect to login if unauthorized
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      }
    };

    fetchStudentData();
  }, [navigate]);

  // Add this to your logout function in the dashboard:
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#3E3E51] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{student?.name}</p>
              <p className="text-sm opacity-75">Class {student?.class}-{student?.section}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white overflow-hidden">
              <img 
                src={student?.avatar} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "results" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "achievements" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "attendance" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("attendance")}
            >
              Attendance
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="p-6">
            {activeTab === "profile" && <ProfileTab student={student} />}
            {activeTab === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6">Academic Results</h3>
                
                {student?.results && student.results.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Subject</th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Marks</th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-600 border-b">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.results.map((result, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">{result.subject}</td>
                            <td className="py-3 px-4 border-b">{result.marks}</td>
                            <td className="py-3 px-4 border-b">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.grade === "A" ? "bg-green-100 text-green-800" :
                                result.grade === "B" ? "bg-blue-100 text-blue-800" :
                                result.grade === "C" ? "bg-yellow-100 text-yellow-800" :
                                result.grade === "D" ? "bg-orange-100 text-orange-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {result.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No results available yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "achievements" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6">Student Achievements</h3>
                
                {student?.achievements && student.achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.achievements.map((achievement, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800">{achievement.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mt-2">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No achievements recorded yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "attendance" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6">Attendance Record</h3>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-40 h-40 relative mb-4 md:mb-0 md:mr-8">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${
                            student?.attendance === "Above 75%" ? "text-green-500" : "text-red-500"
                          }`}
                          strokeWidth="10"
                          strokeDasharray={`${student?.attendance === "Above 75%" ? "85" : "65"}, 251.2`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-3xl font-bold">
                            {student?.attendance === "Above 75%" ? "85%" : "65%"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-lg font-medium mb-2">Current Term Attendance</h4>
                      <p className="text-gray-600 mb-4">Academic Year: {student?.academicYear}</p>
                      
                      <div className={`inline-block px-4 py-2 rounded-full font-medium ${
                        student?.attendance === "Above 75%" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {student?.attendance}
                      </div>
                      
                      {student?.attendance === "Below 75%" && (
                        <p className="mt-4 text-red-600">
                          Warning: Your attendance is below the minimum requirement of 75%.
                          Please improve your attendance to avoid academic penalties.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Profile Tab Component
const ProfileTab = ({ student }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-col md:flex-row gap-8">
      {/* Profile Image */}
      <div className="md:w-1/3 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-[#3E3E51] shadow-lg">
          <img 
            src={student?.avatar} 
            alt={student?.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center">{student?.name}</h2>
        <p className="text-gray-600 text-center">Admission #{student?.admissionNumber}</p>
        <p className="bg-[#3E3E51] text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
          Class {student?.class}-{student?.section}
        </p>
      </div>

      {/* Profile Details */}
      <div className="md:w-2/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#282834]">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Roll Number" value={student?.rollNumber} />
            <InfoItem label="Date of Birth" value={new Date(student?.dateOfBirth).toLocaleDateString()} />
            <InfoItem label="Gender" value={student?.gender} />
            <InfoItem label="Academic Year" value={student?.academicYear} />
            <InfoItem label="Date of Admission" value={new Date(student?.dateOfAdmission).toLocaleDateString()} />
            <InfoItem label="Religion" value={student?.religion} />
            <InfoItem label="Mobile Number" value={student?.mobileNumber} />
            <InfoItem label="Aadhar Number" value={student?.aadharCardNumber} />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4 text-[#282834]">Parents Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Father's Name" value={student?.fathersName} />
            <InfoItem label="Father's Number" value={student?.fathersNumber} />
            <InfoItem label="Mother's Name" value={student?.mothersName} />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4 text-[#282834]">Address</h3>
          <p className="text-gray-700">{student?.address}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Helper component for displaying info items
const InfoItem = ({ label, value }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-500 font-semibold">{label}</p>
    <p className="font-medium text-gray-800">{value || "Not provided"}</p>
  </div>
);

export default Student_Dashboard;