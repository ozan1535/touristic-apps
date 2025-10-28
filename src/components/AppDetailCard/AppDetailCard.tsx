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
            ? "bg-gradient-to-br from-purple-400/15 via-slate-700/25 to-pink-400/15 border-purple-300/50 hover:border-purple-200/70 hover:shadow-lg hover:shadow-purple-400/15"
            : "bg-slate-700/20 border-purple-400/25 hover:border-purple-300/40 hover:bg-slate-700/30"
        }
        ${viewMode === "list" ? "p-4" : "p-5"}
        hover:transform hover:scale-[1.02]
      `}
    >
      {isTopApp && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
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
            bg-white/5 backdrop-blur-sm
            border-2 ${
              isTopApp ? "border-purple-400/40" : "border-purple-500/20"
            }
            group-hover:border-purple-400/60 transition-all duration-300
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
            font-bold text-white mb-1 
            group-hover:text-purple-300 transition-colors
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
            text-gray-300 line-clamp-2
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
                      className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 transition-colors bg-purple-500/10 px-2 py-1 rounded-md"
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
                    bg-purple-500/10 border border-purple-400/30
                    text-purple-300 hover:text-white
                    hover:bg-purple-500/20 hover:border-purple-400/50
                    transition-all duration-200
                    hover:scale-110 transform
                  "
                >
                  <Icon size={18} />
                </Link>
              )
          )}
        </div>
      )}
    </article>
  );
}

export default AppDetailCard;
