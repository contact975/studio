import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { VisaPageTemplate } from '@/app/visa-work-permit/visa-page-template';
import { visaContent } from '@/app/visa-work-permit/visa-content';
import {
  VISA_TOTAL_FEE,
  VISA_INSTALLMENTS,
  VISA_RENEWAL_FEE,
  VISA_RENEWAL_BREAKDOWN,
  baht,
} from '@/lib/visa-pricing';

/**
 * หน้า Visa & Work Permit ฉบับภาษาอังกฤษ
 *
 * ── ประวัติที่ควรรู้ก่อนแก้ ──
 * หน้านี้เคยแยกเป็นสองภาษามาก่อน แล้วต้องยุบรวมเหลือหน้าเดียว
 * เพราะตอนนั้นไม่ได้ประกาศ hreflang ทำให้ Google มองว่าซ้ำกันแล้วเลือกเก็บหน้าเดียว
 * สัญญาณจึงแตกเป็นสองทางและไม่ชนะสักหน้า
 *
 * ต.ค. 2569 แยกกลับเป็นสองภาษาอีกครั้ง คราวนี้ประกาศ hreflang คู่กันชัดเจน
 * และใช้เทมเพลตเดียวกับหน้าไทย ดีไซน์จึงเหมือนกันทุกจุด ต่างแค่ภาษา
 *
 * markup ทั้งหมดอยู่ใน src/app/visa-work-permit/visa-page-template.tsx
 * ข้อความอยู่ใน visa-content.ts ส่วนไฟล์นี้มีแค่ metadata กับ schema
 */

const TH_URL = 'https://icaccservice.com/visa-work-permit';
const EN_URL = 'https://icaccservice.com/en/visa-work-permit';
const c = visaContent.en;

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
    type: 'website',
    locale: 'en_US',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function VisaWorkPermitEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'Work Permit & Non-B Visa Services in Chiang Mai',
            description:
              'English-speaking accountants in Chiang Mai handling Thai work permits, Non-Immigrant B business visas, company registration, Thai tax and BOI advisory for foreigners living and working in Thailand.',
            path: '/en/visa-work-permit',
            offers: [
              {
                name: 'Non-B visa and work permit — full process',
                price: String(VISA_TOTAL_FEE),
                description: `Service fee including government fees, paid in three installments: ${baht(VISA_INSTALLMENTS.onSubmission)} on submission of the Non-B visa application, ${baht(VISA_INSTALLMENTS.onPermitCollection)} on work permit collection, ${baht(VISA_INSTALLMENTS.onExtension)} at the 12-month extension of stay.`,
              },
              {
                name: 'Annual renewal — visa extension and work permit',
                price: String(VISA_RENEWAL_FEE),
                description: `Per year from the second year: ${baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)} for the 12-month extension of stay and ${baht(VISA_RENEWAL_BREAKDOWN.workPermit)} for the work permit renewal.`,
              },
            ],
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'IC Visa / Work Permit', path: '/en/visa-work-permit' },
          ]),
          faqSchema(c.faq.items.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <VisaPageTemplate c={c} />
    </div>
  );
}
