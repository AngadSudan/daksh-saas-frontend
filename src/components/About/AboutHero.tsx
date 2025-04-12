"use client";
import React, { useState } from "react";
import { Rocket, Target, Play, X } from "lucide-react";
const AboutHero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative bg-white text-gray-800 mt-12 py-16 px-4 overflow-hidden">
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
            <div className="bg-[#5705BC]/10 px-4 py-2 rounded-full text-[#5705BC] text-sm flex items-center space-x-2 animate-pulse">
              <Rocket className="w-4 h-4" />
              <span>About Daksh</span>
            </div>
          </div>

          {/* Headline with Gradient Text */}
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A0330] via-[#5705BC] to-[#480179] leading-tight mb-6">
            Transforming Learning & Productivity with AI
          </h1>

          {/* Descriptive Paragraph */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Empowering students, teachers, and administrators with cutting-edge
            AI tools that simplify knowledge retention, task management, and
            academic collaboration.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => (window.location.href = "/login")}
              className="group flex items-center bg-[#5705BC] hover:bg-[#480179] text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>Explore Platform</span>
              <Target className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center text-[#5705BC] border border-[#5705BC]/30 hover:bg-[#5705BC]/10 py-3 px-6 rounded-full transition duration-300 group"
            >
              <Play className="mr-2 w-5 h-5 text-[#5705BC] group-hover:scale-125 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Video Modal (Placeholder) */}
          {isVideoModalOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-4 max-w-4xl w-full relative shadow-xl">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-800 hover:text-[#5705BC] transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="aspect-video bg-gray-100 flex items-center justify-center border border-gray-200">
                  <video
                    src="https://res.cloudinary.com/djy3ewpb8/video/upload/v1744395865/demo_yy5ysg.mp4"
                    className="w-[90%] h-[90%] m-auto"
                    controls
                    onLoadedMetadata={(e) => {
                      const videoElement = e.currentTarget;
                      videoElement.playbackRate = 1.5;
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Blurred Backgrounds */}
      <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -top-32 -left-32 blur-3xl opacity-10"></div>
      <div className="absolute w-64 h-64 bg-[#5705BC] rounded-full -bottom-32 -right-32 blur-3xl opacity-10"></div>
    </div>
  );
};

export default AboutHero;
