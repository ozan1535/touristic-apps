"use client";
import React, { useState } from "react";
import CustomDialog from "../Dialog/CustomDialog/CustomDialog";
import CurrencyConverter from "./CurrencyConverter";
import { useTranslations } from "next-intl";

function CurrencyConverterDialog() {
  const t = useTranslations("CountryApps");
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-blue-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {t("currencyConverter")}
      </button>
      <CustomDialog open={open} setOpen={setOpen}>
        <CurrencyConverter />
      </CustomDialog>
    </>
  );
}

export default CurrencyConverterDialog;
