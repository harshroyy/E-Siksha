import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./Login/login";
import Home from "./Home";
import Class from "./components/Class/class"

function App() {
  const loginSectionRef = useRef(null); // ✅ Reference for login section

  // Function to scroll to login section
  const scrollToLogin = () => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      {/* ✅ Pass scrollToLogin function to Header */}
      <Header scrollToLogin={scrollToLogin} /> 

      <Routes>
        {/* ✅ Pass ref to Home so it can attach to Loginoption */}
        <Route path="/" element={<Home loginSectionRef={loginSectionRef} />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/class" element={<Class />} />
      </Routes>
    </Router>
  );
}

export default App;
