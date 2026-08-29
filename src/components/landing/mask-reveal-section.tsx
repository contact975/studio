'use client';

import * as React from 'react';

// React 19 ย้าย JSX namespace เข้าไปอยู่ใน module 'react' แล้ว
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
    }
  }
}

/**
 * เอฟเฟกต์เลื่อนแล้วช่องมองค่อยๆ เปิดออกเผยวิดีโอเบื้องหลัง
 *
 * ── ทำไมไม่ใช้ GSAP ──
 * ต้นฉบับที่เอามาอ้างอิงใช้ gsap + ScrollTrigger ซึ่งวัดแล้วหนัก 45 KB gzip
 * (gsap 27.8 + ScrollTrigger 17.6) บนหน้าแรกที่มี First Load JS 170 KB อยู่แล้ว
 *
 * แต่เอฟเฟกต์นี้มีแค่สองส่วนจริงๆ คือ
 *   1. ตรึงหน้าจอ  -> position: sticky ของ CSS ทำได้เอง ไม่ต้องมีไลบรารี
 *   2. หา progress -> getBoundingClientRect() ใน scroll handler ที่ throttle ด้วย rAF
 * จึงเขียนเองได้ในไม่กี่สิบบรรทัด โดยไม่เพิ่ม dependency สักตัว
 *
 * ── ข้อควรระวังเรื่องประสิทธิภาพ ──
 * mask-size ไม่ใช่คุณสมบัติที่ GPU จัดการให้ เบราว์เซอร์ต้องวาดใหม่ทุกเฟรม
 * บนมือถือกลางๆ จะกระตุก จึงปิดเอฟเฟกต์บนจอเล็กด้วย CSS ล้วน (ไม่ใช่ JS)
 * เพื่อไม่ให้เกิด hydration mismatch และไม่มีการกระโดดของ layout หลังโหลด
 *
 * ── สิ่งที่ยังอยู่ครบเหมือนเดิม ──
 * หัวข้อและคำบรรยายอยู่ใน HTML ตั้งแต่ server render (Google อ่านได้)
 * และวิดีโอแนะนำทีมงานบน Wistia ยังโหลดแบบกดแล้วค่อยเล่นเหมือนเดิม
 */

/** ช่องมองรูปสี่เหลี่ยมมุมมน — เข้ากับ rounded-2xl ที่ใช้ทั้งเว็บ */
const APERTURE_MASK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><rect x="0" y="0" width="160" height="90" rx="14" ry="14" fill="black"/></svg>'
)}`;

/**
 * ความกว้างช่องมองตอนเริ่ม
 *
 * ตอนแรกตั้งไว้ 320px ตามต้นฉบับที่เป็นเอฟเฟกต์รูเล็กๆ กลางจอ
 * แต่คลิปของ IC เป็นโชว์รีลที่มีตัวหนังสือและโลโก้อยู่ในภาพตลอด
 * ช่องมองเล็กจะตัดคำกลางคำและโชว์ลายน้ำมุมขวาล่างลอยอยู่กลางรู
 *
 * จึงเริ่มที่กรอบ 16:9 ขนาดพอดีอ่านออก แล้วค่อยขยายจนเต็มจอ
 * ได้เอฟเฟกต์ "วิดีโอค่อยๆ ขยายเข้ามาหาเรา" ที่เคารพตัวคลิปเอง
 */
const startWidth = () =>
  Math.min(typeof window === 'undefined' ? 760 : window.innerWidth * 0.62, 760);

const WISTIA_MEDIA_ID = 'hd04a418nd';
const WISTIA_POSTER = `https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch`;

export interface MaskRevealSectionProps {
  /** คลิปสั้นแบบไม่มีเสียงสำหรับฉากหลัง — ถ้าไม่ใส่จะใช้ภาพนิ่งแทน */
  videoSrc?: string;
  posterSrc?: string;
  /** SVG แบบ data URI ใช้เป็นรูปทรงช่องมอง เปลี่ยนเป็นโลโก้ได้ภายหลัง */
  maskSrc?: string;
}

export function MaskRevealSection({
  videoSrc = '/videos/ic-showreel.mp4',
  posterSrc = '/videos/ic-showreel-poster.jpg',
  maskSrc = APERTURE_MASK,
}: MaskRevealSectionProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const maskRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const loadPlayerScript = React.useCallback(() => {
    if (document.querySelector('script[src*="fast.wistia.com/player.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://fast.wistia.com/player.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);

  /* ── ขับเคลื่อนขนาดช่องมองตามระยะเลื่อน ── */
  React.useEffect(() => {
    const track = trackRef.current;
    const mask = maskRef.current;
    if (!track || !mask) return;

    // จอเล็กไม่ต้องคำนวณอะไรเลย ปล่อยให้ CSS แสดงเป็นการ์ดปกติ
    const mq = window.matchMedia('(min-width: 768px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      // เดิมยกกำลัง 2.3 ทำให้ช่วงแรกแทบไม่ขยับเลย ดูเหมือนค้าง
      // 1.6 ให้เริ่มขยับเห็นได้ตั้งแต่ต้น แล้วค่อยเร่งตอนท้าย
      const eased = Math.pow(progress, 1.6);
      // ขยายจนเกินเส้นทแยงมุมจอ เพื่อให้เปิดเต็มจริงทุกอัตราส่วนหน้าจอ
      const span = Math.hypot(window.innerWidth, window.innerHeight) * 2.2;
      mask.style.setProperty('--aperture', `${startWidth() + eased * span}px`);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = window.requestAnimationFrame(apply);
    };

    const enable = () => {
      if (!mq.matches || reduce.matches) {
        // ไม่ทำเอฟเฟกต์ — เปิดช่องมองสุดไว้เลย จะได้เห็นวิดีโอเต็มภาพ
        mask.style.setProperty('--aperture', '400vmax');
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        return;
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      apply();
    };

    enable();
    mq.addEventListener('change', enable);
    reduce.addEventListener('change', enable);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', enable);
      reduce.removeEventListener('change', enable);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  /* ── โหลดคลิปฉากหลังเมื่อเลื่อนมาใกล้ และเคารพโหมดประหยัดเน็ต ── */
  React.useEffect(() => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track || !videoSrc) return;

    const conn = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        video.src = videoSrc;
        video.load();
        video.play().catch(() => {
          /* บางเบราว์เซอร์ปฏิเสธ autoplay — ปล่อยให้เป็นภาพ poster ไป */
        });
      },
      { rootMargin: '400px 0px' }
    );

    io.observe(track);
    return () => io.disconnect();
  }, [videoSrc]);

  /* ── preload สคริปต์ Wistia ตอนเลื่อนมาใกล้ (เหมือนเดิม) ── */
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const conn = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
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

    io.observe(track);
    return () => io.disconnect();
  }, [loadPlayerScript]);

  const handlePlay = React.useCallback(() => {
    loadPlayerScript();
    setIsPlaying(true);
  }, [loadPlayerScript]);

  /**
   * พอผู้ใช้กดดูวิดีโอจริง ต้องหยุดคลิปฉากหลังด้วย
   *
   * ไม่งั้นจะมีวิดีโอเล่นพร้อมกันสองตัวซ้อนกันอยู่บนหน้าจอเดียว
   * ตัวฉากหลังยังวิ่งอยู่หลังการ์ด Wistia ทั้งกวนสายตาและกินทรัพยากรเปล่า
   */
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else if (video.src) video.play().catch(() => {});
  }, [isPlaying]);

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `url("${maskSrc}")`,
    maskImage: `url("${maskSrc}")`,
    WebkitMaskPosition: '50% 50%',
    maskPosition: '50% 50%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'var(--aperture, min(62vw, 760px))',
    maskSize: 'var(--aperture, min(62vw, 760px))',
  };

  return (
    <section className="relative bg-[#050d1f]" aria-label="รู้จัก IC Accounting">
      {/*
        ตัวจับระยะเลื่อน สูง 150vh บนจอใหญ่ (ต้นฉบับใช้ 360vh ซึ่งดันเนื้อหาจริง
        ลงไปเกือบสี่หน้าจอ) ส่วนจอเล็กสูงเท่าเนื้อหา ไม่มีการตรึงหน้าจอ
      */}
      <div ref={trackRef} className="relative w-full md:min-h-[150vh]">
        <div className="relative md:sticky md:top-0 w-full md:h-screen overflow-hidden flex items-center justify-center py-16 md:py-0">

          {/* ชั้นวิดีโอที่ถูกครอบด้วยช่องมอง */}
          <div
            className={`absolute inset-0 hidden md:block transition-opacity duration-500 ${
              isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            <div ref={maskRef} className="w-full h-full" style={maskStyle}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover bg-black"
                poster={posterSrc}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          </div>

          {/* ไล่สีทับให้ตัวหนังสืออ่านออกตลอดไม่ว่าช่องมองจะเปิดแค่ไหน */}
          <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_bottom,rgba(5,13,31,0.92)_0%,rgba(5,13,31,0.35)_22%,rgba(5,13,31,0)_42%,rgba(5,13,31,0)_58%,rgba(5,13,31,0.35)_78%,rgba(5,13,31,0.92)_100%)] pointer-events-none" />

          {/*
            เดิมวางข้อความไว้กลางจอ ซึ่งไปทับโลโก้และตัวหนังสือที่อยู่ในคลิปเอง
            จนอ่านไม่ออกทั้งสองฝั่ง ย้ายหัวข้อขึ้นบนและปุ่มลงล่าง
            เว้นกลางจอให้เป็นของวิดีโอล้วนๆ
          */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-between text-center px-4 py-10 md:py-14">

            <div className="max-w-2xl">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 border border-blue-300/30 px-4 py-1.5 rounded-full bg-[#050d1f]/70 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  รู้จัก IC Accounting
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 [text-shadow:0_2px_20px_rgba(5,13,31,0.95)]">
                สำนักงานบัญชีที่<span className="text-blue-300">ดูแลคุณครบวงจร</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base [text-shadow:0_2px_14px_rgba(5,13,31,0.95)]">
                ดูวิดีโอสั้นๆ เพื่อทำความรู้จักกับทีมงานและบริการของเรา
              </p>
            </div>

            {/* บนมือถือไม่มีเอฟเฟกต์ จึงโชว์ภาพนิ่งเป็นการ์ดแทน ไม่ให้เป็นบล็อกดำเปล่า */}
            <div className={`w-full max-w-md my-8 ${isPlaying ? 'hidden' : 'md:hidden'}`}>
              <img
                src={posterSrc}
                alt="ทีมงาน IC Accounting & Service เชียงใหม่"
                width={1280}
                height={720}
                loading="lazy"
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>

            <div className="w-full max-w-3xl">
              {isPlaying ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(22,54,116,0.35)] bg-black">
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined){background:center/contain no-repeat url('${WISTIA_POSTER}');display:block;filter:blur(5px);padding-top:56.25%;}`,
                    }}
                  />
                  <wistia-player
                    media-id={WISTIA_MEDIA_ID}
                    aspect="1.7777777777777777"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    autoplay="true"
                  ></wistia-player>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="group inline-flex items-center gap-3 bg-white/95 hover:bg-white text-[#163674] font-bold pl-4 pr-7 py-3 rounded-full shadow-2xl ring-4 ring-[#050d1f]/40 hover:ring-white/35 transition-all"
                >
                  <span className="w-10 h-10 rounded-full bg-[#163674] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  ดูวิดีโอแนะนำทีมงาน
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
