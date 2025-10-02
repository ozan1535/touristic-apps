"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./context/SelectedLanguage";
import AppDetails from "@/components/Dialog/AppDetails";
import { SearchCountry } from "@/components/SearchCountry/SearchCountry";
const NoSSR = dynamic(
  () => import("@/components/WorldMapComponent/WorldMapComponent"),
  { ssr: false }
);

export default function Home() {
  const { setLanguage } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("country")) {
      setSelectedCountry(params.get("country") || "en");
    }

    const currentLanguage = localStorage.getItem("language") as "tr" | "en";
    setLanguage(currentLanguage || "en");
  }, [router, params]);
  return (
    <div className="h-[92vh] w-full p-10 ">
      <AppDetails selectedCountry={selectedCountry} />
      <SearchCountry />
      <div className="flex justify-center mt-10">
        <NoSSR />
      </div>
    </div>
  );
}
