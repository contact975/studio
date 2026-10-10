import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo';
import { InternshipTemplate } from './internship-template';
import { internshipContent } from './internship-content';

/**
 * หน้านักศึกษาฝึกงาน ฉบับภาษาไทย
 *
 * ── ทำไมถึงมีหน้านี้ ──
 * 1. สถาบันการศึกษาในเชียงใหม่ค้นหาสถานประกอบการรับนักศึกษาฝึกงานทุกปี
 *    หน้านี้ทำให้เราถูกเจอในคำค้นกลุ่มนั้น ซึ่งไม่มีคู่แข่งรายไหนในพื้นที่ทำจริงจัง
 * 2. เป็นแหล่งลิงก์จากเว็บมหาวิทยาลัย ซึ่งเป็นลิงก์ที่มีน้ำหนักและหาได้ยาก
 * 3. แสดงว่าเรามีทีมและระบบที่สอนคนได้ ไม่ใช่สำนักงานคนเดียว (ช่วยเรื่องความน่าเชื่อถือ)
 *
 * ── โครงไฟล์ ──
 * ข้อความอยู่ที่ internship-content.ts markup อยู่ที่ internship-template.tsx
 * ซึ่งหน้าอังกฤษ /en/internship ใช้ร่วมกัน ไฟล์นี้เหลือแค่ metadata กับ schema
 * รายชื่อนักศึกษาอยู่ใน lib/interns.ts
 */

const TH_URL = 'https://icaccservice.com/internship';
const EN_URL = 'https://icaccservice.com/en/internship';
const c = internshipContent.th;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: TH_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: c.meta.title,
    description: c.meta.ogDescription,
    url: TH_URL,
    type: 'website',
    locale: 'th_TH',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function InternshipPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'หน้าแรก', path: '/' },
          { name: 'นักศึกษาฝึกงาน', path: '/internship' },
        ])}
      />
      <InternshipTemplate c={c} basePath="/internship" />
    </div>
  );
}
