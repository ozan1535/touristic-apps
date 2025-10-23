"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SelectComponent from "../SelectComponent/SelectComponent";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";

function CulturalInsightsClient() {
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const sortedCountries = getSortedCountries(locale);
  const arrayOfCountries = sortedCountries.map((item) => item.label);
  const [selectedCountry, setSelectedCountry] = useState("");
  const culturalInsightsTranslation = useTranslations("CulturalInsights");

  return (
    <div>
      <SelectComponent
        canShowAll={false}
        categories={arrayOfCountries}
        handleValueChange={(selection: string) => {
          setSelectedCountry(selection);
        }}
        customStyle="w-full border-purple-500/30 bg-slate-800/50 hover:bg-slate-800/70"
        customPlaceholder={culturalInsightsTranslation("selectText")}
      />
      <h2 className="text-xl md:text-3xl font-black text-center text-white my-5">
        {culturalInsightsTranslation("insightFor", {
          country: selectedCountry || (locale === "tr" ? "Japonya" : "Japan"),
        })}
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none text-secondary text-xl">
            Bowing Etiquette
          </AccordionTrigger>
          <AccordionContent className="p-1 text-secondary font-medium">
            Tipping is not customary an can be seen as rude. When eating noodles
            like ramen or soba, slurping is perfectly acceptable and shows you
            are enjoying the meal.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none text-secondary text-xl">
            Dining: No Tipping & Slurping Noodles
          </AccordionTrigger>
          <AccordionContent className="p-1 text-secondary font-medium">
            Tipping is not customary an can be seen as rude. When eating noodles
            like ramen or soba, slurping is perfectly acceptable and shows you
            are enjoying the meal.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CulturalInsightsClient;
