import { Check, Heart } from "lucide-react";
import { IEmptyStateProps, IRoute } from "./ExploreComponents.types";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const EmptyState = ({
  cityName,
  likedRoutes,
  onBackToCity,
}: IEmptyStateProps) => {
  const t = useTranslations("Explore");
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-blue-900 mb-2">
        {t("allCaughtUp")}
      </h2>
      <p className="text-slate-500 mb-8 max-w-[250px]">
        {t("seenAllSpots", {
          cityName,
        })}
      </p>

      <div className="w-full bg-white rounded-3xl p-6 shadow-lg border border-blue-100">
        <h3 className="text-left font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Heart size={16} className="text-rose-500 fill-rose-500" />{" "}
          {t("myList")} ({likedRoutes.length})
        </h3>
        <div className="space-y-3 max-h-[150px] overflow-y-auto no-scrollbar">
          {likedRoutes.length === 0 ? (
            <p className="text-sm text-slate-400 italic">{t("noLike")}</p>
          ) : (
            likedRoutes.map((route) => (
              <div
                key={route.id}
                className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-xl transition-colors"
              >
                <Image
                  src={route.discovery.route_image_url}
                  className="w-12 h-12 rounded-lg object-cover"
                  alt={route.discovery.route}
                  width={500}
                  height={500}
                />
                <div className="text-left">
                  <p className="font-bold text-blue-900 text-sm">
                    {route.discovery.route}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {route.discovery.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={onBackToCity}
        className="mt-6 text-blue-600 font-bold text-sm hover:underline"
      >
        {t("checkAnother")}
      </button>
    </div>
  );
};
