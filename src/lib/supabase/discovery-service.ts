import {
  ICity,
  ICountry,
  IDiscoveryItem,
  IRoute,
} from "@/components/ExploreComponents/ExploreComponents.types";
import { supabase } from "./client";

export class DiscoveryService {
  static async getCountries(): Promise<ICountry[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("country, country_image_url");

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

  static async getCitiesByCountry(countryName: string): Promise<ICity[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("country, city, city_image_url")
      .eq("country", countryName);

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

  static async getRoutesByCity(cityName: string): Promise<IRoute[]> {
    const { data, error } = await supabase
      .from("discovery")
      .select("id, route, description, tag, route_image_url")
      .eq("city", cityName);

    if (error) throw error;

    return (data || []).map((item) => ({
      id: item.id,
      title: item.route,
      location: item.description,
      tag: item.tag,
      image_url: item.route_image_url,
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

  static async getAllDiscoveryFavorites(user): Promise<any[]> {
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
        route_image_url
      )
    `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as IDiscoveryItem[];
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
