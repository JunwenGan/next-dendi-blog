"use client";

import { motion } from "framer-motion";
import { Music, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Tool icons for Uses card
const tools = [
  { name: "VS Code", color: "#007ACC", icon: "💻" },
  { name: "Figma", color: "#F24E1E", icon: "🎨" },
  { name: "GitHub", color: "#333", icon: "🐙" },
];

export default function MySiteSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            MY SITE
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
            }}
          >
            Explore, experiment
            <br />
            <span
              className="italic bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent"
              style={{ fontWeight: 500 }}
            >
              && say hello
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Uses Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/uses" className="block group">
              <div className="relative h-[320px] rounded-2xl bg-card/50 border border-border/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-purple-500/10">
                {/* Tool icons */}
                <div className="flex items-center justify-center gap-3 pt-12 pb-8">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      className="w-16 h-16 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-2xl"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {tool.icon}
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    USES
                  </p>
                  <h3 className="text-lg font-medium text-foreground group-hover:text-purple-400 transition-colors">
                    Check out my favorite tools
                  </h3>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Guestbook Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/guestbook" className="block group">
              <div className="relative h-[320px] rounded-2xl bg-card/50 border border-border/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-pink-500/10">
                {/* Device mockups */}
                <div className="flex items-center justify-center pt-8 pb-4">
                  <div className="relative">
                    {/* Phone mockup */}
                    <div className="w-24 h-36 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-1 transform -rotate-6 shadow-xl">
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <div className="space-y-1">
                          <div className="w-12 h-1 bg-white/30 rounded" />
                          <div className="w-8 h-1 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                    {/* Tablet mockup */}
                    <div className="absolute -right-12 top-4 w-28 h-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-1 transform rotate-6 shadow-xl">
                      <div className="w-full h-full rounded bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                        <div className="space-y-1">
                          <div className="w-16 h-1 bg-white/30 rounded" />
                          <div className="w-12 h-1 bg-white/20 rounded" />
                          <div className="w-8 h-1 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    GUESTBOOK
                  </p>
                  <h3 className="text-lg font-medium text-foreground group-hover:text-pink-400 transition-colors">
                    Let me know you were here
                  </h3>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Spotify Card (Static) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[320px] rounded-2xl bg-card/50 border border-border/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 p-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Music className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Last Played
                </span>
              </div>

              {/* Song Info */}
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Last Played{" "}
                  <span className="text-green-400 font-medium">Midnight City</span>{" "}
                  by <span className="text-foreground">M83</span> from{" "}
                  <span className="text-foreground">Hurry Up, We&apos;re Dreaming</span>
                </p>
              </div>

              {/* Album Art */}
              <div className="flex justify-center px-4">
                <div className="relative">
                  {/* Vinyl record effect */}
                  <div className="absolute inset-0 -right-4 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-gray-700">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-600" />
                      </div>
                    </div>
                  </div>
                  {/* Album cover */}
                  <div className="relative w-36 h-36 rounded-lg overflow-hidden shadow-2xl z-10">
                    <Image
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
                      alt="Album art"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Spotify branding */}
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center gap-1 text-green-500 text-xs">
                  <Music className="w-3 h-3" />
                  <span>Spotify</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
