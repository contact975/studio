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

const clients = [
  { name: "ปันโปร", logoUrl: "https://picsum.photos/seed/punpro/150/60", hint: "company logo" },
  { name: "FASTSHIP", logoUrl: "https://picsum.photos/seed/fastship/150/60", hint: "company logo" },
  { name: "CLOUDCOMMERCE", logoUrl: "https://picsum.photos/seed/cloudcommerce/150/60", hint: "company logo" },
  { name: "BABY SWIMMING", logoUrl: "https://picsum.photos/seed/babyswimming/150/60", hint: "company logo" },
  { name: "HAPPY MÜNCHY", logoUrl: "https://picsum.photos/seed/happymunchy/150/60", hint: "company logo" },
  { name: "FROG GENIUS", logoUrl: "https://picsum.photos/seed/froggenius/150/60", hint: "company logo" },
  { name: "Client 7", logoUrl: "https://picsum.photos/seed/client7/150/60", hint: "company logo" },
  { name: "Client 8", logoUrl: "https://picsum.photos/seed/client8/150/60", hint: "company logo" },
];

export function ClientsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section id="clients" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-headline text-center mb-12 text-foreground">
          ลูกค้าที่ไว้วางใจใช้บริการกับเรา
        </h2>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-8">
            {clients.map((client, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-8">
                <div className="flex items-center justify-center h-24 p-2">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={150}
                    height={60}
                    className="object-contain h-12 w-auto grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                    data-ai-hint={client.hint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 hidden lg:inline-flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 hidden lg:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
