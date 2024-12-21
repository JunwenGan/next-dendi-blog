"use client";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <div className="join mx-auto">
      <button
        className="join-item btn disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage == 1}
        onClick={() => changePage(1)}
      >
        <AiOutlineDoubleLeft size={15} />
      </button>
      <button
        className="join-item btn disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage == 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <AiFillCaretLeft size={15} />
      </button>
      <button className="join-item btn disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" disabled>
        Page {currentPage} of {pageCount}
      </button>

      <button
        className="join-item btn disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage == pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <AiFillCaretRight size={15} />
      </button>
      <button
        className="join-item btn disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={currentPage == pageCount}
        onClick={() => changePage(pageCount)}
      >
        <AiOutlineDoubleRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;
