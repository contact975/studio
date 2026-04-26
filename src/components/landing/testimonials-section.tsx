"use client";

import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 50 });

    // Delay widget loading to prioritize main content performance
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Check if widget already exists to prevent duplicates
      if (containerRef.current.querySelector('.ti-widget')) return;

      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'ti-widget';
      widgetDiv.setAttribute('data-widget-id', 'd07bdaa700891641ec465ec59b6');
      containerRef.current.appendChild(widgetDiv);

      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?d07bdaa700891641ec465ec59b6';
      script.defer = true;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      containerRef.current.appendChild(script);
    }, 2000); // 2 seconds delay for smoother page load

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-foreground">
            สิ่งที่เราภูมิใจที่สุด คือเสียงของลูกค้า
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            มากกว่า 100 บริษัทและหจก.ที่ไว้วางใจ และใช้บริการกับ IC Accounting & Service
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          ref={containerRef}
          className="w-full max-w-7xl mx-auto min-h-[300px] flex items-center justify-center"
        >
          {!isLoaded && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground/40 py-10">
              <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">กำลังโหลดรีวิวจาก Google...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
