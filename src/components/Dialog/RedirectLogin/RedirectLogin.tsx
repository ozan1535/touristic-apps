"use client";
import Link from "next/link";
import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";

function RedirectLogin({ title }) {
  const [open, setOpen] = useState(true);
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-600 mb-8">{title}</p>

        <div className="flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 
                 text-white font-semibold shadow hover:from-indigo-700 hover:to-blue-700 
                 transition-all"
          >
            Giriş Yap
          </Link>

          <Link
            href="/"
            className="w-full py-3 rounded-lg border border-indigo-300 text-indigo-700 
                 font-semibold hover:bg-indigo-50 transition-all"
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </CustomDialog>
  );
}

export default RedirectLogin;
