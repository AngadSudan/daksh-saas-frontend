import React from "react";
import { Calendar, FileText, Award } from "lucide-react";
const KeyFeatures = () => {
  const features = [
    {
      icon: <FileText className="text-[#5705BC] w-12 h-12" />,
      title: "AI-Powered Document Summarization",
      description:
        "Instantly generate concise yet rich summaries of long PDFs & PPTs",
    },
    {
      icon: <Award className="text-[#5705BC] w-12 h-12" />,
      title: "Smart Quiz & Exam Preparation",
      description:
        "AI-powered quiz generation with single and multiple-choice questions",
    },
    {
      icon: <Calendar className="text-[#5705BC] w-12 h-12" />,
      title: "Calendar & Notion Integration",
      description: "Automatic sync and task reminders for better planning",
    },
  ];

  return (
    <div className="bg-[#1A0330] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#480179] p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {feature.title}
              </h3>
              <p className="text-center text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default KeyFeatures;
