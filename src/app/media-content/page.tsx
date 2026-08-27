import type { Metadata } from 'next';
import MediaClient from './media-client';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { mediaFaqs } from './faqs';


export const metadata: Metadata = {
  title: 'รับผลิต Media Content เชียงใหม่ | IC Accounting',
  description: 'บริการผลิตวิดีโอ Motion Graphics และกราฟิกคุณภาพสูงในเชียงใหม่ สร้างภาพลักษณ์แบรนด์ให้น่าเชื่อถือและมีตัวตนบนโลกออนไลน์',
  alternates: { canonical: 'https://icaccservice.com/media-content' },
  openGraph: {
    title: 'รับผลิต Media Content เชียงใหม่ | IC Accounting',
    description: 'บริการผลิตวิดีโอ Motion Graphics และกราฟิกคุณภาพสูงในเชียงใหม่',
    url: 'https://icaccservice.com/media-content',
  },
};

export default function MediaContentPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'บริการผลิต Media Content เชียงใหม่',
            description:
              'ผลิตวิดีโอ Motion Graphics และงานกราฟิกสำหรับแบรนด์ในเชียงใหม่ ตั้งแต่ Key Visual และ Content Graphic ไปจนถึง Brand Film และงาน Cinematic ที่ผสมการถ่ายทำกับ VFX',
            path: '/media-content',
            offers: [
              { name: 'Artwork & Graphic Design', price: '2000' },
              { name: 'Ads Motion', price: '3500' },
              { name: 'Video Content', price: '6000' },
              { name: 'Motion Video (Cinematic)', price: '8000' },
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บริการ Media Content', path: '/media-content' },
          ]),
          faqSchema(mediaFaqs),
        ]}
      />
      <MediaClient />
    </>
  );
}