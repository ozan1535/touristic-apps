"use client";
import { ArrowRightLeft, Globe } from "lucide-react";
import React, { useState } from "react";
import WorldMap from "../Dialog/WorldMap/WorldMap";
import { useTranslations } from "next-intl";

function OpenWorldMap() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("HomePage");
  return (
    <div className="w-full h-full px-5 flex justify-between items-center">
      <div>
        <div className="flex items-center">
          <Globe className="text-indigo-800" size={20} />
          <span className="font-bold ml-2 text-sm text-indigo-800">
            {t("exp")}
          </span>
        </div>
        <div className="mt-3">
          <h3 className="w-40 font-black text-xl text-white">
            {t("openWorldMap")}
          </h3>
        </div>
      </div>
      <div
        className="bg-blue-500 opacity-90 p-2 rounded-full border border-white"
        onClick={() => setOpen(true)}
      >
        <ArrowRightLeft color="white" />
      </div>
      <WorldMap open={open} setOpen={setOpen} />
    </div>
  );
}

export default OpenWorldMap;
