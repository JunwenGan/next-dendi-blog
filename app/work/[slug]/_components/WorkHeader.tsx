"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar } from "lucide-react";
import type { WorkFrontmatter } from "@/app/lib/works";

interface WorkHeaderProps {
  frontmatter: WorkFrontmatter;
}

export default function WorkHeader({ frontmatter }: WorkHeaderProps) {
  const { title, summary, date, techStack, githubUrl, liveUrl } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.header
      className="mb-8 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-xs font-mono bg-muted/50 border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
        }}
      >
        {title}
      </h1>

      {/* Summary */}
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
        {summary}
      </p>

      {/* Meta & Links */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Links */}
        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.header>
  );
}
