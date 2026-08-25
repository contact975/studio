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
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Animation wrapper with GPU acceleration */}
      <div
        className={cn(
          "flex items-center gap-1 md:gap-2 py-4 md:py-6",
          direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl"
        )}
        style={{ willChange: "transform" }}
      >
        {/* Triple the logos for a seamless infinity loop especially on mobile */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-28 md:w-44 h-16 md:h-24 flex items-center justify-center p-2"
          >
            {/* ไม่ใส่ sizes โดยตั้งใจ:
                sizes ที่เป็นหน่วย px ทำให้ Next สร้าง srcSet ครบทุกขนาด (16 ค่า ถึง w=3840)
                พอไม่มี sizes จะได้ srcSet แบบ 1x/2x = w=256 และ w=384 เท่านั้น
                ซึ่งพอดีกับ logo ที่แสดงจริงแค่ ~96px (mobile) / ~160px (desktop) */}
            <Image
              src={logo.logoUrl}
              alt={logo.name}
              width={140}
              height={70}
              className="object-contain max-h-16 md:max-h-24 w-auto h-auto"
              loading="lazy"
              quality={70}
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
          animation: marquee-ltr 25s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 25s linear infinite;
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
    <section id="clients" className="py-12 md:py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-6 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-2">Trusted By</p>
            <h2 className="text-xl md:text-3xl font-black text-foreground">
              ลูกค้าที่อยู่ในการดูแลของเรา
            </h2>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xs md:text-right">
            กว่า 100 ธุรกิจในเชียงใหม่และทั่วประเทศที่เลือกให้ IC ดูแลหลังบ้าน
          </p>
        </div>
      </div>

      {/* Marquee Row without borders */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="overflow-hidden py-2 md:py-4">
          <div className="flex flex-col gap-1 md:gap-4">
            <MarqueeRow logos={logosRow1} direction="ltr" />
            <MarqueeRow logos={logosRow2} direction="rtl" />
          </div>
        </div>
      </div>
    </section>
  );
}
