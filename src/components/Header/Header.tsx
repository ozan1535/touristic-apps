import React from "react";
import Link from "next/link";
import SelectLanguage from "../SelectLanguage/SelectLanguage";

function Header() {
  return (
    <div className="w-full h-12 bg-primary border-b flex items-center justify-between px-10">
      <div className="flex gap-5">
        <Link href={"/"} className="text-secondary font-black">
          GlobalAppGuide
        </Link>
        <div className="flex gap-3">
          <Link
            href={"/ai-travel-planner"}
            className="text-secondary"
          >
            AI Planner
          </Link>
          <Link
            href={"/cultural-insights"}
            className="text-secondary"
          >
            Cultural Insights
          </Link>
          <Link
            href={"/share-your-knowledge"}
            className="text-secondary"
          >
            Contribute
          </Link>
          <Link href={"/user/username"} className="text-secondary">
            Profile
          </Link>
        </div>
      </div>
      <div>
        <SelectLanguage />
      </div>
    </div>
  );
}

export default Header;
