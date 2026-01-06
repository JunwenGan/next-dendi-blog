"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import Callout from "@/app/components/mdx/Callout";

interface PostContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

// Define all custom MDX components here
const components = {
  Callout,
  // Add more custom components as needed:
  // CodeBlock,
  // YouTube,
  // etc.
};

export default function PostContent({ mdxSource }: PostContentProps) {
  return (
    <article className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-code:text-purple-600 dark:prose-code:text-purple-300 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:border prose-pre:border-border/50">
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
