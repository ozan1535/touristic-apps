"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

function SelectLanguage() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { locale } = params;

  const languages = [
    { code: "EN", name: "English", flag: "/english-flag.png" },
    { code: "TR", name: "Türkçe", flag: "/turkish-flag.webp" },
  ];

  const handleLanguageSelect = (code: "en" | "tr") => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { pathname, params },
      { locale: code.toLowerCase() }
    );
  };

  const selectedLanguage = languages.find(
    (lang) => lang.code.toLowerCase() === locale
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg border border-indigo-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-300">
        <div className="relative w-6 h-4 rounded overflow-hidden">
          <Image
            fill
            src={selectedLanguage?.flag || ""}
            alt={`${selectedLanguage?.name || ""} flag`}
            className="object-cover"
          />
        </div>
        <span className="font-medium text-slate-800 text-sm">
          {selectedLanguage?.code}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-800" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white border-indigo-200">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code as "en" | "tr")}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md hover:bg-indigo-50 focus:bg-indigo-50 text-slate-800"
          >
            <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0">
              <Image
                fill
                src={lang.flag}
                alt={`${lang.name} flag`}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm text-slate-900">{lang.code}</span>
              <span className="text-xs text-slate-500">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectLanguage;
