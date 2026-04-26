import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'สำนักงานบัญชีเชียงใหม่ ครบวงจร | IC Accounting',
    template: '%s',
  },
  description: 'บริการสำนักงานบัญชีเชียงใหม่ ยุคใหม่ ครบวงจร ทำบัญชี วางแผนภาษี จดทะเบียนธุรกิจ และผลิตมีเดียคอนเทนต์ สำหรับธุรกิจทั่วเชียงใหม่ โดยทีมงานมืออาชีพประสบการณ์กว่า 10 ปี',
  alternates: {
    canonical: 'https://icaccservice.com',
  },
  openGraph: {
    title: 'สำนักงานบัญชีเชียงใหม่ ครบวงจร | IC Accounting',
    description: 'บริการสำนักงานบัญชีเชียงใหม่ ยุคใหม่ ครบวงจร ทำบัญชี วางแผนภาษี จดทะเบียนธุรกิจ และผลิตมีเดียคอนเทนต์ สำหรับธุรกิจทั่วเชียงใหม่ โดยทีมงานมืออาชีพประสบการณ์กว่า 10 ปี',
    url: 'https://icaccservice.com',
    siteName: 'IC Accounting & Service',
    images: [
      {
        url: 'https://icaccservice.com/share-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'สำนักงานบัญชีเชียงใหม่ IC Accounting & Service',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ทำบัญชีเชียงใหม่ที่ไหนดี?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IC Accounting Service คือสำนักงานบัญชีเชียงใหม่ที่เชี่ยวชาญด้านการรับทำบัญชีครบวงจร วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่มีประสบการณ์กว่า 10 ปี"
        }
      },
      {
        "@type": "Question",
        "name": "จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "การจดทะเบียนบริษัทกับ IC Accounting ปกติจะใช้เวลาเพียง 1-3 วันทำการ หลังจากเตรียมเอกสารครบถ้วน เราดูแลตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง"
        }
      },
      {
        "@type": "Question",
        "name": "ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ค่าบริการเริ่มต้นในราคาที่เหมาะสมสำหรับ SME พิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง"
        }
      }
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
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "80/142 ต.สันปู่เลย อ.ดอยสะเก็ด",
      "addressLocality": "เชียงใหม่",
      "postalCode": "50220",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.8796,
      "longitude": 99.0353
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/icaccservice"
    ],
    "priceRange": "฿฿",
    "areaServed": {
      "@type": "City",
      "name": "เชียงใหม่"
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
        <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
