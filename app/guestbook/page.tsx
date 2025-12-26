import { Metadata } from "next";
import GuestbookClient from "./GuestbookClient";
import prisma from "@/prisma/client";

export const metadata: Metadata = {
  title: "Guestbook - Dendi Portfolio",
  description: "Leave a message in my guestbook",
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
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Guestbook</h1>
        <p className="text-muted-foreground text-lg">
          Leave a message! I&apos;d love to hear from you.
        </p>
      </div>

      <GuestbookClient initialEntries={entries} />
    </div>
  );
}



