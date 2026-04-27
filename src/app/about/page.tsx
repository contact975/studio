import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | IC Accounting & Service เชียงใหม่',
  description: 'รู้จัก IC Accounting & Service สำนักงานบัญชียุคใหม่เชียงใหม่ ก่อตั้งโดยคุณจตุพร ยะเปียงปลูก ประสบการณ์กว่า 10 ปี',
  alternates: { canonical: 'https://icaccservice.com/about' },
};

const timeline = [
  {
    year: '2557–2559',
    title: 'จุดเริ่มต้น — Internal Auditor',
    desc: 'เริ่มต้นสายงานในฐานะผู้ตรวจสอบบัญชีภายใน 3 ปี สร้างรากฐานความละเอียดรอบคอบ และความเข้าใจในระบบการควบคุมภายในองค์กร',
    tag: 'Foundation',
    color: 'bg-blue-500',
  },
  {
    year: '2560–2561',
    title: 'โลก Startup — Finance & Accounting Officer',
    desc: 'ก้าวเข้าสู่โลกธุรกิจ Startup ในเชียงใหม่ สัมผัสความรวดเร็ว ความคล่องตัว และ Mindset ของนักธุรกิจยุคใหม่ที่ต้องการข้อมูลแบบ Real-time',
    tag: 'Growth',
    color: 'bg-indigo-500',
  },
  {
    year: '2565',
    title: 'ก้าวแรกของตัวเอง — Freelance Accountant',
    desc: 'ด้วยประสบการณ์กว่า 5 ปี ตัดสินใจเริ่มรับงานบัญชีอิสระ ด้วยสไตล์คนรุ่นใหม่ที่เน้นความถูกต้อง แม่นยำ และสื่อสารเข้าใจง่าย จนลูกค้าบอกต่อเป็นวงกว้าง',
    tag: 'Independence',
    color: 'bg-violet-500',
  },
  {
    year: '2 ก.ค. 2568',
    title: 'IC Accounting & Service จดทะเบียนอย่างเป็นทางการ',
    desc: 'รองรับฐานลูกค้ากว่า 100 ราย และยกระดับการบริการให้ครอบคลุมยิ่งขึ้น ผนึกกำลังกับคุณบรรลือศักดิ์ จินดากุล ผู้เชี่ยวชาญด้านมีเดีย สู่ One Stop Service เต็มรูปแบบ',
    tag: 'Official Launch',
    color: 'bg-primary',
  },
];

const values = [
  { title: 'Modern & Partner Mindset', desc: 'ทำงานเหมือนเป็นพาร์ทเนอร์ในทีม พร้อมให้คำปรึกษาที่เข้าใจง่าย ไม่ใช้ศัพท์เทคนิค' },
  { title: 'One Stop Solution', desc: 'ดูแลครบวงจรในที่เดียว ตั้งแต่บัญชี ภาษี จดทะเบียน Visa ไปจนถึง Media Content' },
  { title: 'Action Oriented', desc: 'เน้นการลงพื้นที่จริง (Consult) เพื่อวางระบบหลังบ้านที่เหมาะสมกับธุรกิจของคุณ' },
  { title: 'Creative Thinking', desc: 'สำนักงานบัญชีที่เข้าใจการตลาด พร้อมช่วยผลิต Media Content เพื่ออัปเกรดแบรนด์' },
];

const services = [
  { label: 'Accounting & Tax', desc: 'รับทำบัญชีรายเดือน ปิดงบประจำปี และวางแผนภาษี' },
  { label: 'Business Registration', desc: 'บริการจดทะเบียนบริษัทและห้างหุ้นส่วน' },
  { label: 'Expat Services', desc: 'ดูแลเรื่อง Visa และ Work Permit สำหรับชาวต่างชาติ' },
  { label: 'Organization System', desc: 'วางระบบหลังบ้าน สอนใช้งานโปรแกรมบัญชี' },
  { label: 'Creative Media', desc: 'รับผลิตวิดีโอและกราฟิกเพื่อการตลาดออนไลน์' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative bg-[#163674] text-primary-foreground py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-70">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              จากความฝันของคนคนหนึ่ง<br />สู่สำนักงานบัญชียุคใหม่
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              เรื่องราวของ IC Accounting & Service ไม่ได้เริ่มจากสำนักงานใหญ่โต แต่เริ่มจากความเชื่อที่ว่า "บัญชีไม่ควรเป็นเรื่องยาก"
            </p>
          </div>
        </section>

        {/* ── FOUNDER STORY ── */}
        <section className="py-24 container mx-auto px-6 max-w-6xl" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://live.staticflickr.com/65535/55057964151_2951cd7360_b.jpg"
                  alt="คุณจตุพร ยะเปียงปลูก ผู้ก่อตั้ง IC Accounting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-xl">คุณจตุพร ยะเปียงปลูก</p>
                  <p className="text-white/70 text-sm">ผู้ก่อตั้ง & CEO · IC Accounting & Service</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg text-sm font-bold">
                ประสบการณ์ 10+ ปี
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">The Founder</p>
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  "ไอซ์" — บัณฑิตบัญชี<br />ที่เชื่อว่าตัวเลขคือโอกาส
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                คุณจตุพร ยะเปียงปลูก หรือ "ไอซ์" บัณฑิตคณะบริหารธุรกิจ สาขาการบัญชี มหาวิทยาลัยแม่โจ้ (รุ่นที่ 78) เริ่มต้นเส้นทางสายบัญชีอย่างจริงจัง ด้วยความเชื่อว่าระบบบัญชีที่ดีคือรากฐานของทุกธุรกิจที่เติบโต
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ผ่านมาแล้วทั้งองค์กรขนาดใหญ่และ Startup ที่เต็มไปด้วยความเคลื่อนไหว ทำให้ไอซ์เข้าใจความต้องการ of นักธุรกิจทุกระดับได้อย่างลึกซึ้ง และนำมาออกแบบบริการที่ "เหมาะกับชีวิตจริง" ของเจ้าของธุรกิจยุคใหม่
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2">
                <p className="text-lg italic text-foreground font-medium">
                  "บัญชีไม่ควรเป็นเรื่องที่เข้าใจยากหรือเป็นภาระของเจ้าของธุรกิจ"
                </p>
                <p className="text-sm text-muted-foreground mt-2">— คุณจตุพร ยะเปียงปลูก</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Journey</p>
              <h2 className="text-3xl md:text-4xl font-black">เส้นทางกว่าจะมาเป็น IC</h2>
              <p className="text-muted-foreground mt-3">ทุกประสบการณ์ล้วนหล่อหลอมให้เราเป็นในแบบที่เราเป็นวันนี้</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <div key={i} className="md:flex gap-8 items-start" data-aos="fade-up" data-aos-delay={i * 100}>
                    {/* Dot */}
                    <div className="hidden md:flex flex-col items-center flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${item.color} ring-4 ring-background shadow-lg mt-1`} />
                    </div>
                    {/* Card */}
                    <div className="flex-1 bg-background rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full text-white ${item.color} mb-2`}>
                            {item.tag}
                          </span>
                          <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                        </div>
                        <span className="text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CO-FOUNDER ── */}
        <section className="py-24 container mx-auto px-6 max-w-6xl" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Co-Founder</p>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  ผนึกกำลังกับ<br />ผู้เชี่ยวชาญด้านมีเดีย
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                ความพิเศษของ IC Accounting คือการจับมือกับ <strong>พาร์ทเนอร์ ทีมโปรดัคชั่น</strong> ผู้เชี่ยวชาญที่มีประสบการณ์สูงด้านมีเดียสื่อออนไลน์และออฟไลน์
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ทำให้เราไม่ได้เป็นเพียงสำนักงานบัญชีทั่วไป แต่คือ <strong>One Stop Service</strong> ที่พร้อมสนับสนุนธุรกิจทั้งในด้านการวางรากฐานบัญชีภาษี และการเสริมภาพลักษณ์ผ่านงานมีเดียคุณภาพสูง
              </p>
              <div className="flex flex-wrap gap-3">
                {['บัญชี & ภาษี', 'จดทะเบียนธุรกิจ', 'Visa & Work Permit', 'Media Content'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-black text-primary">IC</span>
                  </div>
                  <h3 className="text-xl font-black">IC Accounting & Service</h3>
                  <p className="text-muted-foreground text-sm mt-1">จดทะเบียน 2 กรกฎาคม 2568</p>
                </div>
                <div className="space-y-3">
                  {services.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-sm">{s.label}</span>
                        <span className="text-muted-foreground text-sm"> — {s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why Choose IC</p>
              <h2 className="text-3xl md:text-4xl font-black">สิ่งที่ทำให้เราแตกต่าง</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-lg mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-black text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION + CTA ── */}
        <section className="py-24 container mx-auto px-6 max-w-4xl text-center" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-black mb-6">ภารกิจของเรา</h2>
          <blockquote className="text-xl md:text-2xl italic text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            "ส่งมอบความสบายใจให้เจ้าของธุรกิจ ด้วยระบบบัญชีที่เป๊ะ และบริการที่เป็นมากกว่าคู่สัญญา แต่คือเพื่อนคู่คิดที่ช่วยคุณปั้นผลกำไรให้เติบโตอย่างยั่งยืน"
          </blockquote>

          <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-4">พร้อมให้เราดูแลธุรกิจของคุณแล้วหรือยัง?</h3>
              <p className="opacity-80 mb-8 text-lg">ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงาน IC พร้อมดูแลคุณทุกวัน</p>
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
        </section>

      </main>
      <Footer />
    </div>
  );
}
