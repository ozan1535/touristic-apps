"use client";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import TripsCards from "../TripsCards/TripsCards";
import ShowTrip from "../ShowTrip/ShowTrip";
import { useTranslations } from "next-intl";

function CulturalInsightsAndTrips({
  currentCountry,
  culturalInsightsData,
  tripsData,
  locale,
}) {
  const [dialogItems, setDialogItems] = useState({
    isOpen: false,
    tripData: null,
    mode: "show",
  });
  const culturalInsightsTranslation = useTranslations("CulturalInsights");

  return (
    <div>
      {currentCountry && !culturalInsightsData.length && null}
      {/* {currentCountry && !culturalInsightsData.length && (
        <div className="border border-blue-400/30 rounded-xl p-8 bg-slate-900/50 backdrop-blur-sm text-center mt-5">
          <AlertCircle className="mx-auto mb-4 text-blue-300" size={48} />
          <p className="text-slate-600 text-lg font-semibold">
            {culturalInsightsTranslation("noInsight", {
              country: currentCountry.name[locale],
            })}
          </p>
          <p className="text-slate-600 text-sm mt-2">
            {culturalInsightsTranslation("checkBackSoon")}
          </p>
        </div>
      )} */}
      {culturalInsightsData.length ? (
        <>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 my-5">
            {culturalInsightsTranslation("insightFor", {
              country: currentCountry.name[locale],
            })}
          </h2>
          <Accordion type="single" collapsible>
            {culturalInsightsData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none text-slate-900 text-xl">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="p-1 text-slate-900 font-medium">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      ) : null}
      {tripsData.length ? (
        <>
          <h1 className="text-slate-900 text-2xl font-bold my-5">
            {culturalInsightsTranslation("touristInsights")}
          </h1>
          <TripsCards
            setDialogItems={setDialogItems}
            trips={tripsData}
            locale={locale}
            isOwner={false}
          />
        </>
      ) : null}

      {dialogItems.isOpen && dialogItems.mode === "show" ? (
        <ShowTrip
          isOpen={dialogItems.isOpen}
          onClose={() => setDialogItems((prev) => ({ ...prev, isOpen: false }))}
          tripData={dialogItems.tripData}
        />
      ) : null}
    </div>
  );
}

export default CulturalInsightsAndTrips;
