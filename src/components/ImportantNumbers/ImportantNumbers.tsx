import { Activity, Ambulance, Flame, Siren } from "lucide-react";
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
  const emergencyNumbers = [
    {
      icon: <Ambulance className="w-6 h-6" />,
      label: "Ambulance",
      number: ambulance || "-",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: "Fire",
      number: fireFighting || "-",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Siren className="w-6 h-6" />,
      label: "Police",
      number: police || "-",
      color: "from-blue-500 to-blue-600",
    },
  ];
  return (
    <div className="w-full border border-purple-400/25 rounded-xl p-6 bg-slate-700/20 backdrop-blur-sm shadow-xl mt-5">
      <h1 className="text-center text-white font-bold text-2xl flex justify-center items-center gap-2 mb-5">
        <Activity size={24} /> <span>Emergency Numbers</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {emergencyNumbers.map((item, index) => (
          <div
            key={index}
            className="group relative bg-slate-800/50 rounded-xl p-5 border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`bg-gradient-to-br ${item.color} p-3 rounded-full text-white shadow-lg`}
              >
                {item.icon}
              </div>
              <p className="text-slate-300 text-sm font-medium">{item.label}</p>
              <div className="w-full bg-slate-700/50 rounded-lg py-3">
                <p className="text-white font-bold text-xl text-center">
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
