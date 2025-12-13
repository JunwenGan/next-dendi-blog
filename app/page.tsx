import { Metadata } from "next";
import Hero from "./Hero";
import Footer from "./components/Footer";
import BentoGrid from "./components/BentoGrid";
import { getFeaturedProject } from "./lib/projects";

export default async function Home() {
  const featuredProject = await getFeaturedProject();

  return (
    <>
      <Hero />
      <BentoGrid featuredProject={featuredProject || undefined} />
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: "Dendi - Blog",
  description: "This is Dendi Blog"
}