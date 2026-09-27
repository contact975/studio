import type { Metadata } from 'next';
import QuoteClient from './quote-client';

export const metadata: Metadata = {
  title: 'ปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี | IC Accounting',
  description: 'นัดหมายปรึกษาฟรีกับสำนักงานบัญชีเชียงใหม่ เลือกบริการและช่วงเวลาที่สะดวกได้เอง ทั้งทำบัญชี ปิดงบ จดทะเบียนบริษัท และ Visa & Work Permit ไม่มีค่าใช้จ่าย ไม่ผูกมัด',
  alternates: { canonical: 'https://icaccservice.com/quote' },
  openGraph: {
    title: 'ปรึกษาสำนักงานบัญชีเชียงใหม่ฟรี | IC Accounting',
    description: 'นัดหมายปรึกษาฟรีกับสำนักงานบัญชีเชียงใหม่ เลือกบริการและช่วงเวลาที่สะดวกได้เอง ทั้งทำบัญชี ปิดงบ จดทะเบียนบริษัท และ Visa & Work Permit ไม่มีค่าใช้จ่าย ไม่ผูกมัด',
    url: 'https://icaccservice.com/quote',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function QuotePage() {
  return <QuoteClient />;
}