"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Grid3x3, List } from "lucide-react";
import { ICountryAppsWithFilterProps } from "./CountryAppsWithFilter.types";
import SelectComponent from "../SelectComponent/SelectComponent";
import AppDetailCard from "../AppDetailCard/AppDetailCard";
import { useParams } from "next/navigation";

function CountryAppsWithFilter({
  countryApps,
  contributions,
}: ICountryAppsWithFilterProps) {
  const { locale } = useParams();
  const countryAppsWithFilterTranslation = useTranslations(
    "CountryAppsWithFilter"
  );
  const categories = useMemo(
    () => countryApps.map((item) => item.category),
    [countryApps]
  );

  const allApps = useMemo(
    () => countryApps.flatMap((category) => category.apps),
    [countryApps]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") return allApps;

    const categoryData = countryApps.find(
      (item) => item.category === selectedCategory
    );
    return categoryData?.apps || [];
  }, [selectedCategory, countryApps, allApps]);

  const handleFilterChange = (selectedItem: string) => {
    setSelectedCategory(selectedItem);
  };

  return (
    <div className="mt-8">
      {filteredData.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {countryAppsWithFilterTranslation("allApps")}
              </h2>
              <p className="text-slate-600 text-sm">
                {countryAppsWithFilterTranslation("appsAvailable", {
                  count: filteredData.length,
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-indigo-100/50 rounded-lg p-1 border border-indigo-300/40">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>

              <SelectComponent
                categories={categories}
                handleValueChange={handleFilterChange}
              />
            </div>
          </div>
        </>
      ) : null}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {
          filteredData.length > 0
            ? filteredData.map((appDetail) => (
                <AppDetailCard
                  appDetail={appDetail}
                  key={appDetail.id}
                  isTopApp={false}
                />
              ))
            : null
          // <div className="col-span-full text-center py-12 border border-indigo-300/40 rounded-xl bg-slate-900/50">
          //   <p className="text-slate-600 text-lg">
          //     {countryAppsWithFilterTranslation("noAppsFound")}
          //   </p>
          // </div>
        }
      </div>
      {contributions.length > 0 ? (
        <>
          <h1 className="text-slate-900 my-5 text-2xl font-bold">
            {locale === "en" ? "Contributors" : "Katkılar"}
          </h1>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {contributions
              .map((item) => ({ ...item, logo_url: item.app_logo }))
              .map((appDetail) => (
                <AppDetailCard
                  appDetail={appDetail}
                  key={appDetail.id}
                  isTopApp={false}
                />
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CountryAppsWithFilter;
