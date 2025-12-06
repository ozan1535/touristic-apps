import React from "react";
import {
  Calendar,
  ChevronRight,
  Globe,
  Heart,
  User,
  Wallet,
} from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import MyTrips from "@/components/MyTrips/MyTrips";
import MyPosts from "@/components/MyPosts/MyPosts";
import { getUserProfile } from "@/lib/supabase/sync-user";
import { fetchUserPosts, fetchUserTrips } from "./user.helpers";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import AchievementItems from "@/components/AchievementItems/AchievementItems";
import ProfileMenuList from "@/components/ProfileMenuList/ProfileMenuList";
import { DiscoveryService } from "@/lib/supabase/discovery-service";
import { supabase } from "@/lib/supabase/client";
import { checkMobileRedirect } from "@/lib/server/checkMobileRedirect";

export async function generateMetadata({
  params: { locale, userId },
}: {
  params: { locale: string; userId: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.profile");

  return {
    title: t("title", { userId }),
    description: t("description", { userId }),
    keywords: t("keywords", { userId }),
    openGraph: {
      title: t("title", { userId }),
      description: t("description", { userId }),
      type: "profile",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: t("title", { userId }),
      description: t("description", { userId }),
    },
  };
}

// TODO: fix type
export default async function ProfilePage({ params }: { params: any }) {
  await checkMobileRedirect();

  const t = await getTranslations("Profile");
  const { userId, locale } = await params;

  const { data: pageOwner } = await getUserProfile(userId);
  if (!pageOwner) {
    return <NoUserFound t={t} />;
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const countries = await DiscoveryService.getCountries(locale);
  const favorites = await DiscoveryService.getAllDiscoveryFavorites(user);
  const favoriteItems = await DiscoveryService.getAllDiscoveryFavoritesWithTree(
    user
  );
  const [currentUserData, postsData, tripsData] = await Promise.all([
    getUserProfile(user?.id as string),
    fetchUserPosts(pageOwner.kinde_user_id),
    fetchUserTrips(pageOwner.kinde_user_id),
  ]);

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      profiles:user_id (
        username,
        name,
        picture
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: travelPlans } = await supabase
    .from("ai_planner")
    .select("*")
    .eq("user_id", user.id);

  const currentUser = currentUserData?.data;
  const posts = postsData?.data || [];
  const trips = tripsData?.data || [];

  const isOwner = currentUser?.username === userId;
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 p-4 md:p-10">
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
          {/* Digital Passport */}
          <div className="flex justify-between items-end relative z-10 bg-white dark:bg-slate-700 p-4 rounded-xl shadow-sm">
            <div>
              <span className="text-indigo-600 dark:text-slate-300 text-xs font-bold uppercase">
                {t("digitalPassport")}
              </span>

              <div className="text-3xl font-extrabold text-indigo-900 dark:text-slate-300 mt-1 flex items-baseline gap-2">
                {reviews?.length}
                <span className="text-lg text-blue-600 dark:text-slate-300 font-medium">
                  {t("countries")}
                </span>
              </div>
            </div>

            <Globe
              className="text-blue-500 dark:text-slate-300 opacity-80"
              size={48}
            />
          </div>
          {/* Achievements */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t("achievements")}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  id: "1",
                  name: "Asia Explorer",
                  iconName: "Globe",
                  isLocked: false,
                },
                {
                  id: "2",
                  name: "Foodie",
                  iconName: "Utensils",
                  isLocked: false,
                },
                {
                  id: "3",
                  name: "Top Reviewer",
                  iconName: "Star",
                  isLocked: false,
                },
                {
                  id: "4",
                  name: "Adventurer",
                  iconName: "Mountain",
                  isLocked: true,
                },
                {
                  id: "5",
                  name: "Polyglot",
                  iconName: "Languages",
                  isLocked: true,
                },
                {
                  id: "6",
                  name: "Local Hero",
                  iconName: "Award",
                  isLocked: true,
                },
              ].map((badge) => (
                <AchievementItems key={badge.id} badge={badge} />
              ))}
            </div>
          </div>

          {/* Menu List */}
          <ProfileMenuList
            userRoutes={favoriteItems}
            countries={countries}
            favorites={favorites}
            user={user}
            reviews={reviews}
            travelPlans={travelPlans}
          />

          {/*   <MyTrips trips={trips} isOwner={isOwner} userData={pageOwner} />
          <MyPosts posts={posts} userData={pageOwner} isOwner={isOwner} /> */}
        </main>
      </div>
    </div>
  );
}

// TODO: Fix type
function NoUserFound({ t }: { t: any }) {
  return (
    <div className="w-96 mx-auto mt-10 text-center py-12 border-2 border-dashed border-blue-400 rounded-lg">
      <User className="mx-auto mb-4 text-blue-300" size={48} />
      <p className="text-slate-600">{t("noUser")}</p>
    </div>
  );
}
