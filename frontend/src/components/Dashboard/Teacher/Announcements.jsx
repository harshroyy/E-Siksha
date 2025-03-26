import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const Announcements = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>
      
      <Routes>
        <Route path="/" element={<AnnouncementList />} />
        <Route path="/create" element={<CreateAnnouncement />} />
        <Route path="*" element={<Navigate to="/teacher/announcements" replace />} />
      </Routes>
    </div>
  );
};

// Create Announcement Component
const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/announcements', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Announcement created:', response.data);
      navigate('/teacher/announcements');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="6"
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/teacher/announcements')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Announcement List Component
const AnnouncementList = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/api/announcements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnnouncements(response.data.announcements);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch announcements');
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, [token]);
  
  const confirmDelete = (announcement) => {
    setAnnouncementToDelete(announcement);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/announcements/${announcementToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove the announcement from the state
      setAnnouncements(announcements.filter((a) => a._id !== announcementToDelete._id));
      setShowDeleteConfirm(false);
      setAnnouncementToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete announcement');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Announcements</h2>
        <button
          onClick={() => navigate('/teacher/announcements/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Announcement
        </button>
      </div>
      
      {loading ? (
        <p>Loading announcements...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{announcement.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => confirmDelete(announcement)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{announcement.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this announcement? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;