import { Metadata } from "next";
import DecorativeSideBars from "../components/DecorativeSideBars";
import BucketHero from "./_components/BucketHero";
import BucketSection from "./_components/BucketSection";
import { BucketSectionData } from "./_components/BucketSection";

export const metadata: Metadata = {
  title: "Bucket List - Frederick",
  description: "Life milestones and goals I'm working towards.",
};

const sections: BucketSectionData[] = [
  {
    number: "01",
    title: "Milestones",
    items: [
      {
        id: "1",
        title: "Bachelor's Degree in Computer Science",
        description:
          "Graduated with a Computer Science degree from university in China, building a strong foundation in algorithms, data structures, and software engineering.",
        completed: true,
        date: "Jun 2020",
      },
      {
        id: "2",
        title: "First Software Developer Job",
        description:
          "Landed my first professional role as a software developer in China, kickstarting my career in tech just two months after graduation.",
        completed: true,
        date: "Aug 2020",
      },
      {
        id: "3",
        title: "Master's Degree at Monash University",
        description:
          "Moved to Australia to pursue a Master of Information Technology at Monash University, expanding my skills and experiencing a new culture.",
        completed: true,
        date: "Feb 2023",
      },
      {
        id: "4",
        title: "Graduated with Master's Degree",
        description:
          "Successfully completed my Master of IT at Monash University, gaining advanced knowledge in software development and project management.",
        completed: true,
        date: "Dec 2024",
      },
      {
        id: "5",
        title: "Create Portfolio Website",
        description:
          "Built this digital portfolio from scratch using Next.js, featuring a modern bento-grid design with smooth animations and dark/light mode.",
        completed: true,
        date: "Jan 2025",
        link: "/",
      },
      {
        id: "6",
        title: "First Remote Job in Australia",
        description:
          "Secured my first remote software developer position in Australia, enabling a flexible work-life balance and location independence.",
        completed: true,
        date: "Mar 2025",
      },
    ],
  },
  {
    number: "02",
    title: "The List",
    description:
      "Goals, dreams, and adventures I'm working towards or have already conquered.",
    items: [
      {
        id: "7",
        title: "Go Abroad Alone for Study",
        description:
          "Took the leap to move to Australia by myself to pursue higher education, embracing independence and personal growth.",
        completed: true,
        date: "Feb 2023",
      },
      {
        id: "8",
        title: "Travel to New Zealand",
        description:
          "Explored the stunning landscapes of New Zealand - from the mountains to the coastlines, an unforgettable adventure.",
        completed: true,
        date: "Jan 2026",
      },
      {
        id: "9",
        title: "Get My First Car",
        description:
          "Achieved the milestone of owning my first car, gaining freedom and independence for road trips and daily commutes.",
        completed: true,
        date: "Jul 2025",
      },
      {
        id: "10",
        title: "Skydiving",
        description:
          "To experience the ultimate adrenaline rush - freefalling from 15,000 feet and conquering any fear of heights.",
        completed: false,
      },
      {
        id: "11",
        title: "Solo Travel to Another Country",
        description:
          "Plan a solo adventure to a completely new country, navigating foreign cultures and making memories on my own terms.",
        completed: false,
      },
      {
        id: "12",
        title: "Get 1,000+ GitHub Followers",
        description:
          "Build a strong open source presence through consistent contributions and creating useful repositories for the developer community.",
        completed: false,
      },
      {
        id: "13",
        title: "Big 3 Total: 300kg",
        description:
          "Hit a combined 300kg total in the powerlifting big three (squat, bench press, deadlift) through dedicated strength training.",
        completed: false,
      },
      {
        id: "14",
        title: "Launch a Profitable Side Project",
        description:
          "Create and launch a SaaS product or app that generates sustainable recurring revenue and provides real value to users.",
        completed: false,
      },
    ],
  },
];

export default function BucketListPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      <div className="container mx-auto px-8 md:px-16 lg:px-20">
        <BucketHero />

        <div className="pb-20">
          {sections.map((section) => (
            <BucketSection key={section.number} section={section} />
          ))}
        </div>
      </div>
    </main>
  );
}
