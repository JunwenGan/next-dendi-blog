import { ReactNode } from "react";
import Userbox from "./components/Userbox";
interface Props {
  // targetRef: RefObject<HTMLDivElement | null>;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  searchParams?: { page: string };
}
const HomeBottom = ({ leftComponent = <Userbox />, rightComponent }: Props) => {
  return (
    <>
      <div
        className="grid md:grid-cols-[400px_1fr] min-h-[600px]  py-20 px-10 bg-bg-japan bg-fixed bg-no-repeat bg-center bg-cover"
        id="HomeBottom"
      >
        <div className="hidden md:block w-[400px] mx-auto relative">
          {leftComponent}
        </div>
        <div className="">{rightComponent}</div>
      </div>
    </>
  );
};

export default HomeBottom;
