import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import Class from "../Class/class";

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get("role") || "";

  const [role, setRole] = useState(initialRole);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (role.trim() && userId.trim() && password === "admin123") {
      if (role.toLowerCase() === "teacher") {
        navigate(`/class?user=${userId}`); // Navigate to Class if teacher
      } else {
        navigate(`/dashboard?role=${role}&user=${userId}`); // Other roles go to dashboard
      }
    } else {
      alert("Invalid credentials! Please check your inputs.");
    }
  };

  return (
    <div className="login-container" id="loginsection">
      <h2>Login Page - {role}</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
