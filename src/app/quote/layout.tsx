import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี | IC Accounting',
  description: 'นัดหมายปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี ไม่มีค่าใช้จ่าย ทีมงาน IC Accounting พร้อมดูแลทุกเรื่องบัญชีและภาษี',
  alternates: { canonical: 'https://icaccservice.com/quote' },
  openGraph: {
    title: 'ปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี | IC Accounting',
    description: 'นัดหมายปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี ทีมงาน IC Accounting พร้อมดูแลทุกเรื่อง',
    url: 'https://icaccservice.com/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}