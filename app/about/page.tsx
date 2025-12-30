import { Metadata } from "next";
import DecorativeSideBars from "../components/DecorativeSideBars";
import AboutHero from "./_components/AboutHero";
import ExperienceSection from "./_components/ExperienceSection";
import MySiteSection from "./_components/MySiteSection";

export const metadata: Metadata = {
  title: "About - Frederick",
  description: "Learn more about Frederick, a creative engineer passionate about building dynamic web experiences.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Content wrapper with padding for bars */}
      <div className="pl-8 pr-8 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20">
        <AboutHero />
        <ExperienceSection />
        <MySiteSection />
      </div>
    </main>
  );
}
