import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { PACKAGES, SMART_SERVICES } from '@/lib/accounting-packages';
import { AccountingTemplate } from '@/app/accounting-services/accounting-template';
import { accountingContent } from '@/app/accounting-services/accounting-content';

/**
 * หน้าบริการทำบัญชี ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตและราคาชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ปุ่ม CTA ชี้ไป /en/quote เพื่อไม่ให้คนที่อ่านอังกฤษมาตลอดเจอฟอร์มภาษาไทย
 */

const TH_URL = 'https://icaccservice.com/accounting-services';
const EN_URL = 'https://icaccservice.com/en/accounting-services';
const c = accountingContent.en;

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

export default function AccountingServicesEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'Monthly Accounting and Tax Filing in Chiang Mai',
            description:
              'Monthly accounting and tax services for businesses in Chiang Mai, in two packages: IC Smart for monthly tax filing and IC Total for a full in-house accounting function, with online accounting software. Prices include VAT.',
            path: '/en/accounting-services',
            offers: [
              { name: 'IC Smart — Monthly tax filing', price: String(PACKAGES.smart.price), description: 'Per month, VAT included, when all 4 services are used' },
              { name: 'IC Total — Full in-house accounting', price: String(PACKAGES.total.price), description: 'Per month, VAT included, 1-year contract with online accounting software' },
              ...SMART_SERVICES.map((s) => ({ name: c.smartServices[s.id].name, price: String(s.price), description: 'Per month, VAT included, available separately' })),
            ],
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'Accounting Services', path: '/en/accounting-services' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <AccountingTemplate c={c} quoteHref="/en/quote" />
    </div>
  );
}
