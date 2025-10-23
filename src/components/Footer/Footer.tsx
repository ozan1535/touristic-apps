"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Footer() {
  const params = useParams();
  const { locale } = params;
  return (
    <div className="w-full h-10 bg-primary border-t flex justify-center items-center text-secondary mt-5">
      {locale === "tr" ? "Tüm hakları saklıdır" : "All rights are reserved"}
    </div>
  );
}
