import * as simpleIcons from "simple-icons";
import { Cloud, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Technology {
  name: string;
  iconSlug: string; // Simple Icons key (e.g., "siReact")
  fallbackIcon?: LucideIcon; // Fallback Lucide icon if simple-icon not found
}

// Technology icon mappings to Simple Icons keys (with si prefix)
// You can find all available icons at: https://simpleicons.org/
const technologyIcons: Record<string, { iconSlug: string; fallbackIcon?: LucideIcon }> = {
  React: { iconSlug: "siReact" },
  Vue: { iconSlug: "siVuedotjs" },
  Html: { iconSlug: "siHtml5" },
  Css: { iconSlug: "siCss" }, // CSS3 is just "Css" in simple-icons
  JavaScript: { iconSlug: "siJavascript" },
  TypeScript: { iconSlug: "siTypescript" },
  "Next.js": { iconSlug: "siNextdotjs" },
  "Node.js": { iconSlug: "siNodedotjs" },
  Python: { iconSlug: "siPython" },
  Git: { iconSlug: "siGit" },
  GitHub: { iconSlug: "siGithub" },
  Docker: { iconSlug: "siDocker" },
  Postman: { iconSlug: "siPostman" },
  "CI/CD Pipelines": { iconSlug: "siGithubactions" }, // Using GitHub Actions as CI/CD icon
  Vercel: { iconSlug: "siVercel" },
  Heroku: { iconSlug: "siHeroku", fallbackIcon: Cloud }, // Fallback to Cloud icon
  AWS: { iconSlug: "siAmazonaws", fallbackIcon: Cloud }, // Fallback to Cloud icon
  "Agile/Scrum": { iconSlug: "siJira" }, // Using Jira as Agile/Scrum icon
  MySQL: { iconSlug: "siMysql" },
  MongoDB: { iconSlug: "siMongodb" },
  "AWS RDS": { iconSlug: "siAmazonrds", fallbackIcon: Database }, // Fallback to Database icon
};

// All technologies from the custom list
const allTechnologies: string[] = [
  "React",
  "Vue",
  "Html",
  "Css",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "Git",
  "GitHub",
  "Docker",
  "Postman",
  "CI/CD Pipelines",
  "Vercel",
  "Heroku",
  "AWS",
  "Agile/Scrum",
  "MySQL",
  "MongoDB",
  "AWS RDS",
];

// Create technology objects with icon slugs
export const technologies: Technology[] = allTechnologies.map((name) => {
  const iconConfig = technologyIcons[name] || { iconSlug: "siCode" };
  return {
    name,
    iconSlug: iconConfig.iconSlug,
    fallbackIcon: iconConfig.fallbackIcon,
  };
});

// Helper function to get icon data from simple-icons
export function getIconData(iconKey: string): { path: string; title: string; hex: string } {
  try {
    const key = iconKey as keyof typeof simpleIcons;
    const icon = simpleIcons[key];
    
    if (icon && typeof icon === 'object') {
      // Check if it has the expected structure
      if ('path' in icon && typeof (icon as any).path === 'string') {
        return {
          path: (icon as any).path,
          title: (icon as any).title || iconKey,
          hex: (icon as any).hex || "#000000",
        };
      }
    }
  } catch (error) {
    console.warn(`Icon not found for key: ${iconKey}`, error);
  }
  
  // Fallback - return empty path if icon not found
  return { path: "", title: iconKey, hex: "#FFFFFF" };
}

// Distribute technologies into three rows
export const techRow1: Technology[] = technologies.slice(0, 7); // React through Git
export const techRow2: Technology[] = technologies.slice(7, 14); // GitHub through Vercel
export const techRow3: Technology[] = technologies.slice(14); // Heroku through AWS RDS

