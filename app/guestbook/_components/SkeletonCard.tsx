"use client";

import { memo } from "react";
import { motion } from "framer-motion";

// Gradient colors for skeleton cards
const skeletonGradients = [
  { bg: "from-teal-900/30 to-cyan-900/40", border: "from-teal-400/20 via-cyan-400/10 to-transparent" },
  { bg: "from-blue-900/30 to-indigo-900/40", border: "from-blue-400/20 via-indigo-400/10 to-transparent" },
  { bg: "from-purple-900/30 to-violet-900/40", border: "from-purple-400/20 via-violet-400/10 to-transparent" },
  { bg: "from-pink-900/30 to-rose-900/40", border: "from-pink-400/20 via-rose-400/10 to-transparent" },
  { bg: "from-emerald-900/30 to-green-900/40", border: "from-emerald-400/20 via-green-400/10 to-transparent" },
];

interface SkeletonCardProps {
  index: number;
}

const SkeletonCard = memo(function SkeletonCard({ index }: SkeletonCardProps) {
  // Random rotation based on index
  const rotations = [-2, 1.5, -1, 2, -1.5];
  const rotation = rotations[index % rotations.length];
  const gradient = skeletonGradients[index % skeletonGradients.length];

  return (
    <motion.div
      className="relative rounded-2xl p-[1px]"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: rotation }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient.border} opacity-40`} />

      {/* Card content */}
      <div className={`relative bg-gradient-to-br ${gradient.bg} backdrop-blur-xl rounded-2xl p-4 flex flex-col justify-between h-full overflow-hidden`}>
        {/* Top shine effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Content skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-white/10 rounded-full w-full" />
          <div className="h-3 bg-white/10 rounded-full w-4/5" />
          <div className="h-3 bg-white/10 rounded-full w-3/5" />
        </div>

        {/* User info skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="h-3 bg-white/10 rounded-full w-24" />
            <div className="h-3 bg-white/10 rounded-full w-32" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SkeletonCard;
