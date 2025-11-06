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
        <button className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200 bg-white hover:scale-105 transform focus:ring-2 focus:ring-indigo-300 outline-none">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
              <User className="text-indigo-500" size={20} />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white border-indigo-200"
        align="end"
      >
        {user && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
              >
                <Link
                  href={`/user/${user.username}`}
                  className="flex items-center gap-2 text-slate-800 hover:text-slate-800"
                >
                  <User size={16} className="text-indigo-500" />
                  <span className="text-slate-800 hover:text-slate-800">
                    {locale === "en" ? "Profile" : "Profil"}
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-indigo-100" />
          </>
        )}

        {user ? (
          <DropdownMenuItem
            asChild
            className="hover:bg-indigo-50 focus:bg-indigo-50 text-indigo-500 cursor-pointer"
          >
            <LogoutLink className="flex items-center gap-2">
              <LogOut size={16} className="text-indigo-500" />
              <span className="text-slate-800 hover:text-slate-800">
                {locale === "en" ? "Logout" : "Çıkış"}
              </span>
            </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              asChild
              className="hover:bg-indigo-50 focus:bg-indigo-50 text-slate-800 cursor-pointer"
            >
              <Link
                href="/sign-in"
                className="flex items-center gap-2 text-indigo-500"
              >
                <LogIn size={16} className="text-indigo-500" />
                <span className="text-slate-900">
                  {locale === "en" ? "Login" : "Giriş"}
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-indigo-50 focus:bg-indigo-50 text-slate-800 cursor-pointer"
            >
              <Link
                href="/register"
                className="flex items-center gap-2 text-indigo-500"
              >
                <UserPlus size={16} className="text-indigo-500" />
                <span className="text-slate-900">
                  {locale === "en" ? "Register" : "Kayıt Ol"}
                </span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
