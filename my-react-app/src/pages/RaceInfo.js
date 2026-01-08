import React from "react";
import RaceLegs from "../components/RaceLegs";
import Footer from "../components/Footer";


export default function RaceInfo() {
  return (
    <div style={{ padding: "2rem"}}>
      <h1 style={{ textAlign: "center"}} >Race Information</h1>
      <RaceLegs />
      <Footer />
    </div>
  );
}
