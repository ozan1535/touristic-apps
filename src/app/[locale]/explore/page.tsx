import RedirectLogin from "@/components/Dialog/RedirectLogin/RedirectLogin";
import { SwipeDiscovery } from "@/components/ExploreComponents/SwipeDiscovers";
import { checkMobileRedirect } from "@/lib/server/checkMobileRedirect";
import { DiscoveryService } from "@/lib/supabase/discovery-service";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata.explore");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

async function page() {
  await checkMobileRedirect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return (
      <RedirectLogin
        title={"Bu sayfayi görebilmeniz için lütfen giris yapiniz."}
      />
    );
  }

  const countries = await DiscoveryService.getCountries();
  const favorites = await DiscoveryService.getAllDiscoveryFavorites(user);
  const favoriteItems = await DiscoveryService.getAllDiscoveryFavoritesWithTree(
    user
  );

  return (
    <SwipeDiscovery
      userRoutes={favoriteItems}
      countries={countries}
      favorites={favorites}
      user={user}
      customClassName="pt-6 px-4 max-w-md"
    />
  );
}

export default page;
