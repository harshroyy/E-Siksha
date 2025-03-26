import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = ({ teacher }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  
  const token = localStorage.getItem('token');
  
  // Initialize form with teacher data
  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        email: teacher.email || '',
        username: teacher.username || '',
        phone: teacher.phone || '',
        bio: teacher.bio || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setAvatarPreview(teacher.avatar || '');
    }
  }, [teacher]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const validatePasswordFields = () => {
    // If the user is trying to change their password
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password');
        return false;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return false;
      }
      
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status messages
    setError(null);
    setSuccess(null);
    
    // Validate password fields if being updated
    if (!validatePasswordFields()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Create FormData object if avatar is being updated
      let data;
      
      if (avatarFile) {
        data = new FormData();
        data.append('avatar', avatarFile);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('phone', formData.phone);
        data.append('bio', formData.bio);
        
        if (formData.currentPassword) {
          data.append('currentPassword', formData.currentPassword);
          data.append('newPassword', formData.newPassword);
        }
      } else {
        // If no avatar update, send JSON data
        data = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          bio: formData.bio
        };
        
        // Only include password fields if the user is updating their password
        if (formData.currentPassword) {
          data.currentPassword = formData.currentPassword;
          data.newPassword = formData.newPassword;
        }
      }
      
      // Set the appropriate headers based on data type
      const headers = { 
        Authorization: `Bearer ${token}`,
        ...(avatarFile ? {} : { 'Content-Type': 'application/json' })
      };
      
      const response = await axios.put(
        '/api/teachers/profile',
        data,
        { headers }
      );
      
      setSuccess('Profile updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Reload teacher data after 1.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
            
            {/* Avatar Upload */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Profile Picture</label>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={avatarPreview || '/default-avatar.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer block"
                  >
                    Change Picture
                  </label>
                </div>
              </div>
            </div>
            
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            {/* Bio */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                className="border rounded w-full py-2 px-3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell students about yourself..."
              ></textarea>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <p className="text-gray-500 mb-4">Leave blank if you don't want to change your password</p>
            
            {/* Current Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="border rounded w-full py-2 px-3"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>
            
            {/* New Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="border rounded w-full py-2 px-3"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            
            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border rounded w-full py-2 px-3"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;