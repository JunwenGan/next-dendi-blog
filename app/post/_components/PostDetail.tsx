import { Post } from "@prisma/client";

import Markdown from "react-markdown";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { TableOfContents } from "../../components/TableOfContents";
import { getHeadings } from "../../lib/getHeading";
`# Middle-Ground Solution Example

In situations where two parties have conflicting priorities, finding a **middle-ground solution** can help achieve balance.

## Contents

## Scenario
A team is debating between two approaches:
1. **High Budget, High Quality** - Focus on premium materials, resulting in a higher cost.
2. **Low Budget, Low Quality** - Use cost-effective materials but compromise on quality.

![Middle Ground](https://dendi-blog.s3.us-east-1.amazonaws.com/liverpool.webp "Middle-Ground Example")

## Middle-Ground Solution
The team decided to:
- Use mid-tier materials that balance cost and quality.
- Prioritize critical components for higher-quality materials.
- Adjust the timeline slightly to reduce rush costs.

---

## Key Benefits
- **Compromise**: Both sides felt heard and respected.
- **Efficiency**: The solution reduced unnecessary spending while maintaining acceptable quality.

---

*Finding a middle-ground solution is often the key to successful collaboration.*`;
const markdownContent = `
# Table of contents
1. [Introduction](#introduction)
2. [Some paragraph](#paragraph1)
    1. [Sub paragraph](#subparagraph1)
3. [Another paragraph](#paragraph2)

## This is the introduction <a id="introduction"></a>
Some introduction text, formatted in heading 2 style

## Some paragraph <a id="paragraph1"></a>
The first paragraph text

### Sub paragraph <a id="subparagraph1"></a>
This is a sub paragraph, formatted in heading 3 style

## Another paragraph <a id="paragraph2"></a>
The second paragraph text
`;
interface Prop {
  post: Post;
}
const wordCount = (str: string | null) => {
  const words = str!.trim().split(/\s+/);
  return words.length;
};
const calculateReadingTime = (
  wordCount: number,
  readingSpeed: number = 200
) => {
  const time = wordCount / readingSpeed;
  return Math.ceil(time);
};

const PostDetail = async ({ post }: Prop) => {
 
  const { content: markdown, createAt, updatedAt, title } = post;
  const totalWord = wordCount(markdown);
  const timeConsumed = calculateReadingTime(totalWord);

  // const headings = await getHeadings(markdown!);
 

  return (
    <div className="mx-auto py-16 px-4 bg-white w-full shadow border">
      <div className="container mx-auto px-10">
        <div className="flex place-content-center flex-col">
          <p className="font-bold text-center text-2xl">{title}</p>
          <div className="w-[75%] mx-auto stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Created At</div>
              <div className="stat-value text-xl">
                {createAt.toLocaleDateString()}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Updated At</div>
              <div className="stat-value text-xl">
                {updatedAt.toLocaleDateString()}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Word Count</div>
              <div className="stat-value text-xl">{totalWord}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Time consumed</div>
              <div className="stat-value text-xl">{timeConsumed} mins</div>
            </div>
          </div>
        </div>
        <div className="mt-5 prose max-w-full">
          <div className="relative">
            {/* <MarkdownWithToc markdown={markdown!} /> */}
            {/* <TableOfContents headings={headings} /> */}
            <Markdown rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>{markdown}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
