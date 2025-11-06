"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import { INavLink } from "./MobileMenu.types";

function MobileMenu({ navLinks, user }: { navLinks: INavLink[]; user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-indigo-200 hover:border-indigo-300 bg-slate-50 hover:bg-indigo-50 transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="text-slate-700" size={20} />
        ) : (
          <Menu className="text-slate-700" size={20} />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed top-16 right-0 w-full max-w-full bg-white border-l border-blue-300/25 shadow-2xl z-50 p-6">
            <nav className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  <span className="text-blue-300">{link.icon}</span>
                  <span className="font-medium">{link.label[locale]}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-indigo-200 pt-4 space-y-3">
              <SelectLanguage />
              {user ? (
                <LogoutLink className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-400 hover:bg-red-500/20 transition-all">
                  {locale === "en" ? "Logout" : "Çıkış"}
                </LogoutLink>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all"
                  >
                    {locale === "en" ? "Login" : "Giriş"}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
                  >
                    {locale === "en" ? "Register" : "Kayıt Ol"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MobileMenu;
