"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BucketItem, { BucketItemData } from "./BucketItem";

export interface BucketSectionData {
  number: string;
  title: string;
  description?: string;
  items: BucketItemData[];
}

interface BucketSectionProps {
  section: BucketSectionData;
}

export default function BucketSection({ section }: BucketSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform title position based on scroll
  // Moves up as you scroll down, creating parallax effect
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Left: Section info - sticky on desktop */}
      <motion.div
        ref={titleRef}
        className="lg:sticky lg:top-24 lg:self-start"
        style={{
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <span className="text-sm text-muted-foreground">{section.number}</span>
        <h2
          className="text-3xl md:text-4xl text-foreground mt-1"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          {section.title}
        </h2>
        {section.description && (
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            {section.description}
          </p>
        )}
      </motion.div>

      {/* Right: Items with timeline */}
      <div className="relative pl-10 border-l border-border/30">
        {section.items.map((item, index) => (
          <BucketItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
