import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    admissionNumber: "",
    dateOfBirth: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      admissionNumber: "",
      dateOfBirth: "",
      username: "",
      password: "",
    });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      if (role === "student") {
        response = await axios.post("http://localhost:5000/api/students/login", {
          admissionNumber: formData.admissionNumber,
          dateOfBirth: formData.dateOfBirth,
        });
      } else {
        response = await axios.post(`http://localhost:5000/api/${role}s/login`, {
          username: formData.username,
          password: formData.password,
        });
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", role);
        navigate(`/${role}-dashboard`);
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("https://imgur.com/pdG9xB1.jpg")' }}
    >
      {/* Login form container */}
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-6">
          {["student", "teacher", "admin"].map((roleOption) => (
            <button
              key={roleOption}
              onClick={() => handleRoleChange(roleOption)}
              className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-all
              ${
                role === roleOption
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {role === "student" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admission Number
                </label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Extra Options */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <a href="/reset-password" className="text-blue-600 hover:underline">
              Reset here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;