"use client";

import { motion } from "framer-motion";

interface TagsListProps {
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
}

export default function TagsList({ tags, selectedTag, onTagClick }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => {
        const isSelected = selectedTag === tag;
        return (
          <motion.button
            key={tag}
            onClick={() => onTagClick(isSelected ? null : tag)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 ${
              isSelected
                ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}
