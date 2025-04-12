import React from "react";
import Image from "next/image";
import f1 from "../../../public/feature1.svg";
import f2 from "../../../public/feature2.svg";
// import f3 from "../../../public/feature3.svg";
import f4 from "../../../public/feature4.svg";
import f5 from "../../../public/feature5.svg";
function Features() {
  const features = [
    {
      img: f1,
      heading: "Multiple Community Creation",
      description:
        "Easily create and join diverse communities to share resources and collaborate effectively.",
    },
    {
      img: f2,
      heading: "Multiple Chapters & Subjects",
      description:
        "Organize your content effortlessly by creating unlimited chapters and subjects.",
    },
    {
      img: f4,
      heading: "Embedded Notes Application",
      description:
        "Access and annotate your PPTX and PDFs directly on the web with an integrated AI assistant.",
    },
    {
      img: f5,
      heading: "Powerful Todos and Task Management",
      description:
        "Streamline your workflow with advanced task management and collaboration tools.",
    },
  ];
  return (
    <div>
      <h1 className="text-center text-[48px] text-[#1A1A1A] ">
        Revolutionize Your Resource
        <br />& Task Management
      </h1>
      <p className="text-center text-[#6A6A6A] mb-4 text-[18px]">
        Leverage intelligent automation and AI-powered tools to simplify
        management within clicks.
      </p>
      <div className="max-w-7xl w-[90%]  gap-y-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-2 mt-8">
        {features.map((feature, index) => {
          return (
            <FeatureCard
              key={index}
              img={feature.img}
              heading={feature.heading}
              description={feature.description}
            />
          );
        })}
      </div>
    </div>
  );
}

const FeatureCard = ({ img, heading, description }) => {
  return (
    <div className=" flex flex-col p-4 rounded-[20px] bg-[#F3F3F1] border-[1px] border-[#E3E3E3]">
      <Image
        src={img}
        alt="feature-image"
        className="w-[753px] object-cover md:object-contain h-[265px] mb-4 border-[1px] border-[#5417A3] rounded-[10px]"
      />
      <h1 className="text-[#1A1A1A] ml-4  text-left font-[400] text-[30px]">
        {heading}
      </h1>
      <p className="text-[#6A6A6A] ml-4 mb-4 text-left w-[80%]">
        {description}
      </p>
    </div>
  );
};

export default Features;
