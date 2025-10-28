import { supabase } from "@/lib/supabase/client";

export async function getCountryData(cca2: string, locale: string) {
  const [countryRes, priceGuideRes, contributionsRes] = await Promise.all([
    supabase.from("countries").select("*").eq("country_cca2", cca2),
    supabase
      .from("price_guide")
      .select("*")
      .eq("country_cca2", cca2)
      .eq("language", locale),
    supabase
      .from("contributions")
      .select("*")
      .eq("country", cca2)
      .eq("is_approved", true),
  ]);

  return {
    countryInfo: countryRes.data?.[0] ?? null,
    priceGuide: priceGuideRes.data ?? [],
    contributions: contributionsRes.data ?? [],
  };
}

export function getFlightValue(countryInfo: any) {
  if (!countryInfo) return null;
  const month = new Date().getMonth() + 1;

  if ([9, 10, 11].includes(month)) return countryInfo.flight_autumn;
  if ([12, 1, 2].includes(month)) return countryInfo.flight_winter;
  if ([3, 4, 5].includes(month)) return countryInfo.flight_spring;
  if ([6, 7, 8].includes(month)) return countryInfo.flight_summer;
  return null;
}
