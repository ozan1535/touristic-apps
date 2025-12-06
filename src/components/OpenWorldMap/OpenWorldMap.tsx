"use client";
import { ArrowRightLeft, Globe } from "lucide-react";
import React, { useState } from "react";
import WorldMap from "../Dialog/WorldMap/WorldMap";
import { useTranslations } from "next-intl";
import CustomDialog from "../Dialog/CustomDialog/CustomDialog";
import RotatingWorldChart from "../RotatingWorldChart/RotatingWorldChart";

function OpenWorldMap() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("HomePage");
  return (
    <div className="w-full h-full px-5 flex justify-between items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-500 rounded-lg">
      <div>
        <div className="flex items-center">
          <Globe className="text-indigo-800 dark:text-blue-400" size={20} />
          <span className="font-bold ml-2 text-sm text-indigo-800 dark:text-blue-400">
            {t("exp")}
          </span>
        </div>
        <div className="mt-3">
          <h3 className="w-40 font-black text-xl text-indigo-800 dark:text-white">
            {t("openWorldMap")}
          </h3>
        </div>
      </div>
      <div
        className="bg-blue-500 dark:bg-blue-600 opacity-90 p-2 rounded-full border border-white dark:border-slate-300 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={() => setOpen(true)}
      >
        <ArrowRightLeft color="white" />
      </div>
      <CustomDialog open={open} setOpen={setOpen}>
        <RotatingWorldChart />
      </CustomDialog>
    </div>
  );
}

export default OpenWorldMap;
