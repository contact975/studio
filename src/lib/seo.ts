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

/**
 * หน้ารวมบทความ
 *
 * Blog + BlogPosting บอก Google ว่า URL นี้คือดัชนีบทความ ไม่ใช่หน้าเนื้อหา
 * ช่วยให้เข้าใจโครงเว็บว่าบทความทั้งหมดสังกัดอยู่ใต้หน้านี้
 * รายชื่อดึงจาก blogMeta ที่เดียว จึงไม่มีวันหลุดจากของจริง
 */
export function blogListSchema(posts: Array<{ slug: string; title: string; description: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'บทความบัญชีและภาษีเชียงใหม่',
    description:
      'รวมบทความเรื่องบัญชี ภาษี จดทะเบียนบริษัท วีซ่าและใบอนุญาตทำงาน สำหรับธุรกิจในเชียงใหม่',
    url: `${SITE_URL}/blog`,
    inLanguage: 'th-TH',
    publisher: PROVIDER,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };
}

/**
 * หน้าเกี่ยวกับเรา
 *
 * ที่นี่คือที่ที่ควรประกาศตัวตนขององค์กรให้ครบที่สุด — ผู้ก่อตั้ง วันจดทะเบียน
 * ช่องทางที่ยืนยันตัวตนได้ ทั้งหมดเป็นข้อมูลที่แสดงอยู่บนหน้านี้อยู่แล้ว
 * ความสอดคล้องของข้อมูลธุรกิจข้ามแหล่งเป็นหนึ่งในปัจจัยของ local SEO
 */
export function aboutPageSchema(opts: { founders: string[]; foundingDate: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    inLanguage: 'th-TH',
    mainEntity: {
      ...PROVIDER,
      foundingDate: opts.foundingDate,
      founder: opts.founders.map((name) => ({ '@type': 'Person', name })),
      sameAs: ['https://www.facebook.com/icaccservice', 'https://line.me/R/ti/p/@icacc'],
    },
  };
}
