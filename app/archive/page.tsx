import prisma from "@/prisma/client";
import Userbox from "../components/Userbox";
import Link from "next/link";
import { Metadata } from "next";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  const postCount = await prisma.post.count();
  return (
    <>
      <div className="h-screen">
        <div className="grid md:grid-cols-[400px_1fr] min-h-full  py-20 px-10 bg-bg-japan bg-fixed bg-no-repeat bg-center bg-cover">
          <div className="hidden md:block w-[400px] mx-auto relative">
            <Userbox />
          </div>
          <div>
            <div className="py-16 px-4 bg-white w-full shadow border ">
              <p className="pl-9 mb-5">Total {postCount} Posts, Go on!</p>
              <ul className="timeline timeline-vertical timeline-compact px-9">
                {posts.map((post) => (
                  <li key={post.id}>
                    <div className="timeline-start ">
                      {post.createAt.toLocaleDateString()}
                    </div>
                    <div className="timeline-middle ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="timeline-end timeline-box">
                      <Link
                        href={`/post/${post.id}`}
                        className="font-semibold hover:underline px-3 py-2 rounded-md transition duration-200 ease-in-out  hover:bg-blue-100"
                      >
                        {post.title}
                      </Link>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Post Archive",
  description: "This is Blog Post Archive."
}

export default page;
