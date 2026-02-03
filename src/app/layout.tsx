import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'IC Accounting & Service | รับทำบัญชี เชียงใหม่',
  description: 'บริการรับทำบัญชีและจดทะเบียนบริษัทในจังหวัดเชียงใหม่ ครอบคลุมทุกเรื่องบัญชีและภาษี เพื่อให้คุณโฟกัสกับธุรกิจได้อย่างเต็มที่',
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
        {/* Wistia Scripts loaded with Next.js Script component for better performance and error handling */}
        <Script src="https://fast.wistia.com/assets/external/E-v1.js" strategy="afterInteractive" />
        <Script src="https://fast.wistia.com/embed/medias/hd04a418nd.jsonp" strategy="afterInteractive" />
        <Script src="https://fast.wistia.com/embed/medias/le8f20crj0.jsonp" strategy="afterInteractive" />
      </body>
    </html>
  );
}
