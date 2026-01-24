import { Metadata } from "next";
import Hero from "./Hero";
import BentoGrid from "./components/BentoGrid";
import HomeAboutSection from "./components/HomeAboutSection";
import MySiteSection from "./components/MySiteSection";
import SkillsSection from "./components/SkillsSection";
import FeaturedWorkCarousel from "./components/FeaturedWorkCarousel";
import { getFeaturedWorks } from "./lib/works";

export default async function Home() {
  const featuredWorks = await getFeaturedWorks();

  return (
    <>
      <Hero />
      <BentoGrid />
      <FeaturedWorkCarousel works={featuredWorks} />
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