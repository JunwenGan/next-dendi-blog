"use client";

import { motion } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";
import Image from "next/image";

interface TechBadge {
  name: string;
  icon?: string;
}

interface Experience {
  id: number;
  dateRange: string;
  company: string;
  location: string;
  isRemote: boolean;
  role: string;
  achievements: string[];
  techStack: TechBadge[];
  avatar?: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    dateRange: "JAN 2024 - PRESENT",
    company: "Tech Innovations",
    location: "San Francisco, CA",
    isRemote: true,
    role: "Senior Frontend Engineer",
    achievements: [
      "Architected enterprise-scale, **CMS-driven reusable pagebuilder blocks** with dynamic configurability, enabling non-technical teams to manage content across **6+ production websites**.",
      "Delivered **high-performance web applications** using **Next.js, React, and Tailwind CSS** with advanced rendering strategies, achieving **25% increase in user engagement**.",
      "Implemented **TypeScript across full-stack codebases**, reducing production defects by **15%** and establishing type-safe development standards.",
    ],
    techStack: [
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Prisma" },
    ],
  },
  {
    id: 2,
    dateRange: "JUN 2022 - DEC 2023",
    company: "Digital Agency",
    location: "New York, NY",
    isRemote: true,
    role: "Full Stack Developer",
    achievements: [
      "Built and maintained **scalable REST APIs** serving **10,000+ daily active users** with Node.js and Express.",
      "Collaborated with **cross-functional teams (Design, Product)** to ship **WCAG 2.1 AA-compliant** user interfaces.",
      "Optimized database queries resulting in **40% faster content delivery** and improved Core Web Vitals scores.",
    ],
    techStack: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "PostgreSQL" },
      { name: "React" },
      { name: "AWS" },
    ],
  },
  {
    id: 3,
    dateRange: "JAN 2022 - PRESENT",
    company: "GitHub",
    location: "Remote",
    isRemote: true,
    role: "Open Source Contributor",
    achievements: [
      "Contributed to **open-source projects with 15,000+ GitHub stars**, improving code quality, feature implementations, and documentation.",
      "Engaged with **developer communities**, collaborating on innovative solutions and best practices.",
    ],
    techStack: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
];

// Parse text with **bold** markers
function parseAchievement(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ExperienceSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0a0a0f]" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            THE EXPERIENCE
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
            }}
          >
            Experience That
            <br />
            Brings{" "}
            <span
              className="italic bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
              style={{ fontWeight: 500 }}
            >
              Ideas to Life
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical glowing line */}
          <div className="absolute left-0 md:left-1/3 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 blur-sm" />
          </div>

          {/* Experience entries */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Left: Date & Company */}
                <div className="md:pr-8 md:text-right">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {exp.dateRange}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl text-foreground mb-3"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 400,
                    }}
                  >
                    {exp.company}
                  </h3>
                  <div className="flex items-center gap-2 md:justify-end text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                  {exp.isRemote && (
                    <div className="flex items-center gap-2 md:justify-end text-muted-foreground text-sm mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>Remote work</span>
                    </div>
                  )}
                </div>

                {/* Timeline dot with avatar */}
                <div className="hidden md:flex absolute left-1/3 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-purple-500/50 items-center justify-center overflow-hidden">
                  {exp.avatar ? (
                    <Image
                      src={exp.avatar}
                      alt={exp.company}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>

                {/* Right: Role & Achievements */}
                <div className="md:col-span-2 md:pl-16">
                  <h4
                    className="text-xl md:text-2xl text-foreground mb-4"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                    }}
                  >
                    {exp.role}
                  </h4>

                  {/* Achievements */}
                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        {parseAchievement(achievement)}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1.5 text-xs font-mono bg-muted/50 border border-border/50 rounded-full text-muted-foreground"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
