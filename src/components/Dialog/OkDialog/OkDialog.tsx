"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React from "react";

function OkDialog({ text, setOpen }) {
  const { locale } = useParams();
  return (
    <div className="text-center space-y-4">
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {text}
      </p>

      <Button
        className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg shadow"
        onClick={() => setOpen(false)}
      >
        {locale === "tr" ? "Tamam" : "Okay"}
      </Button>
    </div>
  );
}

export default OkDialog;
