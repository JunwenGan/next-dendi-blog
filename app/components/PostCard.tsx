import { Post } from "@prisma/client";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  post: Post;
}
const ArticleCard = ({ post }: Props) => {
  const { title, createAt, updatedAt, content, id } = post;
  const markdown = `# Middle-Ground Solution Example

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

*Finding a middle-ground solution is often the key to successful collaboration.*
`;

  return (
    <div className="mx-auto py-16 px-4 bg-white w-full shadow border mb-5">
      <div className="container mx-auto px-10">
        <div className="flex place-content-center flex-col">
          <p className="font-bold text-center text-2xl">{title}</p>
          <div className="w-[75%] mx-auto stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Created At</div>
              <div className="stat-value text-xl">
                {createAt.toDateString()}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Updated At</div>
              <div className="stat-value text-xl">
                {updatedAt.toDateString()}
              </div>
            </div>
            {/* <div className="stat">
              <div className="stat-title">Word Count</div>
              <div className="stat-value text-xl">300</div>
            </div>
            <div className="stat">
              <div className="stat-title">Time consumed</div>
              <div className="stat-value text-xl">10mins</div>
            </div> */}
          </div>
        </div>
        <div className="mt-5 prose max-w-full">
          <div className="max-h-96 overflow-hidden relative">
            <Markdown>{content}</Markdown>
            {/* {content} */}Ï{/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <button className="btn btn-neutral mt-3 block  text-sm">
            <Link href={`/post/${id}`} className="text-white no-underline">Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
