'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function QuoteClient() {
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
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
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
        alert(
          'ระบบบันทึกนัดหมายไม่สำเร็จ กรุณาติดต่อเราทาง LINE @374jshvh โดยตรง ' +
          'ขออภัยในความไม่สะดวกครับ'
        );
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('[booking] เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทาง LINE @374jshvh');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="min-h-screen py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">นัดหมายปรึกษาผู้เชี่ยวชาญ</h1>
              <p className="text-gray-500">เลือกบริการและเวลาที่คุณสะดวก เพื่อพูดคุยกับทีมงาน IC Accounting & Service</p>
            </div>

            {isSuccess ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">ยืนยันการนัดหมายเรียบร้อยแล้ว!</h2>
                <p className="text-gray-500 mb-8">ทีมงาน IC Accounting จะติดต่อกลับภายใน 24 ชั่วโมง</p>
                <button onClick={() => setIsSuccess(false)} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  นัดหมายเพิ่มเติม
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                      เลือกประเภทบริการ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'วางแผนบัญชีและภาษี',
                        'จดทะเบียนธุรกิจ',
                        // เพิ่มเข้ามาให้ตรงกับหน้า /expat-services และ /visa-work-permit
                        // ใส่ทั้งคำไทยและอังกฤษในบรรทัดเดียว เพราะหน้านี้เป็นภาษาไทย
                        // แต่ผู้กรอกบางส่วนเป็นชาวต่างชาติที่รู้จักเฉพาะคำว่า Visa / Work Permit
                        'Visa & Work Permit (วีซ่าและใบอนุญาตทำงาน)',
                        'ปรึกษาการเงิน/ที่ปรึกษาธุรกิจ',
                        'Exclusive Media Production',
                      ].map((s) => (
                        <label key={s} className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition">
                          <input type="radio" name="service_type" value={s} className="w-4 h-4 text-blue-600" />
                          <span className="ml-3 font-medium text-slate-700">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                      เลือกวันและเวลาที่สะดวก
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">เลือกวันที่</label>
                        <input type="date" id="booking_date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">เลือกช่วงเวลา</label>
                        <select id="booking_time" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900">
                          <option value="">เลือกเวลา</option>
                          <option value="09:00-10:00">09:00 - 10:00</option>
                          <option value="10:30-11:30">10:30 - 11:30</option>
                          <option value="13:30-14:30">13:30 - 14:30</option>
                          <option value="15:00-16:00">15:00 - 16:00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 sticky top-24">
                    <h3 className="text-lg font-bold mb-6 text-slate-900">ข้อมูลผู้ติดต่อ</h3>
                    <div className="space-y-4">
                      <input type="text" id="cust_name" placeholder="ชื่อ-นามสกุล" className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" />
                      <input type="tel" id="cust_phone" placeholder="เบอร์โทรศัพท์" className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" />
                      <textarea id="cust_note" placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)" className="w-full p-3 border rounded-lg text-sm h-24 outline-none focus:border-blue-500 text-slate-900"></textarea>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'กำลังส่ง...' : 'ยืนยันการนัดหมาย'}
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