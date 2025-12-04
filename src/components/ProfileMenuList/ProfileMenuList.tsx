"use client";
import {
  Calendar,
  ChevronRight,
  Heart,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import CustomDialog from "../Dialog/CustomDialog/CustomDialog";
import { SwipeDiscovery } from "../ExploreComponents/SwipeDiscovers";
import EditReview from "../RatingsAndReviews/EditReview";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import Link from "next/link";
import TravelPlans from "../TravelPlans/TravelPlans";

function ProfileMenuList({
  userRoutes,
  countries,
  favorites,
  user,
  reviews,
  travelPlans,
}) {
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openTrips, setOpenTrips] = useState(false);
  const [openTravelPlans, setOpenTravelPlans] = useState(false);
  const { locale } = useParams();

  console.log(travelPlans, "hahaha");
  return (
    <div className="space-y-3 mb-32 md:mb-0">
      <CustomDialog
        open={openFavorites}
        setOpen={setOpenFavorites}
        contentClassName=""
      >
        <SwipeDiscovery
          userRoutes={userRoutes}
          countries={countries}
          favorites={favorites}
          user={user}
          isFavorite={true}
          canShowHeader={false}
          customClassName="pt-0 px-0 w-full"
        />
      </CustomDialog>
      <CustomDialog
        open={openTrips}
        setOpen={setOpenTrips}
        contentClassName="h-[90vh] overflow-y-scroll"
      >
        {reviews.length === 0 ? (
          <p>Herhangi bir gönderi bulunmamaktadır.</p>
        ) : (
          reviews.map((item) => <EditReview key={item.id} userReview={item} />)
        )}
      </CustomDialog>
      <CustomDialog
        open={openTravelPlans}
        setOpen={setOpenTravelPlans}
        contentClassName="w-full flex flex-col h-[90vh] overflow-y-scroll"
      >
        {travelPlans.length === 0 ? (
          <p>Herhangi bir gönderi bulunmamaktadır.</p>
        ) : (
          <TravelPlans travelPlans={travelPlans} />
        )}
      </CustomDialog>
      {[
        {
          icon: Heart,
          label: "Favorites",
          color: "text-rose-500",
          onClick: () => setOpenFavorites(true),
        },
        {
          icon: Calendar,
          label: "Trip History",
          color: "text-blue-500",
          onClick: () => setOpenTrips(true),
        },
        {
          icon: Sparkles,
          label: "Your Travel Plans",
          color: "text-indigo-500",
          onClick: () => setOpenTravelPlans(true),
        },
        //{ icon: Wallet, label: "Wallet", color: "text-amber-500" },
      ].map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group active:scale-98 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 bg-slate-50 ${item.color} rounded-xl`}>
              <item.icon size={20} strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-slate-700">{item.label}</span>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-300 group-hover:text-slate-500"
          />
        </button>
      ))}

      {user ? (
        <LogoutLink className="w-20 p-3 bg-blue-300 rounded flex items-center gap-2">
          <LogOut size={16} className="text-indigo-500" />
          <span className="text-slate-800 hover:text-slate-800">
            {locale === "en" ? "Logout" : "Çıkış"}
          </span>
        </LogoutLink>
      ) : (
        <Link
          href="/sign-in"
          className="flex items-center gap-2 text-indigo-500"
        >
          <LogIn size={16} className="text-indigo-500" />
          <span className="text-slate-900">
            {locale === "en" ? "Login" : "Giriş"}
          </span>
        </Link>
      )}
    </div>
  );
}

export default ProfileMenuList;
