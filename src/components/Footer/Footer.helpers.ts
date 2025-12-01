import { Compass, Home, Sparkles, User } from "lucide-react";

export const getTabs = (user) => [
  { id: "1", label: "Home", icon: Home, href: "/" },
  { id: "2", label: "Keşfet", icon: Compass, href: "/explore" },
  {
    id: "3",
    label: "Planner",
    icon: Sparkles,
    href: "/ai-travel-planner",
    center: true,
  },
  {
    id: "4",
    label: "Profile",
    icon: User,
    href: user ? `/user/${user.username}` : "/sign-in",
  },
];
