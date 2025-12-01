import { IFooterTab } from "@/components/Footer/Footer.types";
import Link from "next/link";
import React from "react";

function NavTabButton({ tab, active }: { tab: IFooterTab; active: boolean }) {
  const Icon = tab.icon;
  return (
    <Link
      href={tab.href}
      className={`flex-1 flex flex-col items-center gap-1 transition-all duration-300
    ${active ? "text-white" : "text-blue-100"}`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{tab.label}</span>
    </Link>
  );
}

export default NavTabButton;
