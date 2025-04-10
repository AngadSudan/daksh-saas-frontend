import React from "react";
import { Rocket, BookOpen, Target } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";
const JoinUs = () => {
  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      text: "AI-powered Quiz & Exam Note Generation",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      text: "Seamless Notion & Google Calendar Sync",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      text: "PPT & PDF Summarization",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-gradient-to-br from-[#480179]/80 to-[#5705BC]/90 rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:flex items-center">
          {/* Left Side - Content */}
          <div className="md:w-2/3 p-12 space-y-6">
            <div className="text-sm text-purple-300 uppercase tracking-wide">
              AI-Powered Learning Platform
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Supercharge Your Learning & Productivity
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Seamlessly integrate Notion, Google Calendar, AI-driven quiz
              generation, and more—all in one platform designed for students,
              teachers, and administrators.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-white opacity-90 hover:opacity-100 transition-all"
                >
                  {feature.icon}
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 pt-8">
              <button
                onClick={() => (window.location.href = "/register")}
                className="bg-white text-[#5705BC] px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300"
              >
                Get Started for Free
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Rocket Icon */}
          <div className="md:w-1/3 flex justify-center p-12">
            <Image
              src={logo}
              alt="daksh-logo"
              className="w-[415px] h-[415px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
