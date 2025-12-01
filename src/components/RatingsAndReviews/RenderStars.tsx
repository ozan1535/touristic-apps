"use client";
import { Star } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

function RenderStars({
  value,
  rating,
  setRating,
  interactive = false,
}: {
  value: number;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  interactive?: boolean;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 24 : 20}
          className={`${
            star <= (interactive ? hoverRating || rating : +value)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } ${interactive ? "cursor-pointer transition-all" : ""}`}
          onClick={() => interactive && setRating(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      ))}
    </div>
  );
}

export default RenderStars;
