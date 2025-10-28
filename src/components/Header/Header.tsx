import React from "react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserProfile } from "@/lib/supabase/sync-user";
import UserDropdown from "../UserDropdown/UserDropdown";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import { Globe, Sparkles, Users } from "lucide-react";
import MobileMenu from "../MobileMenu/MobileMenu";
import { navLinks } from "./Header.helpers";
import NavLinks from "../NavLinks/NavLinks";

async function Header() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const { data: profile } = await getUserProfile(kindeUser?.id as any);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-400/25 bg-slate-900/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30 group-hover:border-purple-400/50 transition-all">
              <Globe className="text-purple-300" size={20} />
            </div>
            <span className="text-xl font-black text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text hidden sm:inline">
              GlobalAppGuide
            </span>
            <span className="text-xl font-black text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text sm:hidden">
              GAG
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks(
              <Sparkles size={16} />,
              <Globe size={16} />,
              <Users size={16} />
            ).map((link) => (
              <NavLinks link={link} key={link.href} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <SelectLanguage />
            </div>

            <UserDropdown user={profile} />

            <div className="md:hidden">
              <MobileMenu
                navLinks={navLinks(
                  <Sparkles size={16} />,
                  <Globe size={16} />,
                  <Users size={16} />
                )}
                user={profile}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
