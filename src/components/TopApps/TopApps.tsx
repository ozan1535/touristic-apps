/* import React from "react";
import AppDetailCard from "../AppDetailCard/AppDetailCard";

function TopApps({ topApps }: { topApps: any[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl font-black text-secondary mb-5">
        Top Apps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {topApps.map((app) => (
          <AppDetailCard appDetail={app} key={app.id} />
        ))}
      </div>
    </section>
  );
}

export default TopApps;
 */

import React from "react";
import AppDetailCard from "../AppDetailCard/AppDetailCard";
import { Star } from "lucide-react";
import { ITopAppsProps } from "./TopApps.types";
import { useTranslations } from "next-intl";

function TopApps({ topApps }: ITopAppsProps) {
  const topAppsTranslation = useTranslations("TopApps");
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <Star className="text-yellow-400 fill-yellow-400" size={28} />
        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
          {topAppsTranslation("recommendedApps")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {topApps.map((app) => (
          <AppDetailCard appDetail={app} key={app.id} isTopApp={true} />
        ))}
      </div>
    </section>
  );
}

export default TopApps;
