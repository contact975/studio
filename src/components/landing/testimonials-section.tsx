"use client";

import * as React from "react";
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });

    if (!containerRef.current) return;

    // สร้าง div สำหรับ widget
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'ti-widget';
    widgetDiv.setAttribute('data-widget-id', 'd07bdaa700891641ec465ec59b6');
    containerRef.current.appendChild(widgetDiv);

    // โหลด script หลังจาก widget div พร้อมแล้ว
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?d07bdaa700891641ec465ec59b6';
    script.defer = true;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      // cleanup
      const existingScript = document.querySelector('script[src*="trustindex.io"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-foreground">
            สิ่งที่เราภูมิใจที่สุด คือเสียงของลูกค้า
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            มากกว่า 100 บริษัทและหจก.ที่ไว้วางใจ และใช้บริการกับ IC Accounting & Service
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          ref={containerRef}
          className="w-full max-w-7xl mx-auto min-h-[400px]"
        />
      </div>
    </section>
  );
}