import React from "react";

// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Logo from "../components/Logo";
import RaceDescription from "../components/RaceDescription";
import RaceOptions from "../components/RaceOptions";
import RaceLegs from "../components/RaceLegs";
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";



function Home() {
  return (
    <div>
      <Hero />
      <Logo />
      <RaceDescription />
      <RaceOptions />
      <RaceLegs />
      <Footer />   
    </div>
    
    
  );
}

export default Home;