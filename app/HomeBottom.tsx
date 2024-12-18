import Userbox from "./components/Userbox";
import React, { RefObject } from "react";
import ArticleCard from "./components/ArticleCard";
const HomeBottom = ({
  targetRef,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <>
      <div
        ref={targetRef}
        className="grid md:grid-cols-[400px_1fr] min-h-[600px] max-h-[2000px] py-20 px-10"
        id="HomeBottom"
      >
        <div className="hidden md:block w-[400px] mx-auto relative">
          <Userbox />
        </div>
        <div className="mx-auto">
            <ArticleCard />
            <ArticleCard />
        </div>
      </div>
    </>
  );
};

export default HomeBottom;
