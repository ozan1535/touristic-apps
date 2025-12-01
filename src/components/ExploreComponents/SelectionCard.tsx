import { ChevronRight } from "lucide-react";

interface SelectionCardProps {
  title: string;
  img: string;
  onClick: () => void;
}

export const SelectionCard = ({ title, img, onClick }: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full h-32 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all active:scale-98"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center px-6">
        <h3 className="text-white text-xl font-bold tracking-wide">{title}</h3>
        <div className="absolute right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={20} />
        </div>
      </div>
    </button>
  );
};
