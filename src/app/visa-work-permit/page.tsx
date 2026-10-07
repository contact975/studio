import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { VisaPageTemplate } from './visa-page-template';
import { visaContent } from './visa-content';
import {
  VISA_TOTAL_FEE,
  VISA_INSTALLMENTS,
  VISA_RENEWAL_FEE,
  VISA_RENEWAL_BREAKDOWN,
  baht,
} from '@/lib/visa-pricing';

/**
 * หน้า Visa & Work Permit ฉบับภาษาไทย
 *
 * ไฟล์นี้มีแค่ metadata กับ schema ส่วน markup ทั้งหมดอยู่ใน visa-page-template.tsx
 * ซึ่งหน้าอังกฤษที่ /en/visa-work-permit ใช้ไฟล์เดียวกัน
 * ดีไซน์ของสองภาษาจึงต่างกันไม่ได้ ต่างกันแค่ข้อความใน visa-content.ts
 */

const TH_URL = 'https://icaccservice.com/visa-work-permit';
const EN_URL = 'https://icaccservice.com/en/visa-work-permit';
const c = visaContent.th;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  /**
   * ประกาศคู่ภาษาให้ชี้หากันไปกลับกับหน้าอังกฤษ
   * ถ้าฝั่งใดฝั่งหนึ่งไม่ประกาศ Google จะไม่เชื่อ hreflang ทั้งคู่
   * x-default ชี้มาหน้าไทย เพราะเป็นภาษาหลักของเว็บ
   */
  alternates: {
    canonical: TH_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: TH_URL,
    type: 'website',
    locale: 'th_TH',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function VisaWorkPermitThaiPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'บริการขอใบอนุญาตทำงานและวีซ่า Non-B เชียงใหม่',
            description:
              'รับดำเนินการขอใบอนุญาตทำงานและวีซ่า Non-Immigrant B ให้ชาวต่างชาติ สำหรับนายจ้างและผู้ประกอบการในเชียงใหม่ ดูแลบัญชีและภาษีของบริษัทควบคู่กัน',
            path: '/visa-work-permit',
            offers: [
              {
                name: 'ขอใบอนุญาตทำงานและวีซ่า Non-B ครบกระบวนการ',
                price: String(VISA_TOTAL_FEE),
                description: `รวมค่าธรรมเนียมราชการ แบ่งชำระ 3 งวด: ${baht(VISA_INSTALLMENTS.onSubmission)} ตอนยื่นขอวีซ่า, ${baht(VISA_INSTALLMENTS.onPermitCollection)} วันรับใบอนุญาตทำงาน, ${baht(VISA_INSTALLMENTS.onExtension)} ตอนขออยู่ต่อ 12 เดือน`,
              },
              {
                name: 'ต่ออายุรายปี วีซ่าและใบอนุญาตทำงาน',
                price: String(VISA_RENEWAL_FEE),
                description: `ปีละ ${baht(VISA_RENEWAL_FEE)} บาท ตั้งแต่ปีที่สอง แบ่งเป็นขออยู่ต่อ 12 เดือน ${baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)} บาท และต่อใบอนุญาตทำงาน ${baht(VISA_RENEWAL_BREAKDOWN.workPermit)} บาท`,
              },
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'IC Visa / Work Permit', path: '/visa-work-permit' },
          ]),
          faqSchema(c.faq.items.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <VisaPageTemplate c={c} />
    </div>
  );
}
