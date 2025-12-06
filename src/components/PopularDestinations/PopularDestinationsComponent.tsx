"use client";
import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import PopularDestinations from "./PopularDestinations";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useParams } from "next/navigation";

function PopularDestinationsComponent({ popularDestinations, locale }) {
  return (
    <section className="w-full py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-300 mb-4">
          {locale === "tr" ? "Popüler Destinasyonlar" : "Popular Destinations"}
        </h3>
        <CustomCarousel className="w-full">
          <>
            {popularDestinations?.map((country) => (
              <CarouselItem
                key={country.id}
                className="basis-full md:basis-1/3 overflow-hidden"
              >
                <div className="rounded-2xl overflow-hidden h-full">
                  <PopularDestinations country={country} locale={locale} />
                </div>
              </CarouselItem>
            ))}
          </>
        </CustomCarousel>
      </div>
    </section>
  );
}

export default PopularDestinationsComponent;
