import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Students = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/view/:id" element={<StudentDetail />} />
        <Route path="*" element={<Navigate to="/teacher/students" replace />} />
      </Routes>
    </div>
  );
};

// Add Student Component
const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    aadharCardNumber: '',
    religion: '',
    fathersName: '',
    fathersNumber: '',
    mothersName: '',
    gender: '',
    class: '',
    section: '',
    rollNumber: '',
    address: '',
    academicYear: '',
    dateOfAdmission: '',
    mobileNumber: '',
    attendance: '',
    dateOfBirth: ''
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
      const response = await axios.post('/api/teachers/students', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Student created:', response.data);
      navigate('/teacher/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card Number</label>
            <input 
              type="text" 
              name="aadharCardNumber" 
              value={formData.aadharCardNumber} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
            <input 
              type="text" 
              name="religion" 
              value={formData.religion} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
            <input 
              type="text" 
              name="fathersName" 
              value={formData.fathersName} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Father's Number</label>
            <input 
              type="text" 
              name="fathersNumber" 
              value={formData.fathersNumber} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
            <input 
              type="text" 
              name="mothersName" 
              value={formData.mothersName} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <input 
              type="text" 
              name="class" 
              value={formData.class} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <input 
              type="text" 
              name="section" 
              value={formData.section} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input 
              type="text" 
              name="rollNumber" 
              value={formData.rollNumber} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <input 
              type="text" 
              name="academicYear" 
              value={formData.academicYear} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Admission</label>
            <input 
              type="date" 
              name="dateOfAdmission" 
              value={formData.dateOfAdmission} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input 
              type="text" 
              name="mobileNumber" 
              value={formData.mobileNumber} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (in %)</label>
            <input 
              type="number" 
              name="attendance" 
              value={formData.attendance} 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/teacher/students')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Student List Component
const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ class: '', section: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/teachers/students', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data.students);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch students');
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [token]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  const filteredStudents = students.filter((student) => {
    return (
      (filters.class === '' || student.class === filters.class) &&
      (filters.section === '' || student.section === filters.section)
    );
  });
  
  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/teachers/students/${studentToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove the student from the state
      setStudents(students.filter((s) => s._id !== studentToDelete._id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
    }
  };
  
  // Get unique classes and sections for filters
  const classes = [...new Set(students.map((student) => student.class))];
  const sections = [...new Set(students.map((student) => student.section))];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student List</h2>
        <button
          onClick={() => navigate('/teacher/students/add')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Student
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select
            name="section"
            value={filters.section}
            onChange={handleFilterChange}
            className="p-2 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="">All Sections</option>
            {sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredStudents.length === 0 ? (
        <p>No students found with the selected filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Admission No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Class</th>
                <th className="py-2 px-4 text-left">Section</th>
                <th className="py-2 px-4 text-left">Mobile</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{student.admissionNumber}</td>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.class}</td>
                  <td className="py-2 px-4">{student.section}</td>
                  <td className="py-2 px-4">{student.mobileNumber}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/teacher/students/view/${student._id}`)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => confirmDelete(student)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
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

// Student Detail Component
const StudentDetail = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  
  const token = localStorage.getItem('token');
  const { id } = useParams();
  
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`/api/teachers/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(response.data.student);
        setFormData(response.data.student);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch student details');
        setLoading(false);
      }
    };
    
    fetchStudentDetails();
  }, [id, token]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.put(`/api/teachers/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStudent(response.data.student);
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
      setLoading(false);
    }
  };
  
  if (loading) return <p>Loading student details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!student) return <p>Student not found</p>;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student Details</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/teacher/students')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Back to List
          </button>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Details
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth ? formData.dateOfBirth.substring(0, 10) : ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <input 
                type="text" 
                name="class" 
                value={formData.class} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <input 
                type="text" 
                name="section" 
                value={formData.section} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input 
                type="text" 
                name="rollNumber" 
                value={formData.rollNumber} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (in %)</label>
              <input 
                type="number" 
                name="attendance" 
                value={formData.attendance} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="text" 
                name="mobileNumber" 
                value={formData.mobileNumber} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Admission Number</p>
                <p className="font-medium">{student.admissionNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{student.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Religion</p>
                <p className="font-medium">{student.religion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhar Card Number</p>
                <p className="font-medium">{student.aadharCardNumber}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Academic Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-medium">{student.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Section</p>
                <p className="font-medium">{student.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-medium">{student.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Academic Year</p>
                <p className="font-medium">{student.academicYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Admission</p>
                <p className="font-medium">{new Date(student.dateOfAdmission).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="font-medium">{student.attendance}%</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Father's Name</p>
                <p className="font-medium">{student.fathersName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Father's Number</p>
                <p className="font-medium">{student.fathersNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mother's Name</p>
                <p className="font-medium">{student.mothersName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{student.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{student.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;