import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'รับทำบัญชีเชียงใหม่ รายเดือน มีผู้ดูแลบัญชีประจำ | IC Accounting',
  description:
    'รับทำบัญชีและยื่นภาษีรายเดือนในเชียงใหม่ มีผู้ดูแลบัญชีประจำตอบภายใน 1 วันทำการ โปรแกรมบัญชีออนไลน์พร้อมอบรม และทบทวนผลประกอบการรายไตรมาส เลือกได้ 2 รูปแบบตามขนาดธุรกิจ',
  alternates: {
    canonical: 'https://icaccservice.com/accounting-services',
  },
  openGraph: {
    title: 'รับทำบัญชีเชียงใหม่ รายเดือน มีผู้ดูแลบัญชีประจำ | IC Accounting',
    description: 'ผู้ดูแลบัญชีประจำตอบภายใน 1 วันทำการ · โปรแกรมบัญชีออนไลน์ · ทบทวนผลประกอบการรายไตรมาส · เลือกได้ 2 รูปแบบตามขนาดธุรกิจ',
    url: 'https://icaccservice.com/accounting-services',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}