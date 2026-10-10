import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { aboutPageSchema, breadcrumbSchema } from '@/lib/seo';
import { AboutTemplate } from '@/app/about/about-template';
import { aboutContent, ABOUT_FACTS, FOUNDERS, FOUNDING_DATE } from '@/app/about/about-content';

/**
 * หน้าเกี่ยวกับเรา ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตและตัวเลขชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ปุ่มนัดหมายชี้ไป /en/quote เพื่อไม่ให้คนที่อ่านอังกฤษมาตลอดเจอฟอร์มภาษาไทย
 *
 * aboutPageSchema ใน lib/seo.ts ตั้ง url เป็น /about และ inLanguage เป็น th-TH ไว้ตายตัว
 * จึงเขียนทับสองช่องนี้ที่นี่ แทนการแก้ไฟล์กลางที่หน้าอื่นใช้ร่วมกัน
 */

const TH_URL = 'https://icaccservice.com/about';
const EN_URL = 'https://icaccservice.com/en/about';

const TITLE = 'About Us | IC Accounting & Service Chiang Mai';
const DESCRIPTION = `A Chiang Mai accounting firm that works ${ABOUT_FACTS.onlinePercent}% online, using office management software we developed ourselves. Meet the IC Accounting & Service team: more than ${ABOUT_FACTS.yearsExperience} years of experience, looking after more than ${ABOUT_FACTS.clients} businesses.`;
const SHARE_IMAGE = 'https://icaccservice.com/share-preview.jpg';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: EN_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: EN_URL,
    siteName: 'IC Accounting & Service',
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: 'About IC Accounting & Service, Chiang Mai' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

export default function AboutEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          {
            ...aboutPageSchema({ founders: FOUNDERS, foundingDate: FOUNDING_DATE }),
            url: EN_URL,
            inLanguage: 'en',
          },
          breadcrumbSchema([
            { name: 'Home', path: '/en' },
            { name: 'About Us', path: '/en/about' },
          ]),
        ]}
      />
      <AboutTemplate c={aboutContent.en} quoteHref="/en/quote" />
    </div>
  );
}
