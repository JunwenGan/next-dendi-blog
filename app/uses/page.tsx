"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DecorativeSideBars from "../components/DecorativeSideBars";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Development tools data with icon paths and website links
interface Tool {
  name: string;
  color: string;
  icon: string;
  url: string;
}

const developmentTools: Tool[] = [
  { name: "Cursor", color: "#007ACC", icon: "/icons/cursor.svg", url: "https://cursor.sh" },
  { name: "Arc", color: "#FCBFBD", icon: "/icons/arc.svg", url: "https://arc.net" },
  { name: "VSCode", color: "#007ACC", icon: "/icons/vscode.svg", url: "https://code.visualstudio.com" },
  { name: "Obsidian", color: "#7C3AED", icon: "/icons/obsidian.svg", url: "https://obsidian.md" },
  { name: "Notion", color: "#FFFFFF", icon: "/icons/notion.svg", url: "https://notion.so" },
  { name: "Warp", color: "#01A4FF", icon: "/icons/warp.svg", url: "https://warp.dev" },
  { name: "ChatGPT", color: "#10A37F", icon: "/icons/chatgpt.svg", url: "https://chat.openai.com" },
  { name: "Spotify", color: "#1DB954", icon: "/icons/spotify.svg", url: "https://spotify.com" },
  { name: "Figma", color: "#F24E1E", icon: "/icons/figma.svg", url: "https://figma.com" },
  { name: "Things 3", color: "#4A90D9", icon: "/icons/things3.svg", url: "https://culturedcode.com/things" },
  { name: "Raycast", color: "#FF6363", icon: "/icons/raycast.svg", url: "https://raycast.com" },
  { name: "1Password", color: "#0094F5", icon: "/icons/1password.svg", url: "https://1password.com" },
  { name: "Framer", color: "#0055FF", icon: "/icons/framer.svg", url: "https://framer.com" },
  { name: "CleanShot X", color: "#6366F1", icon: "/icons/cleanshot.svg", url: "https://cleanshot.com" },
  { name: "TablePlus", color: "#F59E0B", icon: "/icons/tableplus.svg", url: "https://tableplus.com" },
  { name: "Linear", color: "#5E6AD2", icon: "/icons/linear.svg", url: "https://linear.app" },
];

// Tool icon wrapper component
const ToolIcon = ({ icon, name, color }: { icon: string; name: string; color: string }) => {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}20` }}
    >
      <Image
        src={icon}
        alt={name}
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </div>
  );
};

export default function UsesPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Full-size image */}
            <motion.div
              className="relative w-[90vw] h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/macbook.png"
                alt="MacBook Pro M1"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Click anywhere to close hint */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              Click anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            THE GEAR
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            What Powers{" "}
            <span className="italic bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              My Work
            </span>
          </h1>
        </motion.div>

        {/* Section 01: Workstation */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Section Title */}
            <div className="lg:col-span-3">
              <p className="text-sm text-muted-foreground mb-2">01</p>
              <h2
                className="text-2xl text-foreground"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Workstation
              </h2>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-9">
              {/* Laptop Image Card - Click to open lightbox */}
              <div
                className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                {/* Laptop Image - fills container */}
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/images/macbook.png"
                    alt="MacBook Pro M1"
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100">
                      Click to expand
                    </span>
                  </div>
                </div>
              </div>

              {/* Laptop Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    MacBook Pro M1
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    16GB Unified Memory • 512GB SSD
                  </p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full border border-zinc-500/50 text-zinc-400">
                  Space Gray
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="border-t border-border/30 my-12" />

        {/* Section 02: Development */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Section Title */}
            <div className="lg:col-span-3">
              <motion.div variants={itemVariants}>
                <p className="text-sm text-muted-foreground mb-2">02</p>
                <h2
                  className="text-2xl text-foreground"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Development
                </h2>
              </motion.div>
            </div>

            {/* Right: Tools Grid */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {developmentTools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                  >
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all group block"
                    >
                      <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                        <ToolIcon icon={tool.icon} name={tool.name} color={tool.color} />
                      </div>
                      <span className="text-sm text-foreground text-center">
                        {tool.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="border-t border-border/30 my-12" />

        {/* Section 03: Productivity */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Section Title */}
            <div className="lg:col-span-3">
              <motion.div variants={itemVariants}>
                <p className="text-sm text-muted-foreground mb-2">03</p>
                <h2
                  className="text-2xl text-foreground"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Desk Setup
                </h2>
              </motion.div>
            </div>

            {/* Right: Items */}
            <div className="lg:col-span-9">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { name: "LG 27\" 4K Monitor", description: "27UK850-W" },
                  { name: "Keychron K2", description: "Mechanical Keyboard" },
                  { name: "Logitech MX Master 3", description: "Wireless Mouse" },
                  { name: "AirPods Pro 2", description: "Active Noise Cancellation" },
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="p-5 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 transition-all"
                  >
                    <h3 className="text-foreground font-medium mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
