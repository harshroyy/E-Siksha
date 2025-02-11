import React from "react";
import Hero from "./components/Hero/hero";
import About from "./components/About/AboutUs.jsx"
import Loginopt from "./components/Login-opt/Loginoption"
import Teacher from "./components/Teach/Teacher";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Foot/Footer";
function Home({ loginSectionRef }) {
  return (
    
    <>
    <Header/>
    <Hero/>
    <Teacher/>
    <Loginopt ref={loginSectionRef} />
    <About/>
    <Footer/>
     </> 

  );
}

export default Home;
