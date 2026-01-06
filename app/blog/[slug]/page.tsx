import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getPostBySlug,
  getPostSlugs,
  getHeadingsFromContent,
  calculateReadTime,
} from "@/app/lib/mdx";
import PostHeader from "./_components/PostHeader";
import PostTOC from "./_components/PostTOC";
import PostContent from "./_components/PostContent";
import DecorativeSideBars from "@/app/components/DecorativeSideBars";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.frontmatter.title} | Dendi`,
    description: post.frontmatter.summary || `Read ${post.frontmatter.title}`,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: post.frontmatter.image ? [post.frontmatter.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Auto-calculate read time if not provided
  const frontmatter = {
    ...post.frontmatter,
    readTime: post.frontmatter.readTime || calculateReadTime(post.content),
  };

  const headings = getHeadingsFromContent(post.content);

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      {/* Hero Image */}
      {frontmatter.image && (
        <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
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
            <PostHeader frontmatter={frontmatter} />
            <PostContent mdxSource={post.mdxSource} />
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
