import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Get role from URL
import "./Login.css";
import Header from "../components/Header/Header";
import Footer from "../components/Foot/Footer";

const Login = () => {
  const { role } = useParams(); // ✅ Get role from URL
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(`Logging in as ${role} with ID: ${userId} and Password: ${password}`);
  
    if (role === "teacher" && userId === "teacher123" && password === "password123") {
      console.log("✅ Credentials matched! Navigating to /class");
      navigate("/class"); // ✅ Redirect if credentials match
    } else {
      console.log("❌ Invalid credentials");
      alert("Invalid credentials. Please try again.");
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>{role} Login</h2>

        <form>
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
              placeholder="Enter your Password"
              required
            />
          </div>

          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
