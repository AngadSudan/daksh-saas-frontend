import React from "react";
import { Check } from "lucide-react";

const WhyUs = () => {
  const reasons = [
    {
      title: "AI-Driven Productivity",
      description:
        "Boost efficiency with our advanced AI tools that streamline your workflow.",
    },
    {
      title: "All-in-One Platform",
      description:
        "Access all educational tools and resources in a single, unified platform.",
    },
    {
      title: "Designed for Schools & Colleges",
      description:
        "Built specifically to meet the unique needs of educational institutions.",
    },
    {
      title: "Seamless Integrations",
      description:
        "Connect easily with your existing tools and software systems.",
    },
    {
      title: "Security & Scalability",
      description:
        "Enterprise-grade security with the ability to scale as your institution grows.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-purple-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">
            What Sets Us Apart
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A0330] mt-4 mb-6">
            Why Choose <span className="text-[#5705BC]">Daksh</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforming education with innovative technology solutions designed
            for the modern classroom experience.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100 rounded-full opacity-30"></div>
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-200 rounded-full opacity-30"></div>

            <div className="relative z-10">
              <div className="grid w-[90%] mx-auto grid-cols-1 md:grid-cols-2 gap-4">
                {reasons
                  .filter((_, index) => index != reasons.length - 1)
                  .map((reason, index) => (
                    <div
                      key={index}
                      className="bg-white border border-purple-100 p-5 rounded-2xl hover:shadow-lg transition duration-300 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-purple-600 to-[#5705BC] p-3 rounded-xl shadow-md">
                          <Check className="text-white w-5 h-5 flex-shrink-0" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-lg font-semibold text-[#480179] block">
                            {reason.title}
                          </span>
                          <p className="text-gray-600 text-sm">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mx-auto w-fit mt-4 bg-white border border-purple-100 p-5 rounded-2xl hover:shadow-lg transition duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-600 to-[#5705BC] p-3 rounded-xl shadow-md">
                    <Check className="text-white w-5 h-5 flex-shrink-0" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg font-semibold text-[#480179] block">
                      {reasons[reasons.length - 1].title}
                    </span>
                    <p className="text-gray-600 text-sm">
                      {reasons[reasons.length - 1].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
              <Image
                src={whyus}
                alt="Why Choose Daksh"
                className="w-full h-auto object-contain transform hover:scale-105 transition duration-500"
                priority
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
