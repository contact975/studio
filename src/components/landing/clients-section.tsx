
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const logosRow1 = [
  { name: "Customer 01", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer01.png?alt=media", imageHint: "Customer logo 01" },
  { name: "Customer 02", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer02.png?alt=media", imageHint: "Customer logo 02" },
  { name: "Customer 03", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer03.png?alt=media", imageHint: "Customer logo 03" },
  { name: "Customer 04", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer04.png?alt=media", imageHint: "Customer logo 04" },
  { name: "Customer 05", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer05.png?alt=media", imageHint: "Customer logo 05" },
  { name: "Customer 06", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer06.png?alt=media", imageHint: "Customer logo 06" },
  { name: "Customer 13", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer13.png?alt=media", imageHint: "Customer logo 13" },
  { name: "Customer 14", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer14.png?alt=media", imageHint: "Customer logo 14" },
];

const logosRow2 = [
  { name: "Customer 07", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer07.png?alt=media", imageHint: "Customer logo 07" },
  { name: "Customer 08", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer08.png?alt=media", imageHint: "Customer logo 08" },
  { name: "Customer 09", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer09.png?alt=media", imageHint: "Customer logo 09" },
  { name: "Customer 10", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer10.png?alt=media", imageHint: "Customer logo 10" },
  { name: "Customer 11", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer11.png?alt=media", imageHint: "Customer logo 11" },
  { name: "Customer 12", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer12.png?alt=media", imageHint: "Customer logo 12" },
  { name: "Customer 15", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer15.png?alt=media", imageHint: "Customer logo 15" },
  { name: "Customer 16", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer16.png?alt=media", imageHint: "Customer logo 16" },
];

export function ClientsSection() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section id="clients" className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="h-40 w-full animate-pulse bg-muted rounded-lg"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-20 md:py-28 bg-background overflow-hidden">
      <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16 text-foreground">
          ลูกค้าที่อยู่ในการดูแลของเรา
        </h2>
        
        <div className="space-y-12">
          {/* Row 1 - Right to Left */}
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
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {logosRow1.map((logo, index) => (
                <CarouselItem key={`row1-${index}`} className="basis-1/2 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                  <div className="p-4 transition-all duration-300">
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
          </Carousel>

          {/* Row 2 - Left to Right (RTL direction) */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "rtl",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full max-w-7xl mx-auto"
            dir="rtl"
          >
            <CarouselContent>
              {logosRow2.map((logo, index) => (
                <CarouselItem key={`row2-${index}`} className="basis-1/2 md:basis-1/4 lg:basis-1/6 flex items-center justify-center">
                  <div className="p-4 transition-all duration-300">
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
          </Carousel>
        </div>
      </div>
    </section>
  );
}
