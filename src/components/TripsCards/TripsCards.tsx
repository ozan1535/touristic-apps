"use client";
import React from "react";
import Image from "next/image";
import { Calendar, Edit, MapPin, Trash2 } from "lucide-react";
import { tr, enUS } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "../ui/card";

function TripsCards({ trips, setDialogItems, locale, isOwner = false }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-auto pr-2 custom-scrollbar">
      {trips.map((trip) => (
        <Card
          key={trip.id}
          className="cursor-pointer bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
          onClick={() =>
            setDialogItems((prev) => ({
              ...prev,
              isOpen: true,
              tripData: trip,
              mode: "show",
            }))
          }
        >
          <div className="relative h-48 w-full">
            <Image
              src={trip.picture}
              fill
              alt={trip.title}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs font-semibold bg-purple-600/80 px-3 py-1 rounded-full">
              <MapPin size={12} />
              {trip.country}
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-white font-bold text-lg mb-2 line-clamp-1">
              {trip.title}
            </h2>

            <div
              className="text-gray-300 text-sm mb-3 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: trip.description.slice(0, 200),
              }}
            />

            <div className="flex justify-between items-center gap-4 text-gray-400 text-xs">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>
                  {formatDistanceToNow(new Date(trip.created_at), {
                    addSuffix: true,
                    locale: locale === "tr" ? tr : enUS,
                  })}
                </span>
              </div>
              {isOwner && (
                <div className="flex">
                  <Edit
                    size={24}
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDialogItems((prev) => ({
                        ...prev,
                        mode: "edit",
                        isOpen: true,
                        tripData: trip,
                      }));
                    }}
                  />

                  <Trash2
                    size={24}
                    color="white"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const response = await supabase
                        .from("trips")
                        .delete()
                        .eq("id", trip.id);
                      router.refresh();
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TripsCards;
