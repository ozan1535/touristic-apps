import { supabase } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function FavoriteRoutes({
  route,
  isFavorite,
  setRoutes = null,
  user = null,
  canShowDelete = true,
}) {
  const handleRemoveRoute = async () => {
    const { error } = await supabase
      .from("discovery_favorites")
      .delete()
      .eq("id", route.discoveryFavoritesId);
    if (error) throw error;
    if (setRoutes) {
      setRoutes((prev) => prev.filter((item) => item.id !== route.id));
    }
  };

  return (
    <div className="group relative w-full h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all active:scale-[0.98] mb-2">
      {canShowDelete && (
        <span
          className="absolute top-5 right-5 z-50"
          onClick={handleRemoveRoute}
        >
          <Trash2 color="white" size={25} />
        </span>
      )}
      <img
        src={route.image_url}
        alt={route.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
        <h3 className="text-white text-xl font-bold leading-tight drop-shadow">
          {route.title}
        </h3>

        <p className="text-white text-sm">{route.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/90 text-sm bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
            📍 {route.address}
          </span>

          <span className="text-white/90 text-sm bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
            #{route.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FavoriteRoutes;
