"use client";
import React, { useState } from "react";
import Information from "./Information";
import SendReview from "./SendReview";
import UserReviews from "./UserReviews";
import { IRatingsAndReviewsProps } from "./RatingsAndReviews.types";
import { useTranslations } from "next-intl";

function RatingsAndReviews({
  currentCountry,
  reviews,
}: IRatingsAndReviewsProps) {
  // TODO: Fix type
  const t = useTranslations<any>("RateAndReview");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.star, 0) / reviews.length
  ).toFixed(1);
  const totalRatings = reviews.length;

  return (
    <div className="w-full mx-auto px-2 pb-32 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 pb-4">
        {t("title")}
      </h2>

      <div >
        <Information
          averageRating={averageRating}
          rating={rating}
          setRating={setRating}
          totalRatings={totalRatings}
          reviews={reviews}
          t={t}
        />

        <SendReview
          rating={rating}
          setRating={setRating}
          review={review}
          setReview={setReview}
          currentCountry={currentCountry}
          t={t}
        />
      </div>
      <UserReviews reviews={reviews} t={t} />
    </div>
  );
}

export default RatingsAndReviews;
