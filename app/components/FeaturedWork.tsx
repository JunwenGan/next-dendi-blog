"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import type { Work } from "@/app/lib/works";

interface FeaturedWorkProps {
  works: Work[];
}

export default function FeaturedWork({ works }: FeaturedWorkProps) {
  if (works.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            FEATURED WORK
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
            }}
          >
            Recent{" "}
            <span
              className="italic bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
              style={{ fontWeight: 500 }}
            >
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {works.slice(0, 2).map((work, index) => (
            <motion.article
              key={work.slug}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/work/${work.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20">
                    {work.frontmatter.image ? (
                      <Image
                        src={work.frontmatter.image}
                        alt={work.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-foreground/20">
                          {work.frontmatter.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {work.frontmatter.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl md:text-2xl text-foreground mb-2 group-hover:text-purple-400 transition-colors"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                      }}
                    >
                      {work.frontmatter.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {work.frontmatter.summary}
                    </p>
                  </div>
                </div>
              </Link>

              {/* External Links */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {work.frontmatter.githubUrl && (
                  <a
                    href={work.frontmatter.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {work.frontmatter.liveUrl && (
                  <a
                    href={work.frontmatter.liveUrl}
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
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
