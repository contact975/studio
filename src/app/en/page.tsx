import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/seo';
import { HomeTemplate } from '@/components/landing/home-template';
import { homeContent } from '@/components/landing/home-content';

/**
 * หน้าแรก ฉบับภาษาอังกฤษ /en
 *
 * เดิมเป็นหน้ารวมภาษาอังกฤษที่ออกแบบแยกเอง (ไม่ใช่คำแปลของหน้าแรก จึงไม่ได้ประกาศ hreflang คู่กัน)
 * ตอนนี้เปลี่ยนเป็นคำแปลของหน้าแรกจริง ใช้ home-template.tsx ชุดเดียวกับหน้าไทย
 * ต่างแค่ข้อความใน home-content.ts จึงประกาศ hreflang คู่กับ / ได้แล้ว
 *
 * ลิงก์ในหน้านี้ชี้ไปหน้า /en/* ทั้งหมด (กำหนดไว้ใน home-content.ts)
 */

const TH_URL = 'https://icaccservice.com';
const EN_URL = 'https://icaccservice.com/en';
const c = homeContent.en;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: EN_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: EN_URL,
    siteName: 'IC Accounting & Service',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630, alt: c.meta.ogImageAlt }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishHome() {
  return (
    <>
      <JsonLd data={faqSchema(c.faqSchema)} />
      <HomeTemplate c={c} lang="en" />
    </>
  );
}
