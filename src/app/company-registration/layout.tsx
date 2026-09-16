import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'จดทะเบียนบริษัทเชียงใหม่ เริ่ม 9,000 | IC Accounting',
  description: 'รับจดทะเบียนบริษัทและห้างหุ้นส่วนในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง รวดเร็ว ถูกต้อง',
  alternates: { canonical: 'https://icaccservice.com/company-registration' },
  openGraph: {
    title: 'จดทะเบียนบริษัทเชียงใหม่ เริ่ม 9,000 | IC Accounting',
    description: 'รับจดทะเบียนบริษัทและห้างหุ้นส่วนในเชียงใหม่ ครบทุกขั้นตอน รวดเร็ว ถูกต้อง',
    url: 'https://icaccservice.com/company-registration',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}