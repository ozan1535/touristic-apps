import { ArrowLeft, Heart } from "lucide-react";
import { IDiscoveryHeaderProps } from "./ExploreComponents.types";

export const DiscoveryHeader = ({
  title,
  subtitle,
  likedCount,
  showBack,
  onBack,
}: IDiscoveryHeaderProps) => {
  return (
    <header className="px-2 flex justify-between items-center mb-5">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={onBack}
            className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-blue-900" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-blue-900 dark:text-white leading-tight">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-300 text-xs font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="bg-blue-50 px-3 py-1 rounded-full text-xs font-bold text-blue-600 flex items-center gap-1">
        <Heart size={12} className="text-rose-500 fill-rose-500" /> {likedCount}
      </div>
    </header>
  );
};
