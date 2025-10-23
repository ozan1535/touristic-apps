import { createClient } from "@/lib/supabase/client";
import { Dispatch, SetStateAction } from "react";
import { IAppDetail, ICategoryWithApps } from "./types";

export const handleFetchApps = async (
  countryCca2: string,
  language: string,
  setData: Dispatch<SetStateAction<ICategoryWithApps[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  return;
  setLoading(true);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("country_cca2", countryCca2.toUpperCase())
    .eq("language", language);

  if (error) {
    console.error("Error fetching apps:", error);
    return [];
  }

  const categoriesMap = new Map<string, IAppDetail[]>();

  // data?.forEach((app) => {
  //   if (!categoriesMap.has(app.category)) {
  //     categoriesMap.set(app.category, []);
  //   }

  //   categoriesMap.get(app.category)?.push({
  //     id: app.id,
  //     app_name: app.app_name,
  //     description: app.description,
  //     logo_url: app.logo_url,
  //     website_url: app.website_url,
  //     app_store_url: app.app_store_url,
  //     play_store_url: app.play_store_url,
  //   });
  // });

  setData(
    Array.from(categoriesMap.entries()).map(([category, apps]) => ({
      category,
      apps,
    }))
  );
  setLoading(false);
};
