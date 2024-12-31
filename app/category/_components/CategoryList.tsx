import prisma from "@/prisma/client";
import Link from "next/link";

const CategoryList = async () => {
  const categoryCount = await prisma.category.count();
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true, // Assumes the relation name is `posts`
        },
      },
    },
  });

  return (
    <div className="py-16 px-4 bg-white w-full shadow border ">
      <p className="text-2xl font-bold text-center py-4">
        Categories - {categoryCount}
      </p>
      <ul className="px-16 py-4 list-disc">
        {categories.map((category) => (
          <li key={category.id} className="pt-2">
            <Link
              href={`/category/${category.name}`}
              className=" hover:underline rounded-md transition duration-200 ease-in-out  hover:bg-blue-100"
            >
              {category.name}
            </Link>{" "}
            ({category._count.posts})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
