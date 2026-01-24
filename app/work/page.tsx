import { Metadata } from "next";
import { getAllWorks } from "@/app/lib/works";
import WorkHero from "./_components/WorkHero";
import WorkCard from "./_components/WorkCard";
import DecorativeSideBars from "@/app/components/DecorativeSideBars";

export const metadata: Metadata = {
  title: "Work | Frederick",
  description: "A collection of projects I've built, exploring AI, web development, and creative coding.",
};

export default async function WorkPage() {
  const works = await getAllWorks();

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Hero Section */}
      <WorkHero />

      {/* Works Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {works.map((work, index) => (
            <WorkCard
              key={work.slug}
              slug={work.slug}
              frontmatter={work.frontmatter}
              index={index}
            />
          ))}
        </div>

        {works.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
