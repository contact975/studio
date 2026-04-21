
"use client";

import * as React from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Script from 'next/script';

export function TestimonialsSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* หัวข้อส่วนรีวิว */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-foreground">
            สิ่งที่เราภูมิใจที่สุด คือเสียงของลูกค้า
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            มากกว่า 100 บริษัทและหจก.ที่ไว้วางใจ และใช้บริการกับ IC Accounting & Service
          </p>
        </div>

        {/* ส่วนแสดงรีวิวจาก Trustindex (Google Maps) */}
        <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-7xl mx-auto min-h-[400px]">
          {/* Updated Trustindex Widget Container with new ID provided by user */}
          <div className="ti-widget" data-widget-id="d07bdaa700891641ec465ec59b6"></div>
        </div>
      </div>
      
      {/* Load script directly in the component with the ID provided by user */}
      <Script 
        src="https://cdn.trustindex.io/loader.js?d07bdaa700891641ec465ec59b6" 
        strategy="afterInteractive"
      />
    </section>
  );
}
