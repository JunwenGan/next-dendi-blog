"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/useIsMobile";

// Skills arranged in 3 rows matching the reference design
const skillRows = [
  // Row 1 - Frontend & UI
  [
    { name: "React", icon: "/icons/skills/react.svg" },
    { name: "Next.js", icon: "/icons/skills/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/skills/typescript.svg" },
    { name: "Tailwind", icon: "/icons/skills/tailwindcss.svg" },
    { name: "Framer", icon: "/icons/skills/framer.svg" },
    { name: "Figma", icon: "/icons/skills/figma.svg" },
    { name: "Notion", icon: "/icons/skills/notion.svg" },
    { name: "Markdown", icon: "/icons/skills/markdown.svg" },
    { name: "Node.js", icon: "/icons/skills/nodejs.svg" },
    { name: "JavaScript", icon: "/icons/skills/javascript.svg" },
    { name: "Express", icon: "/icons/skills/express.svg" },
    { name: "Redux", icon: "/icons/skills/redux.svg" },
  ],
  // Row 2 - Backend & DevOps
  [
    { name: "PostgreSQL", icon: "/icons/skills/postgresql.svg" },
    { name: "MongoDB", icon: "/icons/skills/mongodb.svg" },
    { name: "Prisma", icon: "/icons/skills/prisma.svg" },
    { name: "Supabase", icon: "/icons/skills/supabase.svg" },
    { name: "Firebase", icon: "/icons/skills/firebase.svg" },
    { name: "Vercel", icon: "/icons/skills/vercel.svg" },
    { name: "Cloudflare", icon: "/icons/skills/cloudflare.svg" },
    { name: "GraphQL", icon: "/icons/skills/graphql.svg" },
    { name: "Docker", icon: "/icons/skills/docker.svg" },
    { name: "Git", icon: "/icons/skills/git.svg" },
    { name: "GitHub", icon: "/icons/skills/github.svg" },
    { name: "Linux", icon: "/icons/skills/linux.svg" },
  ],
  // Row 3 - Tools & Languages
  [
    { name: "HTML5", icon: "/icons/skills/html5.svg" },
    { name: "Sass", icon: "/icons/skills/sass.svg" },
    { name: "Python", icon: "/icons/skills/python.svg" },
    { name: "Vite", icon: "/icons/skills/vite.svg" },
    { name: "Jest", icon: "/icons/skills/jest.svg" },
    { name: "ESLint", icon: "/icons/skills/eslint.svg" },
    { name: "Prettier", icon: "/icons/skills/prettier.svg" },
  ],
];

interface SkillIconProps {
  icon: string;
  name: string;
  rowIndex: number;
  colIndex: number;
  totalCols: number;
  totalRows: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}

function SkillIcon({
  icon,
  name,
  rowIndex,
  colIndex,
  totalCols,
  totalRows,
  progress,
  isMobile,
}: SkillIconProps) {
  const centerCol = (totalCols - 1) / 2;
  const distanceFromCenter = colIndex - centerCol;
  const normalizedDistance = Math.abs(distanceFromCenter) / Math.max(centerCol, 1);

  // Grid spacing (final converged state) - smaller on mobile
  const gridSpacing = isMobile ? 60 : 72;
  const rowHeight = isMobile ? 68 : 85;
  const rowOffset = (rowIndex - (totalRows - 1) / 2) * rowHeight;

  // Spread parameters (initial fanned-out state) - DRAMATIC values
  const extraSpread = 50; // Wide horizontal explosion
  const arcHeight = 80; // Strong arc curve
  const maxRotation = 180; // Maximum rotation at edges (degrees)
  const verticalSpread = 40; // Vertical scatter

  // Consolidate all transforms into one for better performance
  const transform = useTransform(progress, (p) => {
    // X position - wider spread
    const gridX = distanceFromCenter * gridSpacing;
    const spreadX = distanceFromCenter * extraSpread;
    const x = gridX + spreadX * (1 - p);

    // Y position with arc + vertical scatter
    const arcOffset = -arcHeight * normalizedDistance * normalizedDistance;
    const rowScatter = (rowIndex - 1) * verticalSpread; // Rows spread apart
    const y = rowOffset + (arcOffset + rowScatter) * (1 - p);

    // Rotation - 180° at edges, 0° at center, with exponential falloff
    // Use normalizedDistance^1.5 for more dramatic edge rotation
    const rotationIntensity = Math.pow(normalizedDistance, 1.5);
    const direction = distanceFromCenter > 0 ? 1 : -1; // Rotate outward
    const rotate = direction * rotationIntensity * maxRotation * (1 - p);

    // Scale - starts smaller, grows as it converges
    const scale = 0.65 + 0.35 * p;

    return `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
  });

  // Separate opacity transform for the element
  const opacityValue = useTransform(progress, [0, 0.5, 1], [0.3, 0.7, 1]);

  return (
    <motion.div
      className="absolute flex flex-col items-center will-change-transform"
      style={{ transform, opacity: opacityValue }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center shadow-lg hover:border-slate-600/70 hover:bg-slate-700/80 transition-colors duration-200">
        <Image
          src={icon}
          alt={name}
          width={32}
          height={32}
          className="w-7 h-7 md:w-8 md:h-8"
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation progress: 0 = spread/fanned out, 1 = converged/grid
  // On mobile: always show converged state (no animation)
  const progress = useTransform(
    scrollYProgress,
    [0.15, 0.5],
    isMobile ? [1, 1] : [0, 1]
  );

  // Windmill rotation (2 full rotations as section scrolls through)
  const windmillRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);

  // Section opacity for smooth entrance/exit
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative pb-8 md:pb-24 lg:pb-32 overflow-hidden min-h-0 md:min-h-screen"
    >
      <div className="absolute inset-0 bg-background" />

      <motion.div
        className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12"
        style={{ opacity }}
      >
        {/* Windmill + Title Container with overlap */}
        <div className="relative flex flex-col items-center">
          {/* Windmill Container - with fixed mask overlay */}
          <div className="relative z-0 flex justify-center items-start mt-8 md:mt-12">
            {/* Windmill Image - rotates independently */}
            <motion.div
              className="relative"
              style={{ rotate: windmillRotation }}
            >
              <img
                src="/images/windmill.png"
                alt="Skills"
                width={320}
                height={320}
                className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>

            {/* Fixed gradient fade mask at bottom - doesn't rotate with windmill */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] pointer-events-none z-10">
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 20%, hsl(var(--background) / 0.6) 40%, hsl(var(--background) / 0.3) 60%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Section Header - overlaps bottom of windmill, on top layer */}
          <div className="relative z-20 -mt-16 md:-mt-20 text-center mb-2 md:mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/90 mb-2 font-semibold drop-shadow-sm">
              MY SKILLS
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-foreground drop-shadow-md"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
              }}
            >
              The Secret{" "}
              <span
                className="italic bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent drop-shadow-sm"
                style={{ fontWeight: 500 }}
              >
                Sauce
              </span>
            </h2>
          </div>
        </div>

        {/* Skills Grid Container */}
        <div
          className="relative h-[280px] md:h-[280px] lg:h-[320px] flex items-center justify-center"
          style={{ contain: "layout style" }}
        >
          {(() => {
            // On mobile: flatten all icons and redistribute into rows of 5, max 4 rows
            if (isMobile) {
              const allIcons = skillRows.flat().slice(0, 20); // Limit to 20 icons
              const iconsPerRow = 5;
              const mobileRows: typeof allIcons[] = [];
              for (let i = 0; i < allIcons.length; i += iconsPerRow) {
                mobileRows.push(allIcons.slice(i, i + iconsPerRow));
              }
              return mobileRows.map((row, rowIndex) =>
                row.map((skill, colIndex) => (
                  <SkillIcon
                    key={`${rowIndex}-${colIndex}-${skill.name}`}
                    icon={skill.icon}
                    name={skill.name}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    totalCols={row.length}
                    totalRows={mobileRows.length}
                    progress={progress}
                    isMobile={isMobile}
                  />
                ))
              );
            }
            // Desktop: use original rows
            return skillRows.map((row, rowIndex) =>
              row.map((skill, colIndex) => (
                <SkillIcon
                  key={`${rowIndex}-${colIndex}-${skill.name}`}
                  icon={skill.icon}
                  name={skill.name}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  totalCols={row.length}
                  totalRows={skillRows.length}
                  progress={progress}
                  isMobile={isMobile}
                />
              ))
            );
          })()}
        </div>
      </motion.div>
    </section>
  );
}
