import type { Metadata } from 'next';

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}