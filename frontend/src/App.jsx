// src/App.jsx
import React from "react";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Teacher from "./components/Teacher/Teacher";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  return (
    <>
      <Header />
      <div>
        <Hero />
        <Login />
        <About />
        <Teacher />
      </div>
      <Footer />
    </>
  );
}

export default App;
