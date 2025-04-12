import React from "react";
import { Globe, Star, Lightbulb, GraduationCap } from "lucide-react";

const Vision = () => {
  return (
    <div className="py-24 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-200 h-200 bg-purple-800/40 blur-[260px] rounded-full opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-200 h-200 bg-purple-800/40 blur-[260px] rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>
      {/* <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-60"></div> */}
      {/* <div className="absolute bottom-1/3 left-1/4 w-12 h-12  rounded-full opacity-30"></div> */}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <Globe
          className="w-14 h-14 mx-auto my-4 text-violet-500"
          strokeWidth={2.5}
        />

        <div className="space-y-6 bg-transparent ">
          <h2 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#1A0330] to-[#5705BC]">
            Our Vision
          </h2>

          <div className="p-8 rounded-2xl shadow-xl bg-purple-100  border border-gray-300 max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We envision a world where learning is personalized, efficient, and
              accessible to all. Whether you&apos;re a student preparing for
              exams, a teacher organizing course materials, or an admin managing
              tasks—our AI-driven SaaS is designed to make your journey
              smoother.
            </p>

            <div className=" flex justify-center gap-10 mb-10">
              <div className="bg-white p-4 rounded-full flex items-center text-purple-700">
                <GraduationCap className="w-6 h-6 mr-2" />
                <span className="font-medium">For Students</span>
              </div>
              <div className="bg-white flex p-4 rounded-full items-center text-purple-700">
                <Lightbulb className="w-6 h-6 mr-2" />
                <span className="font-medium">For Teachers</span>
              </div>
              <div className="bg-white flex p-4 rounded-full items-center text-purple-700">
                <Star className="w-6 h-6 mr-2" />
                <span className="font-medium">For Admins</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-400/30 rounded-xl opacity-10"></div>
              <p className="text-2xl font-semibold text-[#5705BC] py-6 px-4 relative">
                We&apos;re not just building software —
                <br />
                we&apos;re building the{" "}
                <span className="font-bold">future of education</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-12 space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-200"></div>
          <div className="w-3 h-3 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
