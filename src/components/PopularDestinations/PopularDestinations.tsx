import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { allCountries } from "@/lib/helpers";

function PopularDestinations({ country, locale }) {
  const currentCountry = allCountries.find(
    (c) => c.cca2 === country.country_cca2
  );

  return (
    <Link
      href={`/${locale}/${country.country_cca2.toLowerCase()}`}
      className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <Image
        src={country.banner_picture}
        alt={"resim"}
        width={600}
        height={600}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={currentCountry?.flag || ""}
                alt={"resim"}
                width={500}
                height={500}
                className="w-8 h-8 object-contain transition-transform duration-700 group-hover:scale-105 brightness-75 rounded-md"
              />
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold text-white border border-white/20">
                ⭐ 4.9
              </span>
            </div>
            <h3 className="text-white text-2xl font-bold tracking-tight">
              {currentCountry.name[locale]}
            </h3>
          </div>
          <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PopularDestinations;
