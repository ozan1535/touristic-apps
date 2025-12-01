import { IFooterTab } from "@/components/Footer/Footer.types";
import Link from "next/link";
import React from "react";

function CenterTabButton({
  tab,
  active,
}: {
  tab: IFooterTab;
  active: boolean;
}) {
  const Icon = tab.icon;

  return (
    <div className="flex-1 flex justify-center -mt-10 pointer-events-none">
      <Link
        href={tab.href}
        className={`pointer-events-auto flex flex-col items-center justify-center 
          w-14 h-14 rounded-full shadow-lg shadow-indigo-500/40 
          transition-all active:scale-95 bg-gradient-to-r 
          from-blue-500 to-indigo-500 text-white`}
      >
        <Icon
          size={24}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 2.5 : 2}
        />
      </Link>
    </div>
  );
}

export default CenterTabButton;
