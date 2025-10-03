"use client";
import { useLanguage } from "@/app/context/SelectedLanguage";
import React from "react";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <div className="w-full h-10 bg-blue-400 flex justify-center items-center absolute bottom-0">
      {language === "tr" ? "Tüm hakları saklıdır" : "All rights are reserved"}
    </div>
  );
}
