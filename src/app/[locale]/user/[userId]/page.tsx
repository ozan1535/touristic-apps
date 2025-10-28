import React from "react";
import { User } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import MyTrips from "@/components/MyTrips/MyTrips";
import MyPosts from "@/components/MyPosts/MyPosts";
import { getUserProfile } from "@/lib/supabase/sync-user";
import { fetchUserPosts, fetchUserTrips } from "./user.helpers";

// TODO: fix type
export default async function ProfilePage({ params }: { params: any }) {
  const { userId } = await params;

  const { data: pageOwner } = await getUserProfile(userId);
  if (!pageOwner) {
    return <NoUserFound />;
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const [currentUserData, postsData, tripsData] = await Promise.all([
    getUserProfile(user?.id as string),
    fetchUserPosts(pageOwner.kinde_user_id),
    fetchUserTrips(pageOwner.kinde_user_id),
  ]);

  const currentUser = currentUserData?.data;
  const posts = postsData?.data || [];
  const trips = tripsData?.data || [];

  const isOwner = currentUser?.username === userId;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-80 flex-shrink-0">
          <ProfileSidebar
            userData={pageOwner}
            isOwner={isOwner}
            postsLength={posts.length}
            tripsLength={trips.length}
          />
        </aside>

        <main className="flex-1 flex flex-col gap-6">
          <MyTrips trips={trips} isOwner={isOwner} userData={pageOwner} />
          <MyPosts posts={posts} userData={pageOwner} isOwner={isOwner} />
        </main>
      </div>
    </div>
  );
}

function NoUserFound() {
  return (
    <div className="w-96 mx-auto mt-10 text-center py-12 border-2 border-dashed border-purple-500/30 rounded-lg">
      <User className="mx-auto mb-4 text-purple-400 opacity-50" size={48} />
      <p className="text-gray-400">There is no such user.</p>
    </div>
  );
}
