import HomeBottom from "@/app/HomeBottom";
import React, { RefObject, Suspense } from "react";
import PostDetail from "../_components/PostDetail";
import Userbox from "@/app/components/Userbox";
import prisma from "@/prisma/client";
import { cache } from "react";
import { TableOfContents } from "@/app/components/TableOfContents";
import { getHeadings } from "@/app/lib/getHeading";

interface Props {
  params: { id: string };
}
const fetchPost = cache(async (postId: number) =>
  prisma.post.findUnique({
    where: { id: postId },
    include: {
      Comment: {
        include: {
          user: true, // Include related user information for each comment
        },
      },
    },
  })
);

const page = async ({ params }: Props) => {
  const post_obj = await params;
  const postId = parseInt(post_obj.id);
  const post = await fetchPost(postId);
  const headings = await getHeadings(post?.content!);
  return (
    <>
      <div
        className="grid md:grid-cols-[400px_1fr] min-h-[600px]  py-20 px-10 bg-bg-japan bg-fixed bg-no-repeat bg-center bg-cover"
        id="HomeBottom"
      >
        <div className="hidden md:block w-[400px] mx-auto relative">
          {/* <Userbox /> */}
          <div className="card bg-base-100 w-96 shadow-xl p-5 sticky top-80">
            <TableOfContents headings={headings} />
          </div>
        </div>
        <div className="mx-auto ">
          <Suspense
            fallback={
              <div className="h-screen">
                <div className="flex items-center gap-5">
                  Loading data...
                  <span className="loading loading-spinner loading-md"></span>
                </div>{" "}
              </div>
            }
          >
            <PostDetail post={post!} />
          </Suspense>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default page;
