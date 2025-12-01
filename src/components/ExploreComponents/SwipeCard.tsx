import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { MapPin } from "lucide-react";
import { IRoute } from "./ExploreComponents.types";
import Image from "next/image";

interface SwipeCardProps {
  data: IRoute;
  onSwipe: (id: string, dir: "left" | "right") => void;
  index: number;
}

export const SwipeCard = ({ data, onSwipe, index }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.5, 1, 1, 1, 0.5]
  );

  const nopeOpacity = useTransform(x, [-150, -20], [1, 0]);
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe(data.id, "right");
    } else if (info.offset.x < -100) {
      onSwipe(data.id, "left");
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing bg-white"
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileTap={{ scale: 1.02 }}
    >
      <Image
        src={data.image_url}
        alt={data.title}
        width={500}
        height={500}
        className="w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-8 pointer-events-none">
        <div className="flex items-end gap-2 mb-1">
          <h2 className="text-white text-3xl font-bold leading-tight">
            {data.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-slate-300 text-lg font-medium flex items-center gap-2">
            <MapPin size={18} /> {data.location}
          </p>
          {data.tag && (
            <span className="bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-blue-100 border border-blue-400/30">
              {data.tag}
            </span>
          )}
        </div>
      </div>

      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 border-4 border-green-500 rounded-xl px-4 py-2 -rotate-12 pointer-events-none bg-black/20 backdrop-blur-sm"
      >
        <span className="text-green-500 font-bold text-4xl uppercase tracking-widest">
          Like
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 border-4 border-red-500 rounded-xl px-4 py-2 rotate-12 pointer-events-none bg-black/20 backdrop-blur-sm"
      >
        <span className="text-red-500 font-bold text-4xl uppercase tracking-widest">
          Nope
        </span>
      </motion.div>
    </motion.div>
  );
};
