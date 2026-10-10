import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { OrganizationTemplate } from '@/app/organization-system/organization-template';
import { organizationContent } from '@/app/organization-system/organization-content';

/**
 * หน้าวางระบบองค์กร ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ปุ่ม CTA ชี้ไป /en/quote เพื่อไม่ให้คนที่อ่านอังกฤษมาตลอดเจอฟอร์มภาษาไทย
 */

const TH_URL = 'https://icaccservice.com/organization-system';
const EN_URL = 'https://icaccservice.com/en/organization-system';
const c = organizationContent.en;

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
    locale: 'en_US',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function OrganizationSystemEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({ name: c.schema.name, description: c.schema.description, path: '/en/organization-system' }),
          breadcrumbSchema([
            { name: c.schema.crumbHome, path: '/en' },
            { name: c.schema.crumbCurrent, path: '/en/organization-system' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <OrganizationTemplate c={c} quoteHref="/en/quote" />
    </div>
  );
}
