"use client";
import React, { useState } from "react";
import { Rocket, Target, Play } from "lucide-react";

const AboutHero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-[#1A0330] to-[#480179] text-white py-16 px-4 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-[#5705BC] rounded-full animate-float"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Tag */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#5705BC]/20 px-4 py-2 rounded-full text-[#5705BC] text-sm flex items-center space-x-2 animate-pulse">
              <Rocket className="w-4 h-4" />
              <span>About Daksh</span>
            </div>
          </div>

          {/* Headline with Gradient Text */}
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5705BC] to-white leading-tight mb-6">
            Transforming Learning & Productivity with AI
          </h1>

          {/* Descriptive Paragraph */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Empowering students, teachers, and administrators with cutting-edge
            AI tools that simplify knowledge retention, task management, and
            academic collaboration.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="group flex items-center bg-[#5705BC] hover:bg-[#480179] text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              <span>Explore Platform</span>
              <Target className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center text-white border border-white/30 hover:bg-white/10 py-3 px-6 rounded-full transition duration-300 group"
            >
              <Play className="mr-2 w-5 h-5 text-[#5705BC] group-hover:scale-125 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Video Modal (Placeholder) */}
          {isVideoModalOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-white/10 rounded-2xl p-4 max-w-4xl w-full relative">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-[#5705BC] transition"
                >
                  Close
                </button>
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Video Placeholder</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Blurred Backgrounds */}
      <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -top-32 -left-32 blur-3xl opacity-20"></div>
      <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -bottom-32 -right-32 blur-3xl opacity-20"></div>
    </div>
  );
};

export default AboutHero;
