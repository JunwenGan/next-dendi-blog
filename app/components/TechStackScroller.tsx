"use client";

import { motion } from "framer-motion";
import { Technology, getIconData } from "@/app/lib/technologies";

interface TechStackScrollerProps {
  technologies: Technology[];
  direction: "left" | "right";
  speed?: number; // Duration in seconds
}

export default function TechStackScroller({
  technologies,
  direction,
  speed = 20,
}: TechStackScrollerProps) {
  // Duplicate technologies for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  // Animation variants based on direction
  // "right" = scroll from right to left (content moves left, x goes from 0 to -50%)
  // "left" = scroll from left to right (content moves right, x goes from -50% to 0)
  const getInitialX = () => {
    if (direction === "left") {
      return "-50%"; // Start at duplicate position for left-to-right
    }
    return "0%"; // Start at beginning for right-to-left
  };

  const animationVariants = {
    right: {
      x: ["0%", "-50%"],
    },
    left: {
      x: ["-50%", "0%"],
    },
  };

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-2 md:gap-3 lg:gap-4"
        initial={{ x: getInitialX() }}
        animate={animationVariants[direction]}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedTech.map((tech, index) => {
          const iconData = getIconData(tech.iconSlug);
          const hasIconPath = iconData?.path && iconData.path.length > 0;
          
          return (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
            >
              {hasIconPath ? (
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 flex-shrink-0"
                  fill={iconData.hex}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={iconData.path} />
                </svg>
              ) : tech.fallbackIcon ? (
                <tech.fallbackIcon className="h-3.5 w-3.5 flex-shrink-0" />
              ) : null}
              <span className="text-xs font-medium tracking-tight whitespace-nowrap" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', letterSpacing: '-0.01em' }}>
                {tech.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

