"use client";

import * as React from "react";
import Image from "next/image";

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

function MarqueeRow({ logos, reverse = false }: { logos: typeof logosRow1, reverse?: boolean }) {
  return (
    <div className="relative flex overflow-x-hidden">
      {/* Gradients for smooth fade-in/out edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {/* Animation direction is now Left to Right by default */}
      <div className={`flex items-center gap-12 py-4 animate-marquee-ltr`}>
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-36 md:w-44 h-16 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={logo.logoUrl}
              alt={logo.name}
              width={160}
              height={75}
              className="object-contain max-h-16"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section id="clients" className="py-16 bg-background overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Trusted By</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              ลูกค้าที่อยู่ในการดูแลของเรา
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            กว่า 100 ธุรกิจในเชียงใหม่และทั่วประเทศที่เลือกให้ IC ดูแลหลังบ้าน
          </p>
        </div>
      </div>

      {/* Marquee Rows - Both sliding Left to Right */}
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="space-y-4">
          <MarqueeRow logos={logosRow1} />
          <MarqueeRow logos={logosRow2} />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(calc(-50% - 1.5rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 40s linear infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-marquee-ltr {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
