"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="py-16 md:py-20 text-center">
      <motion.p
        className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        THE PENSIEVE
      </motion.p>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl mt-4"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Handpicked{" "}
        <span
          className="italic bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          Insights
        </span>
      </motion.h1>
    </section>
  );
}
