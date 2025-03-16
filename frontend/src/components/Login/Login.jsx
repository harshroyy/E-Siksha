import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    setFormData({ admissionNumber: "", dateOfBirth: "", username: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = role === "student" 
        ? "http://localhost:5000/api/students/login"
        : `http://localhost:5000/api/${role}s/login`;

      const requestData = role === "student"
        ? { admissionNumber: formData.admissionNumber, dateOfBirth: formData.dateOfBirth }
        : { username: formData.username, password: formData.password };

      const response = await axios.post(endpoint, requestData);
      
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
    <div className="h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#3E3E51' }}>
      {/* Login Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Role Selection */}
        <div className="flex justify-center space-x-3 mb-6">
          {["student", "teacher", "admin"].map((roleOption) => (
            <button
              key={roleOption}
              onClick={() => handleRoleChange(roleOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${role === roleOption ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
            >
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "student" ? (
            <>
              <InputField label="Admission Number" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </>
          ) : (
            <>
              <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
              <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            </>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="w-full py-3 px-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password? <a href="/reset-password" className="text-blue-600 hover:underline">Reset here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Field Component */
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default Login;