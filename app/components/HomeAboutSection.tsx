"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeAboutSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="container relative z-10 mx-auto px-8 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              MORE ABOUT ME
            </p>

            {/* Heading */}
            <h2
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
            </h2>

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

          {/* Right: Single Photo */}
          <motion.div
            className="flex justify-center lg:justify-start lg:pl-20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px]">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-xl" />

              {/* Photo frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/me.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 300px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Border frame */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
