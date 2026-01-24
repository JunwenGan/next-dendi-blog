"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import type { WorkFrontmatter } from "@/app/lib/works";

interface WorkCardProps {
  slug: string;
  frontmatter: WorkFrontmatter;
  index: number;
}

export default function WorkCard({ slug, frontmatter, index }: WorkCardProps) {
  const { title, summary, image, techStack, githubUrl, liveUrl } = frontmatter;

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/work/${slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          {/* Image */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground/20">
                  {title.charAt(0)}
                </span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-3">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded-full text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="px-2 py-1 text-xs font-mono text-muted-foreground">
                  +{techStack.length - 4}
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="text-xl md:text-2xl text-foreground mb-2 group-hover:text-purple-400 transition-colors"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 500,
              }}
            >
              {title}
            </h2>

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {summary}
            </p>

            {/* Read More */}
            <div className="flex items-center text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
              <span>View Project</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>

      {/* External Links - positioned absolutely */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
