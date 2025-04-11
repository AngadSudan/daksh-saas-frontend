"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Faq {
  question: string;
  answer: string;
}

interface FaqsProps {
  faqs: Faq[];
}

function Faqs({ faqs }: FaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full my-12">
      <div className="w-full md:w-[80%] gap-12 mx-auto p-3">
        <h1 className="text-center mb-12 text-[48px]">
          Got Questions? We&apos;ve Got the Answers
        </h1>
        <div className="w-[90%] md:w-[60%] mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-[20px] border-2 border-gray-200 mb-3 mx-auto h-fit p-2 ${
                openIndex === index ? "bg-[#F3F3F1]" : ""
              } transition-colors duration-300`}
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <h3 className="font-[500] text-lg flex-grow">{faq.question}</h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-gray-600"
                >
                  {openIndex === index ? <X /> : <Plus />}
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 font-[400]">
                      <p className="text-base font-[400] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
