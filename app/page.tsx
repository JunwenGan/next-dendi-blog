'use client'
import Hero from "./Hero";
import HomeBottom from "./HomeBottom";
import React, { useRef } from "react";
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
    </>
  );
}
