"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { PostFrontmatter } from "@/app/lib/mdx";

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

export default function PostHeader({ frontmatter }: PostHeaderProps) {
  const date = new Date(frontmatter.date);
  const formattedDate = format(date, "MMM dd, yyyy");
  const relativeTime = formatDistanceToNow(date, { addSuffix: false });

  return (
    <header className="mb-8">
      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="px-3 py-1 text-xs rounded-lg bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {tag}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 500,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {frontmatter.title}
      </motion.h1>

      {/* Summary */}
      {frontmatter.summary && (
        <motion.p
          className="text-lg text-muted-foreground mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {frontmatter.summary}
        </motion.p>
      )}

      {/* Author and Meta */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-border/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Author */}
        <div className="flex items-center gap-3">
          {frontmatter.author?.avatar ? (
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-border">
              <Image
                src={frontmatter.author.avatar}
                alt={frontmatter.author.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-border">
              <span className="text-white font-medium text-sm">
                {frontmatter.author?.name?.charAt(0) || "D"}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">
              {frontmatter.author?.name || "Dendi"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formattedDate} ({relativeTime} ago)
            </p>
          </div>
        </div>

        {/* Read Time */}
        {frontmatter.readTime && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {frontmatter.readTime}
          </div>
        )}
      </motion.div>
    </header>
  );
}
