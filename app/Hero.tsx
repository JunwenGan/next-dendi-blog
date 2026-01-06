"use client";

import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import Image from "next/image";
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
      <div className="container relative z-20 mx-auto mb-14 flex w-full flex-col items-center justify-center gap-y-8 px-4">
        {/* Main Title with Avatar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Hello, I'm Frederick */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hello, I&apos;m <span className="font-semibold">Frederick</span>
          </motion.h1>

          {/* Avatar with hover effects */}
          <motion.div
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-75 blur-md transition-all duration-500 group-hover:duration-200" />

            {/* Rotating border on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />

            {/* Avatar container */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-border/50 group-hover:border-transparent transition-all duration-300 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Image
                src="/images/me.jpg"
                alt="Frederick"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "transform 0.6s ease-out, opacity 0.3s ease" }} />
            </div>
          </motion.div>

          {/* a Full Stack Developer */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            a <span className="font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">Full Stack Developer</span>
          </motion.h1>
        </div>

        {/* Typed Text */}
        <motion.div
          className="h-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ReactTyped
            className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground/80"
            strings={[
              "Building beautiful web experiences",
              "Crafting scalable applications",
              "Turning ideas into reality",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
