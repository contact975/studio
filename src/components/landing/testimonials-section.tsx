"use client";

import * as React from "react";
import Script from 'next/script';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function TestimonialsSection() {
  useEffect(() => {
    // ตรวจสอบว่า AOS เริ่มต้นทำงานหรือยัง
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#f2f7f4]">
      <div className="container mx-auto px-4 md:px-6">
        {/* ส่วนหัวข้อตามภาพตัวอย่าง */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-[#0d2a23]">
            สำนักงานบัญชีที่ไม่ทิ้ง ไม่เท ไม่โกงคุณ
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            มากกว่า 300 บริษัทและหจก.ที่ไว้วางใจ และใช้บริการกับ IC Accounting & Service
          </p>
        </div>

        {/* ส่วนแสดงรีวิวจาก Google Maps ผ่าน Trustindex Widget */}
        <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-7xl mx-auto overflow-hidden">
          {/* 
            วิดเจ็ตของ Trustindex จะทำการแทรกตัวเองเข้าไปในตำแหน่งที่มีสคริปต์นี้อยู่
            โดยจะดึงข้อมูลรีวิวล่าสุดจาก Google Maps มาแสดงผลในรูปแบบ Carousel ตามที่ตั้งค่าไว้
          */}
          <div className="trustindex-widget-container min-h-[300px]">
            <Script 
              src="https://cdn.trustindex.io/loader.js?582ed80703c7161ab7966834ee1" 
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
