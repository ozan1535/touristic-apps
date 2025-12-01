"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ICity, ICountry, IRoute } from "./ExploreComponents.types";
import { DiscoveryHeader } from "./DiscoveryHeader";
import { SelectionCard } from "./SelectionCard";
import { SwipeCard } from "./SwipeCard";
import { EmptyState } from "./EmptyState";
import { SwipeControls } from "./SwipeControls";
import {
  getHeaderConfig,
  handleBack,
  handleCitySelect,
  handleCountrySelect,
  handleSwipe,
  loadCities,
  loadCountries,
  loadFavorites,
  loadRoutes,
} from "./ExploreComponents.helpers";
import { useTranslations } from "next-intl";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

type Step = "country_select" | "city_select" | "deck";

export const SwipeDiscovery = () => {
  const client = useKindeBrowserClient();
  const user = client.getUser();

  const [step, setStep] = useState<Step>("country_select");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [likedRoutes, setLikedRoutes] = useState<IRoute[]>([]);
  const [loading, setLoading] = useState(false);
  // TODO: Fix type
  const [favorites, setFavorites] = useState<any[]>([]);

  const t = useTranslations("Explore");

  useEffect(() => {
    loadCountries(setLoading, setCountries);
    if (user) {
      loadFavorites(user, setLoading, setFavorites);
    }
  }, [user]);

  useEffect(() => {
    if (selectedCountry && step === "city_select") {
      loadCities(selectedCountry.name, setLoading, setCities);
    }
  }, [selectedCountry, step]);
  // useEffect(() => {
  //   if (user) {
  //     loadFavorites(user, setLoading, setFavorites);
  //     const newRoute = routes.filter(
  //       (route) => !favorites.some((fav) => fav.route === route.id)
  //     );

  //     setRoutes(newRoute);
  //   }
  // }, []);

  useEffect(() => {
    if (selectedCity && step === "deck") {
      loadRoutes(selectedCity.name, setLoading, setRoutes);
    }
  }, [selectedCity, step]);

  useEffect(() => {
    if (user) {
      loadFavorites(user, setLoading, setFavorites);
      setRoutes((prev) =>
        prev.filter((route) => !favorites.some((fav) => fav.route === route.id))
      );
    }
    // Dont change routes.length, favorites.length. if you remove the "length", it will have an infinite loop
  }, [routes.length, favorites.length]);

  const activeRoute = routes[routes.length - 1];
  const nextRoute = routes[routes.length - 2];

  const headerConfig = getHeaderConfig(step, selectedCountry, selectedCity, t);
  return (
    <div className="pt-6 px-4 h-screen max-w-md mx-auto flex flex-col relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <DiscoveryHeader
        title={headerConfig.title}
        subtitle={headerConfig.subtitle}
        likedCount={favorites.length}
        showBack={headerConfig.showBack}
        onBack={() =>
          handleBack(
            step,
            setStep,
            setSelectedCity,
            setRoutes,
            setSelectedCountry,
            setCities
          )
        }
      />

      <div className="flex-1 relative w-full mt-2 overflow-y-auto no-scrollbar">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {step === "country_select" && !loading && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
            {countries.map((country, index) => (
              <SelectionCard
                key={`${country.name}-${index}`}
                title={country.name}
                img={country.image_url}
                onClick={() =>
                  handleCountrySelect(country, setSelectedCountry, setStep)
                }
              />
            ))}
          </div>
        )}

        {step === "city_select" && !loading && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
            {cities.map((city, index) => (
              <SelectionCard
                key={`${city.name}-${index}`}
                title={city.name}
                img={city.image_url}
                onClick={() => handleCitySelect(city, setSelectedCity, setStep)}
              />
            ))}
          </div>
        )}

        {step === "deck" && !loading && (
          <div className="h-[65vh] relative w-full mt-4">
            {routes.length > 0 ? (
              <div className="relative w-full h-full">
                {nextRoute && (
                  <div className="absolute inset-0 bg-slate-200 rounded-3xl scale-95 translate-y-4 opacity-50 flex items-center justify-center">
                    <Image
                      src={nextRoute.image_url}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-3xl opacity-50"
                      alt={nextRoute.title}
                    />
                  </div>
                )}

                <AnimatePresence>
                  {routes.map(
                    (route) =>
                      route.id === activeRoute.id && (
                        <SwipeCard
                          key={route.id}
                          data={route}
                          index={1}
                          onSwipe={(id, dir) =>
                            handleSwipe(
                              id,
                              dir,
                              routes,
                              setRoutes,
                              setFavorites,
                              // likedRoutes,
                              // setLikedRoutes,
                              user
                            )
                          }
                        />
                      )
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <EmptyState
                cityName={selectedCity?.name || "this city"}
                likedRoutes={favorites}
                onBackToCity={() => setStep("city_select")}
              />
            )}

            {routes.length > 0 && (
              <SwipeControls
                onDislike={() =>
                  handleSwipe(
                    activeRoute.id,
                    "left",
                    routes,
                    setRoutes,
                    setFavorites,
                    // likedRoutes,
                    // setLikedRoutes,
                    user
                  )
                }
                onLike={() =>
                  handleSwipe(
                    activeRoute.id,
                    "right",
                    routes,
                    setRoutes,
                    setFavorites,
                    // likedRoutes,
                    // setLikedRoutes,
                    user
                  )
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
