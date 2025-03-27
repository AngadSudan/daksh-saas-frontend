import React from "react";
import {
  Rocket,
  BookOpen,
  Target,
  Shield,
  Users,
  Globe,
  Mail,
  MapPin,
  Check,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#1A0330] flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-gradient-to-br from-[#480179] to-[#5705BC] rounded-3xl overflow-hidden shadow-2xl">
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
              <button className="bg-white text-[#5705BC] px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300">
                Get Started for Free
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Rocket Icon */}
          <div className="md:w-1/3 flex justify-center p-12">
            <div className="bg-white/10 rounded-full p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                className="w-48 h-48"
              >
                <path d="M4.5 16.5c-1.5 1.16-2 5-2 5 4.5 0 6.5-1.5 7.5-3l-5.5-2z" />
                <path d="M8.44 7.25c1.11-2.54 4.11-3.25 5.56-3.25 2 0 3.38 1.78 3 3.75-.19 1.42-1.39 2.25-3 2.25s-4 0-4 3 2 3 2 3 1-1.5 2.5-1.5c1.88 0 3.5 1.5 3.5 4.25 0 2.5-2 3.75-4 3.75-3 0-4.5-3-4.5-5.5 0-3.5 2.5-5.5 2.5-5.5L10 7.5l-1.5.25L8.44 7.25z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
