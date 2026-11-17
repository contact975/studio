'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEvent } from '@/components/analytics/google-analytics';
import { isEnglishPath } from '@/lib/i18n-routes';

/**
 * บับเบิลแชทมุมขวาล่าง (เจ้าของขอ 17 พ.ย. 2569 แบบเดียวกับ Simple Balance)
 *
 * กดแล้วเปิดกล่องให้กรอกชื่อ เบอร์ และข้อความ ส่งไป /api/contact → Make → LINE + Gmail ของทีม
 * ทีมเห็นแจ้งเตือนใน LINE ทันทีแล้วติดต่อกลับทางโทรศัพท์หรือ LINE
 * ไม่ใช่แชทโต้ตอบสดบนเว็บ (ตัดสินใจแล้วว่าไม่ใช้บริการภายนอกอย่าง Pancake)
 *
 * ── ทางสำรองเสมอ (CLAUDE.md) ──
 * ถ้าส่งไม่สำเร็จ ไม่ว่าเพราะอะไร กล่องจะเปลี่ยนเป็นปุ่มให้ทัก LINE แทน
 * ห้ามเอาออก — เคยมีช่วงที่ฟอร์มพังเงียบแล้วไม่มีใครรู้
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';
const LOGO = 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media';

const COPY = {
  th: {
    open: 'เปิดแชทสอบถาม',
    close: 'ปิดแชท',
    title: 'ทีมงาน IC Accounting',
    greeting: 'สวัสดีค่ะ แจ้งเรื่องที่ต้องการสอบถามได้เลย ทีมงานจะติดต่อกลับโดยเร็วที่สุดในเวลาทำการ',
    name: 'ชื่อของคุณ',
    phoneLabel: 'หมายเลขโทรศัพท์',
    phone: 'หมายเลขโทรศัพท์ของคุณ',
    messageLabel: 'ข้อความ',
    message: 'พิมพ์เรื่องที่ต้องการสอบถาม',
    send: 'ส่งข้อความ',
    sending: 'กำลังส่ง...',
    doneTitle: 'ได้รับข้อความแล้ว',
    done: 'ทีมงานจะติดต่อกลับทางเบอร์ที่ให้ไว้โดยเร็วที่สุดในเวลาทำการ (จันทร์–เสาร์ 09:00–18:00 น.)',
    again: 'ส่งข้อความอีกครั้ง',
    failTitle: 'ส่งข้อความไม่สำเร็จ',
    fail: 'ขออภัย ระบบขัดข้องชั่วคราว ทักเราทาง LINE ได้เลย ทีมงานตอบในเวลาทำการ',
    invalid: 'กรุณาตรวจเบอร์โทรอีกครั้ง และไม่ใส่ลิงก์ในข้อความ',
    rateLimited: 'ส่งข้อความถี่เกินไป ลองใหม่อีกครั้งในอีกสักครู่ หรือทักทาง LINE',
    line: 'ทักทาง LINE @icacc',
    orLine: 'หรือทักทาง LINE',
  },
  en: {
    open: 'Open chat',
    close: 'Close chat',
    title: 'IC Accounting team',
    greeting: 'Hi! Tell us what you need and our team will get back to you as soon as possible during office hours.',
    name: 'Your name',
    phoneLabel: 'Phone number',
    phone: 'Your phone number',
    messageLabel: 'Message',
    message: 'Type your question',
    send: 'Send message',
    sending: 'Sending...',
    doneTitle: 'Message received',
    done: 'Our team will call you back as soon as possible during office hours (Mon–Sat, 09:00–18:00).',
    again: 'Send another message',
    failTitle: 'Message not sent',
    fail: 'Sorry, something went wrong on our side. Please message us on LINE instead — we reply during office hours.',
    invalid: 'Please check your phone number and leave out any links.',
    rateLimited: 'Too many messages in a short time. Please try again shortly or message us on LINE.',
    line: 'Message us on LINE @icacc',
    orLine: 'Or message us on LINE',
  },
} as const;

type Status = 'idle' | 'sending' | 'done' | 'failed';

export function ChatBubble() {
  const pathname = usePathname();
  const c = COPY[isEnglishPath(pathname) ? 'en' : 'th'];
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', message: '', website: '' });
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    // โฟกัสช่องแรกเฉพาะจอที่ใช้เมาส์ บนมือถือถ้าโฟกัสทันทีคีย์บอร์ดจะเด้งบังกล่องตั้งแต่ยังไม่ได้อ่าน
    if (window.matchMedia('(pointer: fine)').matches) firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function toggle() {
    if (!open) trackEvent('chat_open', { page_path: pathname });
    setOpen((v) => !v);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page: pathname }),
      });
      // เช็กทั้ง res.ok และ success ในเนื้อคำตอบ — fetch ไม่ throw เมื่อเซิร์ฟเวอร์ตอบ 4xx/5xx
      const json = (await res.json().catch(() => null)) as { success?: boolean; error?: string } | null;
      if (res.ok && json?.success) {
        trackEvent('generate_lead', { service: 'chat', page_path: pathname });
        setStatus('done');
        setForm({ name: '', phone: '', message: '', website: '' });
        return;
      }
      if (json?.error === 'invalid_fields') {
        setError(c.invalid);
        setStatus('idle');
        return;
      }
      if (json?.error === 'rate_limited') setError(c.rateLimited);
      setStatus('failed');
    } catch {
      setStatus('failed');
    }
  }

  const field =
    'w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-[15px] outline-none transition focus:border-[#2657c1] focus:bg-white focus:ring-2 focus:ring-[#2657c1]/20';

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={c.title}
          className="w-[calc(100vw-2rem)] max-w-[360px] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl bg-white shadow-[0_20px_60px_rgba(22,54,116,0.25)] border border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
        >
          <div className="relative bg-[#2657c1] px-6 pt-6 pb-16 text-white rounded-t-3xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
            {/* โลโก้เป็นแนวนอน ใส่วงกลมแล้วเล็กจนอ่านไม่ออก จึงใช้กล่องมุมมนแทน */}
            <div className="mb-4 inline-flex rounded-2xl bg-white px-4 py-2.5">
              <Image src={LOGO} alt="IC Accounting & Service" width={140} height={35} className="h-8 w-auto object-contain" />
            </div>
            <p className="text-xl font-black">{c.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{c.greeting}</p>
          </div>

          <div className="relative -mt-10 px-4 pb-5">
            <div className="rounded-2xl bg-white p-4 shadow-lg border border-border">
              {status === 'done' ? (
                <div className="py-4 text-center">
                  <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-500" />
                  <p className="font-black text-lg">{c.doneTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.done}</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-bold text-[#2657c1] hover:underline">
                    {c.again}
                  </button>
                </div>
              ) : status === 'failed' ? (
                <div className="py-4 text-center">
                  <p className="font-black text-lg">{c.failTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{error ?? c.fail}</p>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { method: 'line', source: 'chat_fallback' })}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-5 py-3 font-bold text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-5 w-5" /> {c.line}
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    ref={firstField}
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.name}
                    aria-label={c.name}
                    maxLength={100}
                    autoComplete="name"
                    className={field}
                  />
                  <label className="block">
                    <span className="mb-1 block text-sm text-muted-foreground">
                      {c.phoneLabel}<span className="text-red-500">*</span>
                    </span>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={c.phone}
                      maxLength={30}
                      autoComplete="tel"
                      inputMode="tel"
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-muted-foreground">
                      {c.messageLabel}<span className="text-red-500">*</span>
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={c.message}
                      maxLength={1000}
                      className={`${field} resize-none`}
                    />
                  </label>
                  {/* ช่องดักบอต — คนมองไม่เห็นและกดไม่ถึง */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2657c1] py-3 font-bold text-white transition hover:bg-[#1e47a3] disabled:opacity-70"
                  >
                    {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    {status === 'sending' ? c.sending : c.send}
                  </button>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { method: 'line', source: 'chat_bubble' })}
                    className="block text-center text-xs text-muted-foreground hover:text-[#2657c1]"
                  >
                    {c.orLine} @icacc
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#2657c1] text-white shadow-[0_8px_24px_rgba(38,87,193,0.35)] transition hover:bg-[#1e47a3] hover:shadow-[0_10px_30px_rgba(38,87,193,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2657c1]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
