'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Google Analytics 4
 *
 * ── ทำไมต้องมี ──
 * ก่อนหน้านี้เว็บไม่มีระบบวัดผลใดๆ เลย เราจึงไม่รู้ว่าคนที่เข้ามาค้นด้วยคำไหน
 * หน้าไหนทำให้เกิดการติดต่อจริง และช่องทางไหน (LINE / โทร / นัดหมาย) ได้ผลที่สุด
 * ซึ่งจำเป็นทั้งกับงาน SEO ตอนนี้ และกับการวัด ROI ตอนเริ่มยิงแอดในอนาคต
 *
 * ── ไม่ฮาร์ดโค้ด ID ──
 * อ่านจาก NEXT_PUBLIC_GA_ID ถ้าไม่ได้ตั้งค่าไว้ component นี้จะไม่เรนเดอร์อะไรเลย
 * (เช่นตอนรันในเครื่อง) จึงไม่มีสคริปต์ให้โหลดและไม่มีข้อมูลทดสอบปนเข้ารายงานจริง
 *
 * ── โหลดตอนไหน ──
 * afterInteractive = โหลดหลังหน้าเว็บพร้อมใช้งานแล้ว ไม่บล็อกการแสดงผล
 * จึงไม่กระทบ Core Web Vitals ซึ่งเป็นปัจจัยจัดอันดับของ Google เอง
 *
 * ── ทำไมต้องส่ง page_view เอง ──
 * Next.js เปลี่ยนหน้าแบบ client-side navigation ไม่ได้โหลดหน้าใหม่ทั้งหน้า
 * gtag จึงนับ page_view ให้แค่ครั้งแรกครั้งเดียว ต้องส่งเองทุกครั้งที่ path เปลี่ยน
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** ส่ง event เข้า GA4 — ถ้ายังไม่ได้ตั้งค่า GA จะไม่ทำอะไร (ไม่ throw) */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params ?? {});
}

function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // ปิด page_view อัตโนมัติ แล้วส่งเองจาก PageViewTracker
          // ไม่งั้นตอนเปลี่ยนหน้าแบบ client-side จะนับไม่ครบ และตอนโหลดครั้งแรกจะนับซ้ำ
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <PageViewTracker />
    </>
  );
}
