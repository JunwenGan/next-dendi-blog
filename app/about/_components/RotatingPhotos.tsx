"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HobbyPhoto {
  id: number;
  src: string;
  label: string;
  alt: string;
}

const hobbyPhotos: HobbyPhoto[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=300&h=400&fit=crop",
    label: "I Travel",
    alt: "Traveling adventure",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop",
    label: "I Fit",
    alt: "Fitness workout",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    label: "Me",
    alt: "Personal portrait",
  },
];

export default function RotatingPhotos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hobbyPhotos.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[220px] h-[300px] md:w-[260px] md:h-[340px]">
      {/* Stacked photos container */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {hobbyPhotos.map((photo, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + hobbyPhotos.length) % hobbyPhotos.length;
          const isNext = index === (currentIndex + 1) % hobbyPhotos.length;

          // Calculate position in stack
          let zIndex = 0;
          let rotation = 0;
          let translateX = 0;
          let translateY = 0;
          let scale = 0.9;
          let opacity = 0;

          if (isActive) {
            zIndex = 30;
            rotation = 0;
            translateX = 0;
            translateY = 0;
            scale = 1;
            opacity = 1;
          } else if (isNext) {
            zIndex = 20;
            rotation = 8;
            translateX = 30;
            translateY = 20;
            scale = 0.95;
            opacity = 0.7;
          } else if (isPrev) {
            zIndex = 10;
            rotation = -8;
            translateX = -30;
            translateY = 30;
            scale = 0.9;
            opacity = 0.5;
          }

          return (
            <motion.div
              key={photo.id}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
              initial={false}
              animate={{
                rotateY: isActive ? 0 : isPrev ? -15 : 15,
                rotate: rotation,
                x: translateX,
                y: translateY,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Photo */}
              <div className="relative w-full h-full bg-muted">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 220px, 260px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Border frame */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/10" />
            </motion.div>
          );
        })}
      </div>

      {/* Current label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="text-xl font-medium text-foreground">
            {hobbyPhotos[currentIndex].label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/20 blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 blur-xl" />
    </div>
  );
}
