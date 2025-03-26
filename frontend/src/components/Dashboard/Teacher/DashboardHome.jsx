import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardHome = ({ teacher }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    announcements: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/teachers/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, []);
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard data...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {teacher?.name}!</h2>
        <p className="text-gray-600">Here's what's happening in your classroom today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents}</p>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Announcements</h3>
          <p className="text-3xl font-bold">{stats.announcements}</p>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Today's Date</h3>
          <p className="text-xl font-bold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/teacher/students/add" 
            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center"
          >
            <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Add New Student</h3>
              <p className="text-sm text-gray-600">Register a new student to your class</p>
            </div>
          </a>
          
          <a 
            href="/teacher/announcements/create" 
            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center"
          >
            <div className="bg-green-500 text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Create Announcement</h3>
              <p className="text-sm text-gray-600">Post a new announcement</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;