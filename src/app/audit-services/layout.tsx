import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ปิดงบการเงินเชียงใหม่ ตรวจสอบโดย CPA เริ่ม 6,000/ปี | IC Accounting',
  description: 'ตรวจสอบบัญชีและปิดงบประจำปีในเชียงใหม่โดยผู้สอบบัญชีรับอนุญาต ยื่น DBD และสรรพากรให้ครบ เริ่ม 6,000 บาท/ปี หรือแพ็กเกจครบวงจรทำบัญชี + ตรวจสอบ เริ่ม 12,000 บาท/ปี ราคารวม VAT',
  alternates: { canonical: 'https://icaccservice.com/audit-services' },
  openGraph: {
    title: 'ปิดงบการเงินเชียงใหม่ ตรวจสอบโดย CPA เริ่ม 6,000/ปี | IC Accounting',
    description: 'ตรวจสอบอย่างเดียว เริ่ม 6,000/ปี · ครบวงจร ทำบัญชี + ตรวจสอบ เริ่ม 12,000/ปี ราคารวม VAT',
    url: 'https://icaccservice.com/audit-services',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}