import { useTranslations } from "next-intl";
import React from "react";

function ContributeGuide() {
  const contributeGuideTranslation = useTranslations("ContributeGuide");
  return (
    <div className="mt-8 border border-purple-500/20 rounded-xl p-6 bg-slate-900/30 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">
        💡 {contributeGuideTranslation("title")}
      </h3>
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-start gap-3">
          <span className="text-purple-400 font-bold">•</span>
          <span>
            <strong className="text-white">
              {contributeGuideTranslation("list1Strong")}
            </strong>{" "}
            {contributeGuideTranslation("list1Desc")}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-purple-400 font-bold">•</span>
          <span>
            <strong className="text-white">
              {contributeGuideTranslation("list2Strong")}
            </strong>{" "}
            {contributeGuideTranslation("list2Desc")}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-purple-400 font-bold">•</span>
          <span>
            <strong className="text-white">
              {" "}
              {contributeGuideTranslation("list3Strong")}
            </strong>{" "}
            {contributeGuideTranslation("list3Desc")}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-purple-400 font-bold">•</span>
          <span>
            <strong className="text-white">
              {" "}
              {contributeGuideTranslation("list4Strong")}
            </strong>{" "}
            {contributeGuideTranslation("list4Desc")}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ContributeGuide;
