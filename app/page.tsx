import { Metadata } from "next";
import Hero from "./Hero";
import BentoGrid from "./components/BentoGrid";
import HomeAboutSection from "./components/HomeAboutSection";
import MySiteSection from "./components/MySiteSection";
import SkillsSection from "./components/SkillsSection";
import { getFeaturedProject } from "./lib/projects";

export default async function Home() {
  const featuredProject = await getFeaturedProject();

  return (
    <>
      <Hero />
      <BentoGrid featuredProject={featuredProject || undefined} />
      <HomeAboutSection />
      <MySiteSection />
      <SkillsSection />
    </>
  );
}

export const metadata: Metadata = {
  title: "Frederick - Blog",
  description: "This is Frederick Blog"
}