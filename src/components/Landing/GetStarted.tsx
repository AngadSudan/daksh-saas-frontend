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
const GetStarted = () => {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account",
      icon: <Users className="text-white w-12 h-12" />,
    },
    {
      number: "2",
      title: "Sync & Upload",
      description: "Connect Notion, Google Calendar & upload materials",
      icon: <Calendar className="text-white w-12 h-12" />,
    },
    {
      number: "3",
      title: "Let AI Work",
      description: "Generate summaries, quizzes, and manage tasks",
      icon: <Rocket className="text-white w-12 h-12" />,
    },
  ];

  return (
    <div className="bg-[#5705BC] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Get Started in 3 Easy Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#480179] p-6 rounded-lg shadow-lg">
              <div className="text-6xl font-bold mb-4 text-gray-300">
                {step.number}
              </div>
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
        <button className="mt-12 bg-white text-[#5705BC] hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition duration-300">
          Start Your Free Trial Now
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
