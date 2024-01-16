import Image from "next/image";
import React from "react";
import { ExtendReview } from "@/types/db";
import Avatar from "../Avatar";
import ReviewBtnGroup from "./ReviewBtnGroup";
import { convertTime } from "@/utils/convertTime";

interface Props {
  review: ExtendReview;
  currentUserId?: string;
}

const ReviewItem = ({ review, currentUserId }: Props) => {
  const { shortDateFormat } = convertTime(review.created_at);
  const isCurrentUser = currentUserId === review.user_id;
  const reviewImageList = review.url;
  const reviewStore = [review.store.region.region, review.store.name].join(" - ");
  const reviewUserName = isCurrentUser
    ? review.userinfo.username
    : review.userinfo.username[0] + "*".repeat(review.userinfo.username.length - 1);

  return (
    <div className="flex flex-col gap-[30px] border-b-[1px] border-line py-[40px]">
      <div className="flex flex-row  gap-[20px] items-center justify-between ">
        {/* <Avatar size="sm" src={review.userinfo.avatar_url} /> */}
        <p className="font-medium text-tc-light">{reviewUserName}</p>
        <p className="font-medium text-tc-light ml-auto">{reviewStore}</p>
        <p className="font-medium text-tc-light">{shortDateFormat}</p>
      </div>

      <div>
        {/* <p>{review.title}</p> */}
        <p className="font-medium text-[15px] text-tc-middle leading-normal">{review.content}</p>
      </div>

      {!!reviewImageList && (
        <ul className="flex flex-row gap-[12px]">
          {reviewImageList.map((n, i) => (
            <li key={`${review.id}-${i}`}>
              <Image src={n} width={190} height={190} alt="리뷰 이미지" />
            </li>
          ))}
        </ul>
      )}

      {isCurrentUser && <ReviewBtnGroup userId={currentUserId} reviewId={review.id} />}
    </div>
  );
};

export default ReviewItem;
