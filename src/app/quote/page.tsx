
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function QuotePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-6 max-w-5xl">
                
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">นัดหมายปรึกษาผู้เชี่ยวชาญ</h1>
                    <p className="text-gray-500">เลือกบริการและเวลาที่คุณสะดวก เพื่อพูดคุยกับทีมงาน IC Accounting & Service</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100" data-aos="fade-up">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                                เลือกประเภทบริการ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition group">
                                    <input type="radio" name="service_type" value="accounting" className="w-4 h-4 text-blue-600" required />
                                    <span className="ml-3 font-medium text-slate-700">วางแผนบัญชีและภาษี</span>
                                </label>
                                <label className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition">
                                    <input type="radio" name="service_type" value="registration" className="w-4 h-4 text-blue-600" />
                                    <span className="ml-3 font-medium text-slate-700">จดทะเบียนธุรกิจ</span>
                                </label>
                                <label className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition">
                                    <input type="radio" name="service_type" value="consult" className="w-4 h-4 text-blue-600" />
                                    <span className="ml-3 font-medium text-slate-700">ปรึกษาการเงิน/ที่ปรึกษาธุรกิจ</span>
                                </label>
                                <label className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-blue-50 transition">
                                    <input type="radio" name="service_type" value="media" className="w-4 h-4 text-blue-600" />
                                    <span className="ml-3 font-medium text-slate-700">Exclusive Media Production</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                                เลือกวันและเวลาที่สะดวก
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">เลือกวันที่</label>
                                    <input type="date" id="booking_date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">เลือกช่วงเวลา</label>
                                    <select id="booking_time" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" required>
                                        <option value="">เลือกเวลา</option>
                                        <option value="09:00">09:00 - 10:00</option>
                                        <option value="10:30">10:30 - 11:30</option>
                                        <option value="13:30">13:30 - 14:30</option>
                                        <option value="15:00">15:00 - 16:00</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 sticky top-24" data-aos="fade-left">
                            <h3 className="text-lg font-bold mb-6 text-slate-900">ข้อมูลผู้ติดต่อ</h3>
                            <div className="space-y-4">
                                <input type="text" id="cust_name" placeholder="ชื่อ-นามสกุล" className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" required />
                                <input type="tel" id="cust_phone" placeholder="เบอร์โทรศัพท์" className="w-full p-3 border rounded-lg text-sm outline-none focus:border-blue-500 text-slate-900" required />
                                <textarea id="cust_note" placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)" className="w-full p-3 border rounded-lg text-sm h-24 outline-none focus:border-blue-500 text-slate-900"></textarea>
                                
                                <button id="btnConfirmBooking" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
                                    ยืนยันการนัดหมาย
                                </button>
                                <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-sans">IC Accounting & Service Team</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
