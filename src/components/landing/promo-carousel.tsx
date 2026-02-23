"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const promoImages = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FPromotion01.jpg?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 1",
    hint: "accounting promotion banner 1"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FPromotion02.jpg?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 2",
    hint: "accounting promotion banner 2"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FPromotion03.jpg?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 3",
    hint: "accounting promotion banner 3"
  }
];

export function PromoCarousel() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="w-full max-w-5xl mx-auto aspect-[2.5/1] bg-muted animate-pulse rounded-[2rem]" />
      </div>
    );
  }

  return (
    <section className="w-full bg-primary py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full max-w-5xl mx-auto group relative"
        >
          <CarouselContent className="-ml-0">
            {promoImages.map((image, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="relative aspect-[16/7] md:aspect-[21/7] lg:aspect-[2.5/1] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border-4 border-white/10">
                  <Image
                    src={image.src}
                    fill
                    alt={image.alt}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    data-ai-hint={image.hint}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 text-primary border-none h-10 w-10 md:h-12 md:w-12 shadow-md flex items-center justify-center rounded-full transition-all opacity-0 group-hover:opacity-100 md:opacity-100" />
          <CarouselNext className="absolute -right-4 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 text-primary border-none h-10 w-10 md:h-12 md:w-12 shadow-md flex items-center justify-center rounded-full transition-all opacity-0 group-hover:opacity-100 md:opacity-100" />
        </Carousel>
      </div>
    </section>
  );
}
