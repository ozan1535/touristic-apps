"use client";
import { Button } from "@/components/ui/button";
import { SquarePen, MapPin, Calendar, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface UserData {
  name: string;
  bio: string;
  profileImage: string;
  joinDate: string;
  tripsCount: number;
  postsCount: number;
}

interface ProfileSidebarProps {
  userData: UserData;
}

function ProfileSidebar({ userData }: ProfileSidebarProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit profile clicked");
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 shadow-xl sticky top-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg">
            <Image
              src={userData.profileImage}
              width={128}
              height={128}
              alt={`${userData.name}'s profile picture`}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-white font-bold text-2xl mb-2">{userData.name}</h2>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-3">
          <Calendar size={14} />
          <span>Joined {userData.joinDate}</span>
        </div>
      </div>

      <p className="text-gray-300 text-sm text-center leading-relaxed mb-6">
        {userData.bio}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/20 text-center">
          <MapPin className="mx-auto mb-1 text-purple-400" size={20} />
          <div className="text-2xl font-bold text-white">
            {userData.tripsCount}
          </div>
          <div className="text-xs text-gray-400">Trips</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/20 text-center">
          <Heart className="mx-auto mb-1 text-pink-400" size={20} />
          <div className="text-2xl font-bold text-white">
            {userData.postsCount}
          </div>
          <div className="text-xs text-gray-400">Posts</div>
        </div>
      </div>

      <Button
        onClick={handleEditProfile}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold border-0 shadow-lg"
      >
        <SquarePen className="mr-2" size={18} />
        Edit Profile
      </Button>
    </div>
  );
}

export default ProfileSidebar;
