"use client"
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import { toHast } from "mdast-util-to-hast";
import { toString } from "hast-util-to-string";

interface TocItem {
  title: string;
  slug: string;
}

interface TableOfContentsProps {
  markdown: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ markdown }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const processor = unified().use(remarkParse).use(remarkToc, {
      heading: "Contents", // Ensure this matches your markdown
      tight: true,
      maxDepth: 2,
    });

    try {
      // Parse the markdown into an AST
      const tree = processor.parse(markdown);
      // Run plugins on the tree, including `remark-toc`
      processor.runSync(tree);
      // Find the TOC node
      const tocNode = (tree.children as any).find(
        (node: any) => node.type === "list" && node.ordered === false
      );

      // Extract TOC items
      if (tocNode) {
        const tocItems: TocItem[] = tocNode.children.map((item: any) => {
          const title = toString(toHast(item));
          const slug = item.data?.hProperties?.id || "";
          return { title, slug };
        });

        setToc(tocItems);
      }
    } catch (error) {
      console.error("Error generating TOC:", error);
    }
  }, [markdown]);

  return (
    <nav>
      <ul>
        {toc.map((item) => (
          <li key={item.slug}>
            <a href={`#${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
