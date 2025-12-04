import { ChevronRight, Sparkles } from "lucide-react";
import { Metadata } from "next";
// import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";
import OpenWorldMap from "@/components/OpenWorldMap/OpenWorldMap";
// import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import PopularDestinationsComponent from "@/components/PopularDestinations/PopularDestinationsComponent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkMobileRedirect } from "@/lib/server/checkMobileRedirect";
// import PopularDestinations from "@/components/PopularDestinations/PopularDestinations";
// import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.homepage");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: "GlobalAppGuide",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  await checkMobileRedirect();

  const searchCountryTranslation = await getTranslations("SearchCountry");
  const homePageTranslation = await getTranslations("HomePage");

  const { data: popularDestinations } = await supabase
    .from("countries")
    .select("*");
  //.in("country_cca2", ["TR", "IT", "JP"]);

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="w-full py-6 px-4 md:py-20">
        <div className="max-w-6xl mx-auto md:text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-2">
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text">
              GlobalAppGuide
            </span>
          </h1>

          <p className="text-slate-900 font-dynapuff text-lg md:text-xl max-w-3xl mx-auto mb-5 leading-relaxed">
            {homePageTranslation("description")}
          </p>

          <div className="max-w-5xl mx-auto">
            <SearchCountry
              placeholderTranslation={searchCountryTranslation("placeholder")}
              emptyTranslation={searchCountryTranslation("empty")}
            />
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:pb-20">
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {homePageTranslation("explore")}
            </h2>
            <p className="text-slate-700">
              {homePageTranslation("clickLongText")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto border border-indigo-200 rounded-2xl p-4 md:p-8 bg-white backdrop-blur-sm shadow-xl">
            <RotatingWorldChart />
          </div>
        </div>

        <div className="block md:hidden max-w-6xl mx-auto h-40 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-2xl">
          <OpenWorldMap />
        </div>
      </section>

      <PopularDestinationsComponent
        popularDestinations={popularDestinations}
        locale={locale}
      />
      {/* <section className="w-full py-6 px-4 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            {homePageTranslation("popularDestinations")}
          </h3>
          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            {popularDestinations?.map((country) => (
              <PopularDestinations
                country={country}
                key={country.id}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="w-full py-6 px-4 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Popular Destinations
          </h3>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000, // autoplay speed
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {popularDestinations?.map((country) => (
                <CarouselItem
                  key={country.id}
                  className="basis-full md:basis-1/3"
                >
                  <PopularDestinations country={country} locale={locale} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section> */}

      <section className="w-full px-4 pt-6 pb-32 md:pb-6 md:py-20">
        <div className="max-w-5xl mx-auto text-center border border-indigo-200 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm">
          <Sparkles className="mx-auto mb-4 text-blue-500" size={40} />
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
            {homePageTranslation("planYourTrip")}
          </h2>
          <p className="text-slate-800 mb-8 max-w-2xl mx-auto font-dynapuff">
            {homePageTranslation("letOurAi")}
          </p>
          <Link
            href="/ai-travel-planner"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-lg text-white font-bold hover:from-indigo-600 hover:to-indigo-500 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Sparkles size={20} />
            <span>{homePageTranslation("tryButton")}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
