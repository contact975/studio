import type { Metadata } from 'next';
import QuoteClient from '@/app/quote/quote-client';
import { quoteCopy } from '@/app/quote/quote-copy';

/**
 * ฟอร์มนัดหมายฉบับภาษาอังกฤษ
 *
 * ── ทำไมหน้านี้สำคัญกว่าหน้าอื่นที่ยังไม่ได้แปล ──
 * หน้าอื่นอ่านไม่ออกยังพอเดาได้จากตัวเลขและรูป แต่ฟอร์มที่ต้องเลือกและพิมพ์
 * ถ้าอ่านไม่ออกคือเดินต่อไม่ได้เลย ก่อนหน้านี้ชาวต่างชาติที่อ่านหน้า visa
 * ภาษาอังกฤษจนจบแล้วกดปุ่ม Book a free consultation จะเด้งมาเจอฟอร์มไทยทั้งหน้า
 * ซึ่งเป็นจุดที่เสียลูกค้าที่พร้อมติดต่อแล้วจริงๆ
 *
 * ── ใช้คอมโพเนนต์เดียวกับหน้าไทย ──
 * ตรรกะฟอร์ม การตรวจข้อมูล และการยิง API เป็นชุดเดียวกัน ต่างแค่ข้อความ
 * ค่าที่ส่งไป API ยังเป็นภาษาไทยเสมอ (ดูคอมเมนต์ใน booking-options.ts)
 */

const TH_URL = 'https://icaccservice.com/quote';
const EN_URL = 'https://icaccservice.com/en/quote';

export const metadata: Metadata = {
  title: 'Book a Free Consultation | IC Accounting & Service Chiang Mai',
  description:
    'Book a free consultation with our English-speaking team in Chiang Mai — accounting, tax, company registration, work permits and visas. No cost, no obligation.',
  alternates: {
    canonical: EN_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: 'Book a Free Consultation | IC Accounting & Service Chiang Mai',
    description:
      'Book a free consultation with our English-speaking team in Chiang Mai — accounting, tax, company registration, work permits and visas.',
    url: EN_URL,
    locale: 'en_US',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function QuotePageEnglish() {
  return <QuoteClient copy={quoteCopy.en} basePath="/en/quote" />;
}
