"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { allCountries } from "@/lib/helpers";
import { Separator } from "../ui/separator";
import AppsAccordion from "../AppsAccordion/AppsAccordion";
import { useLanguage } from "@/app/context/SelectedLanguage";
function AppDetails() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("country");
    router.replace(`?${params.toString()}`);
  };

  const selectedCountryCca2 =
    allCountries
      .find(
        (item) =>
          item.name[language].toLocaleLowerCase() ===
          searchParams.get("country")?.toLocaleLowerCase()
      )
      ?.cca2.toLocaleLowerCase() ||
    searchParams.get("country")?.toLocaleLowerCase();

  const selectedCountryData = allCountries.find(
    (item) =>
      item.cca2.toLocaleLowerCase() === selectedCountryCca2?.toLocaleLowerCase()
  );

  if (!selectedCountryData) {
    return;
  }
  return (
    <Dialog
      open={searchParams.get("country") ? true : false}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent className="min-w-2/3 ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image
              src={selectedCountryData?.flag || ""}
              width={30}
              height={30}
              alt={`${selectedCountryData?.name[language]} flag`}
            />
            <span>{selectedCountryData?.name[language]}</span>
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <AppsAccordion countryCca2={selectedCountryCca2 || ""} />
      </DialogContent>
    </Dialog>
  );
}

export default AppDetails;
