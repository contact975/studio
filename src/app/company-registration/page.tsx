import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { PromoCarousel } from '@/components/landing/promo-carousel';

export const metadata: Metadata = {
  title: 'จดทะเบียนบริษัทเชียงใหม่ เริ่ม 9,000 | IC Accounting',
  description: 'รับจดทะเบียนบริษัทและห้างหุ้นส่วนในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง รวดเร็ว ถูกต้อง',
  alternates: { canonical: 'https://icaccservice.com/company-registration' },
  openGraph: {
    title: 'จดทะเบียนบริษัทเชียงใหม่ เริ่ม 9,000 | IC Accounting',
    description: 'รับจดทะเบียนบริษัทและห้างหุ้นส่วนในเชียงใหม่ ครบทุกขั้นตอน รวดเร็ว ถูกต้อง',
    url: 'https://icaccservice.com/company-registration',
  },
};

const packages = [
  {
    type: 'Partnership',
    name: 'ห้างหุ้นส่วน',
    price: '6,000',
    originalPrice: '9,000',
    tag: 'เริ่มต้นง่าย',
    color: 'from-blue-400 to-blue-500',
    description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว',
  },
  {
    type: 'Company',
    name: 'บริษัทจำกัด',
    price: '12,000',
    originalPrice: '15,000',
    tag: 'แนะนำ',
    color: 'from-indigo-500 to-violet-500',
    highlight: true,
    description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว',
  },
];

const newSetupItems = [
  'จดทะเบียนบริษัทจำกัด / ห้างหุ้นส่วนจำกัด',
  'ขอหนังสือรับรอง และเอกสารสำคัญของบริษัท',
  'ขึ้นทะเบียนนายจ้าง (ประกันสังคม)',
  'จดทะเบียนภาษีมูลค่าเพิ่ม (VAT)',
];

const changeItems = [
  { num: '01', label: 'เปลี่ยนแปลงชื่อบริษัท/ตราประทับ' },
  { num: '02', label: 'เพิ่ม/ลดทุนจดทะเบียน' },
  { num: '03', label: 'เปลี่ยนแปลงกรรมการ/ที่ตั้งสำนักงาน' },
  { num: '04', label: 'จดทะเบียนเลิกและชำระบัญชี' },
];

const steps = [
  { num: '1', title: 'ให้คำปรึกษา', desc: 'วิเคราะห์ประเภทธุรกิจและวางแผนโครงสร้างผู้ถือหุ้น' },
  { num: '2', title: 'เตรียมเอกสาร', desc: 'รวบรวมข้อมูลและเซ็นเอกสารผ่านระบบออนไลน์หรือที่สำนักงาน' },
  { num: '3', title: 'ได้รับเอกสาร', desc: 'รับหนังสือรับรองบริษัทและเปิดบัญชีธนาคารได้ทันที' },
];

export default function CompanyRegistrationPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
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
              <span>จดทะเบียนนิติบุคคล</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Company Registration</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              จดทะเบียนบริษัทเชียงใหม่<br />ครบวงจร เริ่ม 9,000 บาท
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              เริ่มต้นธุรกิจอย่างมั่นใจ บริการจดทะเบียนบริษัทและห้างหุ้นส่วนแบบครบวงจร ให้คุณเริ่มต้นก้าวแรกได้อย่างถูกต้องและรวดเร็ว
            </p>
            <div className="flex flex-wrap gap-3">
              {['ครบวงจรในที่เดียว', 'ราคารวมค่าธรรมเนียมแล้ว', 'รวดเร็ว 1-3 วันทำการ', 'ปรึกษาฟรีก่อนตัดสินใจ'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">แพ็กเกจบริการจดทะเบียน</h2>
              <p className="text-muted-foreground">ราคารวมค่าบริการและค่าธรรมเนียมทั้งหมดแล้ว ไม่มีค่าใช้จ่ายแอบแฝง</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg, i) => (
                <div key={pkg.name}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pkg.highlight ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'}`}>
                  {pkg.highlight && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-black px-3 py-1 rounded-full z-10">
                      ⭐ {pkg.tag}
                    </div>
                  )}
                  <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white`}>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{pkg.type}</span>
                    <h3 className="text-3xl font-black mt-2 mb-4">{pkg.name}</h3>
                    <div className="flex items-end gap-3">
                      <div>
                        <p className="text-white/50 text-sm line-through mb-1">฿{pkg.originalPrice}</p>
                        <p className="text-4xl font-black">฿{pkg.price}</p>
                      </div>
                      <p className="text-white/70 text-sm mb-1">ราคาเหมาทุกอย่าง</p>
                    </div>
                  </div>
                  <div className="bg-card p-8">
                    <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
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

        {/* ── NEW SETUP + CHANGES ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">New Setup</p>
                  <h2 className="text-3xl font-black mb-4">จดทะเบียนธุรกิจใหม่</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    เราช่วยดูแลตั้งแต่การจองชื่อนิติบุคคล จัดเตรียมเอกสารข้อบังคับบริษัท จนถึงการยื่นจดทะเบียนต่อกรมพัฒนาธุรกิจการค้า (DBD) พร้อมให้คำปรึกษาเรื่องโครงสร้างผู้ถือหุ้นและทุนจดทะเบียน
                  </p>
                </div>
                <ul className="space-y-3">
                  {newSetupItems.map((item, i) => (
                    <li key={i} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Changes</p>
                  <h2 className="text-3xl font-black mb-4">บริการเปลี่ยนแปลงทางทะเบียน</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    สำหรับการขยายธุรกิจหรือการปรับปรุงโครงสร้างนิติบุคคล
                  </p>
                </div>
                <div className="space-y-3">
                  {changeItems.map((item, i) => (
                    <div key={item.num} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-4 bg-background rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
                      <span className="font-black text-primary text-sm w-8 flex-shrink-0">{item.num}.</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Process</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">เริ่มต้นธุรกิจใน 1-3 วันทำการ</h2>
              <p className="text-muted-foreground">เราจัดการทุกขั้นตอนให้คุณพร้อมดำเนินธุรกิจได้ทันที</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="relative bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all text-center">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black">
                    {step.num}
                  </div>
                  <h4 className="font-black text-xl mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-border">
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
                <h3 className="text-2xl md:text-3xl font-black mb-3">พร้อมเริ่มต้นธุรกิจของคุณแล้วหรือยัง?</h3>
                <p className="opacity-80 mb-8">ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย เราช่วยแนะนำโครงสร้างที่เหมาะสมให้คุณ</p>
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
