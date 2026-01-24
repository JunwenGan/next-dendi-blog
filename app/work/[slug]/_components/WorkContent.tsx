"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import Callout from "@/app/components/mdx/Callout";

interface WorkContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  Callout,
};

export default function WorkContent({ mdxSource }: WorkContentProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-normal prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-li:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
