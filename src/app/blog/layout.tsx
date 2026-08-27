import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'บทความบัญชีและภาษีเชียงใหม่ | IC Accounting & Service',
    description: 'รวมบทความน่ารู้เรื่องบัญชี ภาษี จดทะเบียนบริษัท และการบริหารธุรกิจ SME ในเชียงใหม่ จากทีมผู้เชี่ยวชาญประสบการณ์กว่า 10 ปี',
    alternates: { canonical: 'https://icaccservice.com/blog' },
    openGraph: {
        title: 'บทความบัญชีและภาษีเชียงใหม่ | IC Accounting & Service',
        description: 'รวมบทความน่ารู้เรื่องบัญชี ภาษี จดทะเบียนบริษัท และการบริหารธุรกิจ SME ในเชียงใหม่ จากทีมผู้เชี่ยวชาญประสบการณ์กว่า 10 ปี',
        url: 'https://icaccservice.com/blog',
        siteName: 'IC Accounting & Service',
        images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630, alt: 'บทความบัญชีและภาษีเชียงใหม่ IC Accounting & Service' }],
        locale: 'th_TH',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'บทความบัญชีและภาษีเชียงใหม่ | IC Accounting & Service',
        description: 'รวมบทความน่ารู้เรื่องบัญชี ภาษี จดทะเบียนบริษัท และการบริหารธุรกิจ SME ในเชียงใหม่',
        images: ['https://icaccservice.com/share-preview.jpg'],
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    /**
     * layout นี้ครอบทั้ง /blog และ /blog/[id]
     * schema จึงต้องไปอยู่ที่ page ของแต่ละหน้า ไม่ใช่ตรงนี้
     * ไม่งั้นหน้าบทความจะได้ Blog schema ที่ลิสต์บทความทั้งหมดติดไปด้วย
     * และได้ breadcrumb ที่จบแค่ /blog ซึ่งไม่ตรงกับที่ผู้ใช้เห็นบนหน้านั้น
     */
    return <>{children}</>;
}
