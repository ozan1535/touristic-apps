import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";

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

export default async function Home() {
  const searchCountryTranslation = await getTranslations("SearchCountry");
  const homePageTranslation = await getTranslations("HomePage");

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="w-full px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text">
              GlobalAppGuide
            </span>
          </h1>

          <p className="text-slate-900 font-dynapuff text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {homePageTranslation("explore")}
            </h2>
            <p className="text-slate-700">
              {homePageTranslation("clickLongText")}
            </p>
          </div>

          <div className="border border-indigo-200 rounded-2xl p-4 md:p-8 bg-white backdrop-blur-sm shadow-xl">
            <RotatingWorldChart
              clickShortText={homePageTranslation("clickShortText")}
            />
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center border border-indigo-200 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm">
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
