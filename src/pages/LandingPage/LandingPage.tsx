import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Features from "../../components/Features/Features";

const LandingPage: React.FC = () => {
  // console.log("======== LANDING PAGE ========");

  return (
    <div
      style={{
        paddingRight: "4rem",
        paddingLeft: "4rem",
        backgroundColor: "#F6F3F9",
      }}
    >
      <Navbar />
      <HeroSection />
      <Features />
    </div>
  );
};

export default LandingPage;
