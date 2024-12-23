'use client'
import Markdown from "react-markdown";

const ArticleCard = () => {
  const markdown = `# Middle-Ground Solution Example

In situations where two parties have conflicting priorities, finding a **middle-ground solution** can help achieve balance.

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
    <div className="mx-auto py-16 px-4 bg-white w-full shadow border">
      <div className="container mx-auto px-10">
        <div className="flex place-content-center flex-col">
          <p className="font-bold text-center text-2xl">It's a new Start</p>
          <div className="w-[75%] mx-auto stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Created At</div>
              <div className="stat-value text-xl">10-12-2024</div>
            </div>
            <div className="stat">
              <div className="stat-title">Created At</div>
              <div className="stat-value text-xl">10-12-2024</div>
            </div>
            <div className="stat">
              <div className="stat-title">Word Count</div>
              <div className="stat-value text-xl">300</div>
            </div>
            <div className="stat">
              <div className="stat-title">Time consumed</div>
              <div className="stat-value text-xl">10mins</div>
            </div>
          </div>
        </div>
        <div className="mt-5 prose max-w-full">
          <div className="relative">
            <Markdown>{markdown}</Markdown>
          </div>
          <button
            onClick={() => console.log(1)}
            className="btn btn-neutral mt-3 block underline text-sm"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
