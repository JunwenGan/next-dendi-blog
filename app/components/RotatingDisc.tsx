"use client";

import { Sparkles } from "lucide-react";

interface RotatingDiscProps {
  size?: number;
}

export default function RotatingDisc({ size = 80 }: RotatingDiscProps) {
  const radius = size / 2 - 8; // Inner radius for text path
  const textPathId = "circleTextPath";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Rotating SVG with text */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin-slow"
      >
        {/* Define the circular path for text */}
        <defs>
          <path
            id={textPathId}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>

        {/* Blue ring border */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 4}
          fill="none"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth="2"
          className="opacity-80"
        />

        {/* Text along the circular path */}
        <text
          className="fill-foreground text-[9px] font-medium uppercase tracking-[0.2em]"
          style={{ letterSpacing: "0.15em" }}
        >
          <textPath href={`#${textPathId}`} startOffset="0%">
            OPEN TO WORK • OPEN TO WORK • OPEN TO WORK •
          </textPath>
        </text>
      </svg>

      {/* Center icon (non-rotating) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-foreground" />
        </div>
      </div>
    </div>
  );
}
