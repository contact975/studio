import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, BadgeHelp, Star, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { PromoCarousel } from '@/components/landing/promo-carousel';

export const metadata: Metadata = {
  title: 'Visa & Work Permit Chiang Mai | IC Accounting',
  description: 'Professional Visa and Work Permit services in Chiang Mai. Non-B Visa, Work Permit, LTR & SMART Visa. English-speaking team, 100% accuracy.',
  alternates: { canonical: 'https://icaccservice.com/visa-work-permit' },
  openGraph: {
    title: 'Visa & Work Permit Chiang Mai | IC Accounting',
    description: 'Professional Visa and Work Permit services in Chiang Mai. English-speaking team, 100% accuracy.',
    url: 'https://icaccservice.com/visa-work-permit',
  },
};

const services = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Non-Immigrant B Visa',
    desc: 'บริการยื่นขอและต่ออายุวีซ่าธุรกิจ สำหรับชาวต่างชาติที่เข้ามาทำงานหรือประกอบธุรกิจในไทย',
    tag: 'Business Visa',
  },
  {
    icon: <BadgeHelp className="h-6 w-6" />,
    title: 'Work Permit',
    desc: 'ดำเนินการขอใบอนุญาตทำงาน เปลี่ยนแปลงข้อมูลนายจ้าง หรือแจ้งออกตามระเบียบกรมการจัดหางาน',
    tag: 'Work Authorization',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: 'LTR & SMART Visa',
    desc: 'บริการที่ปรึกษาสำหรับวีซ่าระยะยาวประเภทพิเศษ สำหรับผู้เชี่ยวชาญ นักลงทุน หรือกลุ่ม Digital Nomad',
    tag: 'Long-term Visa',
  },
];

const whyUs = [
  { num: '01', title: 'ภาษาไม่ใช่ปัญหา', desc: 'เรามีทีมงานที่สื่อสารภาษาอังกฤษได้อย่างคล่องแคล่ว พร้อมประสานงานกับเจ้าหน้าที่แทนคุณ' },
  { num: '02', title: 'ความถูกต้อง 100%', desc: 'ตรวจสอบเอกสารอย่างละเอียด ลดโอกาสการถูกปฏิเสธจากกองตรวจคนเข้าเมือง' },
  { num: '03', title: 'บริการครบวงจร', desc: 'เชื่อมต่อกับบริการบัญชีและภาษี ช่วยให้การต่อวีซ่าในปีต่อๆ ไปทำได้อย่างราบรื่น' },
];

export default function VisaWorkPermitPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PromoCarousel />

        {/* ── HERO ── */}
        <section className="relative animate-gradient py-24 md:py-32 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 opacity-15">
            <Image
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000"
              fill
              className="object-cover"
              alt="Thailand Visa documents"
            />
          </div>
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>Visa & Work Permit</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Expat Services</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Visa & Work Permit<br />Chiang Mai
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              ช่วยให้การพำนักและทำงานในประเทศไทยเป็นเรื่องง่าย เราดูแลทุกขั้นตอนอย่างมืออาชีพ เพื่อให้คุณโฟกัสกับธุรกิจและชีวิตในเชียงใหม่ได้อย่างเต็มที่
            </p>
            <div className="flex flex-wrap gap-3">
              {['English-speaking Team', 'ความถูกต้อง 100%', 'ครบทุกประเภทวีซ่า', 'ปรึกษาฟรีก่อนตัดสินใจ'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Services</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">บริการ Visa & Work Permit</h2>
              <p className="text-muted-foreground">ครอบคลุมทุกประเภทวีซ่าสำหรับชาวต่างชาติในเชียงใหม่</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div key={i}
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

        {/* ── WHY US ── */}
        <section className="py-24 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why Choose IC</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">ทำไมต้องเลือกใช้บริการกับเรา?</h2>
                </div>
                <div className="space-y-4">
                  {whyUs.map((item) => (
                    <div key={item.num} className="flex gap-4 bg-background rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-sm">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-black text-base mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">Free Consultation</p>
                <h3 className="text-2xl font-black mb-3">ปรึกษาเรื่องวีซ่าฟรีวันนี้</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  ไม่แน่ใจว่าต้องใช้วีซ่าประเภทไหน? ทีมงาน IC พร้อมให้คำแนะนำที่ถูกต้องและตรงกับสถานการณ์ของคุณ
                </p>
                <div className="space-y-3">
                  <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 transition-all">
                    <MessageSquare className="h-4 w-4" /> ติดต่อผ่าน Line
                  </Link>
                  <Link href="/quote"
                    className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary font-bold py-3 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all">
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">Ready to Start Your Thailand Journey?</h3>
                <p className="opacity-80 mb-8">เราพร้อมดูแลทุกขั้นตอนให้คุณ ตั้งแต่เอกสารจนถึงการยื่นคำร้อง</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/quote"
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
                    Contact via Line
                  </Link>
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