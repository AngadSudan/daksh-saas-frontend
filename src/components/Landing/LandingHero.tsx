"use client";
import React from "react";
import Link from "next/link";
import arrow from "../../../public/arrowup.svg";
import Image from "next/image";
import c1 from "../../../public/card1.svg";
import c2 from "../../../public/card2.svg";
import c3 from "../../../public/card3.svg";
import c4 from "../../../public/card4.svg";
import { motion } from "framer-motion";

function HomeHero() {
  const homeCards = [
    {
      firstline: "50K+",
      secondline: "Verified Candidates",
      img: c1,
      className: "left-50 bottom-0",
    },
    {
      firstline: "AI-Powered",
      secondline: "Study Assistant",
      img: c2,
      className: "top-0 left-125 rotate-[3.39deg]",
    },
    {
      firstline: "4X",
      secondline: "Faster Prioritization",
      img: c3,
      className: "bottom-10 left-200 -rotate-[4.84deg]",
    },
    {
      firstline: "One-Click",
      secondline: "Notes Upload",
      img: c4,
      className: "top-10 left-275 rotate-[4.47deg]",
    },
  ];

  // Text fade-in animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Button fade-in animation variants with slight delay
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.7,
      },
    },
  };

  // Staggered cards animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.7, // Start cards animation after text fade-in completes
      },
    },
  };

  return (
    <div className="min-h-screen">
      <motion.h1
        className="text-center mt-40 font-[400] text-[50px] md:text-[64] text-[#1A1A1A]"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        Master & Excel with <br className="hidden sm:block" />
        Enhanced Task and Notes Management
      </motion.h1>

      <motion.p
        className="text-[#6A6A6A] text-center text-[24px] p-2 my-6"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ delay: 0.7 }}
      >
        Streamline Notes management, prioritize task better, and make
        data-driven decisions with <br className="hidden sm:block" />
        Daksh&apos;s cutting-edge platform.
      </motion.p>

      <motion.div initial="hidden" animate="visible" variants={buttonVariants}>
        <Link
          href="/"
          className="md:flex text-white block w-fit px-5 py-2 mx-auto mt-5 bg-linear-to-b from-[#5417A3] to-[#410F80] rounded-full items-center gap-4"
        >
          <span>Get Started Now</span>
          <Image
            src={arrow}
            alt="link"
            className="hidden md:block w-auto h-auto object-cover"
          />
        </Link>
      </motion.div>

      <motion.div
        className="hidden md:block relative w-[95%] mx-auto p-4 h-[40svh] mt-12  gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {homeCards.map((card, index) => {
          return (
            <ContentCard
              key={index}
              img={card.img}
              index={index}
              firstline={card.firstline}
              secondline={card.secondline}
              className={card.className}
            />
          );
        })}
      </motion.div>
      <motion.div
        className=" md:hidden relative w-fit p-4  mt-12 mx-auto grid grid-cols-1 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {homeCards.map((card, index) => {
          return (
            <ContentsCard
              key={index}
              img={card.img}
              index={index}
              firstline={card.firstline}
              secondline={card.secondline}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

const ContentCard = ({ img, firstline, index, secondline, className = "" }) => {
  // Individual card animation (falling from top)
  const cardVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    //
    <motion.div
      className={`absolute w-[190px] h-[190px] border-[1px] border-[#959595] bg-[#F3F3F1] p-4 rounded-[20px] ${className}`}
      variants={cardVariants}
    >
      <h1
        className={`text-center text-nowrap text-md text-[#4E0684] ${
          index % 2 !== 0 ? "" : "font-[700]"
        } `}
      >
        {firstline}
      </h1>
      <h1
        className={`text-center text-nowrap text-md text-[#4E0684] ${
          index % 2 === 0 ? "" : "font-[700]"
        } `}
      >
        {secondline}
      </h1>
      {img && (
        <Image
          src={img}
          alt={"feature-images"}
          className=" h-2/3 mx-auto w-auto object-cover"
        />
      )}
    </motion.div>
  );
};
const ContentsCard = ({ img, firstline, index, secondline }) => {
  // Individual card animation (falling from top)
  const cardVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    //
    <motion.div
      className={` w-[190px] h-fit border-[1px] border-[#959595] bg-[#F3F3F1] p-4 rounded-[20px]`}
      variants={cardVariants}
    >
      <h1
        className={`text-center text-nowrap text-md text-[#4E0684] ${
          index % 2 !== 0 ? "" : "font-[700]"
        } `}
      >
        {firstline}
      </h1>
      <h1
        className={`text-center text-nowrap text-md text-[#4E0684] ${
          index % 2 === 0 ? "" : "font-[700]"
        } `}
      >
        {secondline}
      </h1>
      {img && (
        <Image
          src={img}
          alt={"feature-images"}
          className=" h-auto mx-auto w-auto object-cover"
        />
      )}
    </motion.div>
  );
};

export default HomeHero;
