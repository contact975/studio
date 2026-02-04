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

const allLogos = [
  {
    name: "Customer 01",
    logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer01.png?alt=media",
    imageHint: "Customer logo 01"
  },
  {
    name: "Customer 02",
    logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer02.png?alt=media",
    imageHint: "Customer logo 02"
  },
  {
    name: "Customer 03",
    logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer03.png?alt=media",
    imageHint: "Customer logo 03"
  },
  {
    name: "Customer 04",
    logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer04.png?alt=media",
    imageHint: "Customer logo 04"
  },
  {
    name: "Ananda Development",
    logoUrl: "https://picsum.photos/seed/ananda/200/100",
    imageHint: "Ananda Development logo"
  },
  {
    name: "UOB",
    logoUrl: "https://picsum.photos/seed/uob/200/100",
    imageHint: "UOB logo"
  },
  {
    name: "ออมสิน",
    logoUrl: "https://picsum.photos/seed/gsb/200/100",
    imageHint: "GSB logo"
  },
  {
    name: "Lazada",
    logoUrl: "https://picsum.photos/seed/lazada/200/100",
    imageHint: "Lazada logo"
  },
  {
    name: "Shopee",
    logoUrl: "https://picsum.photos/seed/shopee/200/100",
    imageHint: "Shopee logo"
  },
  {
    name: "Health at Home",
    logoUrl: "https://picsum.photos/seed/healthathome/200/100",
    imageHint: "Health at Home logo"
  },
  {
    name: "SellSuki",
    logoUrl: "https://picsum.photos/seed/sellsuki/200/100",
    imageHint: "SellSuki logo"
  },
  {
    name: "Punpromotion",
    logoUrl: "https://picsum.photos/seed/punpro/200/100",
    imageHint: "Punpromotion logo"
  },
  {
    name: "Fastship",
    logoUrl: "https://picsum.photos/seed/fastship/200/100",
    imageHint: "Fastship logo"
  },
  {
    name: "CloudCommerce",
    logoUrl: "https://picsum.photos/seed/cloudcommerce/200/100",
    imageHint: "CloudCommerce logo"
  },
  {
    name: "Baby Swimming",
    logoUrl: "https://picsum.photos/seed/babyswimming/200/100",
    imageHint: "Baby Swimming logo"
  },
];


export function ClientsSection() {
  return (
    <section id="clients" className="py-20 md:py-28 bg-background">
      <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16 text-foreground">
          ลูกค้าที่อยู่ในการดูแลของเรา
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {allLogos.map((logo, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                <div className="p-4">
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    width={140}
                    height={70}
                    className="object-contain"
                    data-ai-hint={logo.imageHint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden xl:inline-flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden xl:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}