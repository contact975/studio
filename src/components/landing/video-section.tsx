'use client';

import * as React from "react";

// React 19 ย้าย JSX namespace เข้าไปอยู่ใน module 'react' แล้ว
// การ declare global namespace JSX แบบเดิมจึงไม่มีผล ทำให้ <wistia-player> ขึ้น type error
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
    }
  }
}

export function VideoSection() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  /** โหลด player.js แบบ idempotent — เรียกซ้ำได้ไม่โหลดซ้ำ */
  const loadPlayerScript = React.useCallback(() => {
    if (document.querySelector('script[src*="fast.wistia.com/player.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://fast.wistia.com/player.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);

  /**
   * Preload: พอเลื่อนมาใกล้ section (ก่อนถึงจริง 300px) ให้ดึง player.js มารอไว้
   * แต่ยังไม่สร้าง <wistia-player> จึง "ไม่มีการโหลดตัววิดีโอ" — คนที่ไม่กดดู
   * เสียแค่ไฟล์ script ไม่ใช่วิดีโอหลาย MB
   *
   * เมื่อผู้ใช้กดเล่น script พร้อมอยู่แล้ว วิดีโอจึงเริ่มได้แทบจะทันที
   */
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    // เคารพผู้ใช้ที่เปิดโหมดประหยัดเน็ต หรือเน็ตช้ามาก — ข้าม preload ไปเลย
    const conn = (navigator as any).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        /**
         * รอให้ main thread ว่างก่อน จะได้ไม่ไปแย่งจังหวะที่ผู้ใช้กำลังเลื่อน
         *
         * ⚠️ ต้องใส่ timeout ด้วย: หน้าแรกของเว็บนี้มี AOS animate หลายสิบชิ้น
         * main thread แทบไม่เคยว่างเลย ทำให้ requestIdleCallback แบบไม่มี timeout
         * ไม่ถูกเรียกสักที (ทดสอบบนเว็บจริงแล้ว preload ไม่ทำงานเพราะสาเหตุนี้)
         * ใส่ timeout 2 วินาที = ถ้าไม่ว่างจริงๆ เบราว์เซอร์จะบังคับรันให้
         */
        const w = window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        };
        if (typeof w.requestIdleCallback === 'function') {
          w.requestIdleCallback(loadPlayerScript, { timeout: 2000 });
        } else {
          window.setTimeout(loadPlayerScript, 500);
        }
      },
      { rootMargin: '300px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadPlayerScript]);

  const handlePlay = React.useCallback(() => {
    loadPlayerScript(); // เผื่อกรณี preload ไม่ทำงาน (save-data / เบราว์เซอร์เก่า)
    setIsPlaying(true);
  }, [loadPlayerScript]);

  return (
    <section ref={sectionRef} className="relative bg-[#050d1f] py-16 md:py-24 overflow-hidden">
      {/* Subtle gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      {/* Radial glow behind video */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(22,54,116,0.18),transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        {/* Label */}
        <div className="flex justify-center mb-5" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400/80 border border-blue-400/25 px-4 py-1.5 rounded-full bg-blue-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            รู้จัก IC Accounting
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-black text-white text-center leading-tight mb-3" data-aos="fade-up" data-aos-delay="50">
          สำนักงานบัญชีที่<span className="text-blue-400">ดูแลคุณครบวงจร</span>
        </h2>
        <p className="text-white/50 text-center text-sm md:text-base max-w-xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="100">
          ดูวิดีโอสั้นๆ เพื่อทำความรู้จักกับทีมงานและบริการของเรา
        </p>

        {/* Video Player */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(22,54,116,0.35)] border border-white/10 bg-black/30"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          {isPlaying ? (
            <>
              <style dangerouslySetInnerHTML={{ __html: `
                wistia-player[media-id='hd04a418nd']:not(:defined) {
                  background: center/contain no-repeat url('https://fast.wistia.com/embed/medias/hd04a418nd/swatch');
                  display: block;
                  filter: blur(5px);
                  padding-top: 56.25%;
                }
              `}} />
              <wistia-player
                media-id="hd04a418nd"
                aspect="1.7777777777777777"
                style={{ width: '100%', height: '100%', display: 'block' }}
                autoplay="true"
              ></wistia-player>
            </>
          ) : (
            <div
              className="relative w-full h-full bg-slate-900 cursor-pointer group"
              style={{
                backgroundImage: `url('https://fast.wistia.com/embed/medias/hd04a418nd/swatch')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={isMounted ? handlePlay : undefined}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-300" />

              {/* Play button + label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 ring-4 ring-white/20 group-hover:ring-white/40">
                  <svg
                    className="w-9 h-9 md:w-11 md:h-11 text-[#163674] ml-1.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white text-sm md:text-base font-semibold drop-shadow-lg tracking-wide">
                  กดเพื่อดูวิดีโอ
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Subtle gradient bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </section>
  );
}
