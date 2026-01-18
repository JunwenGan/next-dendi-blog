import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/app/lib/mdx";
import BlogHero from "./_components/BlogHero";
import BlogClient from "./_components/BlogClient";
import DecorativeSideBars from "@/app/components/DecorativeSideBars";

export const metadata: Metadata = {
  title: "Blog | Frederick",
  description: "Handpicked insights on frontend development, tools, and productivity.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Hero Section */}
      <BlogHero />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 pb-20">
        <BlogClient posts={posts} tags={tags} />
      </div>
    </main>
  );
}
