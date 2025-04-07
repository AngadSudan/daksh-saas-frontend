import React from "react";
import { Users, Star } from "lucide-react";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya",
      role: "Student",
      quote:
        "This SaaS has completely transformed how I manage my study materials and tasks! The AI-powered quiz generation is a game-changer.",
      icon: <Star className="text-[#5705BC] w-8 h-8" />,
    },
    {
      name: "Mr. Sharma",
      role: "Educator",
      quote:
        "As a teacher, managing notes, quizzes, and assignments has never been easier. The seamless Notion & Google Calendar integration is amazing!",
      icon: <Users className="text-[#5705BC] w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1A0330] mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">{testimonial.icon}</div>
              <p className="italic text-gray-600 mb-4">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="font-semibold text-[#480179]">
                {testimonial.name} - {testimonial.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
