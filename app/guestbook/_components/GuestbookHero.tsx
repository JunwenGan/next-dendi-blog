"use client";

import { motion } from "framer-motion";

export default function GuestbookHero() {
  return (
    <section className="relative py-20 md:py-28">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          THE COMMUNITY WALL
        </p>

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          Leave{" "}
          <span
            className="italic bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontWeight: 500 }}
          >
            Your Mark
          </span>
        </h1>
      </motion.div>
    </section>
  );
}
