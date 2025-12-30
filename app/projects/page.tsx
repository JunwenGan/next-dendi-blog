import { Metadata } from "next";
import { getAllProjects } from "../lib/projects";
import ProjectsGrid from "../components/ProjectsGrid";
import DecorativeSideBars from "../components/DecorativeSideBars";

export const metadata: Metadata = {
  title: "Projects - Dendi Portfolio",
  description: "A showcase of my projects and work",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-background relative">
      <DecorativeSideBars />
      <div className="container mx-auto px-4 py-20 pl-8 pr-8 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg">
            A collection of projects I&apos;ve built. Each one represents a
            unique challenge and learning experience.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}



