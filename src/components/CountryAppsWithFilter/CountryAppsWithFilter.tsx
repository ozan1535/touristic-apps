"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Grid3x3, List } from "lucide-react";
import { ICountryAppsWithFilterProps } from "./CountryAppsWithFilter.types";
import SelectComponent from "../SelectComponent/SelectComponent";
import AppDetailCard from "../AppDetailCard/AppDetailCard";
import { useParams } from "next/navigation";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

function CountryAppsWithFilter({
  countryApps,
  contributions,
}: ICountryAppsWithFilterProps) {
  const { locale } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
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
    let data;

    if (selectedCategory === "All") {
      data = allApps;
    } else {
      const categoryData = countryApps.find(
        (item) => item.category === selectedCategory
      );
      data = categoryData?.apps || [];
    }

    return [...data].sort(
      (a, b) => (b.is_top === true ? 1 : 0) - (a.is_top === true ? 1 : 0)
    );
  }, [selectedCategory, countryApps, allApps]);

  const handleFilterChange = (selectedItem: string) => {
    setSelectedCategory(selectedItem);
  };

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredData.length / 12);
  const renderItems = filteredData.slice(startIndex, endIndex);
  return (
    <div>
      {filteredData.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-200 mb-1">
                {countryAppsWithFilterTranslation("allApps")}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {countryAppsWithFilterTranslation("appsAvailable", {
                  count: filteredData.length,
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1 bg-indigo-100/50 rounded-lg p-1 border border-indigo-300/40">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 dark:text-slate-200 dark:hover:text-slate-300 hover:text-slate-900"
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
                      : "text-slate-600 dark:text-slate-200 dark:hover:text-slate-300 hover:text-slate-900"
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
            ? renderItems.map((appDetail, index) => (
                <AppDetailCard
                  appDetail={appDetail}
                  key={appDetail.id + index}
                  isTopApp={appDetail.is_top}
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
      {filteredData.length > 12 && (
        <PaginationComponent
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      {/* {contributions.length > 0 ? (
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
      ) : null} */}
    </div>
  );
}

export default CountryAppsWithFilter;
