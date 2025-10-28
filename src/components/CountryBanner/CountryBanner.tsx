import { Plane, MapPin } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ICountryBannerProps } from "./CountryBanner.types";

function CountryBanner({ picture, country, locale }: ICountryBannerProps) {
  const CountryBannerTranslation = useTranslations("CountryBanner");

  return (
    <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${picture || country.flag})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

      <div className="relative h-full flex flex-col items-start justify-end px-4 md:px-6 lg:px-10 pb-8 md:pb-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-3 mb-3">
            {country.capital && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={16} />
                <span>{country.capital}</span>
              </div>
            )}
          </div>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black mb-3 drop-shadow-2xl">
            {country.name[locale]}
          </h1>

          <p className="text-gray-200 text-base md:text-lg mb-6 max-w-2xl">
            {CountryBannerTranslation("discoverApps")}
          </p>

          <Link
            href="/ai-travel-planner"
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Plane size={20} />
            <span>{CountryBannerTranslation("planTrip")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CountryBanner;
