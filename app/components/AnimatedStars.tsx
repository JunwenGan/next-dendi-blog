"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  directionX: number;
  directionY: number;
  opacity: number;
}

const AnimatedStars = () => {
  // Generate fewer stars with random properties
  const stars = useMemo(() => {
    const starCount = 25; // Reduced number of stars
    return Array.from({ length: starCount }, (_, i) => {
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      const speed = Math.random() * 0.5 + 0.2; // Random speed
      const angle = Math.random() * Math.PI * 2; // Random direction in radians
      
      return {
        id: i,
        x: baseX,
        y: baseY,
        size: Math.random() * 1.5 + 0.5, // Random size between 0.5 and 2
        duration: Math.random() * 25 + 15, // Random duration between 15-40s
        delay: Math.random() * 5,
        directionX: Math.cos(angle) * 150 * speed, // Random X movement
        directionY: Math.sin(angle) * 150 * speed, // Random Y movement
        opacity: Math.random() * 0.4 + 0.3, // Random opacity between 0.3-0.7
      };
    }) as Star[];
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            x: [0, star.directionX, star.directionX * 0.5, -star.directionX * 0.5, 0],
            y: [0, star.directionY, star.directionY * 0.5, -star.directionY * 0.5, 0],
            opacity: [
              star.opacity,
              star.opacity * 1.3,
              star.opacity * 0.8,
              star.opacity * 1.2,
              star.opacity,
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedStars;

