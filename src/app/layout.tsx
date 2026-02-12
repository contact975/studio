import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'IC Accounting & Service | สำนักงานบัญชีเชียงใหม่ บัญชี ภาษี มีเดียครบวงจร',
  description: 'ครบจบในที่เดียวที่ IC Accounting & Service สำนักงานบัญชีเชียงใหม่ยุคใหม่ บริการทำบัญชี วางแผนภาษี จดทะเบียนธุรกิจ และผลิตมีเดียคอนเทนต์ โดยทีมงานมืออาชีพกว่า 10 ปี',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media',
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
