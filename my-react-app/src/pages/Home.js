import React from "react";

// import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RaceDescription from "../components/RaceDescription";
import RaceOptions from "../components/RaceOptions";
import RaceLegs from "../components/RaceLegs";
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";



function Home() {
  return (
    <div>
      <Hero />
      <RaceDescription />
      <RaceOptions />
      <RaceLegs />
      <Sponsors /> 
      <Footer />   
    </div>
    
    
  );
}

export default Home;