"use client";

import { Technology, getIconData } from "@/app/lib/technologies";

interface TechStackScrollerProps {
  technologies: Technology[];
  direction: "left" | "right";
  speed?: number; // Duration in seconds
}

export default function TechStackScroller({
  technologies,
  direction,
  speed = 20,
}: TechStackScrollerProps) {
  // CSS animation class based on direction
  const animationClass = direction === "right"
    ? "animate-scroll-left"
    : "animate-scroll-right";

  // Render tech items
  const renderTechItems = () =>
    technologies.map((tech, index) => {
      const iconData = getIconData(tech.iconSlug);
      const hasIconPath = iconData?.path && iconData.path.length > 0;

      return (
        <div
          key={`${tech.name}-${index}`}
          className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground hover:scale-105 transition-all duration-200 cursor-default"
        >
          {hasIconPath ? (
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 flex-shrink-0"
              fill={iconData.hex}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={iconData.path} />
            </svg>
          ) : tech.fallbackIcon ? (
            <tech.fallbackIcon className="h-3.5 w-3.5 flex-shrink-0" />
          ) : null}
          <span className="text-xs font-medium tracking-tight whitespace-nowrap" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', letterSpacing: '-0.01em' }}>
            {tech.name}
          </span>
        </div>
      );
    });

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      {/* Animated track - width: max-content ensures it sizes to content */}
      <div
        className={animationClass}
        style={{
          display: "flex",
          width: "max-content",
          animationDuration: `${speed}s`,
        }}
      >
        {/* First strip */}
        <div className="flex gap-2 md:gap-3 lg:gap-4 pr-2 md:pr-3 lg:pr-4">
          {renderTechItems()}
        </div>
        {/* Second strip (duplicate for seamless loop) */}
        <div className="flex gap-2 md:gap-3 lg:gap-4 pr-2 md:pr-3 lg:pr-4">
          {renderTechItems()}
        </div>
      </div>
    </div>
  );
}
