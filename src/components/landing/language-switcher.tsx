'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PAIRS, EN_HOME, isEnglishPath } from '@/lib/i18n-routes';

/**
 * ปุ่มสลับภาษา TH / EN — แสดงทุกหน้า
 *
 * ── ทำไมต้องมีทุกหน้า ──
 * เดิมปุ่มซ่อนตัวเองเมื่อหน้านั้นยังไม่มีฉบับภาษาอังกฤษ เพื่อกันพาไป 404
 * ผลข้างเคียงคือโผล่แค่หน้าเดียวทั้งเว็บ ชาวต่างชาติที่เข้ามาทางหน้าแรก
 * หรือจาก Google Maps จึงไม่มีทางรู้เลยว่าเว็บนี้มีภาษาอังกฤษ
 *
 * ── แล้วหน้าที่ยังไม่มีคู่ภาษาจะไปไหน ──
 * ไปหน้าแรกภาษาอังกฤษ /en ไม่ใช่ 404 (เช่นบทความ ซึ่งตกลงกันว่าจะไม่แปล)
 * คู่ URL ทั้งหมดอยู่ที่ lib/i18n-routes.ts แปลหน้าไหนเสร็จ เพิ่มคู่ที่นั่นที่เดียว
 *
 * ── ข้อห้ามที่ยังยืนเหมือนเดิม ──
 * ห้ามเด้งอัตโนมัติตามภาษาเบราว์เซอร์หรือ IP เด็ดขาด
 * Googlebot เข้ามาจากอเมริกา ถ้าเด้งทุกคนที่มาจากต่างประเทศไปหน้าอังกฤษ
 * Googlebot จะเห็นแต่หน้าอังกฤษ แล้วค่อยๆ ถอดหน้าไทยออกจากดัชนี
 * อันดับคำไทยที่สะสมมาจะหายโดยเจ้าของเว็บไม่รู้ตัว เพราะเปิดเองในไทยก็เห็นปกติ
 */

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() || '/';
  const isEnglish = isEnglishPath(pathname);

  // หาคู่ของหน้าปัจจุบันในอีกภาษาหนึ่ง
  let thaiHref = '/';
  let englishHref = EN_HOME;

  if (isEnglish) {
    const match = Object.entries(PAIRS).find(([, en]) => en === pathname);
    thaiHref = match ? match[0] : '/';
    englishHref = pathname;
  } else {
    thaiHref = pathname;
    englishHref = PAIRS[pathname] ?? EN_HOME;
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-border overflow-hidden text-xs font-bold',
        className,
      )}
    >
      <Link
        href={thaiHref}
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
        href={englishHref}
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
