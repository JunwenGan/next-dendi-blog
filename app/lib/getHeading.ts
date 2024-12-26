import matter from "gray-matter";
import { remark } from "remark";
import { headingTree } from "./heading";

export async function getHeadings(markdown: string) {
  const { content } = matter(markdown); 
  const processedContent = await remark().use(headingTree).process(content);
  return processedContent.data.headings as { value: string; id: string; depth: number }[];
}
