"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { TOCHeading } from "@/app/lib/mdx";

interface PostTOCProps {
  headings: TOCHeading[];
}

export default function PostTOC({ headings }: PostTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.nav
      className="sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-4 h-px bg-border" />
        On this page
      </p>
      <ul className="space-y-2 border-l border-border/50">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const indent = heading.level === 3 ? "pl-4" : heading.level === 4 ? "pl-6" : "";

          return (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`block w-full text-left text-sm py-1 pl-4 pr-2 border-l-2 -ml-px transition-all duration-200 ${indent} ${
                  isActive
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
