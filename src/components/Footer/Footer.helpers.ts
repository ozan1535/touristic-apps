import { Compass, Home, Sparkles, User } from "lucide-react";

export const getTabs = (user, locale) => [
  {
    id: "1",
    label: locale === "tr" ? "Anasayfa" : "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "2",
    label: locale === "tr" ? "Keşfet" : "Explore",
    icon: Compass,
    href: "/explore",
  },
  {
    id: "3",
    label: locale === "tr" ? "Seyahat Planla" : "Travel Planner",
    icon: Sparkles,
    href: "/ai-travel-planner",
    // center: true,
  },
  {
    id: "4",
    label: locale === "tr" ? "Profil" : "Profile",
    icon: User,
    href: user ? `/${locale}/user/${user.username}` : "/sign-in",
  },
];
