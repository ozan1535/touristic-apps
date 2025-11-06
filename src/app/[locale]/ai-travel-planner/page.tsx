import React from "react";
import { Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import TravelPlannerClient from "@/components/TravelPlannerClient/TravelPlannerClient";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.aiTravelPlanner");

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
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

const TravelPlannerPage = async () => {
  const aiTravelPlannerTranslation = await getTranslations("AiTravelPlanner");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="flex items-center justify-center text-blue-500 text-2xl md:text-5xl font-black text-center bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text mb-4">
          <Zap size={40} className="mr-3 text-blue-500" />
          {aiTravelPlannerTranslation("title")}
        </h1>
        <p className="text-center text-slate-900 text-sm md:text-base max-w-2xl mx-auto">
          {aiTravelPlannerTranslation("description")}
        </p>
      </div>
      <TravelPlannerClient />
    </div>
  );
};

export default TravelPlannerPage;
