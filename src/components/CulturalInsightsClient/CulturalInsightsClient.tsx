"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SelectComponent from "../SelectComponent/SelectComponent";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";
import { supabase } from "@/lib/supabase/client";
import TripsCards from "../TripsCards/TripsCards";
import ShowTrip from "../ShowTrip/ShowTrip";
import { fetchCulturalInsightsAndTrips } from "./culturalInsights.helpers";

function CulturalInsightsClient() {
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const sortedCountries = getSortedCountries(locale);
  const arrayOfCountries = sortedCountries.map((item) => item.label);
  const [selectedCountry, setSelectedCountry] = useState("");
  const culturalInsightsTranslation = useTranslations("CulturalInsights");
  const [culturalInsightsData, setCulturalInsightsData] = useState([]);
  const [tripsData, setTripsData] = useState([]);
  const [dialogItems, setDialogItems] = useState({
    isOpen: false,
    tripData: null,
    mode: "show",
  });

  const handleFetchData = async (selection: string) => {
    const { insights, trips } = await fetchCulturalInsightsAndTrips(
      selection,
      sortedCountries,
      locale
    );

    setCulturalInsightsData(insights);
    setTripsData(trips);
  };

  return (
    <div>
      <SelectComponent
        canShowAll={false}
        categories={arrayOfCountries}
        handleValueChange={(selection: string) => {
          setSelectedCountry(selection);
          handleFetchData(selection);
        }}
        customStyle="w-full border-purple-500/30 bg-slate-800/50 hover:bg-slate-800/70"
        customPlaceholder={culturalInsightsTranslation("selectText")}
      />
      {selectedCountry && !culturalInsightsData.length && (
        <div className="border border-purple-500/30 rounded-xl p-8 bg-slate-900/50 backdrop-blur-sm text-center mt-5">
          <AlertCircle className="mx-auto mb-4 text-purple-400" size={48} />
          <p className="text-gray-300 text-lg font-semibold">
            There are no insights for {selectedCountry} yet
          </p>
          <p className="text-gray-400 text-sm mt-2">Check back soon</p>
        </div>
      )}
      {culturalInsightsData.length && (
        <>
          <h2 className="text-xl md:text-3xl font-black text-center text-white my-5">
            {culturalInsightsTranslation("insightFor", {
              country: selectedCountry,
            })}
          </h2>
          <Accordion type="single" collapsible>
            {culturalInsightsData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none text-secondary text-xl">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="p-1 text-secondary font-medium">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
      {tripsData.length && (
        <>
          <h1 className="text-white text-2xl font-bold my-5">
            Tourists Insights
          </h1>
          <TripsCards
            setDialogItems={setDialogItems}
            trips={tripsData}
            locale={locale}
            isOwner={false}
          />
        </>
      )}

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

export default CulturalInsightsClient;
