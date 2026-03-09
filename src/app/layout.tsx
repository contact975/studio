import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Script from 'next/script';

export const metadata: Metadata = {
  // เน้นคีย์เวิร์ดหลักขึ้นก่อนชื่อแบรนด์ เพื่อดึงอันดับ Google
  title: 'สำนักงานบัญชีเชียงใหม่ บัญชี ภาษี ครบวงจร | IC Accounting & Service',
  description: 'บริการสำนักงานบัญชีเชียงใหม่ ยุคใหม่ ครบวงจร ทำบัญชี วางแผนภาษี จดทะเบียนธุรกิจ และผลิตมีเดียคอนเทนต์ สำหรับธุรกิจทั่วเชียงใหม่ โดยทีมงานมืออาชีพประสบการณ์กว่า 10 ปี',
  
  openGraph: {
    title: 'สำนักงานบัญชีเชียงใหม่ บัญชี ภาษี ครบวงจร | IC Accounting & Service',
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
  // ข้อมูล FAQ Schema สำหรับช่วย Google AI
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

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap" rel="stylesheet" />
        
        {/* ฝัง FAQ Schema ลงในส่วน head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}