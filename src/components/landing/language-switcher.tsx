'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * ปุ่มสลับภาษา TH / EN
 *
 * ── หลักที่ยึด ──
 * 1. ต้องพาไปหน้าเดียวกันในอีกภาษา ไม่ใช่เด้งกลับหน้าแรก
 *    คนที่กำลังอ่านเรื่อง work permit แล้วกด EN ควรได้หน้า work permit ภาษาอังกฤษ
 *    ถ้าเด้งกลับหน้าแรกเขาต้องหาใหม่เองทั้งหมด ซึ่งคนส่วนใหญ่จะเลิกอ่านไปเลย
 *
 * 2. หน้าไหนยังไม่มีฉบับอังกฤษ ให้ซ่อนปุ่มไปเลย ไม่ใช่โชว์แล้วพาไป 404
 *    ตอนนี้มีแค่หน้า visa ที่ทำครบสองภาษา จึงประกาศไว้ใน TRANSLATED_PAGES
 *    เพิ่มหน้าใหม่เมื่อไหร่ ค่อยเติมในรายการนี้
 *
 * 3. ห้ามเด้งอัตโนมัติตามภาษาเบราว์เซอร์หรือ IP เด็ดขาด
 *    Googlebot เข้ามาจากอเมริกา ถ้าเด้งทุกคนที่มาจากต่างประเทศไปหน้าอังกฤษ
 *    Googlebot จะเห็นแต่หน้าอังกฤษ แล้วค่อยๆ ถอดหน้าไทยออกจากดัชนี
 *    อันดับคำไทยที่สะสมมาจะหายโดยที่เจ้าของเว็บไม่รู้ตัว เพราะเปิดเองในไทยก็เห็นปกติ
 *
 * 4. ใส่ hrefLang ที่ลิงก์ เพื่อบอกเครื่องมือค้นหาและโปรแกรมอ่านหน้าจอ
 *    ว่าปลายทางเป็นคนละภาษากับหน้าปัจจุบัน
 */

/** พาธภาษาไทยที่มีฉบับอังกฤษแล้ว — ฝั่งอังกฤษคือพาธเดียวกันแต่มี /en นำหน้า */
const TRANSLATED_PAGES = ['/visa-work-permit'];

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() || '/';

  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const thaiPath = isEnglish ? pathname.replace(/^\/en/, '') || '/' : pathname;

  // ไม่มีคู่ภาษาของหน้านี้ ก็ไม่ต้องมีปุ่มให้กดไปเจอหน้าที่ไม่มีอยู่
  if (!TRANSLATED_PAGES.includes(thaiPath)) return null;

  const englishPath = `/en${thaiPath}`;

  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-border overflow-hidden text-xs font-bold',
        className,
      )}
    >
      <Link
        href={thaiPath}
        hrefLang="th"
        aria-current={!isEnglish ? 'page' : undefined}
        className={cn(
          'px-3 py-1.5 transition',
          !isEnglish ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-primary',
        )}
      >
        ไทย
      </Link>
      <Link
        href={englishPath}
        hrefLang="en"
        aria-current={isEnglish ? 'page' : undefined}
        className={cn(
          'px-3 py-1.5 transition',
          isEnglish ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-primary',
        )}
      >
        EN
      </Link>
    </div>
  );
}
