"use client";
import { SquarePen, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { EditProfile } from "../EditProfile/EditProfile";
import { IProfileSidebarProps } from "./ProfileSidebar.types";
import { Button } from "@/components/ui/button";

function ProfileSidebar({
  userData,
  isOwner,
  postsLength,
  tripsLength,
}: IProfileSidebarProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl sticky top-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg">
            <Image
              src={userData?.picture || "/profile.webp"}
              width={128}
              height={128}
              alt={`${userData.name}'s profile picture`}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-300 text-sm">@{userData.username}</p>
        <h2 className="text-white font-bold text-2xl mb-2">
          {userData.name.trim()}
        </h2>
      </div>

      <p className="text-gray-300 text-sm text-center leading-relaxed mb-2">
        {userData.bio}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/20 text-center">
          <MapPin className="mx-auto mb-1 text-purple-400" size={20} />
          <div className="text-2xl font-bold text-white">
            {tripsLength || 0}
          </div>
          <div className="text-xs text-gray-400">Trips</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/20 text-center">
          <Heart className="mx-auto mb-1 text-pink-400" size={20} />
          <div className="text-2xl font-bold text-white">
            {postsLength || 0}
          </div>
          <div className="text-xs text-gray-400">Posts</div>
        </div>
      </div>
      {isOwner && (
        <Button
          onClick={handleEditProfile}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold border-0 shadow-lg"
        >
          <SquarePen className="mr-2" size={18} />
          Edit Profile
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
