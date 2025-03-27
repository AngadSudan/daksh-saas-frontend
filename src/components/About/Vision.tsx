import React from "react";
import {
  Rocket,
  BookOpen,
  Target,
  Shield,
  Users,
  Globe,
  Mail,
  MapPin,
  Check,
} from "lucide-react";
const Vision = () => {
  return (
    <div className="bg-[#1A0330] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Globe className="mx-auto text-[#5705BC] w-24 h-24 mb-8" />
        <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          We envision a world where learning is personalized, efficient, and
          accessible to all. Whether you're a student preparing for exams, a
          teacher organizing course materials, or an admin managing tasks—our
          AI-driven SaaS is designed to make your journey smoother.
        </p>
        <p className="text-2xl font-semibold text-[#5705BC]">
          We're not just building software; we're building the future of
          education.
        </p>
      </div>
    </div>
  );
};

export default Vision;
