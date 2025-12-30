"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { MonogramLogo } from "./Logo";
import RotatingDisc from "./RotatingDisc";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";

export default function CTASection() {
  const [copied, setCopied] = useState(false);
  const email = "junonegan@gmail.com";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#10b981"],
      });

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0f] py-20 md:py-28 overflow-hidden"
    >
      {/* Cinematic dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0f] to-[#0a0a0f]" />

      {/* Abstract flowing shapes - silk/smoke effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left flowing shape */}
        <div
          className="absolute -left-1/4 top-1/4 w-[800px] h-[600px] opacity-[0.15]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            transform: 'rotate(-15deg)',
            filter: 'blur(60px)',
          }}
        />
        {/* Right flowing shape */}
        <div
          className="absolute -right-1/4 top-1/3 w-[700px] h-[500px] opacity-[0.12]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            transform: 'rotate(20deg)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom center glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1000px] h-[400px] opacity-[0.1]"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.5) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Decorative lines/waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M0 50 Q25 30 50 50 T100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>

      {/* Noise texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12">
        {/* Logo with glow */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-xl bg-accent-blue/30 rounded-full scale-150" />
            <div className="relative">
              <MonogramLogo size={70} />
            </div>
          </div>
        </motion.div>

        {/* Animated Headlines */}
        <div className="text-center space-y-2 mb-10">
          {/* Line 1 - From Left */}
          <div className="overflow-hidden">
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-foreground"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
              }}
              initial={{ x: "-100%", filter: "blur(8px)" }}
              animate={
                isInView
                  ? { x: 0, filter: "blur(0px)" }
                  : { x: "-100%", filter: "blur(8px)" }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              FROM CONCEPT TO{" "}
              <span className="font-bold not-italic">CREATION</span>
            </motion.h2>
          </div>

          {/* Line 2 - From Right with Rotating Disc */}
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ x: "100%", filter: "blur(8px)" }}
              animate={
                isInView
                  ? { x: 0, filter: "blur(0px)" }
                  : { x: "100%", filter: "blur(8px)" }
              }
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            >
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-foreground"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                }}
              >
                LET&apos;S MAKE IT{" "}
                <span className="font-bold not-italic">HAPPEN!</span>
              </h2>
              <RotatingDisc size={70} />
            </motion.div>
          </div>
        </div>

        {/* Get In Touch Button */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={copyEmail}
            variant="outline"
            className="group px-6 py-5 text-base border-border bg-card/50 hover:bg-card hover:border-border/80 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Copied to clipboard!
                </motion.span>
              ) : (
                <motion.span
                  key="contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Subtext */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-foreground font-medium text-lg">
            I&apos;m available for full-time roles &amp; freelance projects.
          </p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            I thrive on crafting dynamic web applications, and delivering
            seamless user experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
