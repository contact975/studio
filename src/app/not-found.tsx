import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

/**
 * หน้า 404 ของทั้งเว็บ
 *
 * เดิมใช้หน้าเริ่มต้นของ Next.js ซึ่งเป็นภาษาอังกฤษ ไม่มีเมนู ไม่มีทางกลับ
 * คนที่กดลิงก์เก่าหรือพิมพ์ URL ผิดจึงหลุดออกจากเว็บไปเลย
 * หน้านี้ยังตอบ HTTP 404 เหมือนเดิม (Google ไม่เก็บเข้าดัชนี) แต่พาคนกลับเข้าเว็บได้
 * ข้อความเป็นภาษาไทยเพราะ 404 ใช้ร่วมกันทั้งเว็บ — เมนูด้านบนสลับภาษาให้ตาม URL เอง
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export const metadata: Metadata = {
  title: 'ไม่พบหน้าที่คุณค้นหา | IC Accounting',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">404</p>
          <h1 className="mb-4 text-3xl font-black md:text-4xl">ไม่พบหน้าที่คุณค้นหา</h1>
          <p className="mb-2 text-muted-foreground">
            ลิงก์นี้อาจถูกย้ายหรือไม่มีอยู่แล้ว ลองกลับไปที่หน้าแรกหรือดูบทความทั้งหมด
          </p>
          <p className="mb-8 text-sm text-muted-foreground" lang="en">
            This page could not be found.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:opacity-90">
              กลับหน้าแรก
            </Link>
            <Link href="/blog" className="rounded-xl border border-border px-6 py-3 font-bold transition hover:border-primary/40">
              ดูบทความทั้งหมด
            </Link>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border px-6 py-3 font-bold transition hover:border-primary/40">
              สอบถามทาง LINE
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
