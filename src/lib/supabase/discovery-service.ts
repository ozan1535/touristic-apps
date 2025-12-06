import {
  ICity,
  ICountry,
  IDiscoveryItem,
  IRoute,
} from "@/components/ExploreComponents/ExploreComponents.types";
import { supabase } from "./client";

export class DiscoveryService {
  static async getCountries(locale: "tr" | "en"): Promise<ICountry[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("country, country_image_url")
      .eq("language", locale)
      .not("country_image_url", "eq", "");

    if (error) throw error;

    const uniqueCountries = new Map<string, ICountry>();
    data?.forEach((item) => {
      if (!uniqueCountries.has(item.country)) {
        uniqueCountries.set(item.country, {
          name: item.country,
          image_url: item.country_image_url,
        });
      }
    });

    return Array.from(uniqueCountries.values());
  }

  static async getCitiesByCountry(
    countryName: string,
    locale
  ): Promise<ICity[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("country, city, city_image_url")
      .eq("country", countryName)
      .eq("language", locale)

      .not("city_image_url", "eq", "");
    if (error) throw error;

    const uniqueCities = new Map<string, ICity>();
    data?.forEach((item) => {
      if (!uniqueCities.has(item.city)) {
        uniqueCities.set(item.city, {
          name: item.city,
          country: item.country,
          image_url: item.city_image_url,
        });
      }
    });

    return Array.from(uniqueCities.values());
  }

  static async getRoutesByCity(cityName: string, locale): Promise<IRoute[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("id, route, description, tag, route_image_url, address")
      .eq("language", locale)
      .eq("city", cityName);

    if (error) throw error;

    return (data || []).map((item) => ({
      id: item.id,
      title: item.route,
      description: item.description,
      tag: item.tag,
      image_url: item.route_image_url,
      address: item.address,
    }));
  }

  static async getAllDiscoveryItems(): Promise<IDiscoveryItem[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as IDiscoveryItem[];
  }

  static async getAllDiscoveryFavorites(user: any): Promise<any[]> {
    const { data, error } = await supabase
      .from("discovery_favorites")
      .select(
        `
      *,
      discovery:route (
        id,
        route,
        city,
        country,
        description,
        tag,
        route_image_url,
        address
      )
    `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as IDiscoveryItem[];
  }

  // static async getAllDiscoveryFavoritesWithUniqueItems(
  //   user: any
  // ): Promise<{ countries: ICountry[]; cities: ICity[] }> {
  //   const { data, error } = await supabase
  //     .from("discovery_favorites")
  //     .select(
  //       `
  //     *,
  //     discovery:route (
  //       id,
  //       route,
  //       city,
  //       country,
  //       description,
  //       tag,
  //       route_image_url,
  //       country_image_url,
  //       city_image_url
  //     )
  //   `
  //     )
  //     .eq("user_id", user.id)
  //     .order("created_at", { ascending: true });

  //   if (error) throw error;

  //   const uniqueCountries = new Map<string, ICountry>();
  //   const uniqueCities = new Map<string, ICity>();

  //   data?.forEach((item) => {
  //     const d = item.discovery;
  //     if (!d) return;

  //     // Unique countries
  //     if (!uniqueCountries.has(d.country)) {
  //       uniqueCountries.set(d.country, {
  //         name: d.country,
  //         image_url: d.country_image_url,
  //       });
  //     }

  //     // Unique cities
  //     if (!uniqueCities.has(d.city)) {
  //       uniqueCities.set(d.city, {
  //         name: d.city,
  //         image_url: d.city_image_url,
  //         routes: [
  //           {
  //             id: d.id,
  //             title: d.route,
  //             location: d.description,
  //             tag: d.tag,
  //             image_url: d.route_image_url,
  //           },
  //         ],
  //       });
  //     }
  //   });

  //   return {
  //     countries: Array.from(uniqueCountries.values()),
  //     cities: Array.from(uniqueCities.values()),
  //   };
  // }

  static async getAllDiscoveryFavoritesWithTree(user: any): Promise<any[]> {
    const { data, error } = await supabase
      .from("discovery_favorites")
      .select(
        `
      *,
      discovery:route (
        id,
        route,
        city,
        country,
        description,
        tag,
        route_image_url,
        country_image_url,
        city_image_url,
        address
      )
    `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    const { data: countryFallback } = await supabase
      .from("discovery")
      .select("country, country_image_url")
      .not("country_image_url", "eq", "");

    const { data: cityFallback } = await supabase
      .from("discovery")
      .select("country, city, city_image_url")
      .not("city_image_url", "eq", "");

    const countryImages = new Map<string, string>();
    const cityImages = new Map<string, string>();

    countryFallback?.forEach((item) => {
      if (!countryImages.has(item.country) && item.country_image_url) {
        countryImages.set(item.country, item.country_image_url);
      }
    });

    cityFallback?.forEach((item) => {
      const cityKey = `${item.country}-${item.city}`;
      if (!cityImages.has(cityKey) && item.city_image_url) {
        cityImages.set(cityKey, item.city_image_url);
      }
    });

    const countryMap = new Map<
      string,
      {
        name: string;
        image_url: string;
        cities: Map<
          string,
          {
            name: string;
            image_url: string;
            routes: IRoute[];
          }
        >;
      }
    >();

    data?.forEach((item) => {
      const d = item.discovery;
      if (!d) return;

      const countryImageUrl =
        d.country_image_url || countryImages.get(d.country) || "";
      const cityImageUrl =
        d.city_image_url || cityImages.get(`${d.country}-${d.city}`) || "";

      if (!countryMap.has(d.country)) {
        countryMap.set(d.country, {
          name: d.country,
          image_url: countryImageUrl,
          cities: new Map(),
        });
      }

      const country = countryMap.get(d.country)!;

      if (!country.cities.has(d.city)) {
        country.cities.set(d.city, {
          name: d.city,
          image_url: cityImageUrl,
          routes: [],
        });
      }

      const city = country.cities.get(d.city)!;

      city.routes.push({
        id: d.id,
        discoveryFavoritesId: item.id,
        title: d.route,
        description: d.description,
        tag: d.tag,
        image_url: d.route_image_url,
        address: d.address,
      });
    });

    return Array.from(countryMap.values()).map((country) => ({
      ...country,
      cities: Array.from(country.cities.values()),
    }));
  }

  static async getDiscoveryItemById(
    id: string
  ): Promise<IDiscoveryItem | null> {
    const { data, error } = await supabase
      .from("discovery")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }
}
