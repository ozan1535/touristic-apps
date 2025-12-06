"use client";
import { getTabs } from "@/components/Footer/Footer.helpers";
import React from "react";
import CenterTabButton from "./CenterTabButton";
import NavTabButton from "./NavTabButton";
import { useParams, usePathname } from "next/navigation";

function MobileBottomNav({ profile }) {
  const path = usePathname();
  const { locale } = useParams();
  return (
    <div className="md:hidden w-full fixed bottom-1 bg-gradient-to-r from-blue-400 to-indigo-600 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-2 flex justify-between items-center z-50 safe-area-bottom">
      {getTabs(profile, locale).map((tab) => (
        <NavTabButton key={tab.id} tab={tab} active={path.includes(tab.href)} />
      ))}
    </div>
  );
}

export default MobileBottomNav;
