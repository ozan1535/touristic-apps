import { allCountries } from "@/lib/helpers";
import { ICountry } from "./SearchCountry.types";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getSortedCountries = (language: "en" | "tr"): ICountry[] => {
  return allCountries
    .map((country) => ({
      value: country.name[language].toLowerCase(),
      label: country.name[language],
      icon: country.flag,
      cca2: country.cca2,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const handleSelect = (
  currentValue: string,
  sortedCountries: ICountry[],
  setValue: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance,
  language: "en" | "tr"
) => {
  const selected = sortedCountries.find(
    (country) => country.value === currentValue
  );
  if (selected) {
    setValue(currentValue);
    setOpen(false);
    router.push(`/${language}/${selected.cca2.toLowerCase()}`);
  }
};
