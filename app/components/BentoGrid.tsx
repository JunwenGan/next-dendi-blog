"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Linkedin, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import MeshGradient from "./MeshGradient";
import TechStackScroller from "./TechStackScroller";
import { techRow1, techRow2, techRow3 } from "@/app/lib/technologies";

interface BentoGridProps {
  featuredProject?: {
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    githubUrl: string | null;
    tags: string[];
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function BentoGrid({ featuredProject }: BentoGridProps) {
  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Mesh Gradient Background - Morphing blobs */}
      <MeshGradient />
      
      {/* Noise Texture Overlay for premium feel - only for this section */}
      <div className="noise-texture absolute inset-0" />
      
      <motion.div
        className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {/* Top Section: Profile Picture and Collaboration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Collaboration Card - Left */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-pink-400" fill="currentColor" />
              </div>
              <CardDescription className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                COLLABORATION
              </CardDescription>
              <CardTitle className="text-lg text-white">
                I prioritize client collaboration, fostering open communication
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Profile Picture - Center */}
        <motion.div variants={itemVariants} className="md:col-span-1 flex items-center justify-center">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-gray-800/30 border border-gray-700/50 blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-gray-800/30 border border-gray-700/50 blur-sm"></div>
            {/* Profile picture */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty space - Right */}
        <div className="hidden md:block md:col-span-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 auto-rows-[minmax(220px,auto)]">
        {/* Box 1: Hero / Intro - Top Left, 2 columns, 1 row */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 md:row-span-1"
        >
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">Available for work</Badge>
              </div>
              <CardTitle className="text-3xl md:text-4xl text-white">
                Hello, I&apos;m Dendi
              </CardTitle>
              <CardDescription className="text-lg text-gray-400">
                Full Stack Developer & Problem Solver
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">
                I build modern web applications with a focus on performance,
                user experience, and clean code. Passionate about turning ideas
                into seamless digital experiences.
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Link href="/guestbook">Guestbook</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 2: Technology Stack Scrolling Section - Top Right, 1 column, 2 rows */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-white font-serif leading-[1.15]" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, letterSpacing: '0.01em', fontStyle: 'normal' }}>
                Passionate about cutting-edge technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-14 pt-0">
              {/* Row 1: Scroll right to left */}
              <TechStackScroller
                technologies={techRow1}
                direction="right"
                speed={5}
              />
              {/* Row 2: Scroll left to right */}
              <TechStackScroller
                technologies={techRow2}
                direction="left"
                speed={5}
              />
              {/* Row 3: Scroll right to left */}
              <TechStackScroller
                technologies={techRow3}
                direction="right"
                speed={5}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 3: Time Zone Communications - Left, 1 column, 2 rows */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">I&apos;m very flexible with time zone communications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3 py-1.5 border-gray-700 text-gray-300">🇬🇧 UK</Badge>
                <Badge variant="outline" className="px-3 py-1.5 border-gray-700 text-gray-300 bg-gray-800/50">🇮🇳 India</Badge>
                <Badge variant="outline" className="px-3 py-1.5 border-gray-700 text-gray-300">🇺🇸 USA</Badge>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-gray-700/50 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <span className="text-4xl">🌍</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 4: Let's Work Together - Second Row, Right */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Let&apos;s work together on your next project</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600"
              >
                <a href="mailto:hello@example.com" className="flex items-center gap-2">
                  <span>✉️</span>
                  hello@example.com
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 5: Websites that Impact - Second Row, Right, spans 2 columns */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
          <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">
                Websites that <span className="text-blue-400">Impact.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 mb-4">
                {/* Browser Window Style */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-1 bg-gray-900/50 rounded px-2 py-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500">🔒</span>
                    <span className="text-xs text-gray-400">https://example.com</span>
                  </div>
                </div>
                <div className="bg-gray-900/30 rounded p-4 min-h-[100px] flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 opacity-30">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-full h-8 bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" className="bg-white text-gray-900 hover:bg-gray-200">
                  Start →
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}

