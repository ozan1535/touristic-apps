/* import AppDetails from "@/components/Dialog/AppDetails";
import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Touristic App",
  description:
    "A touristic app that guides tourists for each country by suggesting apps",
};

export default function Home() {
  return (
    <div className="w-full p-10 ">
      <h1 className="text-3xl md:text-5xl font-black text-center text-purple-primary">
        GlobalAppGuide
      </h1>

      <p className="text-center text-secondary my-3 md:my-8">
        Your ultimate companion for navigating life abroad. Discover essential
        apps and local prices for any country.
      </p>
      <div className="flex justify-center items-center w-full text-center">
        <div className="w-full md:w-[50%]">
          <SearchCountry />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <RotatingWorldChart />
      </div>
    </div>
  );
}
 */

import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";

export const metadata: Metadata = {
  title: "GlobalAppGuide - Essential Apps & Local Prices for Every Country",
  description:
    "Your ultimate companion for navigating life abroad. Discover essential apps, local prices, and travel insights for any country worldwide.",
  keywords:
    "travel apps, local prices, country guide, tourist apps, travel planner",
};

export default function Home() {
  const searchCountryTranslation = useTranslations("SearchCountry");
  const homePageTranslation = useTranslations("HomePage");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <section className="w-full px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
              GlobalAppGuide
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {homePageTranslation("description")}
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchCountry
              placeholderTranslation={searchCountryTranslation("placeholder")}
              emptyTranslation={searchCountryTranslation("empty")}
            />
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {homePageTranslation("explore")}
            </h2>
            <p className="text-gray-400">
              {homePageTranslation("clickLongText")}
            </p>
          </div>

          <div className="border border-purple-500/30 rounded-2xl p-4 md:p-8 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            <RotatingWorldChart
              clickShortText={homePageTranslation("clickShortText")}
            />
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center border border-purple-500/30 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
          <Sparkles className="mx-auto mb-4 text-purple-400" size={40} />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {homePageTranslation("planYourTrip")}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {homePageTranslation("letOurAi")}
          </p>
          <Link
            href="/ai-travel-planner"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Sparkles size={20} />
            <span>{homePageTranslation("tryButton")}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
