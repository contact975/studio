import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/seo';
import { HomeTemplate } from '@/components/landing/home-template';
import { homeContent } from '@/components/landing/home-content';

/**
 * หน้าแรก ฉบับภาษาไทย
 *
 * ข้อความอยู่ที่ components/landing/home-content.ts markup อยู่ที่ home-template.tsx
 * ซึ่งหน้าอังกฤษ /en ใช้ร่วมกัน
 *
 * ── metadata ──
 * เดิมหน้านี้เป็น 'use client' ทั้งหน้า จึงใช้ title/description/canonical จาก app/layout.tsx
 * ตอนนี้ประกาศเองเพื่อเพิ่ม hreflang คู่กับ /en ค่าที่เหลือต้องเหมือนของ layout ทุกตัวอักษร
 * openGraph ของหน้าลูกแทนที่ของ layout ทั้งก้อน จึงต้องใส่ siteName / รูป / type ซ้ำ
 *
 * ── FAQPage ──
 * ย้ายมาจาก app/layout.tsx เพราะคำถามชุดนี้แสดงอยู่บนหน้าแรกหน้าเดียว
 * (ข้อกำหนดของ Google: เนื้อหา FAQ ต้องให้ผู้ใช้เห็นบนหน้านั้น)
 * คำถามใน faqSchema ทุกข้อแสดงอยู่จริงใน <FaqSection />
 */

const TH_URL = 'https://icaccservice.com';
const EN_URL = 'https://icaccservice.com/en';
const c = homeContent.th;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: TH_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: TH_URL,
    siteName: 'IC Accounting & Service',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630, alt: c.meta.ogImageAlt }],
    locale: 'th_TH',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(c.faqSchema)} />
      <HomeTemplate c={c} />
    </>
  );
}
