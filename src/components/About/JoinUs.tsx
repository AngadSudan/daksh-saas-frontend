import React from "react";
import { Rocket, BookOpen, Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";

const JoinUs = () => {
  const features = [
    {
      icon: <Rocket className="w-9 h-9 text-white flex-shrink-0" />,
      title: "AI-powered Learning",
      description:
        "Generate quizzes, exams, and study notes with advanced AI tools.",
    },
    {
      icon: <BookOpen className="w-9 h-9 text-white flex-shrink-0" />,
      title: "Seamless Integration",
      description:
        "Sync with Notion, Google Calendar, and your favorite tools.",
    },
    {
      icon: <Target className="w-9 h-9 text-white flex-shrink-0" />,
      title: "Content Summarization",
      description: "Quickly digest PPTs & PDFs with AI-powered summarization.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">
            Join Our Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A0330] mt-4 mb-6">
            Supercharge Your <span className="text-[#5705BC]">Learning</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamlessly integrate AI-driven tools designed for students,
            teachers, and administrators in one unified platform.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Content */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-purple-100 p-5 rounded-2xl hover:shadow-lg transition duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-purple-600 to-[#5705BC] p-3 rounded-xl shadow-md">
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <span className="text-lg font-semibold text-[#480179] block">
                        {feature.title}
                      </span>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-[#5705BC] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition duration-300 flex items-center justify-center">
                Get Started For Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button className="border-2 border-[#5705BC] text-[#5705BC] px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
              <div className="bg-gradient-to-br from-[#480179]/10 to-[#5705BC]/10 rounded-2xl p-8">
                <Image
                  src={logo}
                  alt="Daksh Platform"
                  className="w-full h-auto object-contain transform hover:scale-105 transition duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
