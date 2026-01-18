"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import Link from "next/link";

export interface BucketItemData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
  link?: string;
}

interface BucketItemProps {
  item: BucketItemData;
  index: number;
}

export default function BucketItem({ item, index }: BucketItemProps) {
  return (
    <motion.div
      className="relative py-6 group"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline checkbox */}
      <div className="absolute -left-[41px] w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center transition-colors group-hover:bg-muted/80">
        {item.completed ? (
          <CheckCircle2 className="w-5 h-5 text-purple-500" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Title with optional link */}
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            {item.title}
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Date badge */}
        {item.date && (
          <div className="shrink-0 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground">
            {item.date}
          </div>
        )}
      </div>
    </motion.div>
  );
}
