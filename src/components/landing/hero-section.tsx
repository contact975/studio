'use client';

import * as React from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    setHasStarted(true);
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, hasStarted]);

  return (
    <span>
      {suffix === ".0" ? count.toFixed(1) : Math.floor(count)}
      {suffix !== ".0" ? suffix : ""}
    </span>
  );
}

const stats = [
  { value: 100, suffix: '+', label: 'ลูกค้าที่ไว้วางใจ' },
  { value: 10, suffix: '+', label: 'ปีประสบการณ์' },
  { value: 5, suffix: '', label: 'บริการครบวงจร' },
  { value: 5, suffix: '.0', label: 'คะแนน Google' },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative bg-white overflow-hidden border-b border-gray-100 min-h-[calc(100vh-4rem)] flex items-center">
      {/* Subtle decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2657c1]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10 max-w-6xl w-full">

        {/* Badge */}
        <div className="flex mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2657c1]/6 px-4 py-2 rounded-full text-sm font-semibold border border-[#2657c1]/15 text-[#2657c1]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            IC Accounting &amp; Service — เชียงใหม่
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-14 md:mb-20">

          {/* Left: Big stacked headline */}
          <div>
            <h1 className="text-[clamp(2.8rem,5vw,5rem)] font-black leading-[0.9] tracking-tight text-[#2657c1]">
              <span className="block whitespace-nowrap">สำนักงานบัญชี</span>
              <span className="block text-[#2657c1]/25">เชียงใหม่</span>
            </h1>
          </div>

          {/* Right: Tagline + description + CTAs */}
          <div className="flex flex-col gap-5">
            <p className="text-xl md:text-2xl font-bold text-[#2657c1] leading-snug">
              ครบจบทุกเรื่องหลังบ้านธุรกิจ
            </p>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
              บริการทำบัญชี ภาษี และมีเดียคอนเทนต์ สำหรับธุรกิจในเชียงใหม่และทั่วประเทศ เปลี่ยนตัวเลขที่ซับซ้อน เป็นโอกาสสู่ความสำเร็จ ด้วยประสบการณ์กว่า 10 ปี
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                className="inline-flex items-center gap-3 bg-[#2657c1] text-white font-black px-8 h-12 md:h-14 rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#2657c1]/25 text-sm md:text-base">
                ปรึกษาเราฟรี <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#services"
                className="inline-flex items-center gap-3 border-2 border-[#2657c1]/20 hover:border-[#2657c1]/60 text-[#2657c1]/70 hover:text-[#2657c1] px-8 h-12 md:h-14 rounded-full transition-all text-sm md:text-base">
                <PlayCircle className="h-5 w-5" /> ดูบริการทั้งหมด
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-100 max-w-4xl">
          {stats.map((s, idx) => (
            <div key={`${s.label}-${idx}`} className="text-center md:text-left">
              <div className="text-3xl md:text-5xl font-black text-[#2657c1] mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
