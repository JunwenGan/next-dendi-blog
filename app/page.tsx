'use client'
import { useRef } from "react";
import Hero from "./Hero";
import HomeBottom from "./HomeBottom";
import Footer from "./components/Footer";
export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Hero onScrollClick={handleScroll} />
      <HomeBottom targetRef={targetRef} />
      <Footer />
    </>
  );
}
