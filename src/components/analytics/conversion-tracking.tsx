'use client';

import { useEffect } from 'react';
import { trackEvent } from './google-analytics';

/**
 * ติดตามการกดช่องทางติดต่อทั้งเว็บ ด้วย listener ตัวเดียว
 *
 * ── ทำไมไม่ไปแก้ทีละปุ่ม ──
 * ปุ่ม LINE / โทร / นัดหมาย กระจายอยู่ใน header, footer, hero, การ์ดราคา,
 * ท้ายบทความ และหน้าบริการทั้ง 6 หน้า รวมแล้วหลายสิบจุด การไปใส่ onClick
 * ทีละจุดแปลว่าปุ่มใหม่ที่เพิ่มทีหลังจะถูกลืมเสมอ
 *
 * วิธีนี้ดักที่ document ชั้นเดียว แล้วดูจาก href ของลิงก์ที่ถูกกด
 * ปุ่มใหม่ที่ลิงก์ไป LINE หรือ tel: จึงถูกนับอัตโนมัติโดยไม่ต้องแก้อะไรเพิ่ม
 *
 * ── ทำไมใช้ capture: true ──
 * บางปุ่มเรียก preventDefault หรือปิด sheet ก่อน event จะ bubble ถึง document
 * การดักตอน capture จึงได้ครบกว่า
 *
 * ── ชื่อ event ──
 * ใช้ contact_click ตัวเดียวแล้วแยกด้วยพารามิเตอร์ method
 * จะได้ดูภาพรวมได้ว่า "มีคนติดต่อกี่ครั้ง" และเจาะดูรายช่องทางได้ในรายงานเดียว
 * ส่วนการจองนัดหมายที่ส่งฟอร์มสำเร็จใช้ generate_lead ซึ่งเป็นชื่อมาตรฐานของ GA4
 * (ตั้งเป็น key event ใน GA4 ได้เลย และส่งต่อไปวัดผลแอดได้ในอนาคต)
 */

type Method = 'line' | 'phone' | 'email' | 'quote' | 'facebook' | 'map';

function methodFromHref(href: string): Method | null {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('line.me')) return 'line';
  if (href.includes('facebook.com')) return 'facebook';
  if (href.includes('maps.google.com') || href.includes('google.com/maps')) return 'map';
  // นับเฉพาะการกดเข้าหน้านัดหมาย ไม่นับตอนอยู่ในหน้านั้นแล้ว
  if (/\/quote(\?|#|$)/.test(href) && !window.location.pathname.startsWith('/quote')) return 'quote';
  return null;
}

export function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const method = methodFromHref(href);
      if (!method) return;

      trackEvent('contact_click', {
        method,
        link_text: (anchor.textContent ?? '').trim().slice(0, 80),
        page_path: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
