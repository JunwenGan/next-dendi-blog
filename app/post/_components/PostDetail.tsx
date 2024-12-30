import { Post } from "@prisma/client";

import Markdown from "react-markdown";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { TableOfContents } from "../../components/TableOfContents";
import { getHeadings } from "../../lib/getHeading";
import PostComment from "./PostComment";
import delay from 'delay';
import { log } from "console";

import {
  Post as PrismaPost,
  Comment as PrismaComment,
  User,
} from "@prisma/client";

// Extend the Comment model to include the related User
interface CommentWithUser extends PrismaComment {
  user: User; // Add the User relationship to Comment
}

// Extend the Post model to include the related Comment array
interface PostWithComments extends PrismaPost {
  Comment: CommentWithUser[]; // Use the extended Comment type
}

// Props interface for your component
interface Prop {
  post: PostWithComments; // Use the extended Post type
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
  await delay(2000)
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
            <Markdown rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
              {markdown}
            </Markdown>
            <PostComment post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
