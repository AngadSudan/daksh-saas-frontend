import React from "react";
import Image from "next/image";
import t1 from "../../../public/testimonial1.svg";
import t2 from "../../../public/testimonial2.svg";
import t3 from "../../../public/testimonial3.svg";
import t4 from "../../../public/testimonial4.svg";
import t5 from "../../../public/testimonial5.svg";
import t6 from "../../../public/testimonial6.svg";
import quote from "../../../public/quote.svg";
import people from "../../../public/people.svg";
function Testimonials() {
  const testimonials = [
    {
      testimonial:
        "Daksh transformed the way I study! The AI-powered quizzes and summarization tools helped me grasp difficult concepts effortlessly.",
      imageSrc: t1,
      name: "Aaradhya",
      role: "Engineering Student",
    },
    {
      testimonial:
        "With Daksh, managing my study schedule has never been easier. The automated reminders and smart study plans keep me on track!",
      imageSrc: t2,
      name: "Ronak Patel",
      role: "Medical Student",
    },
    {
      testimonial:
        "The AI-driven PDF and PPT summarization feature is a game-changer! It saves me hours of revision and helps me retain information better.",
      imageSrc: t3,
      name: "Megha sharma",
      role: "MBA Aspirant",
    },
    {
      testimonial:
        "As a teacher, Daksh has helped me create engaging quizzes in seconds. The platform is intuitive, efficient, and a must-have for educators!",
      imageSrc: t4,
      name: "karan verma",
      role: "Assistant Professor",
    },
    {
      testimonial:
        "I love how Daksh integrates with Notion and Google Calendar. It keeps all my study materials, tasks, and deadlines organized in one place!",
      imageSrc: t5,
      name: "Ananya Singh",
      role: "Law Student",
    },
    {
      testimonial:
        "Studying used to feel overwhelming, but with Daksh's AI-powered learning assistant, I can focus on what truly matters. Highly recommended!",
      imageSrc: t6,
      name: "Aditya Roy",
      role: "Competitive Exam Aspirant",
    },
  ];

  return (
    <div className="my-12 p-8">
      <h1 className="text-[48px] flex flex-col text-[#012245] text-center font-[400] leading-[144%] mb-12">
        <div className="flex flex-col md:flex-row w-fit font-[600] mx-auto items-center">
          Hear Stories{" "}
          <Image
            src={people}
            alt="people"
            className="w-[150px] h-[50px] mt-1 object-contain"
          />{" "}
          Straight from <br />
        </div>
        <span className="text-[#410F80] font-[600]">
          <span className="text-black"> The </span>People We Helped{" "}
        </span>
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial.testimonial}
            imageSrc={testimonial.imageSrc}
            name={testimonial.name}
            role={testimonial.role}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;

const TestimonialCard = ({ testimonial, imageSrc, name, role }) => {
  return (
    <div className="max-w-md flex justify-center items-center  p-4 rounded-lg">
      <div className="">
        {/* Quote Icon */}
        <div className="mb-4 w-full p-2 grid place-items-center rounded-[22px] bg-[#410F80]/10 ">
          <div className="flex gap-3">
            <Image
              src={quote}
              alt="quote"
              className="h-[17px] w-[20px] mt-3 object-contain"
            />

            {/* Testimonial Text */}
            <p className="text-gray-800 text-wrap font-medium mb-8 text-lg">
              {testimonial}
            </p>
          </div>
        </div>

        {/* Author Information */}
        <div className="flex flex-col pl-5 ">
          <div className="w-16 h-16 relative mr-4">
            <Image
              src={imageSrc}
              alt={name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl font-bold text-left text-gray-900">
              {name}
            </h4>
            <p className="text-gray-600 text-left uppercase text-sm tracking-wide">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
