import { ChevronRight, Wifi } from "lucide-react";
import Link from "next/link";
import React from "react";

function AffiliateBanner() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <Link
          href={"#"}
          className="w-full mx-auto bg-gradient-to-r from-amber-700 to-yellow-500 p-4 rounded-2xl flex items-center gap-4 shadow-sm"
        >
          <div className="bg-white p-2 rounded-xl">
            <Wifi size={20} color="blue" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">Don't stay offline</h4>
            <p className="text-white text-xs font-medium mt-0.5 leading-tight">
              Get 15% off with Airalo (Code: IST15)
            </p>
          </div>
          <ChevronRight className="text-white" size={20} />
        </Link>
      </div>
    </div>
  );
}

export default AffiliateBanner;
