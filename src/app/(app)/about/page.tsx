"use client";
import React, { useEffect } from "react";
import AboutHero from "@/components/About/AboutHero";
import JoinUs from "@/components/About/JoinUs";
import Vision from "@/components/About/Vision";
import WhatweOffer from "@/components/About/WhatweOffer";
import WhoWeAre from "@/components/About/WhoWeAre";
import WhyUs from "@/components/About/WhyUs";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

function Page() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div>
      <Header />
      <AboutHero />
      <WhatweOffer />
      <WhoWeAre />
      <WhyUs />
      <Vision />
      <JoinUs />
      <Footer />
    </div>
  );
}

export default Page;
