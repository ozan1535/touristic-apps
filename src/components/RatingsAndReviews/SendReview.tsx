import React, { useState } from "react";
import { Send } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ISendReview } from "./RatingsAndReviews.types";
import RenderStars from "./RenderStars";
import { handleSubmit } from "./RatingsAndReviews.helpers";
import { useRouter } from "next/navigation";

function SendReview({
  rating,
  setRating,
  review,
  setReview,
  currentCountry,
  t,
}: ISendReview) {
  const router = useRouter();
  const client = useKindeBrowserClient();
  const user = client.getUser();
  const [error, setError] = useState("");

  const { cca2 } = currentCountry;
  return (
    <div className="mt-6">
      {/* <h3 className="text-lg font-bold text-slate-900 mb-3">
        {t("writeReview")}
      </h3> */}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          {t("yourRating")} *
        </label>
        <RenderStars
          value={rating}
          interactive={true}
          rating={rating}
          setRating={setRating}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          {t("yourReview")} *
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={t("sharePlaceholder")}
          rows={4}
          className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>
      {error && (
        <p className="p-2 bg-red-600 text-white rounded-md mb-2 font-bold">
          {error}
        </p>
      )}
      <button
        onClick={() =>
          handleSubmit(
            rating,
            review,
            setReview,
            setRating,
            setError,
            cca2,
            user,
            router
          )
        }
        disabled={rating === 0 || !review.trim()}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <Send size={18} />
        {t("sendReview")}
      </button>
    </div>
  );
}

export default SendReview;
