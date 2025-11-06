"use client";
import { SquarePen, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { EditProfile } from "../EditProfile/EditProfile";
import { IProfileSidebarProps } from "./ProfileSidebar.types";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function ProfileSidebar({
  userData,
  isOwner,
  postsLength,
  tripsLength,
}: IProfileSidebarProps) {
  const t = useTranslations("Profile");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  return (
    <div className="bg-white backdrop-blur-sm border border-indigo-200 rounded-xl p-6 shadow-xl sticky top-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg">
            <Image
              src={userData?.picture || "/profile.webp"}
              width={128}
              height={128}
              alt={t("pictureAlt", { name: userData.name })}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-600 text-sm">@{userData.username}</p>
        <h2 className="text-slate-900 font-bold text-2xl mb-2">
          {userData.name.trim()}
        </h2>
      </div>

      <p className="text-slate-600 text-sm text-center leading-relaxed mb-2">
        {userData.bio}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 border border-indigo-200 text-center">
          <MapPin className="mx-auto mb-1 text-blue-500" size={20} />
          <div className="text-2xl font-bold text-slate-900">
            {tripsLength || 0}
          </div>
          <div className="text-xs text-slate-500">{t("trips")}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-indigo-200 text-center">
          <Heart className="mx-auto mb-1 text-indigo-400" size={20} />
          <div className="text-2xl font-bold text-slate-900">
            {postsLength || 0}
          </div>
          <div className="text-xs text-slate-500">{t("posts")}</div>
        </div>
      </div>
      {isOwner && (
        <Button
          onClick={handleEditProfile}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 font-bold border-0 shadow-lg"
        >
          <SquarePen className="mr-2" size={18} />
          {t("editProfile")}
        </Button>
      )}
      {isEditOpen && (
        <EditProfile
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          userData={userData}
        />
      )}
    </div>
  );
}

export default ProfileSidebar;
