import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import CountryBanner from "@/components/CountryBanner/CountryBanner";
import TopApps from "@/components/TopApps/TopApps";
import CountryAppsWithFilter from "@/components/CountryAppsWithFilter/CountryAppsWithFilter";
import PriceGuide from "@/components/PriceGuide/PriceGuide";
import CheapFlightChart from "@/components/CheapFlightChart/CheapFlightChart";
import ImportantNumbers from "@/components/ImportantNumbers/ImportantNumbers";
import { allCountries, getCountryApps, getTopApps } from "@/lib/helpers";
import { getCountryData, getFlightValue } from "./countryApps.helpers";
import { fetchCulturalInsightsAndTrips } from "@/components/CulturalInsightsClient/culturalInsights.helpers";
import CulturalInsightsAndTrips from "@/components/CulturalInsightsAndTrips/CulturalInsightsAndTrips";
import ShareYourKnowledgeClient from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient";

export async function generateMetadata({
  params: { locale, countryId },
}: {
  params: { locale: string; countryId: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.countryDetail");

  const country = allCountries.find((c) => c.cca2.toLowerCase() === countryId);
  const countryName = country?.name[locale as "en" | "tr"] || countryId;

  return {
    title: t("title", { country: countryName }),
    description: t("description", { country: countryName }),
    keywords: t("keywords", { country: countryName }),
    openGraph: {
      title: t("title", { country: countryName }),
      description: t("description", { country: countryName }),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title", { country: countryName }),
      description: t("description", { country: countryName }),
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: { countryId: string; locale: "tr" | "en" };
}) {
  const { countryId, locale } = await params;
  const t = await getTranslations("CountryApps");

  const { insights, trips } = await fetchCulturalInsightsAndTrips(
    // selection,
    // sortedCountries,
    countryId.toUpperCase(),
    locale
  );

  const currentCountry = allCountries.find(
    (c) => c.cca2.toLowerCase() === countryId
  );

  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={64} />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t("notFound")}
          </h1>
          <p className="text-slate-500">{t("notExist")}</p>
        </div>
      </div>
    );
  }

  const [{ countryInfo, priceGuide, contributions }, countryApps] =
    await Promise.all([
      getCountryData(currentCountry.cca2, locale),
      getCountryApps(countryId, locale),
    ]);

  const topApps = getTopApps(countryApps);
  const hasData =
    countryApps.length > 0 ||
    contributions.length > 0 ||
    insights?.length > 0 ||
    trips?.length > 0;
  const hasImportantNumber =
    countryInfo?.ambulance || countryInfo?.police || countryInfo?.fire_fighting;
  const flightValue = getFlightValue(countryInfo);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <CountryBanner
        picture={countryInfo?.banner_picture}
        country={currentCountry}
        locale={locale}
      />

      <div className="w-full px-4 md:px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="w-full lg:w-2/3">
              {topApps.length > 0 && <TopApps topApps={topApps} />}
              {hasData ? (
                <>
                  <CountryAppsWithFilter
                    countryApps={countryApps}
                    contributions={contributions}
                  />
                  <CulturalInsightsAndTrips
                    currentCountry={currentCountry}
                    culturalInsightsData={insights}
                    tripsData={trips}
                    locale={locale}
                  />
                </>
              ) : (
                <EmptyState
                  message={t("noAppData")}
                  subMessage={t("checkBackSoon")}
                />
              )}
            </main>

            <aside className="w-full lg:w-1/3">
              {priceGuide.length > 0 && <PriceGuide priceGuide={priceGuide} />}
              <CheapFlightChart value={flightValue || 50} />
              {hasImportantNumber ? (
                <ImportantNumbers
                  ambulance={countryInfo?.ambulance}
                  police={countryInfo?.police}
                  fireFighting={countryInfo?.fire_fighting}
                />
              ) : null}
            </aside>
          </div>
          <div className="border border-indigo-200 mt-5 rounded-2xl p-6 md:p-10 bg-white backdrop-blur-sm shadow-xl">
            <ShareYourKnowledgeClient />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  message,
  subMessage,
}: {
  message: string;
  subMessage: string;
}) {
  return (
    <div className="border border-indigo-200 rounded-xl p-8 bg-white backdrop-blur-sm text-center">
      <AlertCircle className="mx-auto mb-4 text-blue-300" size={48} />
      <p className="text-slate-700 text-lg font-semibold">{message}</p>
      <p className="text-slate-500 text-sm mt-2">{subMessage}</p>
    </div>
  );
}
