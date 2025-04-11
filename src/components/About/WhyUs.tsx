import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import whyus from "../../../public/whyUs.svg";
//create similar to the JobJaro what sets us apart
const WhyUs = () => {
  const reasons = [
    "AI-Driven Productivity",
    "All-in-One Platform",
    "Designed for Schools & Colleges",
    "Seamless Integrations",
    "Security & Scalability",
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl flex gap-3 justify-between mx-auto">
        <div>
          <h2 className="text-4xl font-bold text-center text-[#1A0330] mb-12">
            Why Choose Daksh?
          </h2>
          <div className="flex flex-col gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 flex items-center space-x-4"
              >
                <Check className="text-[#5705BC] w-10 h-10 flex-shrink-0" />
                <span className="text-lg font-medium text-[#480179]">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Image
            src={whyus}
            alt="logo"
            className="mx-auto mb-8 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
