import prisma from "@/prisma/client";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import Link from "next/link";

const Userbox = async () => {
  const session = await getServerSession(authOptions);

  const postCount = await prisma.post.count();
  return (
    <div className="card bg-base-100 w-96 shadow-xl p-5 sticky top-14 ">
      <figure>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://dendi-blog.s3.us-east-1.amazonaws.com/profile_thumbnail.jpg" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title ">Self-discipline is key in life.</h2>
        <div className="flex justify-between md-w-[75%] gap-2">
          <Link
            href="https://github.com/JunwenGan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithubSquare size={30} />
          </Link>
          <Link
            href="https://linkedin.com/in/junwen-gan-b0336b339"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin size={30} />
          </Link>
        </div>
        <div className="stats shadow">
          <div className="stat ">
            <div className="stat-title">Post</div>
            <div className="stat-value text-xl">{postCount}</div>
          </div>
          {/* <div className="stat ">
            <div className="stat-title">Archive</div>
            <div className="stat-value text-xl">18</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Userbox;
