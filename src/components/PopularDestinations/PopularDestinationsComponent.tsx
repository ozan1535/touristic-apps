"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PopularDestinations from "./PopularDestinations";

function PopularDestinationsComponent({ popularDestinations, locale }) {
  return (
    <section className="w-full py-6 px-4 md:pb-20">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
          Popular Destinations
        </h3>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
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
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default PopularDestinationsComponent;
