import React from "react";
import { Check } from "lucide-react";
import logo from "../../../public/logo.png";
import Image from "next/image";
const WhoWeAre = () => {
  return (
    <div className="bg-[#1A0330]/90 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 pr-8">
          <Image
            alt="logo"
            src={logo}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-4xl font-bold mb-6 text-[#fff]">Who We Are ?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            We are a team of tech enthusiasts, educators, and AI innovators
            passionate about redefining how education meets technology. By
            leveraging the power of AI, automation, and seamless integrations,
            we&apos;re building a smart, intuitive, and powerful platform that
            enhances the learning experience for schools, colleges, and
            institutions worldwide.
          </p>
          <div className="flex items-center space-x-3">
            <Check className="text-[#fff] w-8 h-8" />
            <span className="text-xl">
              Our goal: To make academic success effortless
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
