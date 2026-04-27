import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, ShieldCheck, BadgeCheck, Zap, ArrowRight, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ปิดงบการเงินเชียงใหม่ ถูกต้อง ทันกำหนด | IC Accounting',
  description: 'บริการตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากร ดูแลโดยทีมงานเชียงใหม่ที่อัปเดตกฎหมายสม่ำเสมอ',
  alternates: { canonical: 'https://icaccservice.com/audit-services' },
  openGraph: {
    title: 'ปิดงบการเงินเชียงใหม่ ถูกต้อง ทันกำหนด | IC Accounting',
    description: 'บริการตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากร',
    url: 'https://icaccservice.com/audit-services',
  },
};

const auditServices = [
  {
    title: "ตรวจสอบงบการเงินประจำปี",
    description: "ตรวจสอบและแสดงความเห็นต่องบการเงินเพื่อให้เป็นไปตามมาตรฐานการรายงานทางการเงิน (TFRS)",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "ตรวจสอบกรณีพิเศษ (Special Audit)",
    description: "ตรวจสอบตามวัตถุประสงค์เฉพาะด้าน เช่น การตรวจสอบทุจริต หรือตรวจสอบตามเงื่อนไขของ BOI",
    icon: <BadgeCheck className="h-6 w-6" />,
  },
  {
    title: "ตรวจสอบภายใน (Internal Audit)",
    description: "ประเมินระบบการควบคุมภายในขององค์กร เพื่อลดความเสี่ยงและเพิ่มประสิทธิภาพการทำงาน",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "จัดทำงบกระแสเงินสด",
    description: "บริการจัดเตรียมข้อมูลและวิเคราะห์งบกระแสเงินสดเพื่อการบริหารจัดการเงินทุนอย่างมีประสิทธิภาพ",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

const whyChooseUs = [
  { num: '01', title: "ทีมงาน CPA มืออาชีพ", description: "ดูแลโดยผู้สอบบัญชีรับอนุญาต (CPA) ที่มีประสบการณ์ตรงในหลากหลายอุตสาหกรรม" },
  { num: '02', title: "ตรงไปตรงมา", description: "ชี้แจงทุกประเด็นความเสี่ยงอย่างชัดเจน พร้อมแนวทางแก้ไขที่ถูกต้องตามกฎหมาย" },
  { num: '03', title: "ทำงานรวดเร็ว", description: "มีระบบการจัดการเอกสารที่เป็นระบบ (Digital Based) ช่วยให้งานตรวจสอบจบได้ตามกำหนด" },
];

const pricingData = [
  { revenue: "งบเปล่า", price: "15,000" },
  { revenue: "รายได้ไม่เกิน 5 แสนบาท", price: "16,000" },
  { revenue: "รายได้ไม่เกิน 1 ล้านบาท", price: "16,500" },
  { revenue: "รายได้ไม่เกิน 1.5 ล้านบาท", price: "17,000" },
  { revenue: "รายได้ไม่เกิน 2 ล้านบาท", price: "18,000" },
  { revenue: "รายได้ไม่เกิน 2.5 ล้านบาท", price: "20,000" },
  { revenue: "รายได้ไม่เกิน 5 ล้านบาท", price: "22,000" },
  { revenue: "รายได้ไม่เกิน 9 ล้านบาท", price: "25,000" },
  { revenue: "รายได้ไม่เกิน 15 ล้านบาท", price: "27,000" },
  { revenue: "รายได้ไม่เกิน 20 ล้านบาท", price: "30,000" },
  { revenue: "รายได้ไม่เกิน 30 ล้านบาท", price: "32,000" },
  { revenue: "รายได้ไม่เกิน 40 ล้านบาท", price: "35,000" },
  { revenue: "รายได้ไม่เกิน 50 ล้านบาท", price: "38,000" },
  { revenue: "รายได้ไม่เกิน 60 ล้านบาท", price: "43,000" },
  { revenue: "รายได้ไม่เกิน 70 ล้านบาท", price: "49,000" },
  { revenue: "รายได้ไม่เกิน 80 ล้านบาท", price: "55,000" },
  { revenue: "รายได้ไม่เกิน 90 ล้านบาท", price: "60,000" },
  { revenue: "รายได้ไม่เกิน 100 ล้านบาท", price: "65,000" },
];

export default function AuditServicesPage() {
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
              <span>บริการตรวจสอบบัญชี</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Audit Services</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              ปิดงบการเงินเชียงใหม่<br />ถูกต้อง ทันกำหนด
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              สร้างความเชื่อมั่นในงบการเงินของคุณ ด้วยการตรวจสอบที่แม่นยำ ตามมาตรฐานการสอบบัญชีที่รับรองโดยสภาวิชาชีพบัญชี
            </p>
            <div className="flex flex-wrap gap-3">
              {['ตรวจสอบโดย CPA', 'รายงานตามมาตรฐานสากล', 'ให้คำปรึกษาลดความเสี่ยง', 'ราคาโปร่งใส'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">What We Do</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">ให้มากกว่าแค่การลงลายมือชื่อ</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    เราไม่ได้เพียงแค่ตรวจสอบความถูกต้อง แต่เราช่วยค้นหาจุดอ่อนในระบบควบคุมภายใน เพื่อให้ผู้ประกอบการนำไปปรับปรุงธุรกิจได้จริง
                  </p>
                </div>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all">
                  <MessageSquare className="h-4 w-4" /> ขอใบเสนอราคาตรวจสอบบัญชี
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auditServices.map((service, index) => (
                  <div key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="bg-secondary/40 rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="font-black text-base mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">ราคาตรวจสอบบัญชีประจำปี</h2>
              <p className="text-muted-foreground">ราคาโปร่งใสตามฐานรายได้ ไม่มีค่าธรรมเนียมแอบแฝง</p>
            </div>

            <div className="bg-background rounded-3xl shadow-xl overflow-hidden border border-border">
              <div className="bg-primary text-primary-foreground p-5 text-center font-black text-lg">
                ประมาณการค่าธรรมเนียมตามเกณฑ์รายได้
              </div>
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead className="text-center font-black text-foreground h-14 text-base">รายการรายได้</TableHead>
                    <TableHead className="text-center font-black text-foreground h-14 text-base">ราคาเริ่มต้น (บาท)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData.map((row, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <TableCell className="text-center py-4 font-medium text-muted-foreground">{row.revenue}</TableCell>
                      <TableCell className="text-center py-4 font-black text-primary text-lg">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-6 text-center border-t border-border bg-secondary/20">
                <p className="text-sm text-muted-foreground mb-4 italic">
                  * ราคาเริ่มต้น อาจเปลี่ยนแปลงตามความซับซ้อนของรายการค้า<br />
                  รบกวนส่งไฟล์งบการเงินให้เจ้าหน้าที่ประเมินราคาที่แน่นอนอีกครั้งค่ะ
                </p>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  สอบถามราคาสำหรับธุรกิจของคุณ
                </Link>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                { title: "ประหยัดภาษีได้จริง", desc: "เราแนะนำการวางแผนภาษีที่ถูกต้องเพื่อให้คุณเสียภาษีอย่างคุ้มค่าที่สุด" },
                { title: "ถูกต้องตามกฎหมาย", desc: "มั่นใจได้ 100% ว่างบการเงินผ่านการตรวจสอบตามมาตรฐานสภาวิชาชีพ" },
                { title: "ซัพพอร์ตตลอดปี", desc: "ไม่ได้แค่ตรวจสอบแล้วจบ แต่เราพร้อมเป็นที่ปรึกษาให้คุณตลอดอายุสัญญา" },
              ].map((item, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="bg-background rounded-2xl p-6 border border-border text-center hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why IC</p>
              <h2 className="text-3xl md:text-4xl font-black">ทำไมผู้ประกอบการจึงเลือก IC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyChooseUs.map((item, i) => (
                <div key={item.num} data-aos="fade-up" data-aos-delay={i * 100} className="bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-6xl font-black text-primary/10 mb-4 leading-none">{item.num}</div>
                  <h3 className="font-black text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
                <h3 className="text-2xl md:text-3xl font-black mb-3">พร้อมปิดงบให้ถูกต้องและทันกำหนด?</h3>
                <p className="opacity-80 mb-8">ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย พร้อมประเมินราคาให้ตรงกับธุรกิจของคุณ</p>
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
