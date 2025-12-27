"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Linkedin, ExternalLink, Heart, Copy, Check } from "lucide-react";
import Link from "next/link";
import MeshGradient from "./MeshGradient";
import TechStackScroller from "./TechStackScroller";
import InteractiveGlobe from "./InteractiveGlobe";
import { techRow1, techRow2, techRow3 } from "@/app/lib/technologies";
import confetti from "canvas-confetti";

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
  const [copied, setCopied] = useState(false);
  const email = "junonegan@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
      });

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section className="relative bg-background min-h-screen overflow-hidden">
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
          <Card className="h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-accent-pink/10">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-accent-pink" fill="currentColor" />
              </div>
              <CardDescription className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                COLLABORATION
              </CardDescription>
              <CardTitle className="text-lg text-foreground">
                I prioritize client collaboration, fostering open communication
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Profile Picture - Center */}
        <motion.div variants={itemVariants} className="md:col-span-1 flex items-center justify-center">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-muted/30 border border-border/50 blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-muted/30 border border-border/50 blur-sm"></div>
            {/* Profile picture */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
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
          <Card className="h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-accent-green/20 text-accent-green border-accent-green/30">Available for work</Badge>
              </div>
              <CardTitle className="text-3xl md:text-4xl text-foreground">
                Hello, I&apos;m Dendi
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Full Stack Developer & Problem Solver
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-4">
                I build modern web applications with a focus on performance,
                user experience, and clean code. Passionate about turning ideas
                into seamless digital experiences.
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" className="border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Link href="/guestbook">Guestbook</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 2: Technology Stack Scrolling Section - Top Right, 1 column, 2 rows */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <Card className="group h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl md:text-2xl lg:text-3xl text-foreground font-serif leading-[1.15] text-center" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, letterSpacing: '0.01em', fontStyle: 'normal' }}>
                Passionate about cutting-edge technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-0 relative">
              {/* Circular Rings Background - Responsive */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-purple-500/30 animate-pulse" />
                <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-purple-500/20" />
                <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-purple-500/15" />
                <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border border-purple-500/10" />
              </div>

              {/* Tech Stack Scrollers */}
              <div className="relative space-y-6">
                {/* Row 1: Scroll right to left */}
                <TechStackScroller
                  technologies={techRow1}
                  direction="right"
                  speed={15}
                />
                {/* Row 2: Scroll left to right */}
                <TechStackScroller
                  technologies={techRow2}
                  direction="left"
                  speed={15}
                />
                {/* Row 3: Scroll right to left */}
                <TechStackScroller
                  technologies={techRow3}
                  direction="right"
                  speed={15}
                />
              </div>

              {/* Browser Preview with Hover Effect */}
              <div className="relative">
                <div className="relative bg-muted/30 rounded-lg p-3 border border-border/50 transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:border-purple-500/30">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/60 group-hover:bg-yellow-500 transition-colors"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/60 group-hover:bg-green-500 transition-colors"></div>
                    </div>
                    <div className="flex-1 bg-background/40 rounded px-2 py-0.5 flex items-center gap-1 group-hover:bg-background/70 transition-colors">
                      <span className="text-[10px] text-muted-foreground">🔒</span>
                      <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300">dendi.dev</span>
                    </div>
                  </div>
                  {/* Browser Content */}
                  <div className="bg-background/20 rounded p-3 group-hover:bg-background/40 transition-colors">
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-muted/50 rounded group-hover:bg-muted/70 transition-colors"></div>
                      <div className="h-2 w-1/2 bg-muted/50 rounded group-hover:bg-muted/70 transition-colors"></div>
                      <div className="flex gap-2 mt-3">
                        <div className="h-6 w-12 bg-purple-500/30 rounded group-hover:bg-purple-500/50 transition-colors"></div>
                        <div className="h-6 w-12 bg-muted/30 rounded group-hover:bg-muted/50 transition-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 3: Time Zone Communications - Left, 1 column, 2 rows */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
          <Card className="h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-accent-blue/10 overflow-hidden flex flex-col">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-foreground font-serif text-xl md:text-2xl text-center" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, fontStyle: 'italic' }}>
                I&apos;m very flexible with <span className="text-accent-blue">time zone communications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-0 pb-4 px-4 relative min-h-[300px]">
              <InteractiveGlobe defaultLocation="Australia" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 4: Let's Work Together - Second Row, Right */}
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <Card className="h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-center">
            <CardHeader className="pb-4 pt-8 px-8">
              <CardTitle className="text-shimmer text-xl md:text-2xl text-center leading-relaxed">
                Let&apos;s work together on your next project
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-8 px-8">
              <Button
                variant="outline"
                onClick={copyEmail}
                className="w-full justify-center border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border/80 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Copied to clipboard!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Box 5: Websites that Impact - Second Row, Right, spans 2 columns */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
          <Card className="group h-full bg-card/50 border-border hover:border-border/80 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-accent-blue/10 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground">
                Websites that <span className="text-accent-blue">Impact.</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 relative">
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Browser Mockup with Hover Animation */}
              <div className="relative bg-muted/50 rounded-lg p-4 border border-border/50 mb-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-accent-blue/20 group-hover:border-accent-blue/30">
                {/* Browser Window Style */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors"></div>
                  </div>
                  <div className="flex-1 bg-background/50 rounded px-2 py-1 flex items-center gap-2 group-hover:bg-background/80 transition-colors">
                    <span className="text-xs text-muted-foreground">🔒</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">dendi-blog.vercel.app</span>
                  </div>
                </div>
                <div className="bg-background/30 rounded p-4 min-h-[100px] flex items-center justify-center group-hover:bg-background/50 transition-colors">
                  <div className="grid grid-cols-4 gap-2 opacity-30 group-hover:opacity-50 transition-opacity">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-full h-8 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative flex gap-2">
                <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90">
                  Start →
                </Button>
                <Button variant="outline" className="border-border text-muted-foreground hover:bg-muted hover:text-foreground">
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

