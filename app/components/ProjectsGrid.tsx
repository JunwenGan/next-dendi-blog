"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  tags: string[];
  featured: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No projects yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
            {project.imageUrl && (
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default">Featured</Badge>
                  </div>
                )}
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              {project.description && (
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 mt-auto">
                {project.url && (
                  <Button asChild variant="default" size="sm" className="flex-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}




