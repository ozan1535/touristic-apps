import React from "react";
import RenderStars from "./RenderStars";
import { IReview } from "./RatingsAndReviews.types";
import { formatDistanceToNow } from "date-fns";
import { enUS, tr } from "date-fns/locale";
import { useParams } from "next/navigation";
import Image from "next/image";

function UserReviews({ reviews, t }: { reviews: IReview[]; t: any }) {
  const { locale } = useParams();

  return (
    <div className="w-full mx-auto my-5">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={review.profiles.picture || "/profile.webp"}
                  alt={review.profiles.name}
                  width={500}
                  height={500}
                  className="w-12 h-12 rounded-full border-2 border-indigo-300 bg-white"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {review.profiles.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(review.created_at), {
                      addSuffix: true,
                      locale: locale === "tr" ? tr : enUS,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                {
                  <RenderStars
                    value={review.star}
                    rating={0}
                    setRating={() => {}}
                    interactive={false}
                  />
                }
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {review.review}
            </p>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>{t("noReviews")}</p>
        </div>
      )}
    </div>
  );
}

export default UserReviews;
