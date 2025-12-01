import { DiscoveryService } from "@/lib/supabase/discovery-service";
import { ICity, ICountry } from "./ExploreComponents.types";
import { supabase } from "@/lib/supabase/client";

export const loadCountries = async (setLoading, setCountries) => {
  setLoading(true);
  try {
    const data = await DiscoveryService.getCountries();
    setCountries(data);
  } catch (error) {
    console.error("Error loading countries:", error);
  } finally {
    setLoading(false);
  }
};

export const loadCities = async (
  countryName: string,
  setLoading,
  setCities
) => {
  setLoading(true);
  try {
    const data = await DiscoveryService.getCitiesByCountry(countryName);
    setCities(data);
  } catch (error) {
    console.error("Error loading cities:", error);
  } finally {
    setLoading(false);
  }
};

export const loadRoutes = async (cityName: string, setLoading, setRoutes) => {
  setLoading(true);
  try {
    const data = await DiscoveryService.getRoutesByCity(cityName);
    setRoutes(data);
  } catch (error) {
    console.error("Error loading routes:", error);
  } finally {
    setLoading(false);
  }
};

export const loadFavorites = async (user, setLoading, setFavorites) => {
  setLoading(true);
  try {
    const data = await DiscoveryService.getAllDiscoveryFavorites(user);
    setFavorites(data);
  } catch (error) {
    console.error("Error loading countries:", error);
  } finally {
    setLoading(false);
  }
};

export const handleCountrySelect = (
  country: ICountry,
  setSelectedCountry,
  setStep
) => {
  setSelectedCountry(country);
  setStep("city_select");
};

export const handleCitySelect = (city: ICity, setSelectedCity, setStep) => {
  setSelectedCity(city);
  setStep("deck");
};

export const handleBack = (
  step,
  setStep,
  setSelectedCity,
  setRoutes,
  setSelectedCountry,
  setCities
) => {
  if (step === "deck") {
    setStep("city_select");
    setSelectedCity(null);
    setRoutes([]);
  } else if (step === "city_select") {
    setStep("country_select");
    setSelectedCountry(null);
    setCities([]);
  }
};

const handleInsertData = async (routeId, userId, setFavorites) => {
  const { error } = await supabase.from("discovery_favorites").insert({
    user_id: userId,
    route: routeId,
  });
  //
  //setFavorites((prev) => prev);
};

export const handleSwipe = (
  id: string,
  dir: "left" | "right",
  routes,
  setRoutes,
  setFavorites,
  // likedRoutes,
  // setLikedRoutes,
  user
) => {
  if (dir === "right") {
    const route = routes.find((r) => r.id === id);
    handleInsertData(route.id, user.id, setFavorites);
    // if (route) setLikedRoutes([...likedRoutes, route]);
  }
  setTimeout(() => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  }, 200);
};

export const getHeaderConfig = (step, selectedCountry, selectedCity, t) => {
  switch (step) {
    case "country_select":
      return {
        title: t("explore"),
        subtitle: t("selectCountry"),
        showBack: false,
      };
    case "city_select":
      return {
        title: selectedCountry?.name || t("selectCity"),
        subtitle: t("chooseCity"),
        showBack: true,
      };
    case "deck":
      return {
        title: selectedCity?.name || t("explore"),
        subtitle: t("swipeToExplore"),
        showBack: true,
      };
  }
};
