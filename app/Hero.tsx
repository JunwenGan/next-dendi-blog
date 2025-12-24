"use client";

import { AiOutlineArrowDown } from "react-icons/ai";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import AnimatedStars from "./components/AnimatedStars";

const Hero = () => {
  return (
    <section className="relative flex h-screen max-h-[1000px] min-h-[800px] w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Stars with Random Movement */}
      <AnimatedStars />

      {/* Polar Aurora Effects - Animated Gradient Layers - z-[2] */}
      {/* Top Edge Aurora */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to bottom, var(--hero-top-aurora), transparent)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Aurora Effect - Concentrated in center only, strong effect */}
      {/* Main aurora - bright white/blue core, centered only */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[35vh] pointer-events-none z-[2]"
        style={{
          background: "var(--hero-aurora-main)",
          filter: "blur(20px)",
        }}
        animate={{
          opacity: [0.9, 1, 0.95, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary aurora layer - purple/pink, centered */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[30vh] pointer-events-none z-[2]"
        style={{
          background: "var(--hero-aurora-secondary)",
          filter: "blur(25px)",
        }}
        animate={{
          opacity: [0.7, 0.9, 0.8, 0.7],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Bright core line - intense center band */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[25vh] pointer-events-none z-[3]"
        style={{
          background: "var(--hero-aurora-core)",
          filter: "blur(12px)",
        }}
        animate={{
          opacity: [0.95, 1, 0.98, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Gradient Orb */}
      <div className="absolute bottom-[-167px] left-1/2 -translate-x-1/2 transform h-[111px] w-[800px] blur-[80px] bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4)] bg-[length:300%_100%] animate-gradient-x opacity-80"></div>

      {/* Secondary Glow */}
      <div
        className="absolute -bottom-[753px] -left-[454px] -right-[432px] h-[955px] rounded-[100%]"
        style={{
          background: "linear-gradient(to bottom, var(--hero-glow-from), transparent)",
        }}
      ></div>

      {/* Glowing Card/Orb */}
      <div
        className="absolute -bottom-[759px] -left-[532px] -right-[510px] h-[956px] aspect-[2.346/1] rounded-[100%]"
        style={{
          backgroundColor: "var(--hero-orb-bg)",
          boxShadow: "var(--hero-orb-shadow)",
        }}
      ></div>

      {/* Content */}
      <div className="container relative z-20 mx-auto mb-14 flex w-full flex-col items-center justify-center gap-y-6 px-4">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-center">
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Dendi&apos;s Blog
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground text-center">
          Be yourself
        </p>

        {/* Typed Text */}
        <div className="h-8">
          <ReactTyped
            className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground/80"
            strings={[
              "Don't make a promise when you are happy",
              "Don't reply when you are angry",
              "Don't make a decision when you are sad",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <AiOutlineArrowDown
          size={30}
          className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        />
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
