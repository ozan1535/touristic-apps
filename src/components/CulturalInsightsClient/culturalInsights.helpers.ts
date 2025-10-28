import { supabase } from "@/lib/supabase/client";

export async function fetchCulturalInsightsAndTrips(
  selection: string,
  sortedCountries: any[],
  locale: string
) {
  const countryCca2 = sortedCountries.find(
    (item) => item.label === selection
  )?.cca2;

  if (!countryCca2) return { insights: [], trips: [] };

  const { data: insights } = await supabase
    .from("cultural_insights")
    .select("*")
    .eq("country_cca2", countryCca2)
    .eq("language", locale);

  const { data: trips, error } = await supabase
    .from("trips")
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
    .eq("country_cca2", countryCca2)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching trips:", error);

  return { insights, trips };
}
