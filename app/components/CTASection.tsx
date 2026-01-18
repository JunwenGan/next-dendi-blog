"use client";

// import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { ArrowRight } from "lucide-react";
import { MonogramLogo } from "./Logo";
import RotatingDisc from "./RotatingDisc";
// import { Button } from "./ui/button";
// import ContactModal from "./ContactModal";

export default function CTASection() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

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

        {/* Get In Touch Button - temporarily disabled */}
        {/* <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="group px-6 py-5 text-base border-border bg-card/50 hover:bg-card hover:border-border/80 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div> */}

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

      {/* Contact Modal - temporarily disabled */}
      {/* <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </section>
  );
}
