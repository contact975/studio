import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
  description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี วางขั้นตอนเอกสารให้เป็นระบบ เพื่อการเติบโตที่ยั่งยืน',
  alternates: { canonical: 'https://icaccservice.com/organization-system' },
  openGraph: {
    title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
    description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี',
    url: 'https://icaccservice.com/organization-system',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}