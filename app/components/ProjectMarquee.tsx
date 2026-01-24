"use client";

interface ProjectFeature {
  title: string;
  description: string;
}

const projectFeatures: ProjectFeature[] = [
  // Image to Voxel
  {
    title: "Image to Voxel",
    description: "Turns a prompt into an image, then generates a voxel-art HTML scene",
  },
  {
    title: "Prompt-to-Image Generation",
    description: "Creates clean subject images on simple backgrounds using OpenAI",
  },
  {
    title: "Voxel Scene Generation",
    description: "Generates single-page Three.js HTML files with Google Gemini",
  },
  // GourmetVision
  {
    title: "GourmetVision",
    description: "Transforms restaurant menus into visual experiences with AI",
  },
  {
    title: "Menu Scanning & Analysis",
    description: "Extracts dish names, descriptions, prices using Gemini API",
  },
  {
    title: "AI Food Photo Generation",
    description: "Creates realistic food photos for each dish using OpenAI",
  },
  {
    title: "Multi-Language Support",
    description: "Automatically translates menu items to English",
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
