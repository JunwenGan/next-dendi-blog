"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BlogSidebar from "./BlogSidebar";
import BlogPostCard from "./BlogPostCard";
import type { Post } from "@/app/lib/mdx";

interface BlogClientProps {
  posts: Post[];
  tags: string[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.summary?.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTag =
        selectedTag === null ||
        post.frontmatter.tags?.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
      {/* Sidebar */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <BlogSidebar
          postCount={filteredPosts.length}
          tags={tags}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          onSearchChange={setSearchQuery}
          onTagClick={setSelectedTag}
        />
      </div>

      {/* Posts List */}
      <div>
        {filteredPosts.length > 0 ? (
          <div>
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">
              No posts found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
