import React from "react";
import { Calendar, FileText, BookOpen, Users } from "lucide-react";
const WhyUs = () => {
  const features = [
    {
      icon: <BookOpen className="text-[#5705BC] w-12 h-12" />,
      title: "Smarter Learning with AI",
      description: "Generate real-time quizzes & notes from PDFs & PPTs",
    },
    {
      icon: <Calendar className="text-[#5705BC] w-12 h-12" />,
      title: "Seamless Calendar Sync",
      description: "Never miss a deadline with integrated calendars",
    },
    {
      icon: <FileText className="text-[#5705BC] w-12 h-12" />,
      title: "Effortless Document Management",
      description: "Store, retrieve, and summarize large files instantly",
    },
    {
      icon: <Users className="text-[#5705BC] w-12 h-12" />,
      title: "Role-Based Access",
      description: "Secure permissions for teachers, students, and admins",
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1A0330] mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-4 text-xl font-semibold text-[#480179]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
