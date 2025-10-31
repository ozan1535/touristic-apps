import React from "react";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import ShareYourKnowledgeClient from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient";
import ContributeGuide from "@/components/ContributeGuide/ContributeGuide";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.shareKnowledge");

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

function ShareYourKnowledgePage() {
  const shareYourKnowledgeTranslation = useTranslations("ShareYourKnowledge");
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="flex items-center justify-center text-2xl md:text-6xl font-black text-center mb-4">
          <CirclePlus size={50} className="mr-4 text-purple-400" />
          <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            {shareYourKnowledgeTranslation("mainTitle")}
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          {shareYourKnowledgeTranslation("description")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="border border-purple-500/30 rounded-2xl p-6 md:p-10 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
          <ShareYourKnowledgeClient />
        </div>

        <ContributeGuide />
      </div>
    </div>
  );
}

export default ShareYourKnowledgePage;
