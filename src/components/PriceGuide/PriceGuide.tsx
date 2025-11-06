import React from "react";
import { DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import * as LucideIcons from "lucide-react";

import { IPriceGuideProps } from "./PriceGuide.types";

function PriceGuide({ priceGuide }: IPriceGuideProps) {
  const priceGuideTranslation = useTranslations("PriceGuide");

  return (
    <div className="w-full border border-blue-200 rounded-xl p-6 bg-blue-50 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <DollarSign className="text-blue-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {priceGuideTranslation("guide")}
          </h2>
          <p className="text-slate-500 text-xs">
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
              className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 border border-blue-200 hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-indigo-600">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-slate-700 font-medium">{item.title}</p>
                  {item.description && (
                    <p className="text-slate-400 text-xs">{item.description}</p>
                  )}
                </div>
              </div>
              <p className="font-bold text-slate-900 text-lg">
                {Number(item.price).toFixed(2)}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-4 border-t border-indigo-200">
        <p className="text-slate-400 text-xs text-center">
          {priceGuideTranslation("estimate")}
        </p>
      </div>
    </div>
  );
}

export default PriceGuide;
