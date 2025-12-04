"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import RenderStars from "./RenderStars";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { allCountries } from "@/lib/helpers";
import { supabase } from "@/lib/supabase/client";

function EditReview({ userReview }) {
  const router = useRouter();
  const client = useKindeBrowserClient();
  const { locale } = useParams();
  const user = client.getUser();
  const [error, setError] = useState("");
  const [rating, setRating] = useState(userReview.star || 1);
  const [review, setReview] = useState(userReview.review || "");
  const t = useTranslations<any>("RateAndReview");

  const handleEditReview = async () => {
    const { error } = await supabase
      .from("reviews")
      .update({
        star: rating,
        review,
      })
      .eq("user_id", user.id)
      .eq("id", userReview.id);

    if (error) throw error;
    router.refresh();
    alert("basarili");
  };

  const handleDeleteReview = async () => {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("user_id", user.id)
      .eq("id", userReview.id);

    if (error) throw error;
    router.refresh();

    alert("basarili");
  };

  return (
    <div className="pb-5 border-b-2">
      {/* <h3 className="text-lg font-bold text-slate-900 mb-3">
        {t("writeReview")}
      </h3> */}
      <h3 className="text-lg font-bold text-slate-900 mb-3">
        {
          allCountries.find(
            (country) => country.cca2 === userReview.country_cca2
          )?.name[locale]
        }
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
      <div className="flex gap-2">
        <button
          onClick={handleEditReview}
          disabled={rating === 0 || !review.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Send size={18} />
          {t("updateReview")}
        </button>
        <button
          onClick={handleDeleteReview}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Send size={18} />
          {t("deleteReview")}
        </button>
      </div>
    </div>
  );
}

export default EditReview;
