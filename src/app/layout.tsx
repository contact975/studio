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
  // ... ส่วน icons คงเดิม ...
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
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}