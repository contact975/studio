"use client";

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
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FPromotion01.png?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 1",
    hint: "accounting promotion banner 1"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FPromotion02.png?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 2",
    hint: "accounting promotion banner 2"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FCustomer03.png?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 3",
    hint: "accounting promotion banner 3"
  }
];

export function PromoCarousel() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {promoImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    fill
                    alt={image.alt}
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    data-ai-hint={image.hint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
