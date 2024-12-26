import { Post } from "@prisma/client";
import PostCard from "./PostCard";

interface Prop {
  posts: Post[];
}

const PostCardList = async ({ posts }: Prop) => {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostCardList;
