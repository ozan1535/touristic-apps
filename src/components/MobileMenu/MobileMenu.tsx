"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import { INavLink } from "./MobileMenu.types";

function MobileMenu({ navLinks, user }: { navLinks: INavLink[]; user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const language = pathname.split("/")[1];
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-purple-400/30 hover:border-purple-400/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="text-gray-300" size={20} />
        ) : (
          <Menu className="text-gray-300" size={20} />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed top-16 right-0 w-full max-w-full bg-slate-900 border-l border-purple-400/25 shadow-2xl z-50 p-6">
            <nav className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  <span className="text-purple-400">{link.icon}</span>
                  <span className="font-medium">{link.label[language]}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-purple-400/20 pt-4 space-y-3">
              <SelectLanguage />
              {user ? (
                <LogoutLink className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-400 hover:bg-red-500/20 transition-all">
                  Logout
                </LogoutLink>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Register
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
