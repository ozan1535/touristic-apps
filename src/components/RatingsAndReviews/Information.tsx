import React from "react";
import RenderStars from "./RenderStars";
import { IInformation } from "./RatingsAndReviews.types";

function Information({
  averageRating,
  rating,
  setRating,
  totalRatings,
  reviews,
  t,
}: IInformation) {
  return (
    <div className="flex items-center justify-between pb-6 border-b-2 border-indigo-200">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-5xl font-black text-indigo-600 dark:text-white">
            {isNaN(+averageRating) ? 0 : +averageRating}
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{t("outOf")}</p>
        </div>
        <div>
          <RenderStars
            value={+averageRating}
            rating={rating}
            setRating={setRating}
          />
          <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">
            {t("ratings", { count: totalRatings })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Information;
