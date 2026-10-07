import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { RegistrationTemplate } from '@/app/company-registration/registration-template';
import { registrationContent, REG_PRICES } from '@/app/company-registration/registration-content';

/**
 * หน้าจดทะเบียนนิติบุคคล ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตและราคาชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ปุ่ม CTA ชี้ไป /en/quote เพื่อไม่ให้คนที่อ่านอังกฤษมาตลอดเจอฟอร์มภาษาไทย
 */

const TH_URL = 'https://icaccservice.com/company-registration';
const EN_URL = 'https://icaccservice.com/en/company-registration';
const c = registrationContent.en;

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

export default function CompanyRegistrationEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'Company Registration in Chiang Mai',
            description:
              'Registration of Thai Limited Companies and Limited Partnerships in Chiang Mai — name reservation through to the company affidavit, plus employer and VAT registration, registered changes and company dissolution.',
            path: '/en/company-registration',
            offers: [
              {
                name: 'Limited Partnership registration',
                price: REG_PRICES.partnership.raw,
                description: 'Includes our service fee and all government fees: name reservation, document preparation, certified signing, registration fees and stamp duty, plus a free company stamp with design.',
              },
              {
                name: 'Limited Company registration',
                price: REG_PRICES.company.raw,
                description: 'Includes our service fee and all government fees: name reservation, document preparation, certified signing, registration fees and stamp duty, plus a free company stamp with design.',
              },
            ],
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Company Registration', path: '/en/company-registration' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <RegistrationTemplate c={c} quoteHref="/en/quote" />
    </div>
  );
}
