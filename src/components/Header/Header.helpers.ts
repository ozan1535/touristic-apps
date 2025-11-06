import { JSX } from "react";

export const navLinks = (
  sparkless: JSX.Element,
  globe: JSX.Element,
  users: JSX.Element
) => [
  {
    href: "/ai-travel-planner",
    label: { en: "AI Planner", tr: "AI Plan" },
    icon: sparkless,
  },
  // {
  //   href: "/cultural-insights",
  //   label: { en: "Cultural Insights", tr: "Kültürel Görüşler" },
  //   icon: globe,
  // },
  // {
  //   href: "/share-your-knowledge",
  //   label: { en: "Contribute", tr: "Paylaş" },
  //   icon: users,
  // },
];
