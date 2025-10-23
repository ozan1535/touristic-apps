/* import React from "react";
import CountryAppsWithFilter from "@/components/CountryAppsWithFilter/CountryAppsWithFilter";
import { allCountries, getCountryApps, getTopApps } from "@/lib/helpers";
import CountryBanner from "@/components/CountryBanner/CountryBanner";
import TopApps from "@/components/TopApps/TopApps";
import PriceGuide from "@/components/PriceGuide/PriceGuide";

async function page({
  params,
}: {
  params: { countryId: string; locale: "en" | "tr" };
}) {
  const { countryId, locale } = await params;
  const currentCountry = allCountries.find(
    (country) => country.cca2.toLowerCase() === countryId
  );
  const countryApps = await getCountryApps(countryId, locale);
  const topApps = getTopApps(countryApps);
  const hasData = countryApps.length > 0;

  return (
    <div className="w-full">
      <CountryBanner country={currentCountry} locale={locale} />

      <div className="w-full px-4 md:px-6 lg:px-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              {topApps.length > 0 && <TopApps topApps={topApps} />}

              {hasData ? (
                <CountryAppsWithFilter countryApps={countryApps} />
              ) : (
                <p className="text-secondary font-black">
                  There is no data available yet.
                </p>
              )}
            </div>

            {hasData && (
              <aside className="w-full lg:w-1/3">
                <PriceGuide />
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
 */

import React from "react";
import { AlertCircle } from "lucide-react";
import CountryAppsWithFilter from "@/components/CountryAppsWithFilter/CountryAppsWithFilter";
import { allCountries, getCountryApps, getTopApps } from "@/lib/helpers";
import CountryBanner from "@/components/CountryBanner/CountryBanner";
import TopApps from "@/components/TopApps/TopApps";
import PriceGuide from "@/components/PriceGuide/PriceGuide";
import { ICountryPageProp } from "./countryApps.types";
import { getTranslations } from "next-intl/server";

async function page({ params }: ICountryPageProp) {
  const { countryId, locale } = await params;

  const currentCountry = allCountries.find(
    (country) => country.cca2.toLowerCase() === countryId
  );
  const countryAppsTranslation = await getTranslations("CountryApps");

  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={64} />
          <h1 className="text-2xl font-bold text-white mb-2">
            {countryAppsTranslation("notFound")}
          </h1>
          <p className="text-gray-400">{countryAppsTranslation("notExist")}</p>
        </div>
      </div>
    );
  }

  const countryApps = await getCountryApps(countryId, locale);
  const topApps = getTopApps(countryApps);
  const hasData = countryApps.length > 0;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950">
      <CountryBanner country={currentCountry} locale={locale} />

      <div className="w-full px-4 md:px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="w-full lg:w-2/3">
              {topApps.length > 0 && <TopApps topApps={topApps} />}

              {hasData ? (
                <CountryAppsWithFilter countryApps={countryApps} />
              ) : (
                <div className="border border-purple-500/30 rounded-xl p-8 bg-slate-900/50 backdrop-blur-sm text-center">
                  <AlertCircle
                    className="mx-auto mb-4 text-purple-400"
                    size={48}
                  />
                  <p className="text-gray-300 text-lg font-semibold">
                    {countryAppsTranslation("noAppData")}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {countryAppsTranslation("checkBackSoon")}
                  </p>
                </div>
              )}
            </main>

            {hasData && (
              <aside className="w-full lg:w-1/3">
                <PriceGuide countryId={countryId} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
