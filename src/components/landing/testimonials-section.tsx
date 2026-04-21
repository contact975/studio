
"use client";

import * as React from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function TestimonialsSection() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    // Manually inject Trustindex script after component mounted to ensure it finds the container
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?d07bdaa700891641ec465ec59b6';
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount if necessary
      const existingScript = document.querySelector('script[src*="trustindex.io"]');
      if (existingScript) {
        existingScript.remove();
      }
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

        {/* This container MUST exist for the script to find it and inject the widget here */}
        <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-7xl mx-auto min-h-[400px]">
          <div className="ti-widget" data-widget-id="d07bdaa700891641ec465ec59b6"></div>
        </div>
      </div>
    </section>
  );
}
