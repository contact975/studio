import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { PACKAGES, SMART_SERVICES } from '@/lib/accounting-packages';
import { AccountingTemplate } from './accounting-template';
import { accountingContent } from './accounting-content';

/**
 * หน้าบริการทำบัญชีรายเดือน ฉบับภาษาไทย — อ้างอิงใบเสนอราคา Quotation 2569/2026
 *
 * 2 แพ็กเกจ: IC Smart (ยื่นภาษีรายเดือน 4,500) และ IC Total (บัญชีอินเฮ้าส์เต็มระบบ 12,000)
 * ราคาอยู่ที่ lib/accounting-packages.ts ข้อความอยู่ที่ accounting-content.ts
 * markup อยู่ใน accounting-template.tsx ซึ่งหน้าอังกฤษใช้ร่วมกัน
 */

const TH_URL = 'https://icaccservice.com/accounting-services';
const EN_URL = 'https://icaccservice.com/en/accounting-services';
const c = accountingContent.th;

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
    locale: 'th_TH',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'รับทำบัญชีและยื่นภาษีรายเดือน เชียงใหม่',
            description:
              'บริการบัญชีและภาษีรายเดือนสำหรับธุรกิจในเชียงใหม่ 2 แพ็กเกจ IC Smart ยื่นภาษีรายเดือน และ IC Total บัญชีอินเฮ้าส์เต็มระบบ พร้อมโปรแกรมบัญชีออนไลน์ ราคารวม VAT',
            path: '/accounting-services',
            offers: [
              { name: 'IC Smart — ยื่นภาษีรายเดือน', price: String(PACKAGES.smart.price), description: 'ต่อเดือน รวม VAT เมื่อใช้ครบ 4 รายการ' },
              { name: 'IC Total — บัญชีอินเฮ้าส์เต็มระบบ', price: String(PACKAGES.total.price), description: 'ต่อเดือน รวม VAT สัญญา 1 ปี พร้อมโปรแกรมบัญชีออนไลน์' },
              ...SMART_SERVICES.map((s) => ({ name: c.smartServices[s.id].name, price: String(s.price), description: 'ต่อเดือน รวม VAT เลือกแยกได้' })),
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บริการทำบัญชี', path: '/accounting-services' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <AccountingTemplate c={c} quoteHref="/quote" />
    </div>
  );
}
