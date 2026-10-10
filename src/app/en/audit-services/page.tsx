import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { AUDIT_TIERS } from '@/lib/audit-packages';
import { AuditTemplate } from '@/app/audit-services/audit-template';
import { auditContent, tierLabel } from '@/app/audit-services/audit-content';

/**
 * หน้าบริการตรวจสอบบัญชี ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตและราคาชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ปุ่ม CTA ชี้ไป /en/quote เพื่อไม่ให้คนที่อ่านอังกฤษมาตลอดเจอฟอร์มภาษาไทย
 */

const TH_URL = 'https://icaccservice.com/audit-services';
const EN_URL = 'https://icaccservice.com/en/audit-services';
const c = auditContent.en;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: EN_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: c.meta.title,
    description: c.meta.ogDescription,
    url: EN_URL,
    locale: 'en_US',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function AuditServicesEnglishPage() {
  const priced = AUDIT_TIERS.filter((t) => t.auditOnly !== null);
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: c.schema.name,
            description: c.schema.description,
            path: '/en/audit-services',
            offers: [
              ...priced.map((t) => ({ name: `${c.schema.auditOffer} — ${tierLabel(c, t)}`, price: String(t.auditOnly), description: c.schema.auditOfferDesc })),
              ...priced.map((t) => ({ name: `${c.schema.bundleOffer} — ${tierLabel(c, t)}`, price: String(t.bundle), description: c.schema.bundleOfferDesc })),
            ],
          }),
          breadcrumbSchema([
            { name: c.crumb.home, path: '/en' },
            { name: c.crumb.current, path: '/en/audit-services' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <AuditTemplate c={c} />
    </div>
  );
}
