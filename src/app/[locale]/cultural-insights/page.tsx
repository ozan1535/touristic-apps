import React from "react";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import CulturalInsightsClient from "@/components/CulturalInsightsClient/CulturalInsightsClient";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.culturalInsights");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

function page() {
  const CulturalInsightsTranslation = useTranslations("CulturalInsights");
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="flex items-center justify-center text-2xl md:text-6xl font-black text-center mb-4">
          <Lightbulb size={50} className="mr-4 text-purple-400" />
          <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            {CulturalInsightsTranslation("title")}
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          {CulturalInsightsTranslation("description")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">{<CulturalInsightsClient />}</div>
    </div>
  );
}

export default page;
