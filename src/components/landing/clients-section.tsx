"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const logosRow1 = [
  { name: "Customer 01", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer01.png?alt=media" },
  { name: "Customer 02", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer02.png?alt=media" },
  { name: "Customer 03", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer03.png?alt=media" },
  { name: "Customer 04", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer04.png?alt=media" },
  { name: "Customer 05", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer05.png?alt=media" },
  { name: "Customer 06", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer06.png?alt=media" },
  { name: "Customer 13", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer13.png?alt=media" },
  { name: "Customer 14", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer14.png?alt=media" },
];

const logosRow2 = [
  { name: "Customer 07", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer07.png?alt=media" },
  { name: "Customer 08", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer08.png?alt=media" },
  { name: "Customer 09", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer09.png?alt=media" },
  { name: "Customer 10", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer10.png?alt=media" },
  { name: "Customer 11", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer11.png?alt=media" },
  { name: "Customer 12", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer12.png?alt=media" },
  { name: "Customer 15", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer15.png?alt=media" },
  { name: "Customer 16", logoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Customer16.png?alt=media" },
];

interface MarqueeRowProps {
  logos: typeof logosRow1;
  direction: "ltr" | "rtl";
}

function MarqueeRow({ logos, direction }: MarqueeRowProps) {
  return (
    <div className="relative flex overflow-x-hidden">
      {/* Gradients for smooth fade-in/out edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Animation wrapper with GPU acceleration */}
      <div 
        className={cn(
          "flex items-center gap-4 md:gap-6 py-4 md:py-6",
          direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl"
        )}
        style={{ willChange: 'transform' }}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 md:w-44 h-20 md:h-24 flex items-center justify-center p-2"
          >
            <Image
              src={logo.logoUrl}
              alt={logo.name}
              width={180}
              height={90}
              className="object-contain max-h-16 md:max-h-20 w-auto h-auto"
              loading="lazy"
              sizes="(max-width: 768px) 128px, 176px"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-ltr {
          0% { transform: translate3d(-33.33%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 30s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 30s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee-ltr, .animate-marquee-rtl {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section id="clients" className="py-16 md:py-24 bg-background overflow-hidden border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Trusted By</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              ลูกค้าที่อยู่ในการดูแลของเรา
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs md:text-right">
            กว่า 100 ธุรกิจในเชียงใหม่และทั่วประเทศที่เลือกให้ IC ดูแลหลังบ้าน
          </p>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex flex-col gap-2 md:gap-4">
          <MarqueeRow logos={logosRow1} direction="ltr" />
          <MarqueeRow logos={logosRow2} direction="rtl" />
        </div>
      </div>
    </section>
  );
}
