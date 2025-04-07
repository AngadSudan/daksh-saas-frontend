import React from "react";
import { BookOpen, Target, Shield, Users } from "lucide-react";

const WhatweOffer = () => {
  const offerings = [
    {
      icon: <BookOpen className="text-[#5705BC] w-12 h-12" />,
      title: "AI-Powered Learning",
      description: "Generate instant summaries & quizzes from PDFs & PPTs",
    },
    {
      icon: <Target className="text-[#5705BC] w-12 h-12" />,
      title: "Seamless Productivity",
      description: "Sync Notion & Google Calendar for effortless organization",
    },
    {
      icon: <Shield className="text-[#5705BC] w-12 h-12" />,
      title: "Smart Task Management",
      description: "Plan, pin, and prioritize assignments with ease",
    },
    {
      icon: <Users className="text-[#5705BC] w-12 h-12" />,
      title: "Secure Access",
      description: "Personalized dashboards for admins, teachers, and students",
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#1A0330] mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offer, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{offer.icon}</div>
              <h3 className="text-xl font-semibold text-[#480179] mb-3">
                {offer.title}
              </h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatweOffer;
