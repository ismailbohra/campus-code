import React from "react";

import AboutSection from "../../component/AboutSection";
import TestimonialsSection from "../../component/Clients";
import Footer from "../../component/footer";
import Navbar from "../../component/header";
import HeroSection from "../../component/HeroSection";
import ProjectSection from "../../component/ProjectSection";
import WhyChooseUs from "../../component/whyChooseus";
import Realtor from "../../component/Realtor";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Realtor/>
      <WhyChooseUs/>
      <ProjectSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}

export default LandingPage;
