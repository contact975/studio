"use client";

import * as React from "react";
import Script from 'next/script';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
          {/* คอนเทนเนอร์หลักสำหรับวิดเจ็ต - ระบุตำแหน่งให้สคริปต์มาลงที่นี่ */}
          <div className="trustindex-content-wrapper">
            {/* Trustindex placeholder div */}
            <div className="ti-widget" data-widget-id="582ed80703c7161ab7966834ee1"></div>
            
            <Script 
              src="https://cdn.trustindex.io/loader.js?582ed80703c7161ab7966834ee1" 
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
