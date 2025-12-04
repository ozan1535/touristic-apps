"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ICity, ICountry, IRoute } from "./ExploreComponents.types";
import { DiscoveryHeader } from "./DiscoveryHeader";
import { SelectionCard } from "./SelectionCard";
import { SwipeCard } from "./SwipeCard";
import { SwipeControls } from "./SwipeControls";
import {
  getHeaderConfig,
  handleBack,
  handleSwipe,
  loadCities,
  loadRoutes,
} from "./ExploreComponents.helpers";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FavoriteRoutes from "./FavoriteRoutes";

type Step = "country_select" | "city_select" | "deck" | "show_favorites";

export const SwipeDiscovery = ({
  userRoutes,
  countries,
  favorites,
  user,
  isFavorite = false,
  canShowHeader = true,
  customClassName = "",
}) => {
  // useEffect(() => {
  //   if (user) {
  //     alert("asdf");
  //     return;
  //   }
  // }, []);

  const [step, setStep] = useState<Step>("country_select");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  //const [countries, setCountries] = useState<ICountry[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [likedRoutes, setLikedRoutes] = useState<IRoute[]>([]);
  const [loading, setLoading] = useState(false);
  // TODO: Fix type
  const [favoriteItems, setFavoriteItems] = useState<any[]>(favorites);

  const t = useTranslations("Explore");

  const countryItems = isFavorite ? userRoutes : countries;

  const activeRoute = routes[routes.length - 1];
  const nextRoute = routes[routes.length - 2];

  const headerConfig = getHeaderConfig(step, selectedCountry, selectedCity, t);
  return (
    <div
      className={`h-[90vh] mx-auto flex flex-col relative overflow-hidden bg-gradient-to-b from-blue-50 to-white ${customClassName}`}
    >
      <DiscoveryHeader
        title={headerConfig.title}
        subtitle={headerConfig.subtitle}
        likedCount={favoriteItems.length}
        showBack={headerConfig.showBack}
        onBack={() =>
          handleBack(
            step,
            setStep,
            setSelectedCity,
            setRoutes,
            setSelectedCountry,
            setCities,
            setLikedRoutes
          )
        }
      />

      {isFavorite && userRoutes.length === 0 && (
        <p className="p-2 bg-blue-500 text-center text-white font-bold">
          Herhangi bir favori rotanız bulunmamaktadır
        </p>
      )}
      {/* {canShowHeader ? (
        <DiscoveryHeader
          title={headerConfig.title}
          subtitle={headerConfig.subtitle}
          likedCount={favoriteItems.length}
          showBack={headerConfig.showBack}
          onBack={() =>
            handleBack(
              step,
              setStep,
              setSelectedCity,
              setRoutes,
              setSelectedCountry,
              setCities,
              setLikedRoutes
            )
          }
        />
      ) : (
        <div>
          <h2 className="text-center bg-blue-500 p-2 rounded text-lg font-bold text-white mb-5">
            Kaydedilmiş rotalarınız
          </h2>
         
        </div>
      )} */}

      <div className="flex-1 relative w-full overflow-y-auto no-scrollbar">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {step === "country_select" && !loading && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
            {countryItems.map((country, index) => (
              <SelectionCard
                key={`${country.name}-${index}`}
                title={country.name}
                img={country.image_url}
                onClick={
                  () => {
                    setSelectedCountry(country);
                    setStep("city_select");
                    loadCities(
                      country.name,
                      setLoading,
                      setCities,
                      isFavorite,
                      country.cities
                    );
                  }
                  // handleCountrySelect(country, setSelectedCountry, setStep)
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
                onClick={() => {
                  if (isFavorite) {
                    setStep("show_favorites");
                    setRoutes(city.routes);

                    return;
                  }
                  setSelectedCity(city);
                  setStep("deck");
                  loadRoutes(city.name, setLoading, setRoutes, favoriteItems);
                }}

                //handleCitySelect(city, setSelectedCity, setStep)}
              />
            ))}
          </div>
        )}

        {step === "show_favorites" && !loading && (
          <>
            {routes.map((route) => (
              <FavoriteRoutes
                route={route}
                user={user}
                key={route.id}
                setRoutes={setRoutes}
                isFavorite={true}
              />
            ))}
          </>
        )}

        {step === "deck" && !loading && (
          <div className="h-[65vh] relative w-full">
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
                              setFavoriteItems,
                              likedRoutes,
                              setLikedRoutes,
                              user,
                              setLoading,
                              favoriteItems
                            )
                          }
                        />
                      )
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /*  <EmptyState
                cityName={selectedCity?.name || "this city"}
                likedRoutes={favoriteItems}
                onBackToCity={() => setStep("city_select")}
              /> */
              // <SwipeDiscovery
              //   userRoutes={userRoutes}
              //   countries={countries}
              //   favorites={favorites}
              //   user={user}
              //   isFavorite={true}
              //   canShowHeader={false}
              //   customClassName="pt-0 px-0"
              // />
              <div>
                <h2 className="text-center bg-blue-500 p-2 rounded text-lg font-bold text-white mb-5">
                  Güncel rotanız
                </h2>
                {likedRoutes.map((route) => (
                  <FavoriteRoutes
                    isFavorite={false}
                    key={route.id}
                    route={route}
                  />
                ))}
              </div>
            )}

            {routes.length > 0 && (
              <SwipeControls
                onDislike={() =>
                  handleSwipe(
                    activeRoute.id,
                    "left",
                    routes,
                    setRoutes,
                    setFavoriteItems,
                    likedRoutes,
                    setLikedRoutes,
                    user,
                    setLoading,
                    favoriteItems
                  )
                }
                onLike={() =>
                  handleSwipe(
                    activeRoute.id,
                    "right",
                    routes,
                    setRoutes,
                    setFavoriteItems,
                    likedRoutes,
                    setLikedRoutes,
                    user,
                    setLoading,
                    favoriteItems
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
