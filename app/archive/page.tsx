import Userbox from "../components/Userbox";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
const page = ({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) => {
  return (
    <>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
};

export default page;
