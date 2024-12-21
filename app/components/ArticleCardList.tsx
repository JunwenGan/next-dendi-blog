import { Post } from "@prisma/client";
import ArticleCard from "./ArticleCard";

interface Prop {
  posts: Post[];
}

const ArticleCardList = async ({ posts }: Prop) => {
  return (
    <>
      {posts.map((post) => (
        <ArticleCard
          key={post.id}
          title={post.title}
          createdAt={post.createAt}
          updatedAt={post.updatedAt}
          content={post.content}
        />
      ))}
    </>
  );
};

export default ArticleCardList;
