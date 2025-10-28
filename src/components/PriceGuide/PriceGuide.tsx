import React from "react";
import { DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import * as LucideIcons from "lucide-react";

import { IPriceGuideProps } from "./PriceGuide.types";

function PriceGuide({ priceGuide }: IPriceGuideProps) {
  const priceGuideTranslation = useTranslations("PriceGuide");

  return (
    <div className="w-full border border-purple-400/25 rounded-xl p-6 bg-slate-700/20 backdrop-blur-sm shadow-xl">
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
        {priceGuide.map((item, index) => {
          const Icon = LucideIcons[item.component] || LucideIcons.HelpCircle;

          return (
            <li
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-600/20 border border-purple-400/25 hover:border-purple-300/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-purple-300">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-gray-100 font-medium">{item.title}</p>
                  {item.description && (
                    <p className="text-gray-400 text-xs">{item.description}</p>
                  )}
                </div>
              </div>
              <p className="font-bold text-white text-lg">
                {Number(item.price).toFixed(2)}
              </p>
            </li>
          );
        })}
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
