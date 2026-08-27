import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { BarChart, ShieldCheck, Users, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema, type Faq } from '@/lib/seo';

/**
 * ทุกคำตอบสรุปจาก solutions / steps / benefits ที่แสดงอยู่บนหน้านี้แล้ว
 * จึงผ่านเงื่อนไขของ Google ที่ว่าเนื้อหา FAQ ต้องมองเห็นได้จริงบนหน้า
 */
const faqs: Faq[] = [
  {
    q: 'การวางระบบองค์กรกับ IC มีกี่ขั้นตอน',
    a: 'สี่ขั้นตอน เริ่มจาก Audit & Analysis สำรวจขั้นตอนการทำงานปัจจุบันและหาจุดที่ต้องปรับปรุง ต่อด้วย Design & Tools ออกแบบ workflow ใหม่และเลือกซอฟต์แวร์ที่เหมาะกับขนาดธุรกิจ จากนั้น Implement & Training ติดตั้งระบบจริงพร้อมอบรมทีมงาน และปิดท้ายด้วย Support & Optimize ที่ติดตามผลและปรับแต่งระบบต่อเนื่อง',
  },
  {
    q: 'บริการนี้ครอบคลุมระบบอะไรบ้าง',
    a: 'สามส่วนหลัก ได้แก่ ระบบบัญชีและภาษีบน Cloud ที่เชื่อมหน้าบ้านกับหลังบ้านเข้าด้วยกัน ระบบควบคุมภายในที่ออกแบบผังการอนุมัติและการเช็คสต็อกสินค้า และระบบงานบุคคลและเงินเดือนตั้งแต่การลงเวลาทำงานจนถึงการยื่นประกันสังคม',
  },
  {
    q: 'ใช้โปรแกรมบัญชีตัวไหน',
    a: 'วางรากฐานการบันทึกบัญชีผ่านระบบ Cloud (Clero) ซึ่งเชื่อมโยงข้อมูลหน้าบ้านและหลังบ้านเข้าด้วยกัน ทำให้เจ้าของธุรกิจดูข้อมูลการเงินได้แบบ real-time',
  },
  {
    q: 'วางระบบแล้วธุรกิจได้อะไรที่จับต้องได้',
    a: 'ลดเวลางานเอกสารที่ซ้ำซ้อน เข้าถึงข้อมูลการเงินแบบ real-time ลดความเสี่ยงจากความผิดพลาดของคน ได้รายงานทางการเงินที่แม่นยำและทันเวลา และได้ระบบที่ scale ตามการเติบโตของธุรกิจได้',
  },
];

export const metadata: Metadata = {
  title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
  description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี วางขั้นตอนเอกสารให้เป็นระบบ เพื่อการเติบโตที่ยั่งยืน',
  alternates: { canonical: 'https://icaccservice.com/organization-system' },
  openGraph: {
    title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
    description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี',
    url: 'https://icaccservice.com/organization-system',
  },
};

const solutions = [
  {
    icon: <BarChart className="h-6 w-6" />,
    title: 'ระบบบัญชีและภาษี Cloud',
    desc: 'วางรากฐานการบันทึกบัญชีผ่านระบบ Cloud (Clero) เชื่อมโยงหน้าบ้านและหลังบ้านเข้าด้วยกันอย่างราบรื่น',
    tag: 'Cloud Accounting',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'ระบบควบคุมภายใน',
    desc: 'ออกแบบผังการอนุมัติ (Approval Flow) และการเช็คสต็อกสินค้า เพื่อป้องกันความผิดพลาดและการทุจริต',
    tag: 'Internal Control',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'ระบบงานบุคคลและเงินเดือน',
    desc: 'จัดระเบียบงาน HR ตั้งแต่การลงเวลาทำงาน จนถึงการจ่ายเงินเดือนและยื่นประกันสังคมอัตโนมัติ',
    tag: 'HR & Payroll',
  },
];

const steps = [
  { step: '01', title: 'Audit & Analysis', desc: 'สำรวจขั้นตอนการทำงานปัจจุบันและค้นหาจุดที่ต้องการการปรับปรุง (Pain Points)' },
  { step: '02', title: 'Design & Tools', desc: 'ออกแบบ workflow ใหม่และเลือกใช้ซอฟต์แวร์ที่เหมาะสมกับขนาดธุรกิจ' },
  { step: '03', title: 'Implement & Training', desc: 'ติดตั้งระบบจริง พร้อมจัดอบรมทีมงานให้ใช้งานได้อย่างชำนาญ' },
  { step: '04', title: 'Support & Optimize', desc: 'ติดตามผลและปรับแต่งระบบให้เสถียรที่สุดเพื่อการเติบโตในระยะยาว' },
];

const benefits = [
  'ลดเวลางานเอกสารที่ซ้ำซ้อน',
  'เข้าถึงข้อมูลการเงินแบบ Real-time',
  'ลดความเสี่ยงจากความผิดพลาดของมนุษย์',
  'ระบบที่ scale ได้ตามการเติบโตของธุรกิจ',
  'ทีมงานทำงานได้ง่ายและมีประสิทธิภาพขึ้น',
  'รายงานทางการเงินที่แม่นยำและทันเวลา',
];

export default function OrganizationSystemPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'บริการวางระบบบัญชีและระบบองค์กร เชียงใหม่',
            description:
              'วางระบบบัญชีและภาษีบน Cloud ระบบควบคุมภายใน และระบบงานบุคคลและเงินเดือน สำหรับธุรกิจในเชียงใหม่ ตั้งแต่สำรวจขั้นตอนงานปัจจุบัน ออกแบบ workflow ใหม่ ติดตั้งจริง อบรมทีมงาน ไปจนถึงติดตามผลระยะยาว',
            path: '/organization-system',
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บริการวางระบบองค์กร', path: '/organization-system' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main className="flex-1">
        <PromoCarousel />

        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl" data-aos="fade-up">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>วางระบบองค์กร</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Organization System</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              วางระบบองค์กร<br />และบัญชีดิจิทัล
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              ยกระดับธุรกิจด้วยระบบการจัดการที่แม่นยำ ลดความซ้ำซ้อน เข้าถึงข้อมูลแบบ Real-time เปลี่ยน "งานเอกสาร" ให้เป็น "กลยุทธ์"
            </p>
            <div className="flex flex-wrap gap-3">
              {['ระบบ Cloud-based', 'Real-time Data', 'ลดงาน Manual', 'ซัพพอร์ตหลังติดตั้ง'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Solutions</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">โซลูชันเพื่อการจัดการที่เหนือกว่า</h2>
              <p className="text-muted-foreground">ระบบที่ออกแบบมาเพื่อธุรกิจ SME ในยุคดิจิทัล</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {solutions.map((s, i) => (
                <div key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      {s.icon}
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <h3 className="font-black text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Benefits</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">ธุรกิจของคุณจะได้อะไร?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    เมื่อระบบหลังบ้านแข็งแกร่ง คุณจะมีเวลาโฟกัสกับสิ่งที่สำคัญจริงๆ — การเติบโตของธุรกิจ
                  </p>
                </div>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm" data-aos="fade-up">
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">Powered by</p>
                <h3 className="text-2xl font-black mb-3">ใช้งานร่วมกับ Clero</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  IC Accounting เป็นพาร์ทเนอร์กับ Clero ซอฟต์แวร์บัญชีรุ่นใหม่ที่ออกแบบมาสำหรับ SME ไทยโดยเฉพาะ เชื่อมโยงบัญชี ภาษี และการเงินไว้ในที่เดียว
                </p>
                <div className="space-y-3 mb-8">
                  {['Dashboard แบบ Real-time', 'ออกใบกำกับภาษีอิเล็กทรอนิกส์', 'เชื่อมต่อกับ e-Tax Invoice', 'รายงานทางการเงินอัตโนมัติ'].map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="https://line.me/R/ti/p/@icacc" target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 transition-all">
                  <MessageSquare className="h-4 w-4" /> สอบถามรายละเอียด
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Process</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">ขั้นตอนการพัฒนาระบบร่วมกับเรา</h2>
              <p className="text-muted-foreground">4 ขั้นตอนที่ออกแบบมาให้ราบรื่นที่สุด</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((item, i) => (
                <div key={item.step}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="relative bg-secondary/40 rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-5xl font-black text-primary/10 mb-4 leading-none">{item.step}</div>
                  <span className="text-primary text-xs font-bold">Step {item.step}</span>
                  <h4 className="font-black text-lg mt-1 mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 z-10 text-border">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">พร้อมยกระดับระบบหลังบ้านของคุณ?</h3>
                <p className="opacity-80 mb-8">ปรึกษาทีมงาน IC ฟรี เราจะวิเคราะห์ Pain Points และแนะนำระบบที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/quote"
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="https://line.me/R/ti/p/@icacc" target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
                    ติดต่อผ่าน Line
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceFaq
          faqs={faqs}
          title="คำถามที่พบบ่อยเรื่องวางระบบองค์กร"
          intro="สิ่งที่เจ้าของธุรกิจมักถามก่อนเริ่มโครงการวางระบบ"
        />

        <RelatedArticles
          slugs={[
            'sme-chiang-mai-accounting-guide',
            '5-common-accounting-mistakes-sme-chiangmai',
            'how-to-choose-accounting-office-chiangmai',
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
