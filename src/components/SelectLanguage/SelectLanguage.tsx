"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/app/context/SelectedLanguage";

function SelectLanguage() {
  const { language, setLanguage } = useLanguage();
  const languages = [
    { code: "EN", name: "English", flag: "/english-flag.png" },
    { code: "TR", name: "Türkçe", flag: "/turkish-flag.webp" },
  ];

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang.toLocaleLowerCase() as "en" | "tr");
    }
  }, []);

  const handleLanguageSelect = (code: "en" | "tr") => {
    setLanguage(code);
    localStorage.setItem("language", code.toLowerCase());
    setLanguage(code.toLowerCase() as "en" | "tr");
  };

  const selected =
    languages.find(
      (lang) => lang.code.toLocaleLowerCase() === language.toLocaleLowerCase()
    ) || languages[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-purple-primary hover:bg-gray-50 transition-colors duration-200 shadow-sm outline-none focus:ring-2 focus:ring-gray-300 bg-white">
        <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm">
          <Image
            fill
            src={selected.flag}
            alt={`${selected.name} flag`}
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-700 text-sm">
          {selected.code}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 p-1">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code as "en" | "tr")}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md focus:bg-gray-100"
          >
            <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm flex-shrink-0">
              <Image
                fill
                src={lang.flag}
                alt={`${lang.name} flag`}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900 text-sm">
                {lang.code}
              </span>
              <span className="text-xs text-gray-500">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectLanguage;
