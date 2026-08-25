import type { Metadata } from 'next';
import './globals.css';
import { Kanit } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AOSProvider } from '@/components/aos-provider';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

/**
 * Title / description หน้าแรก เขียนใหม่ตามข้อมูล Search Console (3 เดือนล่าสุด)
 *
 * "สำนักงานบัญชีเชียงใหม่" ทุกรูปแบบการสะกดรวมกัน = 364 impressions (คำที่ใหญ่ที่สุดของเว็บ)
 * เราอยู่อันดับ 6-10 แล้ว แต่ CTR ได้แค่ 1.1-3% ทั้งที่อันดับนั้นปกติควรได้ 2.5-5%
 * → ปัญหาอยู่ที่ข้อความที่โชว์ในผลค้นหา ไม่ใช่อันดับ
 *
 * ของเดิมยาว 3 ท่อน Google ตัดท้ายทิ้ง และไม่มีตัวเลขให้คนตัดสินใจ
 * ของใหม่: คีย์เวิร์ดหลักมาก่อน + ตัวเลขพิสูจน์ตัวตน + แบรนด์ปิดท้าย
 * (ตัวเลข 100 ธุรกิจ / 10 ปี อ้างอิงจากข้อความที่ใช้อยู่แล้วในหน้าเว็บ)
 */
const SITE_TITLE = 'สำนักงานบัญชีเชียงใหม่ ดูแลกว่า 100 ธุรกิจ | IC Accounting';
const SITE_DESCRIPTION =
  'รับทำบัญชี ปิดงบการเงิน จดทะเบียนบริษัท และ Visa & Work Permit ครบจบที่เดียว ประสบการณ์กว่า 10 ปี ดูแลกว่า 100 ธุรกิจในเชียงใหม่และทั่วประเทศ ปรึกษาฟรีทาง LINE';

export const metadata: Metadata = {
  // ทำให้ path แบบสั้น เช่น canonical: '/' ขยายเป็น URL เต็มได้ถูกต้อง
  metadataBase: new URL('https://icaccservice.com'),
  title: {
    default: SITE_TITLE,
    template: '%s',
  },
  description: SITE_DESCRIPTION,
  // หน้าบริการทุกหน้ามี canonical อยู่แล้ว ขาดแค่หน้าแรก
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://icaccservice.com/',
    siteName: 'IC Accounting & Service',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630, alt: 'สำนักงานบัญชีเชียงใหม่ IC Accounting & Service' }],
    locale: 'th_TH',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png?v=3', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-96x96.png?v=3',
    apple: '/web-app-manifest-192x192.png?v=3',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "ทำบัญชีเชียงใหม่ที่ไหนดี?", "acceptedAnswer": { "@type": "Answer", "text": "IC Accounting Service คือสำนักงานบัญชีเชียงใหม่ที่เชี่ยวชาญด้านการรับทำบัญชีครบวงจร วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่มีประสบการณ์กว่า 10 ปี" } },
      { "@type": "Question", "name": "จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?", "acceptedAnswer": { "@type": "Answer", "text": "การจดทะเบียนบริษัทกับ IC Accounting ปกติจะใช้เวลาเพียง 1-3 วันทำการ หลังจากเตรียมเอกสารครบถ้วน เราดูแลตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง" } },
      { "@type": "Question", "name": "ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?", "acceptedAnswer": { "@type": "Answer", "text": "ค่าบริการเริ่มต้นในราคาที่เหมาะสมสำหรับ SME พิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง" } }
    ]
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "IC Accounting & Service",
    "image": "https://icaccservice.com/share-preview.jpg",
    "url": "https://icaccservice.com",
    "telephone": "095-716-1422",
    "email": "contact@icaccservice.com",
    "description": "สำนักงานบัญชีเชียงใหม่ ครบวงจร ทำบัญชี วางแผนภาษี จดทะเบียนธุรกิจ และผลิตมีเดียคอนเทนต์",
    "address": { "@type": "PostalAddress", "streetAddress": "80/142 ต.สันปู่เลย อ.ดอยสะเก็ด", "addressLocality": "เชียงใหม่", "postalCode": "50220", "addressCountry": "TH" },
    "geo": { "@type": "GeoCoordinates", "latitude": 18.8796, "longitude": 99.0353 },
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    "sameAs": ["https://www.facebook.com/icaccservice"],
    "priceRange": "฿฿",
    "areaServed": { "@type": "City", "name": "เชียงใหม่" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "บริการสำนักงานบัญชี",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "รับทำบัญชี" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ปิดงบการเงิน" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "จดทะเบียนบริษัท" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Visa & Work Permit" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ผลิต Media Content" } }
      ]
    }
  };

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className={cn(kanit.className, 'font-body antialiased')} suppressHydrationWarning>
        <AOSProvider>
          {children}
          <Toaster />
        </AOSProvider>
      </body>
    </html>
  );
}
