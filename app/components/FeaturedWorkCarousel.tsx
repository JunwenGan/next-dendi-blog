"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Work } from "@/app/lib/works";

interface FeaturedWorkCarouselProps {
  works: Work[];
}

export default function FeaturedWorkCarousel({ works }: FeaturedWorkCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

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

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 hidden md:flex items-center justify-center"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 hidden md:flex items-center justify-center"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {works.map((work, index) => (
                <div
                  key={work.slug}
                  className="flex-[0_0_100%] min-w-0 pl-0"
                >
                  <motion.div
                    className="mx-2 md:mx-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-2/5 h-64 md:h-80 overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20">
                          {work.frontmatter.image ? (
                            <Image
                              src={work.frontmatter.image}
                              alt={work.frontmatter.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-6xl font-bold text-foreground/10">
                                {work.frontmatter.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 hidden md:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {work.frontmatter.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs font-mono bg-muted/50 border border-border/50 rounded-full text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                            {work.frontmatter.techStack.length > 4 && (
                              <span className="px-3 py-1 text-xs font-mono text-muted-foreground">
                                +{work.frontmatter.techStack.length - 4}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3
                            className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-3"
                            style={{
                              fontFamily: "var(--font-cormorant), serif",
                              fontWeight: 500,
                            }}
                          >
                            {work.frontmatter.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-muted-foreground mb-6 line-clamp-3 md:line-clamp-none">
                            {work.frontmatter.summary}
                          </p>

                          {/* Links */}
                          <div className="flex flex-wrap items-center gap-3">
                            {work.frontmatter.githubUrl && (
                              <a
                                href={work.frontmatter.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span>Code</span>
                              </a>
                            )}
                            {work.frontmatter.liveUrl && (
                              <a
                                href={work.frontmatter.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>Live Demo</span>
                              </a>
                            )}
                            <Link
                              href={`/work/${work.slug}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link ml-auto"
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {works.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-purple-500"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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
