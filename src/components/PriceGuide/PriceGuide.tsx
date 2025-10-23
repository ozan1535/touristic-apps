/* import React from "react";

function PriceGuide() {
  const priceItems = [
    { label: "Taxi Fare", price: "1200" },
    { label: "Coffee", price: "1200" },
    { label: "Meal", price: "1200" },
    { label: "Public Transport", price: "1200" },
  ];

  return (
    <div className="w-full border border-secondary rounded-sm p-5 bg-[#040b21] sticky top-4">
      <h2 className="text-xl font-bold text-white mb-4">$ Local Price Guide</h2>
      <ul className="space-y-3">
        {priceItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <p className="text-secondary">{item.label}</p>
            <p className="font-bold text-white">{item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceGuide;
 */

import React from "react";
import {
  DollarSign,
  Coffee,
  Utensils,
  Car,
  Train,
  Currency,
} from "lucide-react";
import { IPriceGuideProps, IPriceItem } from "./PriceGuide.types";
import { useTranslations } from "next-intl";

function PriceGuide({ countryId }: IPriceGuideProps) {
  const priceGuideTranslation = useTranslations("PriceGuide");

  // TODO: Fetch real price data based on countryId
  const priceItems: IPriceItem[] = [
    {
      label: "Taxi (5km)",
      price: "$12.00",
      icon: <Car size={20} />,
      description: "Average fare",
    },
    {
      label: "Coffee",
      price: "$4.50",
      icon: <Coffee size={20} />,
      description: "Cappuccino",
    },
    {
      label: "Restaurant Meal",
      price: "$18.00",
      icon: <Utensils size={20} />,
      description: "Mid-range",
    },
    {
      label: "Public Transport",
      price: "$2.50",
      icon: <Train size={20} />,
      description: "One-way ticket",
    },
  ];

  return (
    <div className="w-full border border-purple-400/25 rounded-xl p-6 bg-slate-700/20 backdrop-blur-sm shadow-xl sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-400/15 rounded-lg">
          <DollarSign className="text-green-300" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {priceGuideTranslation("guide")}
          </h2>
          <p className="text-gray-300 text-xs">
            {priceGuideTranslation("cost", {
              currency: "USD",
            })}
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {priceItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-600/20 border border-purple-400/25 hover:border-purple-300/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-purple-300">{item.icon}</div>
              <div>
                <p className="text-gray-100 font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-gray-400 text-xs">{item.description}</p>
                )}
              </div>
            </div>
            <p className="font-bold text-white text-lg">{item.price}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-purple-400/20">
        <p className="text-gray-400 text-xs text-center">
          {priceGuideTranslation("estimate")}
        </p>
      </div>
    </div>
  );
}

export default PriceGuide;
