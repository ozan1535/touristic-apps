import React from "react";
import Link from "next/link";
import SelectLanguage from "../SelectLanguage/SelectLanguage";

function Header() {
  return (
    <div className="w-full h-12 bg-primary border-b flex items-center justify-between px-10">
      <div>
        <Link href={"/"} className="text-secondary font-black">
          GlobalAppGuide
        </Link>
      </div>
      <div>
        <SelectLanguage />
      </div>
    </div>
  );
}

export default Header;
