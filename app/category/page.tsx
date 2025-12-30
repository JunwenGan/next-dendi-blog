import prisma from "@/prisma/client";
import HomeBottom from "../HomeBottom";
import CategoryList from "./_components/CategoryList";
import { Metadata } from "next";
import DecorativeSideBars from "../components/DecorativeSideBars";

const category = () => {
  const categories = prisma.category.findMany();
  return (
    <div className="relative">
      <DecorativeSideBars />
      <HomeBottom rightComponent={<CategoryList />}/>
    </div>
  );
};

export const metadata: Metadata = {
    title: "Post Category",
    description: "This is Blog Post category."
  }

export default category;
