import React from "react";
import {
  Calendar,
  FileText,
  CheckCircle,
  Rocket,
  BookOpen,
  Users,
  Award,
  Star,
} from "lucide-react";

const LandingHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#1A0330] to-[#480179] text-white py-16 px-4 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -top-32 -left-32 blur-3xl"></div>
        <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -bottom-32 -right-32 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
        {/* Left Content Section */}
        <div className="md:w-1/2 space-y-6 md:pr-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-[#5705BC]/20 text-[#5705BC] rounded-full text-sm">
                New
              </span>
              <span className="text-gray-300">
                AI-Powered Learning Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Supercharge Your Learning & Productivity
            </h1>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed">
            Seamlessly integrate Notion, Google Calendar, AI-driven quiz
            generation, and more—all in one platform designed for students,
            teachers, and administrators.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: <CheckCircle className="text-[#5705BC] w-6 h-6" />,
                text: "AI-powered Quiz & Exam Note Generation",
              },
              {
                icon: <Calendar className="text-[#5705BC] w-6 h-6" />,
                text: "Seamless Notion & Google Calendar Sync",
              },
              {
                icon: <FileText className="text-[#5705BC] w-6 h-6" />,
                text: "PPT & PDF Summarization",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 group hover:bg-[#5705BC]/10 p-2 rounded-lg transition-all duration-300"
              >
                {feature.icon}
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-[#5705BC] hover:bg-[#480179] text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Get Started for Free
            </button>
            <button className="text-white border border-white/30 hover:bg-white/10 py-3 px-6 rounded-full transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Visual Section */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="bg-[#480179] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5705BC]/30 rounded-full blur-2xl"></div>
            <Rocket className="mx-auto text-white w-48 h-48 relative z-10 animate-bounce-slow" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#5705BC]/30 rounded-full blur-2xl"></div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#5705BC]/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-[#5705BC]/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
