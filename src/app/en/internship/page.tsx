import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo';
import { InternshipTemplate } from '@/app/internship/internship-template';
import { internshipContent } from '@/app/internship/internship-content';

/**
 * หน้านักศึกษาฝึกงาน ฉบับภาษาอังกฤษ
 *
 * ใช้เทมเพลตและฟอร์มชุดเดียวกับหน้าไทย ต่างแค่ข้อความ
 * ฟอร์มยังส่งค่าภาษาไทยไป /api/internship เหมือนเดิม ป้ายอังกฤษใช้แสดงผลเท่านั้น
 */

const TH_URL = 'https://icaccservice.com/internship';
const EN_URL = 'https://icaccservice.com/en/internship';
const c = internshipContent.en;

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
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function InternshipEnglishPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/en' },
          { name: 'Internships', path: '/en/internship' },
        ])}
      />
      <InternshipTemplate c={c} basePath="/en/internship" />
    </div>
  );
}
