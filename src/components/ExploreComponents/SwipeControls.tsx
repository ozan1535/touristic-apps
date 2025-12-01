import { X, Heart } from "lucide-react";

interface SwipeControlsProps {
  onDislike: () => void;
  onLike: () => void;
}

export const SwipeControls = ({ onDislike, onLike }: SwipeControlsProps) => {
  return (
    <div className="flex justify-center gap-8 mt-8">
      <button
        onClick={onDislike}
        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-500 hover:scale-110 transition-transform border border-blue-100"
      >
        <X size={24} strokeWidth={3} />
      </button>
      <button
        onClick={onLike}
        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 hover:scale-110 transition-transform border border-blue-100"
      >
        <Heart size={24} strokeWidth={3} />
      </button>
    </div>
  );
};
