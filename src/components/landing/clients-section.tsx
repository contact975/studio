"use client";

import * as React from "react";
import Image from "next/image";

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
  return (
    <section id="clients" className="py-8 md:py-12 bg-background overflow-hidden">
      <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8 text-foreground">
          ลูกค้าที่อยู่ในการดูแลของเรา
        </h2>
        
        <div className="space-y-4">
          {/* Row 1 - LTR Marquee using GPU-accelerated CSS */}
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee-slow flex items-center gap-12 py-4">
              {[...logosRow1, ...logosRow1].map((logo, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0 w-32 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    width={140}
                    height={70}
                    className="object-contain"
                    data-ai-hint={logo.imageHint}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - RTL Marquee using GPU-accelerated CSS */}
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee-reverse flex items-center gap-12 py-4">
              {[...logosRow2, ...logosRow2].map((logo, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0 w-32 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    width={140}
                    height={70}
                    className="object-contain"
                    data-ai-hint={logo.imageHint}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.5rem)); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-50% - 1.5rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-marquee-slow, .animate-marquee-reverse {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
