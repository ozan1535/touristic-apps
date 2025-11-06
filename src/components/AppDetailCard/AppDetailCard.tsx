import { Apple, ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getLinks } from "./AppDetailCard.helpers";
import { IApp } from "../TopApps/TopApps.types";

interface AppDetailCardProps {
  appDetail: IApp;
  isTopApp?: boolean;
  viewMode?: "grid" | "list";
}

function AppDetailCard({
  appDetail,
  isTopApp,
  viewMode = "grid",
}: AppDetailCardProps) {
  return (
    <article
      className={`
        group relative rounded-xl border transition-all duration-300
        ${
          isTopApp
            ? "bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 border-indigo-300 hover:border-indigo-200 hover:shadow-md hover:shadow-blue-300"
            : "bg-blue-50 border-indigo-200 hover:border-indigo-400 hover:bg-blue-100"
        }
        ${viewMode === "list" ? "p-4" : "p-5"}
        hover:transform hover:scale-[1.02]
      `}
    >
      {isTopApp && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <span>⭐</span>
          <span>Top Pick</span>
        </div>
      )}

      <div
        className={`flex ${
          viewMode === "list" ? "items-center" : "items-start"
        } gap-4 mb-3`}
      >
        {appDetail.logo_url && (
          <div
            className={`
            relative rounded-2xl overflow-hidden flex-shrink-0 
            bg-white backdrop-blur-sm
            border-2 ${isTopApp ? "border-indigo-200" : "border-indigo-200"}
            group-hover:border-indigo-200 transition-all duration-300
            ${viewMode === "list" ? "w-14 h-14" : "w-16 h-16 md:w-20 md:h-20"}
          `}
          >
            <Image
              src={appDetail.logo_url || "/profile.webp"}
              alt={`${appDetail.app_name} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3
            className={`
            font-bold text-slate-900 mb-1 
            group-hover:text-indigo-600 transition-colors
            ${
              viewMode === "list"
                ? "text-base md:text-lg"
                : "text-lg md:text-xl"
            }
          `}
          >
            {appDetail.app_name}
          </h3>
          <p
            className={`
            text-slate-700 line-clamp-2
            ${
              viewMode === "list"
                ? "text-xs md:text-sm"
                : "text-sm md:text-base"
            }
          `}
          >
            {appDetail.description}
          </p>

          {viewMode === "list" && (
            <div className="flex gap-2 mt-2">
              {getLinks(appDetail, ArrowUpRight, Play, Apple).map(
                ({ href, Icon, label }) =>
                  href && (
                    <Link
                      key={label}
                      target="_blank"
                      href={href}
                      aria-label={label}
                      className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-600 transition-colors bg-blue-500 px-2 py-1 rounded-md"
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{label}</span>
                    </Link>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      {viewMode === "grid" && (
        <div className="flex justify-end gap-3">
          {getLinks(appDetail, ArrowUpRight, Play, Apple).map(
            ({ href, Icon, label }) =>
              href && (
                <Link
                  key={label}
                  target="_blank"
                  href={href}
                  aria-label={label}
                  className="
                    flex items-center justify-center
                    w-9 h-9 rounded-lg
                    bg-blue-500 border border-indigo-200
                    text-indigo-600 hover:text-slate-900
                    hover:bg-blue-500 hover:border-indigo-200
                    transition-all duration-200
                    hover:scale-110 transform
                  "
                >
                  <Icon size={18} color="white" />
                </Link>
              )
          )}
        </div>
      )}
    </article>
  );
}

export default AppDetailCard;
