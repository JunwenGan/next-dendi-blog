"use client";

import { useState, useEffect } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  dx1: number;
  dy1: number;
  dx2: number;
  dy2: number;
  opacity: number;
}

const AnimatedStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars only on client to avoid hydration mismatch
  useEffect(() => {
    const starCount = 25;
    const generatedStars = Array.from({ length: starCount }, (_, i) => {
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      const speed = Math.random() * 0.5 + 0.2;
      const angle = Math.random() * Math.PI * 2;
      const moveX = Math.cos(angle) * 150 * speed;
      const moveY = Math.sin(angle) * 150 * speed;

      return {
        id: i,
        x: baseX,
        y: baseY,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        dx1: moveX,
        dy1: moveY,
        dx2: moveX * 0.5,
        dy2: moveY * 0.5,
        opacity: Math.random() * 0.4 + 0.3,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-star-float will-change-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "var(--star-color)",
            "--dx1": `${star.dx1}px`,
            "--dy1": `${star.dy1}px`,
            "--dx2": `${star.dx2}px`,
            "--dy2": `${star.dy2}px`,
            "--star-opacity": star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AnimatedStars;
