"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { useTranslations } from "next-intl";
import { Mail, Lock, ArrowRight } from "lucide-react";

function Login({
  text1,
  text2,
  text3,
  text4,
  link,
  kindeMode,
}: {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  link: string;
  kindeMode: string;
}) {
  const loginTranslation = useTranslations("LoginPage");
  const LinkComponent = kindeMode === "login" ? LoginLink : RegisterLink;

  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-400/25 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30">
              <Lock className="text-purple-300" size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-black text-center text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">
            {text1}
          </h2>
          <p className="text-center text-gray-300 mb-8 text-sm">{text2}</p>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2"
            >
              <Mail size={16} className="text-purple-400" />
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-purple-400/30 bg-slate-700/30 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <LinkComponent
            authUrlParams={{
              connection_id: process.env.NEXT_PUBLIC_EMAIL_CONNECTION_ID!,
              login_hint: email,
            }}
          >
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <span>{loginTranslation("continue")}</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </LinkComponent>

          <p className="text-center text-sm text-gray-300 mt-6">
            {text3}{" "}
            <Link
              href={link}
              className="text-purple-300 hover:text-purple-200 font-semibold underline decoration-purple-400/30 hover:decoration-purple-300 transition-colors"
            >
              {text4}
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8 bg-slate-800/20 border border-purple-400/20 rounded-xl p-4">
          <p className="mb-2">{loginTranslation("info")}</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Link
              href="/kullanim-sartlari"
              className="text-purple-300 hover:text-purple-200 underline decoration-purple-400/30 transition-colors"
            >
              {loginTranslation("terms")}
            </Link>
            <span className="text-gray-500">{loginTranslation("and")}</span>
            <Link
              href="/gizlilik-politikasi"
              className="text-purple-300 hover:text-purple-200 underline decoration-purple-400/30 transition-colors"
            >
              {loginTranslation("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
