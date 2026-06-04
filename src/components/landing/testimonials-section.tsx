"use client";

import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
animate: scroll reveal animations in testimonials sectionexport function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              สิ่งที่เราภูมิใจที่สุด<br className="hidden md:block" />
              คือเสียงของลูกค้า
            </h2>
          </div>
          <motion.div
            className="flex items-center gap-4 bg-secondary/40 rounded-2xl px-6 py-4 border border-border self-start md:self-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="text-center">
              <p className="text-3xl font-black text-foreground">5.0</p>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">Google Reviews</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-black text-foreground">100+</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">ลูกค้าที่ไว้วางใจ</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Widget container */}
        <motion.div
          ref={containerRef}
          className="w-full max-w-7xl mx-auto min-h-[300px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {!isLoaded && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground/30 py-16">
              <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">กำลังโหลดรีวิวจาก Google...</p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
