"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { X, MapPin, Calendar, Clock, User } from "lucide-react";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { TripData } from "../MyTrips/MyTrips.types";
import { useTranslations } from "next-intl";

interface ShowTripProps {
  isOpen: boolean;
  tripData: TripData;
  onClose: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
  currentUserId?: string;
}

function ShowTrip({ isOpen, tripData, onClose }: ShowTripProps) {
  const [imageError, setImageError] = useState(false);
  const t = useTranslations("Profile");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:h-[90vh] sm:max-w-[900px] p-0 overflow-hidden bg-slate-900 border-purple-400/30 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-400/30 hover:bg-slate-800 transition-all shadow-lg"
        >
          <X className="text-gray-300" size={20} />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="relative w-full h-[250px] md:h-[300px] bg-slate-800">
            {!imageError ? (
              <Image
                src={tripData.picture}
                fill
                alt={tripData.title}
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <MapPin className="text-purple-400 opacity-50" size={60} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <DialogTitle className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text mb-4">
                {tripData.title}
              </DialogTitle>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                {tripData.country && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-purple-400/20">
                    <MapPin size={16} className="text-purple-400" />
                    <span>{tripData.country}</span>
                  </div>
                )}

                {tripData.duration && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-purple-400/20">
                    <Clock size={16} className="text-purple-400" />
                    <span>{tripData.duration}</span>
                  </div>
                )}

                {tripData.created_at && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-purple-400/20">
                    <Calendar size={16} className="text-purple-400" />
                    <span>
                      {new Date(tripData.created_at).toLocaleDateString(
                        "tr-TR"
                      )}
                    </span>
                  </div>
                )}
              </div>

              {tripData.profiles && (
                <div className="flex items-center gap-3 mt-4 p-3 bg-slate-800/30 rounded-lg border border-purple-400/20 w-fit">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                    {tripData.profiles.picture ? (
                      <Image
                        src={tripData.profiles.picture}
                        fill
                        alt={tripData.profiles.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                        <User className="text-purple-300" size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/user/${tripData.profiles.username}`}
                      className="text-white font-semibold text-sm"
                    >
                      {tripData.profiles.name}
                    </Link>
                    <p className="text-gray-400 text-xs">
                      @{tripData.profiles.username}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent my-6" />

            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: tripData.description }}
            />
          </div>
        </div>

        <DialogFooter className="border-t border-purple-400/30 p-4 bg-slate-900">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-purple-400/30"
          >
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShowTrip;
