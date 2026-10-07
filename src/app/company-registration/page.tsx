import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { RegistrationTemplate } from './registration-template';
import { registrationContent, REG_PRICES } from './registration-content';

/**
 * หน้าจดทะเบียนนิติบุคคล ฉบับภาษาไทย
 * markup อยู่ใน registration-template.tsx ซึ่งหน้าอังกฤษใช้ร่วมกัน
 */

const TH_URL = 'https://icaccservice.com/company-registration';
const EN_URL = 'https://icaccservice.com/en/company-registration';
const c = registrationContent.th;

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
    locale: 'th_TH',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function CompanyRegistrationPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'รับจดทะเบียนบริษัทเชียงใหม่',
            description:
              'รับจดทะเบียนบริษัทจำกัดและห้างหุ้นส่วนจำกัดในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง พร้อมขึ้นทะเบียนนายจ้างและจดทะเบียนภาษีมูลค่าเพิ่ม รวมถึงงานเปลี่ยนแปลงทางทะเบียนและจดทะเบียนเลิกบริษัท',
            path: '/company-registration',
            offers: [
              {
                name: 'จดทะเบียนจัดตั้งห้างหุ้นส่วนจำกัด',
                price: REG_PRICES.partnership.raw,
                description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว รวมบริการจองชื่อ จัดเตรียมเอกสาร ลงลายมือชื่อรับรองเอกสาร ค่าธรรมเนียมจัดตั้งและอากรแสตมป์ พร้อมตรายางและบริการออกแบบฟรี',
              },
              {
                name: 'จดทะเบียนจัดตั้งบริษัทจำกัด',
                price: REG_PRICES.company.raw,
                description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว รวมบริการจองชื่อ จัดเตรียมเอกสาร ลงลายมือชื่อรับรองเอกสาร ค่าธรรมเนียมจัดตั้งและอากรแสตมป์ พร้อมตรายางและบริการออกแบบฟรี',
              },
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'จดทะเบียนนิติบุคคล', path: '/company-registration' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <RegistrationTemplate c={c} quoteHref="/quote" />
    </div>
  );
}
