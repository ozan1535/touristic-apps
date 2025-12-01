import { supabase } from "@/lib/supabase/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { Dispatch, SetStateAction } from "react";

export const handleSubmit = async (
  rating: number,
  review: string,
  setReview: Dispatch<SetStateAction<string>>,
  setRating: Dispatch<SetStateAction<number>>,
  setError: Dispatch<SetStateAction<string>>,
  cca2: string,
  user: KindeUser<Record<string, string>> | null,
  router
) => {
  if (!user) {
    setError("Please Login before you share your experience");
    return;
  }
  if (rating === 0) {
    setError("You need to rate your experience in this country");
    return;
  }

  if (!review) {
    setError("You need to share your experience for this country");
    return;
  }

  try {
    const { error: insertError } = await supabase.from("reviews").insert({
      star: rating,
      review,
      user_id: user?.id,
      country_cca2: cca2,
    });
    router.refresh();
  } catch (error) {
    setError("There was an error");
  } finally {
    setRating(0);
    setReview("");
    setError("");
  }
};
