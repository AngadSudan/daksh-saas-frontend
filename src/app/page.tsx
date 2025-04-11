"use client";
import React, { useEffect } from "react";
import LandingHero from "@/components/Landing/LandingHero";
import KeyFeatures from "@/components/Landing/KeyFeatures";
import Testimonials from "@/components/Landing/Testimonials";
import GetStarted from "@/components/Landing/GetStarted";
// import WhyUs from "@/components/Landing/WhyUs";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import Faqs from "@/components/Landing/Faqs";
export default function Home() {
  const faqs = [
    {
      question: "What makes Daksh different?",
      answer:
        "Daksh is an AI-powered study assistant that helps students and educators organize, summarize, and generate quizzes from learning materials in seconds.",
    },
    {
      question: "Is Daksh secure?",
      answer:
        "Yes! Daksh prioritizes security with encrypted data storage and strict privacy policies to ensure your study materials remain protected.",
    },
    {
      question: "Can I track my study progress in real-time?",
      answer:
        "Absolutely! Daksh provides real-time insights, analytics, and progress tracking to help you stay on top of your learning goals.",
    },
    {
      question: "Does Daksh offer AI-powered document summarization?",
      answer:
        "Yes! Daksh uses AI to summarize PDFs and PPTX files instantly, helping you extract key insights without spending hours reading.",
    },
    {
      question: "Can I collaborate with my classmates or teachers on Daksh?",
      answer:
        "Yes, Daksh allows seamless collaboration where students and educators can share notes, quizzes, and study materials within a structured environment.",
    },
    {
      question: "Does Daksh integrate with Notion and Google Calendar?",
      answer:
        "Yes, Daksh integrates with Notion and Google Calendar to keep your tasks, notes, and study plans synchronized for better organization.",
    },
    {
      question: "Are files other than PDF and PPTX supported?",
      answer:
        "No, Daksh currently supports only PDF and PPTX files. Older .PPT files and other formats are not supported.",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <>
      <Header />
      <LandingHero />
      <GetStarted />
      <KeyFeatures />
      {/* <WhyUs /> */}
      <Testimonials />
      <Faqs faqs={faqs} />
      <Footer />
    </>
  );
}
