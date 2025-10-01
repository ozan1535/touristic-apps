import React from "react";
import SelectLanguage from "../SelectLanguage/SelectLanguage";

function Header() {
  return (
    <div className="w-full h-12 bg-blue-400 flex items-center justify-between px-10">
      <div>Logo</div>
      <div>
        <SelectLanguage />
      </div>
    </div>
  );
}

export default Header;
