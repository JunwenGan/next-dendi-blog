"use client";

import { AiOutlineArrowDown } from "react-icons/ai";
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className="h-screen w-screen bg-hero-pattern bg-cover bg-center">
      <div className="max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold py-6">
          Dendi's Blog
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold py-2">
          Be yourself
        </p>
        <ReactTyped
          className="text-xl sm:text-2xl md:text-2xl font-bold py-2"
          strings={[
            "Don't make a promise when you are happy",
            "Don't reply when you are angry",
            "Don't make a decision when you are sad",
          ]}
          typeSpeed={40}
          backSpeed={50}
          loop
        ></ReactTyped>
      </div>

      <AiOutlineArrowDown
        className="absolute left-1/2 bottom-5 animate-bounce duration-500 hover:cursor-pointer"
        size={30}
        color="rgba(255,255,255,.8)"
        
      />
    </div>
  );
};

export default Hero;
