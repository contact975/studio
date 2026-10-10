'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Calculator, X } from 'lucide-react';
import { trackEvent } from '@/components/analytics/google-analytics';
import { isEnglishPath } from '@/lib/i18n-routes';

/**
 * ปุ่มลอยมุมขวาจอ พาไปเครื่องคำนวณภาษี /tax-calculator
 *
 * ── ทำไมเป็น <a> ไม่ใช่ next/link ──
 * ปลายทางเป็น HTML ล้วนใน public/ ไม่ใช่หน้าใน App Router
 * ถ้าใช้ Link แล้ว Next จะ prefetch หน้าที่ไม่มีใน route manifest แล้ว 404 ใน console
 *
 * ── ทำไมปิดได้ ──
 * ปุ่มลอยทับเนื้อหาเสมอ โดยเฉพาะบนมือถือที่ทับปุ่มในหน้าอื่น
 * คนที่ไม่สนใจต้องปิดทิ้งได้ ไม่ใช่ทนไปทั้งเว็บ
 * จำไว้ใน sessionStorage ไม่ใช่ localStorage เพราะถ้าจำถาวร
 * คนที่เผลอกดปิดวันนี้จะไม่เห็นเครื่องมือนี้อีกเลย
 */

const HREF = '/tax-calculator';
const DISMISS_KEY = 'ic-tax-bubble-dismissed';

/**
 * เครื่องคำนวณภาษียังเป็นภาษาไทยอย่างเดียว ป้ายฝั่งอังกฤษจึงบอกไว้ตรงๆ
 * คนกดจะได้ไม่งงว่าทำไมเปิดมาเป็นภาษาไทย
 */
const COPY = {
  th: { aria: 'เปิดโปรแกรมคำนวณภาษีเงินได้บุคคลธรรมดา', title: 'คำนวณภาษี', sub: 'ฟรี รู้ผลทันที', hide: 'ซ่อนปุ่มคำนวณภาษี' },
  en: { aria: 'Open the Thai personal income tax calculator (in Thai)', title: 'Tax calculator', sub: 'Free · in Thai', hide: 'Hide the tax calculator button' },
} as const;

export function TaxCalculatorBubble() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // เริ่มต้นซ่อนไว้ก่อน แล้วค่อยเปิดฝั่ง client
    // กัน hydration mismatch เพราะฝั่ง server อ่าน sessionStorage ไม่ได้
    try {
      setHidden(sessionStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      // โหมดส่วนตัวของบางเบราว์เซอร์โยน error ตอนอ่าน storage — ถือว่ายังไม่เคยปิด
      setHidden(false);
    }
  }, []);

  const c = COPY[isEnglishPath(pathname) ? 'en' : 'th'];

  // ไม่ต้องโผล่บนหน้าจองคิว ผู้ใช้กำลังกรอกฟอร์มอยู่แล้ว
  if (pathname === '/quote' || pathname === '/en/quote' || hidden) return null;

  function dismiss() {
    setHidden(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ปิดได้ในหน้านี้ก็พอ ไม่ต้องจำข้ามหน้า
    }
  }

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex items-center gap-2">
      <a
        href={HREF}
        onClick={() => trackEvent('tax_calculator_open', { page_path: pathname })}
        aria-label={c.aria}
        className="group flex items-center gap-3 rounded-full bg-[#2657c1] pl-4 pr-5 py-3 text-white shadow-[0_8px_24px_rgba(38,87,193,0.35)] transition hover:bg-[#1e47a3] hover:shadow-[0_10px_30px_rgba(38,87,193,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2657c1]"
      >
        <Calculator className="h-6 w-6 flex-shrink-0" />
        <span className="flex flex-col leading-tight text-left">
          <span className="font-black text-[15px]">{c.title}</span>
          <span className="text-[11px] text-white/75">{c.sub}</span>
        </span>
      </a>

      <button
        type="button"
        onClick={dismiss}
        aria-label={c.hide}
        className="h-7 w-7 flex-shrink-0 rounded-full bg-white text-[#44527a] border border-border shadow-sm grid place-items-center transition hover:bg-secondary"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
