"use client";
import { getTabs } from "@/components/Footer/Footer.helpers";
import React from "react";
import CenterTabButton from "./CenterTabButton";
import NavTabButton from "./NavTabButton";
import { usePathname } from "next/navigation";

function MobileBottomNav({ profile }) {
  const path = usePathname();

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 bg-gradient-to-r from-blue-400 to-indigo-600 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl px-2 py-3 flex justify-between items-center z-50 safe-area-bottom">
      {getTabs(profile).map((tab) =>
        tab.center ? (
          <CenterTabButton
            key={tab.id}
            tab={tab}
            active={path.includes(tab.href)}
          />
        ) : (
          <NavTabButton
            key={tab.id}
            tab={tab}
            active={path.includes(tab.href)}
          />
        )
      )}
    </div>
  );
}

export default MobileBottomNav;
