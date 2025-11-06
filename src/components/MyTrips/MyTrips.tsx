"use client";
import React, { useState } from "react";
import { CirclePlus, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TripDialog } from "../AddTrip/AddTrip";
import ShowTrip from "../ShowTrip/ShowTrip";
import TripsCards from "../TripsCards/TripsCards";
import { MyTripsProps, TripData } from "./MyTrips.types";
import { useTranslations } from "next-intl";

function MyTrips({ trips, isOwner, userData }: MyTripsProps) {
  const t = useTranslations("Profile");
  const { locale } = useParams();
  const [dialogItems, setDialogItems] = useState<{
    isOpen: boolean;
    tripData: TripData | null;
    mode: string;
  }>({
    isOpen: false,
    tripData: null,
    mode: "add",
  });
  const { isOpen, tripData, mode } = dialogItems;
  const handleAddTrip = () => {
    setDialogItems((prev) => ({
      ...prev,
      isOpen: true,
      tripData: null,
      mode: "add",
    }));
  };

  return (
    <div className="bg-white backdrop-blur-sm border border-indigo-200 rounded-xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-slate-900 font-bold text-2xl mb-1 flex items-center gap-2">
            <MapPin className="text-blue-500" size={28} />
            {isOwner ? t("myTrips") : t("trips")}
          </h1>
        </div>
        {/*  {isOwner && ( */}
        <Button
          onClick={handleAddTrip}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-bold border-0 shadow-lg whitespace-nowrap"
        >
          <CirclePlus className="mr-2" size={18} />
          {t("addTrip")}
        </Button>
        {/*    )} */}
      </div>

      {trips.length > 0 ? (
        <TripsCards
          setDialogItems={setDialogItems}
          trips={trips}
          locale={locale}
          isOwner={isOwner}
        />
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-indigo-200 rounded-lg">
          <MapPin className="mx-auto mb-4 text-blue-500 opacity-50" size={48} />
          <p className="text-slate-600 mb-4">{t("noTrips")}</p>
          {isOwner && (
            <Button
              onClick={handleAddTrip}
              variant="outline"
              className="border-indigo-200 cursor-pointer"
            >
              <CirclePlus className="mr-2" size={18} />
              {t("addFirstTrip")}
            </Button>
          )}
        </div>
      )}
      {isOpen && mode !== "show" && (
        <TripDialog
          isOpen={isOpen}
          onClose={() => setDialogItems((prev) => ({ ...prev, isOpen: false }))}
          userData={userData}
          mode={mode}
          tripData={tripData}
        />
      )}
      {isOpen && mode === "show" && tripData && (
        <ShowTrip
          isOpen={isOpen}
          onClose={() => setDialogItems((prev) => ({ ...prev, isOpen: false }))}
          tripData={tripData}
        />
      )}
    </div>
  );
}

export default MyTrips;
