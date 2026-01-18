"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@/app/lib/mdx";

interface BlogPostCardProps {
  post: Post;
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const { frontmatter, slug } = post;
  const formattedDate = format(new Date(frontmatter.date), "MMM dd yyyy").toUpperCase();

  return (
    <motion.article
      className="group py-8 border-b border-border/50 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${slug}`} className="flex gap-6 items-start">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Date */}
          <time className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
            {formattedDate}
          </time>

          {/* Title */}
          <h2
            className="text-xl md:text-2xl text-foreground mt-2 group-hover:text-purple-400 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
            }}
          >
            {frontmatter.title}
          </h2>

          {/* Summary */}
          {frontmatter.summary && (
            <p className="text-muted-foreground mt-3 line-clamp-2 text-sm md:text-base">
              {frontmatter.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4">
            {frontmatter.readTime && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {frontmatter.readTime}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-purple-400 group-hover:gap-2.5 transition-all duration-300">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        {frontmatter.image && (
          <div className="hidden md:block relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
      </Link>
    </motion.article>
  );
}
