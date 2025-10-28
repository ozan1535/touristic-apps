import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Apple, ChevronsLeftRightEllipsis, Play } from "lucide-react";
import { IAppDetail } from "../AppsAccordion/types";

function CountryDetailCard({ appDetail }: { appDetail: IAppDetail }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
          <Image
            src={appDetail?.logo_url || "/profile.webp"}
            width={32}
            height={32}
            alt="Country flag"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-semibold text-gray-900">
          {appDetail.app_name}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {appDetail.description}
      </p>
      <div className="flex gap-2 justify-end items-center">
        <Link target="_blank" href={appDetail.website_url || "#"}>
          <ChevronsLeftRightEllipsis size={20} />
        </Link>
        <Link target="_blank" href={appDetail.play_store_url || "#"}>
          <Play size={20} />
        </Link>
        <Link target="_blank" href={appDetail.app_store_url || "#"}>
          <Apple size={20} />
        </Link>
      </div>
    </div>
  );
}

export default CountryDetailCard;
