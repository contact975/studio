'use client';

import * as React from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
    }
  }
}

const stats = [
  { num: '100+', label: 'ลูกค้าที่ไว้วางใจ' },
  { num: '10+', label: 'ปีประสบการณ์' },
  { num: '5', label: 'บริการครบวงจร' },
  { num: '5.0', label: 'คะแนน Google' },
];

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="relative animate-gradient text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10 max-w-6xl">

        {/* Label */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            IC Accounting & Service — เชียงใหม่
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-center leading-[0.95] tracking-tight mb-4">
          <span className="block text-white">สำนักงานบัญชีเชียงใหม่</span>
          <span className="block text-white/40 text-4xl md:text-5xl font-black mt-3">ครบจบทุกเรื่อง หลังบ้านธุรกิจ</span>
        </h1>

        {/* Sub */}
        <p className="text-center text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          บริการทำบัญชี ภาษี และมีเดียคอนเทนต์ สำหรับธุรกิจในเชียงใหม่และทั่วประเทศ เปลี่ยนตัวเลขที่ซับซ้อน เป็นโอกาสสู่ความสำเร็จ ด้วยประสบการณ์กว่า 10 ปี
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
            className="inline-flex items-center gap-3 bg-white text-blue-900 font-black px-8 h-14 rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20 text-base">
            ปรึกษาเราฟรี <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#services"
            className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-white/60 text-white/80 hover:text-white px-8 h-14 rounded-full transition-all text-base">
            <PlayCircle className="h-5 w-5" /> ดูบริการทั้งหมด
          </Link>
        </div>

        {/* Video — lazy load เมื่อ user scroll มาถึงเท่านั้น */}
        <div
          className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-10 bg-black/20"
          suppressHydrationWarning
        >
          {isMounted ? (
            <React.Fragment>
              <style dangerouslySetInnerHTML={{
                __html: `wistia-player[media-id='hd04a418nd']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/hd04a418nd/swatch');display:block;filter:blur(5px);padding-top:56.25%}`
              }} />
              <wistia-player
                media-id="hd04a418nd"
                aspect="1.7777777777777777"
                muted="false"
                autoplay="false"
                style={{ width: '100%', height: '100%', display: 'block' }}
              ></wistia-player>
            </React.Fragment>
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              <span className="text-white/20 text-sm">Loading Video...</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-1">{s.num}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}