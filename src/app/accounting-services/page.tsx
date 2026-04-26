import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'รับทำบัญชีเชียงใหม่ เริ่ม 2,500/เดือน | IC Accounting',
  description: 'รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสาร บันทึกบัญชี ยื่นภาษีรายเดือน โดยทีมมืออาชีพ ประสบการณ์กว่า 10 ปี',
  alternates: { canonical: 'https://icaccservice.com/accounting-services' },
  openGraph: {
    title: 'รับทำบัญชีเชียงใหม่ เริ่ม 2,500/เดือน | IC Accounting',
    description: 'รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสาร บันทึกบัญชี ยื่นภาษีรายเดือน',
    url: 'https://icaccservice.com/accounting-services',
  },
};

const packages = [
  {
    size: 'S',
    name: 'Basic Package',
    price: '2,500',
    tag: 'สำหรับธุรกิจเริ่มต้น',
    description: 'เหมาะสำหรับธุรกิจขนาดเล็กที่เริ่มจัดระบบบัญชี',
    limit: 'ไม่เกิน 20 รายการ/เดือน',
    color: 'from-blue-400 to-blue-500',
    details: [
      'บันทึกรายการค้า (สมุดรายวันซื้อ, ขาย, รับ, จ่าย, ทั่วไป)',
      'จัดทำและยื่นภาษี (ภ.พ.30, ภ.ง.ด.1, 3, 53)',
      'จัดทำและยื่นประกันสังคม',
      'ให้คำปรึกษาทางบัญชีและภาษี (Line, โทรศัพท์)',
    ],
  },
  {
    size: 'M',
    name: 'Standard Package',
    price: '6,000',
    tag: 'ยอดนิยม',
    description: 'เหมาะสำหรับธุรกิจที่ต้องการทีมซัพพอร์ตและข้อมูลเชิงลึกมากขึ้น',
    limit: 'ไม่เกิน 60 รายการ/เดือน',
    color: 'from-blue-500 to-indigo-500',
    highlight: true,
    details: [
      'ทุกอย่างในแพ็กเกจ S',
      'จัดทำรายงานภาษีซื้อ-ภาษีขายประจำเดือน',
      'จัดทำหนังสือรับรองหัก ณ ที่จ่าย (e-Withholding Tax)',
      'จัดทำและนำส่งงบการเงินครึ่งปี (ภ.ง.ด.51)',
      'ให้คำปรึกษาเชิงลึกพร้อมวิเคราะห์ข้อมูลเบื้องต้น',
    ],
  },
  {
    size: 'L',
    name: 'Pro Package',
    price: '12,000',
    tag: 'ครบวงจร',
    description: 'เหมาะสำหรับธุรกิจที่ไม่มีเวลาจัดการเอกสารและต้องการความครบถ้วน',
    limit: 'ไม่เกิน 120 รายการ/เดือน',
    color: 'from-indigo-500 to-violet-500',
    details: [
      'ทุกอย่างในแพ็กเกจ M',
      'บริการรับ-ส่งเอกสาร (ในพื้นที่เชียงใหม่)',
      'จัดทำและนำส่งงบการเงินประจำปี (ภ.ง.ด.50)',
      'เข้าพบให้คำปรึกษาที่สำนักงานลูกค้า (ไตรมาสละ 1 ครั้ง)',
      'วางแผนภาษีบุคคลธรรมดาและนิติบุคคลประจำปี',
    ],
  },
  {
    size: 'XL',
    name: 'Pro Max Package',
    price: '24,000',
    tag: 'Enterprise',
    description: 'เหมาะสำหรับธุรกิจทุกขนาดที่ต้องการความต่อเนื่องและตรวจสอบได้',
    limit: 'มากกว่า 120 รายการ/เดือน',
    color: 'from-violet-500 to-purple-600',
    details: [
      'ทุกอย่างในแพ็กเกจ L',
      'ไม่จำกัดจำนวนครั้งในการให้คำปรึกษา',
      'วางระบบบัญชีภายในและควบคุมภายในเบื้องต้น',
      'ติดต่อประสานงานกับผู้สอบบัญชีรับอนุญาต',
      'เป็นตัวแทนพบเจ้าหน้าที่สรรพากร (กรณีมีหนังสือเชิญพบ)',
    ],
  },
];

const included = [
  'ไม่มีค่าธรรมเนียมแอบแฝง',
  'ทีมงานพร้อมตอบผ่าน Line ทุกวัน',
  'อัปเดตกฎหมายภาษีตลอดปี',
  'ปรึกษาฟรีก่อนตัดสินใจ',
];

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PromoCarousel />

        {/* ── HERO ── */}
        <section className="animate-gradient text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>บริการทำบัญชี</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Accounting Services</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              รับทำบัญชีเชียงใหม่<br />ครบวงจร เริ่ม 2,500/เดือน
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              ดูแลครบวงจรตั้งแต่ลงบัญชี ยื่นภาษี จนถึงปิดงบฯ เราให้คุณมากกว่าแค่ตัวเลข เสมือนมี CFO ส่วนตัวอยู่เคียงข้างธุรกิจคุณ
            </p>
            <div className="flex flex-wrap gap-3">
              {included.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing Plans</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">เลือกแพ็กเกจที่เหมาะกับธุรกิจคุณ</h2>
              <p className="text-muted-foreground">ทุกแพ็กเกจรวมค่าบริการครบถ้วน ไม่มีค่าใช้จ่ายซ่อนเร้น</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.name}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pkg.highlight ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'}`}>

                  {pkg.highlight && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-black px-3 py-1 rounded-full z-10">
                      ⭐ {pkg.tag}
                    </div>
                  )}

                  {/* Header gradient */}
                  <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white`}>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{!pkg.highlight ? pkg.tag : ''}</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-6xl font-black">{pkg.size}</span>
                        </div>
                        <p className="font-bold text-lg mt-1">{pkg.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs mb-1">เริ่มต้น</p>
                        <p className="text-3xl font-black">฿{pkg.price}</p>
                        <p className="text-white/70 text-xs">ต่อเดือน</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-white/10 rounded-full px-4 py-1.5 inline-block">
                      <p className="text-xs font-medium">{pkg.limit}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="bg-card p-8">
                    <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm transition-all ${pkg.highlight ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}>
                      <MessageSquare className="h-4 w-4" /> ขอใบเสนอราคา
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">ไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับคุณ?</h3>
                <p className="opacity-80 mb-8">ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย เราช่วยแนะนำแพ็กเกจที่คุ้มค่าที่สุดสำหรับธุรกิจของคุณ</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/quote"
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
                    ติดต่อผ่าน Line
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