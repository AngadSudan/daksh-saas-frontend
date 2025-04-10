import React from "react";
import Image from "next/image";
import arrow from "../../../public/rightArrow.svg";
import t1 from "../../../public/talent1.svg";
import t2 from "../../../public/talent2.svg";
import t3 from "../../../public/talent3.svg";

function HireRight() {
  const talents = [
    {
      img: t1,
      heading: "Create Account",
    },
    {
      img: t2,
      heading: "Create Community",
    },
    {
      img: t3,
      heading: "Get Notes Managed",
    },
  ];

  return (
    <div className="flex flex-col mb-12 gap-4 px-4 md:px-6 lg:px-8">
      <h1 className="text-center text-[32px] font-[400]">
        Find & Get Started With study Sessions
        <br className="hidden sm:block" /> Minutes
      </h1>

      {/* Mobile view (stacked) */}
      <div className="flex flex-col gap-8 md:hidden mx-auto">
        {talents.map((talent, index) => {
          return (
            <div key={index} className="flex flex-col items-center">
              <TalentCard heading={talent.heading} img={talent.img} />
              {index !== talents.length - 1 && (
                <Image
                  src={arrow}
                  alt="arrow-svg"
                  className="w-[60px] h-[10px] object-cover rotate-90 my-4"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop view (horizontal) */}
      <div className="hidden md:flex gap-12 mx-auto">
        {talents.map((talent, index) => {
          return (
            <React.Fragment key={index}>
              <TalentCard heading={talent.heading} img={talent.img} />
              {index !== talents.length - 1 && (
                <Image
                  src={arrow}
                  alt="arrow-svg"
                  className="w-[60px] lg:w-[100px] my-auto h-[10px] object-cover"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <p className="text-center text-[16px] sm:text-[18px] md:text-[20px] my-6 md:my-12 w-fit mx-auto block px-4">
        Save hours of manual notes finding with one stop
        <br className="hidden sm:block" /> solution. Get the best services in
        your pipeline instantly, so
        <br className="hidden sm:block" /> you can focus on your tasks, faster,
        and more efficiently.
      </p>
    </div>
  );
}

const TalentCard = ({ img, heading }) => {
  return (
    <div className="my-auto flex flex-col items-center gap-2">
      <Image
        src={img}
        alt={heading}
        className="w-[55px] h-[55px] md:w-[63px] md:h-[63px] object-cover"
      />
      <p className="w-[95%] text-[#410F80] text-wrap text-center text-sm md:text-base">
        {heading}
      </p>
    </div>
  );
};

export default HireRight;
