import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { OrganizationTemplate } from './organization-template';
import { organizationContent } from './organization-content';

/**
 * หน้าวางระบบองค์กร ฉบับภาษาไทย
 *
 * ข้อความอยู่ที่ organization-content.ts markup อยู่ใน organization-template.tsx
 * ซึ่งหน้าอังกฤษ /en/organization-system ใช้ร่วมกัน
 */

const TH_URL = 'https://icaccservice.com/organization-system';
const EN_URL = 'https://icaccservice.com/en/organization-system';
const c = organizationContent.th;

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

export default function OrganizationSystemPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({ name: c.schema.name, description: c.schema.description, path: '/organization-system' }),
          breadcrumbSchema([
            { name: c.schema.crumbHome, path: '/' },
            { name: c.schema.crumbCurrent, path: '/organization-system' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <OrganizationTemplate c={c} quoteHref="/quote" />
    </div>
  );
}
