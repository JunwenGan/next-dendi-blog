import HomeBottom from "@/app/HomeBottom";
import React, { RefObject } from "react";
import ArticleDetail from '../_components/ArticleDetail'
interface Props {
  targetRef: RefObject<HTMLDivElement>,
  params: { id: string };
}
const page = ({ targetRef, params }: Props) => {
  return <HomeBottom targetRef={targetRef} rightComponent={<ArticleDetail/>}/>;
};

export default page;
