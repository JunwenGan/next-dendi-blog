import prisma from "@/prisma/client";
import HomeBottom from "../HomeBottom";
import CategoryList from "./_components/CategoryList";
import { Metadata } from "next";

const category = () => {
  const categories = prisma.category.findMany();
  return (
    <HomeBottom rightComponent={<CategoryList />}/>
  );
};

export const metadata: Metadata = {
    title: "Post Category",
    description: "This is Blog Post category."
  }

export default category;
