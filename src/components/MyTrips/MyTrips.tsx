"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus, MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Trip {
  id: number;
  title: string;
  country: string;
  description: string;
  image: string;
  date: string;
  duration: string;
}

interface MyTripsProps {
  trips: Trip[];
}

function MyTrips({ trips }: MyTripsProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTrip = () => {
    setIsAdding(true);
    // TODO: Open add trip modal or navigate to add trip page
    console.log("Add trip clicked");
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-white font-bold text-2xl mb-1 flex items-center gap-2">
            <MapPin className="text-purple-400" size={28} />
            My Trips
          </h1>
          <p className="text-gray-400 text-sm">
            A collection of your past and upcoming adventures
          </p>
        </div>
        <Button
          onClick={handleAddTrip}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold border-0 shadow-lg whitespace-nowrap"
        >
          <CirclePlus className="mr-2" size={18} />
          Add Trip
        </Button>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={trip.image}
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
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {trip.description}
                </p>
                <div className="flex items-center gap-4 text-gray-400 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{trip.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-purple-500/30 rounded-lg">
          <MapPin
            className="mx-auto mb-4 text-purple-400 opacity-50"
            size={48}
          />
          <p className="text-gray-400 mb-4">No trips yet</p>
          <Button
            onClick={handleAddTrip}
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            <CirclePlus className="mr-2" size={18} />
            Add Your First Trip
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
