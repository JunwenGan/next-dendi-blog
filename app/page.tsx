import { Metadata } from "next";
import Hero from "./Hero";
import HomeBottom from "./HomeBottom";
import Footer from "./components/Footer";
import HomeBottomRight from "./components/HomeBottomRight";
export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  // const targetRef = useRef<HTMLDivElement | null>(null);
  // const handleScroll = () => {
  //   if (targetRef.current) {
  //     targetRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  return (
    <>
      <Hero />
      <HomeBottom searchParams={searchParams} rightComponent={<HomeBottomRight searchParams={searchParams}/>}/>
      <Footer />
      {/* <HomeBottom targetRef={targetRef} /> */}
    </>
  );
}

export const metadata: Metadata = {
  title: "Dendi - Blog",
  description: "This is Dendi Blog"
}