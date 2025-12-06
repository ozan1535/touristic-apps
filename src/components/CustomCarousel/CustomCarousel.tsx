import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function CustomCarousel({
  children,
  className,
  canShowButtons = false,
  watchDrag = true,
}) {
  return (
    <Carousel
      opts={{
        align: "end",
        loop: true,
        watchDrag,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className={`relative ${className}`}
    >
      <CarouselContent>{children}</CarouselContent>
      {canShowButtons && (
        <>
          <CarouselPrevious
            className="
          absolute 
          left-3 
          top-1/2 
          -translate-y-1/2 
          z-20 
          bg-black/40 
          dark:bg-black/40 
          text-white 
          rounded-full 
          w-10 
          h-10 
          flex 
          items-center 
          justify-center
          "
          />

          <CarouselNext
            className="
      absolute 
      right-3 
      top-1/2 
      -translate-y-1/2 
      z-20 
      bg-black/40 
      text-white 
      dark:bg-black/40 
      rounded-full 
      w-10 
      h-10 
      flex 
      items-center 
      justify-center
      "
          />
        </>
      )}
    </Carousel>
  );
}

export default CustomCarousel;
