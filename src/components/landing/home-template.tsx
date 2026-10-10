import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
// เปลี่ยนมาใช้เวอร์ชันที่มีเอฟเฟกต์ช่องมองเปิดตามการเลื่อน
// วิดีโอแนะนำทีมงานบน Wistia ยังกดแล้วค่อยโหลดเหมือนเดิม ไม่ได้เล่นเอง
// ไฟล์ video-section.tsx เดิมยังอยู่ในโปรเจกต์แต่ไม่ถูกเรียกใช้แล้ว ลบทิ้งได้
import { MaskRevealSection } from '@/components/landing/mask-reveal-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { BehindTheScenesSection } from '@/components/landing/behind-the-scenes-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { ActivitiesSection } from '@/components/landing/activities-section';
import { FaqSection } from '@/components/landing/faq-section';
import { Footer } from '@/components/landing/footer';
import { ClientsSection } from '@/components/landing/clients-section';
import { ServiceAreaSection } from '@/components/landing/service-area-section';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import type { HomeContent } from '@/components/landing/home-content';

/**
 * markup ของหน้าแรก ใช้ร่วมกันทั้ง / (ไทย) และ /en (อังกฤษ)
 *
 * ลำดับ section และดีไซน์จึงต่างกันไม่ได้ ต่างแค่ข้อความใน home-content.ts
 * lang ใส่ที่ <main> เฉพาะหน้าอังกฤษ เพราะ <html> ของทั้งเว็บเป็น lang="th"
 */
export function HomeTemplate({ c, lang }: { c: HomeContent; lang?: 'en' }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1" lang={lang}>
        <HeroSection c={c.hero} />
        <MaskRevealSection c={c.maskReveal} />
        <div data-aos="fade-up">
          <ClientsSection c={c.clients} />
        </div>
        <div data-aos="fade-up">
          <ServicesSection c={c.services} />
        </div>
        <div data-aos="fade-up">
          <PromoCarousel c={c.promo} />
        </div>
        <div data-aos="fade-up">
          <WhyUsSection c={c.whyUs} />
        </div>
        <div data-aos="fade-up">
          <BehindTheScenesSection c={c.behindTheScenes} />
        </div>
        <div data-aos="fade-up">
          <TestimonialsSection c={c.testimonials} />
        </div>
        <div data-aos="fade-up">
          <ActivitiesSection c={c.activities} />
        </div>
        {/* พื้นที่ให้บริการ — วางก่อน FAQ เพื่อให้คนที่เลื่อนมาถึงตรงนี้เห็นว่าเราดูแลถึงอำเภอไหนบ้าง */}
        <div data-aos="fade-up">
          <ServiceAreaSection c={c.serviceArea} />
        </div>
        <div data-aos="fade-up">
          <FaqSection c={c.faq} />
        </div>
        {/* CtaSection เดิมถูกถอดออก — ฟุตเตอร์ใหม่มีหัวข้อชวนติดต่อ + ปุ่ม LINE/โทร/นัดหมาย ครบแล้ว */}
      </main>
      <Footer />
    </div>
  );
}
