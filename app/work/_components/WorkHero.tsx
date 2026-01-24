"use client";

import { motion } from "framer-motion";

export default function WorkHero() {
  return (
    <section className="py-16 md:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          MY WORK
        </p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-foreground"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          Selected{" "}
          <span
            className="italic bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
            style={{ fontWeight: 500 }}
          >
            Projects
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          A collection of projects I&apos;ve built, exploring AI, web development, and creative coding.
        </p>
      </motion.div>
    </section>
  );
}
