
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
  { name: "Customer 01", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer01.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 02", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer02.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 03", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer03.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 04", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer04.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 05", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer05.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 06", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer06.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 13", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer13.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 14", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer14.png?alt=media", imageHint: "customer logo" },
];

const logosRow2 = [
  { name: "Customer 07", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer07.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 08", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer08.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 09", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer09.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 10", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer10.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 11", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer11.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 12", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer12.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 15", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer15.png?alt=media", imageHint: "customer logo" },
  { name: "Customer 16", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer16.png?alt=media", imageHint: "customer logo" },
];

export function ClientsSection() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="clients" className="py-12 md:py-16 bg-background overflow-hidden">
      <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8 text-foreground">
          ลูกค้าที่อยู่ในการดูแลของเรา
        </h2>
        
        {isMounted ? (
          <div className="space-y-4">
            {/* Row 1 - Right to Left (Default) */}
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

            {/* Row 2 - Left to Right (RTL mode for opposite slide) */}
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
        ) : (
          <div className="h-[150px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
}
