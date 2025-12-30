"use client";

interface ProjectFeature {
  title: string;
  description: string;
}

const projectFeatures: ProjectFeature[] = [
  {
    title: "Authentication System",
    description: "Secure user auth with OAuth, JWT tokens, and role-based access control",
  },
  {
    title: "Monitoring & Analytics Infrastructure",
    description: "Provides real-time metrics, logging, and performance tracking",
  },
  {
    title: "Design System & UI Consistency",
    description: "Unified design assets, including typography and component library",
  },
  {
    title: "API Gateway & Documentation",
    description: "Guides developers to integrate with the SaaS platform efficiently",
  },
  {
    title: "User Onboarding Flow Design",
    description: "Step-by-step guides and interactive tutorials for new users",
  },
  {
    title: "Payment System Architecture",
    description: "Handles recurring payments, upgrades, and billing management",
  },
];

export default function ProjectMarquee() {
  const renderFeatureCards = () =>
    projectFeatures.map((feature, index) => (
      <div
        key={`${feature.title}-${index}`}
        className="feature-card flex-shrink-0 w-[180px] p-3 rounded-lg bg-muted/40 border border-border/40 transition-all duration-300 cursor-pointer"
      >
        <h4 className="text-xs font-medium text-foreground mb-1 line-clamp-2">
          {feature.title}
        </h4>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          {feature.description}
        </p>
      </div>
    ));

  return (
    <div
      className="relative overflow-hidden w-full group/marquee"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      {/* Marquee Track */}
      <div className="flex gap-4 animate-marquee-scroll group-hover/marquee:[animation-play-state:paused]">
        {/* First set */}
        <div className="flex gap-4 shrink-0">
          {renderFeatureCards()}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-4 shrink-0">
          {renderFeatureCards()}
        </div>
      </div>
    </div>
  );
}
