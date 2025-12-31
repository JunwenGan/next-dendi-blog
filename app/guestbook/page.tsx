import { Metadata } from "next";
import GuestbookClient from "./GuestbookClient";
import GuestbookHero from "./_components/GuestbookHero";
import prisma from "@/prisma/client";
import DecorativeSideBars from "../components/DecorativeSideBars";

export const metadata: Metadata = {
  title: "Guestbook - Frederick",
  description: "Leave your mark on the community wall",
};

export default async function GuestbookPage() {
  const entries = await prisma.guestbookEntry.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      <div className="container mx-auto px-8 md:px-16 lg:px-20">
        <GuestbookHero />

        <div className="pb-20">
          <GuestbookClient initialEntries={entries} />
        </div>
      </div>
    </main>
  );
}
