import React, { Suspense } from "react";
import UserInfoSection from "./UserInfoSection";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import UserTab from "./UserTab";
import UserReviewList from "./(tabContent)/UserReviewList";
import UserQnaList from "./(tabContent)/UserQnaList";
import UserReservationList from "./(tabContent)/UserReservationList";
import UserRentList from "./(tabContent)/UserRentList";
import { Metadata, ResolvingMetadata } from "next";
import { getUser } from "@/service/table";
import UserRentPulse from "@/components/pulse/UserRentPulse";

interface Props {
  params: { userId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.userId;
  const userData = await getUser({ userId });

  return {
    title: `YOLOCEAN | 반갑습니다! ${userData.username} 님!`,
    openGraph: {
      images: ["/opengraph-image.png"]
    }
  };
}

type article = "예약내역" | "렌트완료" | "작성한 리뷰" | "Q&A";

const linkList = [
  {
    name: "홈",
    url: "https://yolocean.store/"
  },
  {
    name: "마이페이지",
    url: "https://yolocean.store/"
  }
];

const MyPage = ({ params, searchParams }: Props) => {
  const { userId } = params;
  const article = searchParams?.article;
  const currentPage = Number(searchParams?.page) || 1;

  const currentTap = (article: string | string[] | undefined) => {
    switch (article as article) {
      case "렌트완료":
        return <UserRentList userId={userId} article={"렌트완료"} />;
      case "작성한 리뷰":
        return <UserReviewList userId={userId} article={"작성한 리뷰"} />;
      case "Q&A":
        return <UserQnaList userId={userId} article={"Q&A"} />;
      default:
        return (
          <Suspense fallback={<UserRentPulse />}>
            <UserReservationList userId={userId} article={"예약내역"} page={currentPage} />
          </Suspense>
        );
    }
  };
  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <UserInfoSection />
      <UserTab className="mt-[78px] mb-[40px]" />
      {currentTap(article)}
    </>
  );
};

export default MyPage;
