"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { INavLink } from "../MobileMenu/MobileMenu.types";

function NavLinks({ link }: { link: INavLink }) {
  const pathname = usePathname();
  const pageName = pathname.split("/")[2];
  const language = pathname.split("/")[1];
  return (
    <Link
      key={link.href}
      href={link.href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-800 hover:bg-blue-200 transition-all duration-200 group ${
        `/${pageName}` === link.href ? "bg-blue-100/60 text-indigo-800" : ""
      }`}
    >
      <span className="text-indigo-600 group-hover:text-indigo-400 transition-colors">
        {link.icon}
      </span>
      <span className="text-sm font-medium">{link.label[language]}</span>
    </Link>
  );
}

export default NavLinks;
