"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/app/context/SelectedLanguage";
import { handleFetchApps } from "./helpers";
import { ICategoryWithApps } from "./types";
import CountryDetailCard from "../CountryDetailCard/CountryDetailCard";

function AppsAccordion({ countryCca2 }: { countryCca2: string }) {
  const [data, setData] = useState<ICategoryWithApps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    handleFetchApps(countryCca2, language, setData, setLoading);
  }, []);

  if (loading) {
    <div>{language === "en" ? "Loading." : "Yükleniyor."}</div>;
  }

  if (data === null || data?.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {language === "en"
          ? "No apps available for this country yet."
          : "Bu ülke için henüz uygulama bulunmuyor."}
      </div>
    );
  }
  return (
    <Accordion type="single" collapsible>
      {data.map((item, index) => (
        <AccordionItem value={item.category} key={index}>
          <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none">
            {item.category}
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-3 gap-3 p-1">
            {item.apps.map((appDetail) => (
              <CountryDetailCard appDetail={appDetail} key={appDetail.id} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AppsAccordion;
