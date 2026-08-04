"use client";

import * as React from "react";
import { useEffect, useRef, useState } from 'react';

export function TestimonialsSection() {

  // Scroll reveal
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVis(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header — scroll reveal */}
        <div
          ref={headerRef}
          style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              สิ่งที่เราภูมิใจที่สุด<br className="hidden md:block" />คือเสียงของลูกค้า
            </h2>
          </div>
          <div
            style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: '150ms' }}
            className="flex items-center gap-4 bg-secondary/40 rounded-2xl px-6 py-4 border border-border self-start md:self-auto"
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
          </div>
        </div>
      </div>
    </section>
  );
}
