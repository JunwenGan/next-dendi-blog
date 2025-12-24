"use client";

import { motion } from "framer-motion";

const MeshGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Blob 1 - Top Left */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)",
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-100, 50, -100],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 - Top Right */}
      <motion.div
        className="absolute right-0 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [-50, 100, -50],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blob 3 - Center */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)",
        }}
        animate={{
          x: [-50, 50, -50],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Blob 4 - Bottom Left */}
      <motion.div
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Blob 5 - Bottom Right */}
      <motion.div
        className="absolute bottom-0 right-0 w-[650px] h-[650px] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-5) 0%, transparent 70%)",
        }}
        animate={{
          x: [-80, 0, -80],
          y: [-50, 50, -50],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      />

      {/* Blob 6 - Middle Right */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-[480px] h-[480px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--aurora-6) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -60, 0],
          y: [-40, 40, -40],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default MeshGradient;
