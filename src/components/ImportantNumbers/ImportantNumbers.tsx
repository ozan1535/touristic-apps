"use client";
import { Activity, Ambulance, Flame, Siren } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

function ImportantNumbers({
  ambulance,
  police,
  fireFighting,
}: {
  ambulance: string;
  police: string;
  fireFighting: string;
}) {
  const { locale } = useParams();
  const emergencyNumbers = [
    {
      icon: <Ambulance className="w-6 h-6" />,
      label: locale === "en" ? "Ambulance" : "Ambulans",
      number: ambulance || "-",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: locale === "en" ? "Fire" : "İtfaiye",
      number: fireFighting || "-",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Siren className="w-6 h-6" />,
      label: locale === "en" ? "Police" : "Polis",
      number: police || "-",
      color: "from-blue-500 to-blue-600",
    },
  ];
  return (
    <div className="w-full border border-blue-200 rounded-xl p-6 bg-blue-50 backdrop-blur-sm shadow-xl mt-5">
      <h1 className="text-center text-slate-900 font-bold text-2xl flex justify-center items-center gap-2 mb-5">
        <Activity size={24} />
        <span>
          {locale === "en" ? "Emergency Numbers" : "Önemli Numaralar"}
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {emergencyNumbers.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl p-5 border border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`bg-gradient-to-br ${item.color} p-3 rounded-full text-slate-900 shadow-lg`}
              >
                {item.icon}
              </div>
              <p className="text-slate-600 text-sm font-medium">{item.label}</p>
              <div className="w-full bg-indigo-50 rounded-lg py-3">
                <p className="text-slate-900 font-bold text-xl text-center">
                  {item.number}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImportantNumbers;
