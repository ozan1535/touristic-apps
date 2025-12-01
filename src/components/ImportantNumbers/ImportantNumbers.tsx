"use client";
import { Activity, Ambulance, Flame, Siren } from "lucide-react";
import Link from "next/link";
import React from "react";

function ImportantNumbers({
  ambulance,
  police,
  fireFighting,
  locale = "en",
}: {
  ambulance: string;
  police: string;
  fireFighting: string;
  locale: string;
}) {
  const emergencyNumbers = [
    {
      icon: <Ambulance className="w-7 h-7" />,
      label: locale === "en" ? "Ambulance" : "Ambulans",
      number: ambulance || "-",
      bgColor: "bg-red-600",
      iconColor: "text-red-100",
      hoverColor: "hover:bg-red-700",
    },
    {
      icon: <Flame className="w-7 h-7" />,
      label: locale === "en" ? "Fire" : "İtfaiye",
      number: fireFighting || "-",
      bgColor: "bg-orange-600",
      iconColor: "text-orange-100",
      hoverColor: "hover:bg-orange-700",
    },
    {
      icon: <Siren className="w-7 h-7" />,
      label: locale === "en" ? "Police" : "Polis",
      number: police || "-",
      bgColor: "bg-blue-600",
      iconColor: "text-blue-100",
      hoverColor: "hover:bg-blue-700",
    },
  ];

  return (
    <div className="w-full border-2 border-red-300 rounded-2xl p-6 bg-gradient-to-br from-red-50 via-red-50 to-orange-50 shadow-xl mt-5">
      <h1 className="text-center text-red-900 font-bold text-2xl flex justify-center items-center gap-2 mb-6">
        <div className="p-2 bg-red-600 rounded-full">
          <Activity size={24} className="text-white" />
        </div>
        <span>
          {locale === "en" ? "Emergency Numbers" : "Önemli Numaralar"}
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {emergencyNumbers.map((item, index) => (
          <Link
            href={`tel:${item.number}`}
            key={index}
            className={`group relative ${item.bgColor} ${item.hoverColor} rounded-xl p-5 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`${item.iconColor} p-3 bg-white/20 rounded-full backdrop-blur-sm`}
              >
                {item.icon}
              </div>
              <p className="text-white text-sm font-semibold uppercase tracking-wide">
                {item.label}
              </p>
              <div className="w-full bg-white rounded-lg py-3 px-4 shadow-md">
                <p className="text-gray-900 font-bold text-2xl text-center tracking-wider">
                  {item.number}
                </p>
              </div>
            </div>

            {/* Subtle pulse effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>

      <p className="text-center text-red-700 text-xs font-medium mt-5 flex items-center justify-center gap-1">
        <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
        {locale === "en"
          ? "For emergencies only - Call immediately if needed"
          : "Yalnızca acil durumlar için - Gerekirse hemen arayın"}
      </p>
    </div>
  );
}

export default ImportantNumbers;
