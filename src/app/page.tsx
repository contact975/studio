'use client';

import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { VideoSection } from '@/components/landing/video-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { BehindTheScenesSection } from '@/components/landing/behind-the-scenes-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { ActivitiesSection } from '@/components/landing/activities-section';
import { FaqSection } from '@/components/landing/faq-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { ClientsSection } from '@/components/landing/clients-section';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/seo';

/**
 * FAQPage ของหน้าแรก — ย้ายมาจาก app/layout.tsx
 *
 * ตอนอยู่ใน layout มันติดไปทุกหน้าในเว็บ ทั้งที่คำถามชุดนี้แสดงอยู่บนหน้าแรก
 * หน้าเดียว ซึ่งผิดข้อกำหนดของ Google (เนื้อหา FAQ ต้องให้ผู้ใช้เห็นบนหน้านั้น)
 * ย้ายมาไว้ที่นี่จึงถูกต้อง และไม่ไปชนกับ FAQPage ของหน้าบริการแต่ละหน้า
 *
 * คำถามทั้ง 3 ข้อนี้แสดงอยู่จริงใน <FaqSection /> ด้านล่าง
 */
const homeFaqs = [
  {
    q: 'ทำบัญชีเชียงใหม่ที่ไหนดี?',
    a: 'IC Accounting Service คือสำนักงานบัญชีเชียงใหม่ที่เชี่ยวชาญด้านการรับทำบัญชีครบวงจร วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่มีประสบการณ์กว่า 10 ปี',
  },
  {
    q: 'จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?',
    a: 'การจดทะเบียนบริษัทกับ IC Accounting ปกติจะใช้เวลาเพียง 1-3 วันทำการ หลังจากเตรียมเอกสารครบถ้วน เราดูแลตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง',
  },
  {
    q: 'ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?',
    a: 'ค่าบริการเริ่มต้นในราคาที่เหมาะสมสำหรับ SME พิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd data={faqSchema(homeFaqs)} />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <VideoSection />
        <div data-aos="fade-up">
          <ClientsSection />
        </div>
        <div data-aos="fade-up">
          <ServicesSection />
        </div>
        <div data-aos="fade-up">
          <PromoCarousel />
        </div>
        <div data-aos="fade-up">
          <WhyUsSection />
        </div>
        <div data-aos="fade-up">
          <BehindTheScenesSection />
        </div>
        <div data-aos="fade-up">
          <TestimonialsSection />
        </div>
        <div data-aos="fade-up">
          <ActivitiesSection />
        </div>
        <div data-aos="fade-up">
          <FaqSection />
        </div>
        <div data-aos="fade-up">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
