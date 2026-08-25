/**
 * ตัวช่วยสร้าง JSON-LD (structured data) สำหรับหน้าบริการ
 *
 * หน้าแรกมี AccountingService + FAQPage อยู่แล้วใน app/layout.tsx
 * แต่หน้าบริการรายตัวยังไม่มีอะไรเลย ทั้งที่เป็นหน้าที่ต้องแบกคำค้นเชิงพาณิชย์
 * เช่น "รับทำบัญชี เชียงใหม่" (59 impressions, อันดับ 28) และ
 * "จดบริษัท เชียงใหม่" (25 impressions, อันดับ 22) — ข้อมูลจาก Search Console
 */

export const SITE_URL = 'https://icaccservice.com';
export const ORG_NAME = 'IC Accounting & Service';

export type Faq = { q: string; a: string };

const PROVIDER = {
  '@type': 'AccountingService',
  name: ORG_NAME,
  url: SITE_URL,
  telephone: '095-716-1422',
  email: 'contact@icaccservice.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '80/142 ต.สันปู่เลย อ.ดอยสะเก็ด',
    addressLocality: 'เชียงใหม่',
    postalCode: '50220',
    addressCountry: 'TH',
  },
  areaServed: { '@type': 'City', name: 'เชียงใหม่' },
} as const;

/** เส้นทางนำทาง — ต้องตรงกับ breadcrumb ที่ผู้ใช้เห็นบนหน้าจอจริง */
export function breadcrumbSchema(trail: Array<{ name: string; path?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}

/**
 * FAQPage — คำถาม/คำตอบต้องแสดงให้ผู้ใช้เห็นบนหน้าเว็บด้วย
 * ไม่ใช่ซ่อนไว้ใน schema อย่างเดียว (เป็นข้อกำหนดของ Google)
 * ใช้คู่กับ <ServiceFaq /> เสมอ
 */
export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  /** price = ตัวเลขล้วน ไม่มีลูกน้ำ เช่น '2500' */
  offers?: Array<{ name: string; price: string; description?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: PROVIDER,
    areaServed: { '@type': 'City', name: 'เชียงใหม่' },
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({
              '@type': 'Offer',
              name: o.name,
              price: o.price,
              priceCurrency: 'THB',
              ...(o.description ? { description: o.description } : {}),
            })),
          },
        }
      : {}),
  };
}
