import prisma from "@/prisma/client";
import PostCardList from "./PostCardList";
import Pagination from "./Pagination";

interface Prop {
  searchParams: { page: string };
}
const HomeBottomRight = async ({ searchParams }: Prop) => {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const pageSize = 3;
  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const postCount = await prisma.post.count();
  return (
    <>
      <PostCardList posts={posts} />
      <div className="flex justify-center my-3">
        <Pagination
          itemCount={postCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
    </>
  );
};

export default HomeBottomRight;
