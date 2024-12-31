import HomeBottom from "@/app/HomeBottom";
import CategorySpecific from "../_components/CategorySpecific";
import prisma from "@/prisma/client";

interface Prop {
  params: Promise<{ name: string }>
}

const page = async ({ params }: Prop) => {
  const { name: categoryName } = await params;
  return (
    <HomeBottom
      rightComponent={<CategorySpecific categoryName={categoryName} />}
    />
  );
};

export async function generateMetadata({ params }: Prop) {
  const { name } = await params;
  const category = await prisma.category.findUnique({
    where: { name },
  });
  return {
    title: category?.name,
    description: "Category of" + category?.name,
  };
}

export default page;
