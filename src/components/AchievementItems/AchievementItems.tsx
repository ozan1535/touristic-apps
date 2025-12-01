import {
  Award,
  Globe,
  Languages,
  Mountain,
  Star,
  Utensils,
} from "lucide-react";
import React from "react";

function AchievementItems({ badge }) {
  const Icon =
    badge.iconName === "Globe"
      ? Globe
      : badge.iconName === "Utensils"
      ? Utensils
      : badge.iconName === "Star"
      ? Star
      : badge.iconName === "Mountain"
      ? Mountain
      : badge.iconName === "Languages"
      ? Languages
      : Award;
  return (
    <div
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
        badge.isLocked
          ? "bg-gray-50 border-gray-200 opacity-60 grayscale"
          : "bg-indigo-50 border-indigo-200"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          badge.isLocked
            ? "bg-gray-200 text-gray-400"
            : "bg-white text-indigo-600 shadow-sm"
        }`}
      >
        <Icon size={20} strokeWidth={2} />
      </div>

      <span
        className={`text-[11px] font-semibold text-center leading-tight ${
          badge.isLocked ? "text-gray-500" : "text-indigo-700"
        }`}
      >
        {badge.name}
      </span>
    </div>
  );
}

export default AchievementItems;
