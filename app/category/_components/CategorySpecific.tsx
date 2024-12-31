import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
interface Prop {
  categoryName: string;
}
const CategorySpecific = async ({ categoryName }: Prop) => {
  const posts = await prisma.post.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    include: {
      category: true,
    },
  });
  return (
    <div className="py-16 px-4 bg-white w-full shadow border ">
      <p className="text-2xl font-bold text-center py-4">
        Categories -- {categoryName}
      </p>
      <ul className="px-16 py-4 list-disc">
        {posts.map((post) => (
          <li key={post.id} className="pt-2">
            <Link
              href={`/post/${post.id}`}
              className=" hover:underline rounded-md transition duration-200 ease-in-out  hover:bg-blue-100"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySpecific;
