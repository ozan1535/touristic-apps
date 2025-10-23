/* "use client";
import React, { useState } from "react";
import SelectComponent from "../SelectComponent/SelectComponent";
import AppDetailCard from "../AppDetailCard/AppDetailCard";
import { ICategoryWithApps } from "../AppsAccordion/types";

function CountryAppsWithFilter({
  countryApps,
}: {
  countryApps: ICategoryWithApps[];
}) {
  const categories = countryApps.map((item) => item.category);
  const allApps = countryApps.flatMap((category) => category.apps);
  const [filteredData, setFilteredData] = useState(allApps);
  const filterData = (selectedItem: string) => {
    if (selectedItem === "All") {
      setFilteredData(allApps);
      return;
    }
    setFilteredData(
      [countryApps.find((item) => item.category === selectedItem)].flatMap(
        (all) => all.apps
      )
    );
  };
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-black text-secondary">Applications</h1>
        <SelectComponent categories={categories} filterData={filterData} />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {filteredData.map((appDetail) => (
          <AppDetailCard appDetail={appDetail} key={appDetail.id} />
        ))}
      </div>
    </div>
  );
}

export default CountryAppsWithFilter;
 */

"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Grid3x3, List } from "lucide-react";
import { ICountryAppsWithFilterProps } from "./CountryAppsWithFilter.types";
import SelectComponent from "../SelectComponent/SelectComponent";
import AppDetailCard from "../AppDetailCard/AppDetailCard";

function CountryAppsWithFilter({ countryApps }: ICountryAppsWithFilterProps) {
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
            {countryAppsWithFilterTranslation("allApps")}
          </h2>
          <p className="text-gray-400 text-sm">
            {countryAppsWithFilterTranslation("appsAvailable", {
              count: filteredData.length,
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1 border border-purple-500/30">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
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

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {filteredData.length > 0 ? (
          filteredData.map((appDetail) => (
            <AppDetailCard appDetail={appDetail} key={appDetail.id} isTopApp={false}/>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border border-purple-500/30 rounded-xl bg-slate-900/50">
            <p className="text-gray-400 text-lg">
              {countryAppsWithFilterTranslation("noAppsFound")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryAppsWithFilter;
