"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserDropdown({ user }: { user: any }) {
  const { locale } = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/40 hover:border-purple-400/60 transition-all duration-200 bg-slate-800/50 hover:scale-105 transform focus:ring-2 focus:ring-purple-400/50 outline-none">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-pink-500/30">
              <User className="text-purple-300" size={20} />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-slate-800 border-purple-400/30"
        align="end"
      >
        {user && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="hover:bg-slate-700/50 focus:bg-slate-700/50 text-gray-200 cursor-pointer"
              >
                <Link
                  href={`/user/${user.username}`}
                  className="flex items-center gap-2"
                >
                  <User size={16} className="text-purple-400" />
                  {locale === "en" ? "Profile" : "Profil"}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-purple-400/20" />
          </>
        )}

        {user ? (
          <DropdownMenuItem
            asChild
            className="hover:bg-slate-700/50 focus:bg-slate-700/50 text-red-400 cursor-pointer"
          >
            <LogoutLink className="flex items-center gap-2">
              <LogOut size={16} />
              {locale === "en" ? "Logout" : "Çıkış"}
            </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              asChild
              className="hover:bg-slate-700/50 focus:bg-slate-700/50 text-gray-200 cursor-pointer"
            >
              <Link
                href="/sign-in"
                className="flex items-center gap-2 hover:text-secondary"
              >
                <LogIn size={16} className="text-purple-400" />
                {locale === "en" ? "Login" : "Giriş"}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-slate-700/50 focus:bg-slate-700/50 text-gray-200 cursor-pointer"
            >
              <Link
                href="/register"
                className="flex items-center gap-2 hover:text-white"
              >
                <UserPlus size={16} className="text-purple-400" />
                {locale === "en" ? "Register" : "Kayıt Ol"}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
