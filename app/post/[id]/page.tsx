import HomeBottom from "@/app/HomeBottom";
import React, { RefObject } from "react";
import PostDetail from "../_components/PostDetail";
import Userbox from "@/app/components/Userbox";
import prisma from "@/prisma/client";
import { cache } from "react";
import { getHeadings } from "../../lib/getHeading"
import { TableOfContents } from "../../components/TableOfContents";
interface Props {
  params: { id: string };
}
const fetchPost = cache(async (postId: number) =>
  prisma.post.findUnique({ where: { id: postId } })
);

const page = async ({ params }: Props) => {
  const post_obj = await params
  const postId = parseInt(post_obj.id);
  const post = await fetchPost(postId);
  return (
    <>
      <div
        className="grid md:grid-cols-[400px_1fr] min-h-[600px]  py-20 px-10 bg-bg-japan bg-fixed bg-no-repeat bg-center bg-cover"
        id="HomeBottom"
      >
        <div className="hidden md:block w-[400px] mx-auto relative">
          <Userbox />
        </div>
        <div className="mx-auto ">
          <PostDetail post={post!} />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default page;
