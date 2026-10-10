'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { trackEvent } from '@/components/analytics/google-analytics';
import { BOOKING_SERVICES, BOOKING_TIMES, BOOKING_SERVICE_LABELS_EN } from '@/lib/booking-options';
import type { QuoteCopy } from './quote-copy';

/**
 * ฟอร์มนัดหมาย ใช้ร่วมกันทั้งหน้าไทย /quote และหน้าอังกฤษ /en/quote
 *
 * ── ค่าที่ส่งไป API เป็นภาษาไทยเสมอ ไม่ว่าหน้าจะเป็นภาษาอะไร ──
 * ป้ายอังกฤษใช้แค่แสดงผล แต่ value ของ radio ยังเป็นสตริงไทยใน BOOKING_SERVICES
 * เพราะด่านตรวจใน /api/booking เทียบกับรายการไทย และเพราะแจ้งเตือนที่เข้า LINE
 * กับอีเมลของทีมงานต้องเป็นภาษาไทยให้อ่านงานได้ทันที
 */
export default function QuoteClient({ copy, basePath }: { copy: QuoteCopy; basePath: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const handleSubmit = async () => {
    const name = (document.getElementById('cust_name') as HTMLInputElement).value;
    const phone = (document.getElementById('cust_phone') as HTMLInputElement).value;
    const note = (document.getElementById('cust_note') as HTMLTextAreaElement).value;
    const date = (document.getElementById('booking_date') as HTMLInputElement).value;
    const time = (document.getElementById('booking_time') as HTMLSelectElement).value;
    const serviceEl = document.querySelector('input[name="service_type"]:checked') as HTMLInputElement;
    const service = serviceEl ? serviceEl.value : '';

    if (!name || !phone || !date || !time || !service) {
      alert(copy.incomplete);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, date, time, note }),
      });

      /**
       * ต้องเช็ก res.ok ด้วย — fetch จะ throw เฉพาะตอนเน็ตขาดเท่านั้น
       * ถ้าเซิร์ฟเวอร์ตอบ 500 หรือ 502 กลับมา fetch ถือว่า "สำเร็จ"
       *
       * โค้ดเดิมเรียก setIsSuccess(true) ทันทีหลัง await จึงขึ้นว่าจองสำเร็จเสมอ
       * แม้แจ้งเตือนจะไม่เคยไปถึง LINE — ลูกค้าไม่รู้ ทีมงานก็ไม่รู้
       */
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('[booking] ส่งข้อมูลไม่สำเร็จ', res.status, data);
        alert(copy.failed);
        return;
      }

      // นัดหมายสำเร็จ = lead จริง ใช้ชื่อ event มาตรฐานของ GA4 ตั้งเป็น key event ได้เลย
      trackEvent('generate_lead', { service, page_path: basePath });
      setIsSuccess(true);
    } catch (error) {
      console.error('[booking] เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', error);
      alert(copy.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50">
      <Header />
      <main className="flex-1" lang={copy.htmlLang}>
        <section className="min-h-screen py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{copy.h1}</h1>
              <p className="text-gray-500">{copy.intro}</p>
            </div>

            {isSuccess ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{copy.successTitle}</h2>
                <p className="text-gray-500 mb-8">{copy.successBody}</p>
                <button onClick={() => setIsSuccess(false)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  {copy.successAgain}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                      {copy.step1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* รายการอยู่ที่ src/lib/booking-options.ts ที่เดียว
                          ฝั่ง API ใช้รายการเดียวกันเป็นด่านตรวจ ค่าจึงไม่มีทางหลุดจากกัน */}
                      {BOOKING_SERVICES.map((s) => (
                        <label key={s} className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition">
                          <input type="radio" name="service_type" value={s} className="w-4 h-4 text-blue-600" />
                          <span className="ml-3 font-medium text-slate-700">{copy.htmlLang === 'en' ? BOOKING_SERVICE_LABELS_EN[s] : s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                      {copy.step2}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">{copy.dateLabel}</label>
                        <input type="date" id="booking_date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">{copy.timeLabel}</label>
                        <select id="booking_time" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900">
                          <option value="">{copy.timePlaceholder}</option>
                          {BOOKING_TIMES.map((t) => (
                            <option key={t} value={t}>{t.replace('-', ' - ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 sticky top-24">
                    <h3 className="text-lg font-bold mb-6 text-slate-900">{copy.contactTitle}</h3>
                    <div className="space-y-4">
                      <input type="text" id="cust_name" placeholder={copy.namePlaceholder} className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" />
                      <input type="tel" id="cust_phone" placeholder={copy.phonePlaceholder} className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" />
                      <textarea id="cust_note" placeholder={copy.notePlaceholder} className="w-full p-3 border rounded-lg text-sm h-24 outline-none focus:border-blue-500 text-slate-900"></textarea>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? copy.submitting : copy.submit}
                      </button>
                      <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-sans">IC Accounting & Service Team</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}