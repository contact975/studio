import type { Metadata } from 'next';
import MediaClient from '@/app/media-content/media-client';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { MEDIA_OFFERS, mediaContent } from '@/app/media-content/media-content';

/**
 * หน้าบริการ Exclusive Media Production ฉบับภาษาอังกฤษ
 *
 * ใช้ markup และราคาชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 */

const TH_URL = 'https://icaccservice.com/media-content';
const EN_URL = 'https://icaccservice.com/en/media-content';
const c = mediaContent.en;

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

export default function MediaContentEnglishPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: c.schema.name,
            description: c.schema.description,
            path: '/en/media-content',
            offers: MEDIA_OFFERS,
          }),
          breadcrumbSchema([
            { name: c.schema.home, path: '/en' },
            { name: c.schema.current, path: '/en/media-content' },
          ]),
          faqSchema(c.faq.items),
        ]}
      />
      <MediaClient c={c} />
    </>
  );
}
