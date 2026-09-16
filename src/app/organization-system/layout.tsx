import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'วางระบบองค์กรและบัญชีดิจิทัล เชียงใหม่ | IC Accounting',
  description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี วางขั้นตอนเอกสารให้เป็นระบบ เพื่อการเติบโตที่ยั่งยืน',
  alternates: { canonical: 'https://icaccservice.com/organization-system' },
  openGraph: {
    title: 'วางระบบองค์กรและบัญชีดิจิทัล เชียงใหม่ | IC Accounting',
    description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี',
    url: 'https://icaccservice.com/organization-system',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}