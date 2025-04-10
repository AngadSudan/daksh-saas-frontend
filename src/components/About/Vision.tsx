import React from "react";
import { Globe } from "lucide-react";
const Vision = () => {
  return (
    <div className=" py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Globe className="mx-auto  w-24 h-24 mb-8" />
        <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
          We envision a world where learning is personalized, efficient, and
          accessible to all. Whether you&apos;re a student preparing for exams,
          a teacher organizing course materials, or an admin managing tasks—our
          AI-driven SaaS is designed to make your journey smoother.
        </p>
        <p className="text-2xl font-semibold text-[#5705BC]">
          We&apos;re not just building software <br /> we&apos;re building the
          future of education.
        </p>
      </div>
    </div>
  );
};

export default Vision;
