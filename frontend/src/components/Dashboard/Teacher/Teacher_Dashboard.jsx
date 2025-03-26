import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import DashboardHome from './DashboardHome';
import Students from './Students';
import Announcements from './Announcements';
import Settings from './Settings';

const Teacher_Dashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        // Use the full URL to match your login component
        const response = await axios.get("http://localhost:5000/api/teachers/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeacher(response.data.teacher);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teacher profile:', err);
        setError(err.response?.data?.message || 'Failed to fetch teacher profile');
        setLoading(false);
        
        // Add this to handle unauthorized errors
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          window.location.href = '/login';
        }
      }
    };
    
    fetchTeacherProfile();
  }, [token]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to login page
    window.location.href = '/login';
  };
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!teacher) return <Navigate to="/login" />;
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-5 border-b">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={teacher.avatar || '/default-avatar.png'} 
              alt="Teacher Avatar" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-center">{teacher.name}</h2>
          <p className="text-sm text-gray-500 text-center">{teacher.username}</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-6">
          <NavLink 
            to="/teacher/dashboard" 
            className={({ isActive }) => 
              `flex items-center p-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
            end
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/teacher/students" 
            className={({ isActive }) => 
              `flex items-center p-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Students
          </NavLink>
          
          <NavLink 
            to="/teacher/announcements" 
            className={({ isActive }) => 
              `flex items-center p-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
            </svg>
            Announcements
          </NavLink>
          
          <NavLink 
            to="/teacher/settings" 
            className={({ isActive }) => 
              `flex items-center p-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Settings
          </NavLink>
          
          <button 
            onClick={handleLogout}
            className="flex items-center p-4 w-full text-left text-gray-700 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<DashboardHome teacher={teacher} />} />
          <Route path="students/*" element={<Students />} />
          <Route path="announcements/*" element={<Announcements />} />
          <Route path="settings" element={<Settings teacher={teacher} />} />
          <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Teacher_Dashboard;