import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'รับทำบัญชีเชียงใหม่ รายเดือน เริ่ม 4,500/เดือน | IC Accounting',
  description: 'รับทำบัญชีและยื่นภาษีรายเดือนในเชียงใหม่ 2 แพ็กเกจ IC Smart ยื่นภาษีรายเดือน 4,500 บาท และ IC Total บัญชีอินเฮ้าส์เต็มระบบพร้อมโปรแกรมบัญชีออนไลน์ 12,000 บาท ราคารวม VAT',
  alternates: {
    canonical: 'https://icaccservice.com/accounting-services',
  },
  openGraph: {
    title: 'รับทำบัญชีเชียงใหม่ รายเดือน เริ่ม 4,500/เดือน | IC Accounting',
    description: 'IC Smart ยื่นภาษีรายเดือน 4,500 · IC Total บัญชีอินเฮ้าส์เต็มระบบ 12,000 ราคารวม VAT',
    url: 'https://icaccservice.com/accounting-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}