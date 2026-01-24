import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

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
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <script src="https://fast.wistia.com/embed/medias/hd04a418nd.jsonp" async></script>
        <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              AOS.init({
                duration: 1000, // ความเร็วในการ Fade (1000ms = 1 วินาที)
                once: false,    // true = เล่นครั้งเดียว, false = เล่นซ้ำทุกครั้งที่เลื่อนขึ้น-ลงมาเจอ
                offset: 120,    // ระยะห่างจากขอบจอ (px) ก่อนเริ่มแสดงผล
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
