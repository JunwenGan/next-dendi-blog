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
  const FeatureCard = ({ feature }: { feature: ProjectFeature }) => (
    <div className="feature-card flex-shrink-0 w-[180px] p-3 rounded-lg bg-muted/40 border border-border/40 transition-all duration-300 cursor-pointer">
      <h4 className="text-xs font-medium text-foreground mb-1 line-clamp-2">
        {feature.title}
      </h4>
      <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );

  return (
    <div
      className="relative overflow-hidden w-full group/marquee"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      {/* Marquee Track - needs width: max-content for seamless loop */}
      <div
        className="flex gap-4 group-hover/marquee:[animation-play-state:paused]"
        style={{
          width: "max-content",
          animation: "marquee-scroll 45s linear infinite",
        }}
      >
        {/* First set */}
        {projectFeatures.map((feature, index) => (
          <FeatureCard key={`first-${index}`} feature={feature} />
        ))}
        {/* Duplicate set for seamless loop */}
        {projectFeatures.map((feature, index) => (
          <FeatureCard key={`second-${index}`} feature={feature} />
        ))}
      </div>
    </div>
  );
}
