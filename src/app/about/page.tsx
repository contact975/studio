import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { aboutPageSchema, breadcrumbSchema } from '@/lib/seo';
import { AboutTemplate } from './about-template';
import { aboutContent, FOUNDERS, FOUNDING_DATE } from './about-content';

/**
 * หน้าเกี่ยวกับเรา ฉบับภาษาไทย
 *
 * ข้อความอยู่ที่ about-content.ts markup อยู่ใน about-template.tsx ซึ่งหน้าอังกฤษ /en/about ใช้ร่วมกัน
 * metadata ด้านล่างคงข้อความเดิมของหน้าไทยทุกตัวอักษร เพิ่มแค่ hreflang
 */

const TH_URL = 'https://icaccservice.com/about';
const EN_URL = 'https://icaccservice.com/en/about';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | IC Accounting & Service เชียงใหม่',
  description: 'สำนักงานบัญชีเชียงใหม่ที่ทำงานออนไลน์ 100% ด้วยโปรแกรมบริหารสำนักงานบัญชีที่พัฒนาขึ้นเอง รู้จักทีมงาน IC Accounting & Service ประสบการณ์กว่า 10 ปี ดูแลกว่า 100 ธุรกิจ',
  alternates: {
    canonical: TH_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
    openGraph: {
          title: 'เกี่ยวกับเรา | IC Accounting & Service เชียงใหม่',
          description: 'สำนักงานบัญชีเชียงใหม่ที่ทำงานออนไลน์ 100% ด้วยโปรแกรมบริหารสำนักงานบัญชีที่พัฒนาขึ้นเอง รู้จักทีมงาน IC Accounting & Service ประสบการณ์กว่า 10 ปี ดูแลกว่า 100 ธุรกิจ',
          url: 'https://icaccservice.com/about',
          siteName: 'IC Accounting & Service',
          images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630, alt: 'เกี่ยวกับ IC Accounting & Service เชียงใหม่' }],
          locale: 'th_TH',
          type: 'website',
    },
    twitter: {
          card: 'summary_large_image',
          title: 'เกี่ยวกับเรา | IC Accounting & Service เชียงใหม่',
          description: 'สำนักงานบัญชีเชียงใหม่ที่ทำงานออนไลน์ 100% ด้วยโปรแกรมบริหารสำนักงานบัญชีที่พัฒนาขึ้นเอง รู้จักทีมงาน IC Accounting & Service ประสบการณ์กว่า 10 ปี ดูแลกว่า 100 ธุรกิจ',
          images: ['https://icaccservice.com/share-preview.jpg'],
    },
};


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      {/* ผู้ก่อตั้งและวันจดทะเบียนตรงกับที่แสดงอยู่บนหน้านี้ ไม่ได้ใส่ข้อมูลใหม่ */}
      <JsonLd
        data={[
          aboutPageSchema({
            founders: FOUNDERS,
            foundingDate: FOUNDING_DATE,
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'เกี่ยวกับเรา', path: '/about' },
          ]),
        ]}
      />
      <AboutTemplate c={aboutContent.th} quoteHref="/quote" />
    </div>
  );
}
