"use client";
import Link from "next/link";

const Logo = ({ size = 40 }) => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* SVG Logo - Stylized "DB" */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Background circle */}
        <rect
          width="40"
          height="40"
          rx="8"
          className="fill-white/10 group-hover:fill-white/20 transition-colors duration-300"
        />

        {/* Letter D */}
        <path
          d="M10 10H16C20.4183 10 24 13.5817 24 18V22C24 26.4183 20.4183 30 16 30H10V10Z"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          className="group-hover:stroke-gray-200 transition-colors duration-300"
        />

        {/* Letter B - stylized, overlapping */}
        <path
          d="M18 10H24C27.3137 10 30 12.6863 30 16C30 17.5 29.5 18.5 28.5 19.5C29.5 20.5 30 21.5 30 23C30 26.3137 27.3137 29 24 29H18"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          className="group-hover:stroke-gray-200 transition-colors duration-300"
        />

        {/* Middle line of B */}
        <path
          d="M18 19.5H26"
          stroke="white"
          strokeWidth="2.5"
          className="group-hover:stroke-gray-200 transition-colors duration-300"
        />
      </svg>
    </Link>
  );
};

// Alternative: Simple text-based logo with style
export const TextLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 group">
      <span className="text-2xl font-bold text-white tracking-tight">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">D</span>
        <span className="inline-block text-gray-400 transition-transform duration-300 group-hover:translate-y-0.5">B</span>
      </span>
    </Link>
  );
};

// Alternative: Monogram style like Aayush's "AB"
export const MonogramLogo = ({ size = 36 }) => {
  return (
    <Link href="/" className="group">
      <div
        className="flex items-center justify-center rounded-lg bg-card border border-border shadow-sm transition-all duration-300 group-hover:border-border/80 group-hover:shadow-md group-hover:shadow-foreground/5 text-foreground"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized D and B combined */}
          <path
            d="M4 4V20H10C14 20 17 17 17 14V10C17 7 14 4 10 4H4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M10 4H16C18.5 4 20 5.5 20 8C20 9.5 19 10.5 18 11C19 11.5 20 12.5 20 14C20 16.5 18.5 18 16 18H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-60"
          />
        </svg>
      </div>
    </Link>
  );
};

export default Logo;
