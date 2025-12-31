import { Metadata } from "next";
import DecorativeSideBars from "../components/DecorativeSideBars";
import BucketHero from "./_components/BucketHero";
import BucketSection from "./_components/BucketSection";
import { BucketSectionData } from "./_components/BucketSection";

export const metadata: Metadata = {
  title: "Bucket List - Frederick",
  description: "Life milestones and goals I'm working towards.",
};

// Sample data - you can edit this to match your own milestones and goals
const sections: BucketSectionData[] = [
  {
    number: "01",
    title: "Milestones",
    items: [
      {
        id: "1",
        title: "Remote working with client from abroad",
        description:
          "Secured my first international contract via cold outreach on LinkedIn. Delivered a full-stack SaaS MVP.",
        completed: true,
        date: "Sep 2024",
      },
      {
        id: "2",
        title: "Get a Remote Job",
        description:
          "Transitioned to a full-time remote role at a forward-thinking tech company, enabling a location-independent lifestyle.",
        completed: true,
        date: "Jan 2025",
      },
      {
        id: "3",
        title: "Create portfolio website",
        description:
          "Launched v2.0 of this digital garden. Focused on performance, micro-interactions, and a clean bento-grid aesthetic.",
        completed: true,
        date: "Aug 2024",
        link: "/",
      },
      {
        id: "4",
        title: "First OpenSource contribution",
        description:
          "Merged a PR into a popular UI library, fixing a critical accessibility bug.",
        completed: true,
        date: "Nov 2024",
      },
    ],
  },
  {
    number: "02",
    title: "The List",
    description:
      "Goals, dreams, and technical ambitions I'm actively working towards.",
    items: [
      {
        id: "5",
        title: "Skydiving",
        description:
          "To experience freefall and conquer the fear of heights from 13,000 feet.",
        completed: false,
      },
      {
        id: "6",
        title: "Do 10K marathon",
        description:
          "Training to build endurance and mental toughness. Target time: Sub 60 mins.",
        completed: false,
      },
      {
        id: "7",
        title: "Solo travel to another country",
        description:
          "To immerse myself in a completely different culture without a safety net.",
        completed: false,
      },
      {
        id: "8",
        title: "Write a book about programming",
        description:
          "Share knowledge and insights accumulated over years of building software.",
        completed: false,
      },
      {
        id: "9",
        title: "Get 1,000+ GitHub followers",
        description:
          "Build a reputation through consistent open source contributions and useful repositories.",
        completed: false,
      },
      {
        id: "10",
        title: "Launch a profitable side project",
        description:
          "Create a SaaS product that generates sustainable recurring revenue.",
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
