"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";
import RotatingPhotos from "./RotatingPhotos";

export default function AboutHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              MORE ABOUT ME
            </p>

            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-[1.1]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
              }}
            >
              I&apos;m Frederick, a<br />
              creative{" "}
              <span
                className="italic text-purple-500"
                style={{ fontWeight: 500 }}
              >
                engineer
              </span>
            </h1>

            {/* Bio paragraphs */}
            <div className="space-y-5 text-muted-foreground mb-8">
              <p>
                I&apos;m Frederick, a proactive full-stack developer passionate
                about creating dynamic web experiences. From frontend to
                backend, I thrive on solving complex problems with clean,
                efficient code. My expertise spans React, Next.js, and Node.js,
                and I&apos;m always eager to learn more.
              </p>
              <p>
                When I&apos;m not immersed in work, I&apos;m exploring new ideas and
                staying curious. Life&apos;s about balance, and I love embracing
                every part of it.
              </p>
              <p className="text-foreground font-medium">
                I believe in waking up each day eager to make a difference!
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/junwen-gan-b0336b339/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/JunwenGan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Rotating Photos - positioned closer to left */}
          <motion.div
            className="flex justify-center lg:justify-start lg:pl-36"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RotatingPhotos />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
