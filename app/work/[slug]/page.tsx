import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getWorkBySlug,
  getWorkSlugs,
  getHeadingsFromContent,
} from "@/app/lib/works";
import WorkHeader from "./_components/WorkHeader";
import WorkContent from "./_components/WorkContent";
import PostTOC from "@/app/blog/[slug]/_components/PostTOC";
import DecorativeSideBars from "@/app/components/DecorativeSideBars";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: `${work.frontmatter.title} | Frederick`,
    description: work.frontmatter.summary,
    openGraph: {
      title: work.frontmatter.title,
      description: work.frontmatter.summary,
      images: work.frontmatter.image ? [work.frontmatter.image] : undefined,
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const headings = getHeadingsFromContent(work.content);

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Hero Image */}
      {work.frontmatter.image && (
        <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
          <Image
            src={work.frontmatter.image}
            alt={work.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 lg:gap-12">
          {/* Main Content */}
          <div>
            <WorkHeader frontmatter={work.frontmatter} />
            <WorkContent mdxSource={work.mdxSource} />
          </div>

          {/* Table of Contents */}
          <aside className="hidden lg:block">
            <PostTOC headings={headings} />
          </aside>
        </div>
      </div>
    </main>
  );
}
