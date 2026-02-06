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
    src: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Promotion%2FCustomer03.png?alt=media",
    alt: "บริการทำบัญชี โปรโมชั่น 3",
    hint: "accounting promotion banner 3"
  }
];

export function PromoCarousel() {
  return (
    <section className="w-full bg-background overflow-hidden">
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
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {promoImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative aspect-[16/9] md:aspect-[21/7] lg:aspect-[3/1] w-full overflow-hidden">
                <Image
                  src={image.src}
                  fill
                  alt={image.alt}
                  className="object-cover"
                  sizes="100vw"
                  data-ai-hint={image.hint}
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:inline-flex bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
      </Carousel>
    </section>
  );
}
