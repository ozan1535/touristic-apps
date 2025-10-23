/* import React from "react";
import { CirclePlus, PencilLine } from "lucide-react";
import ShareYourKnowledgeClient from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient";

function page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="flex items-center justify-center text-3xl md:text-5xl font-black text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          <CirclePlus size={40} className="mr-3 text-purple-400" />
          Share Your Knowledge
        </h1>
        <p className="text-center text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Help other travelers by sharing your tips and experiences with local
          apps.
        </p>
      </div>
      <div className="w-2/3 mx-auto border border-purple-500/30 rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center mb-4">
          <PencilLine className="mr-2 text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-100">Add Your Tip</h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Fill out the form below to contribute a tip.
        </p>

        
        <ShareYourKnowledgeClient />
      </div>
    </div>
  );
}

export default page;
 */

import React from "react";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import ShareYourKnowledgeClient from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient";
import ContributeGuide from "@/components/ContributeGuide/ContributeGuide";

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
