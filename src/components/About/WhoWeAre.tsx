import React from "react";
import { Users, Brain, Sparkles } from "lucide-react";
import logo from "../../../public/logo.png";
import Image from "next/image";

const WhoWeAre = () => {
  const keyPoints = [
    {
      icon: <Brain className="text-white w-5 h-5" />,
      title: "AI Innovators",
      text: "Reshaping educational technology with advanced AI solutions",
    },
    {
      icon: <Users className="text-white w-5 h-5" />,
      title: "Educators",
      text: "Passionate about creating excellence in the learning experience",
    },
    {
      icon: <Sparkles className="text-white w-5 h-5" />,
      title: "Tech Enthusiasts",
      text: "Building intuitive tools that simplify complex academic processes",
    },
  ];

  return (
    <div className="bg-white py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#5705BC]/5 transform -skew-y-6"></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#5705BC] rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${
                8 + Math.random() * 15
              }s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(15px);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(-25px);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-40px) translateX(10px);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-25px) translateX(20px);
          }
        }
        @keyframes float-5 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-35px) translateX(-10px);
          }
        }
        @keyframes float-6 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(25px);
          }
        }
        @keyframes float-7 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(-20px);
          }
        }
        @keyframes float-8 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-40px) translateX(5px);
          }
        }
        @keyframes float-9 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(15px);
          }
        }
        @keyframes float-10 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-25px) translateX(-25px);
          }
        }
        @keyframes float-11 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 flex justify-center">
            {/* Header */}
            <div className="text-center md:text-left mb-12 md:hidden">
              <span className="bg-purple-100 text-center text-[#5705BC] text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
                Our Story
              </span>
              <h2 className="text-4xl text-center md:text-5xl font-bold text-[#1A0330] mb-6">
                Who <span className="text-[#5705BC]">We Are</span>
              </h2>
            </div>

            {/* Logo with animated elements */}
            <div
              className="relative group"
              style={{ animation: "slide-in 0.8s ease-out forwards" }}
            >
              {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5705BC] to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div> */}
              {/* <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl hover:shadow-purple-200/50 transition duration-500"> */}
              <Image
                alt="Daksh Logo"
                src={logo}
                className="w-full h-auto object-contain max-w-md mx-auto transform group-hover:scale-105 transition duration-700"
                priority
              />

              {/* Animated circles */}
              {/* <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 delay-200"></div>
              <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 delay-300"></div> */}
              {/* </div> */}
            </div>
          </div>

          <div
            className="md:w-5/6"
            style={{ animation: "slide-in 0.8s ease-out 0.2s both" }}
          >
            {/* Header for medium and larger screens */}
            <div className="text-center md:text-left mb-8 hidden md:block">
              <span className="bg-purple-100 text-[#5705BC] text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A0330] mb-6">
                Who <span className="text-[#5705BC]">We Are</span>
              </h2>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl hover:shadow-purple-200/30 transition duration-500">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We are a team of tech enthusiasts, educators, and AI innovators
                passionate about redefining how education meets technology. By
                leveraging the power of AI, automation, and seamless
                integrations, we&apos;re building a smart, intuitive, and
                powerful platform that enhances the learning experience for
                schools, colleges, and institutions worldwide.
              </p>

              <div className="space-y-5 mb-8">
                {keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 rounded-xl hover:bg-purple-50 transition-all duration-300"
                    style={{
                      animation: `slide-in 0.5s ease-out ${
                        0.4 + index * 0.1
                      }s both`,
                    }}
                  >
                    <div className="bg-gradient-to-br from-[#5705BC] to-purple-600 p-3 rounded-lg shadow-md flex-shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#480179] text-lg">
                        {point.title}
                      </h3>
                      <p className="text-gray-600">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
