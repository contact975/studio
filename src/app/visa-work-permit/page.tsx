import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, BadgeHelp, Star, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema, type Faq } from '@/lib/seo';

/**
 * หน้านี้ = ฝั่งภาษาไทย สำหรับ "นายจ้าง" ที่ต้องขอ Work Permit ให้พนักงานต่างชาติ
 * หน้าคู่กันคือ /expat-services = ภาษาอังกฤษ สำหรับตัวชาวต่างชาติเอง
 *
 * เดิมสองหน้านี้ตั้ง title เป็นภาษาอังกฤษเหมือนกันทั้งคู่ ("...Chiang Mai")
 * ทำให้แย่งคีย์เวิร์ดกันเอง และหน้านี้ยิ่งสับสนเพราะ meta เป็นอังกฤษ
 * แต่เนื้อหาในหน้าเป็นภาษาไทย — Google อ่านแล้วไม่รู้ว่าจะจัดให้ใคร
 *
 * แยกภาษาให้ชัดแล้ว: หน้านี้ไทยล้วน จับคำค้นฝั่งนายจ้างซึ่งค้นเป็นภาษาไทย
 * ซึ่งจากการสำรวจ SERP ยังไม่มีเจ้าไหนในเชียงใหม่จับตลาดนี้จริงจัง
 */
export const metadata: Metadata = {
  title: 'รับทำ Work Permit และวีซ่าทำงาน เชียงใหม่ | IC Accounting',
  description:
    'สำนักงานบัญชีเชียงใหม่ รับยื่นขอ Work Permit และวีซ่า Non-B ให้พนักงานต่างชาติ ดูแลตั้งแต่เอกสารบริษัทจนถึงต่ออายุปีถัดไป ทีมสื่อสารภาษาอังกฤษได้ ปรึกษาฟรี',
  alternates: {
    canonical: 'https://icaccservice.com/visa-work-permit',
    languages: {
      th: 'https://icaccservice.com/visa-work-permit',
      en: 'https://icaccservice.com/expat-services',
    },
  },
  openGraph: {
    title: 'รับทำ Work Permit และวีซ่าทำงาน เชียงใหม่ | IC Accounting',
    description:
      'รับยื่นขอ Work Permit และวีซ่า Non-B ให้พนักงานต่างชาติ โดยสำนักงานบัญชีที่ดูแลงบการเงินของบริษัทนายจ้างได้ในทีมเดียว',
    url: 'https://icaccservice.com/visa-work-permit',
    locale: 'th_TH',
  },
};

/**
 * คำตอบทุกข้ออ้างอิงจากบริการที่ระบุไว้บนหน้านี้แล้ว
 * ตั้งใจไม่ระบุตัวเลขเงื่อนไขทางกฎหมาย (ทุนจดทะเบียน / สัดส่วนพนักงานไทย)
 * เพราะขึ้นกับประเภทกิจการและมีการเปลี่ยนแปลงได้ — ให้ทีมงานประเมินเป็นเคสไป
 */
const faqs: Faq[] = [
  {
    q: 'รับทำ Work Permit ที่เชียงใหม่ ครอบคลุมอะไรบ้าง?',
    a: 'ดำเนินการขอใบอนุญาตทำงานให้พนักงานต่างชาติ รวมถึงการเปลี่ยนแปลงข้อมูลนายจ้าง และการแจ้งออกตามระเบียบของกรมการจัดหางาน โดยดูแลให้ครบตั้งแต่เตรียมเอกสารจนถึงยื่นแทน',
  },
  {
    q: 'Non-B Visa กับ Work Permit ต่างกันอย่างไร ต้องมีทั้งคู่ไหม?',
    a: 'วีซ่า Non-B คือสิทธิ์ในการพำนักอยู่ในประเทศไทยเพื่อทำธุรกิจ ออกโดยสำนักงานตรวจคนเข้าเมือง ส่วน Work Permit คือใบอนุญาตทำงาน ออกโดยกรมการจัดหางาน ชาวต่างชาติที่จะทำงานในไทยอย่างถูกกฎหมายต้องมีทั้งสองอย่างควบคู่กัน',
  },
  {
    q: 'บริษัทต้องเตรียมอะไรก่อนขอ Work Permit ให้พนักงานต่างชาติ?',
    a: 'โดยทั่วไปต้องใช้เอกสารของบริษัทนายจ้าง เช่น หนังสือรับรอง งบการเงิน และข้อมูลพนักงาน ส่วนเงื่อนไขเรื่องทุนจดทะเบียนและสัดส่วนพนักงานไทยจะแตกต่างกันตามประเภทกิจการและอาจมีการปรับเปลี่ยน แนะนำให้ปรึกษาทีมงานเพื่อประเมินเป็นรายกรณีก่อนยื่น',
  },
  {
    q: 'ทำไมถึงควรใช้สำนักงานบัญชี แทนที่จะใช้เอเจนซี่วีซ่าทั่วไป?',
    a: 'เพราะเอกสารที่ใช้ประกอบการขอและต่อ Work Permit ส่วนใหญ่มาจากงบการเงินและระบบบัญชีของบริษัทนายจ้าง เมื่อทีมเดียวกันดูแลทั้งบัญชี ภาษี และวีซ่า เอกสารจะสอดคล้องกันตั้งแต่ต้น และการต่ออายุในปีถัดๆ ไปก็ราบรื่นกว่า',
  },
  {
    q: 'มีทีมที่สื่อสารภาษาอังกฤษกับพนักงานต่างชาติได้ไหม?',
    a: 'มีครับ ทีมงานสื่อสารภาษาอังกฤษได้และประสานงานกับเจ้าหน้าที่แทนคุณ หากพนักงานต่างชาติต้องการอ่านข้อมูลเป็นภาษาอังกฤษเอง สามารถดูได้ที่หน้า IC Expat Services',
  },
  {
    q: 'ให้คำปรึกษาเรื่อง LTR หรือ SMART Visa ด้วยไหม?',
    a: 'มีบริการที่ปรึกษาสำหรับวีซ่าระยะยาวประเภทพิเศษ ทั้ง LTR และ SMART Visa สำหรับกลุ่มผู้เชี่ยวชาญ นักลงทุน และ Digital Nomad',
  },
];

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
      <JsonLd
        data={[
          serviceSchema({
            name: 'รับทำ Work Permit และวีซ่าทำงานเชียงใหม่',
            description:
              'บริการยื่นขอใบอนุญาตทำงาน (Work Permit) และวีซ่า Non-Immigrant B ให้พนักงานต่างชาติในเชียงใหม่ ครอบคลุมการเปลี่ยนแปลงข้อมูลนายจ้าง การแจ้งออก และให้คำปรึกษาวีซ่าระยะยาว LTR และ SMART Visa โดยทีมที่ดูแลบัญชีและงบการเงินของบริษัทนายจ้างได้ในทีมเดียว',
            path: '/visa-work-permit',
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'Visa & Work Permit', path: '/visa-work-permit' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main className="flex-1">
        <PromoCarousel />

        {/* ── HERO ── */}
        <section className="relative bg-[#163674] py-24 md:py-32 text-primary-foreground overflow-hidden">
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
          <div className="container mx-auto px-6 relative z-10 max-w-4xl" data-aos="fade-up">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>Visa & Work Permit</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Visa &amp; Work Permit</p>
            {/* H1 ต้องเป็นภาษาไทยและมีคำว่า "เชียงใหม่" เพราะหน้านี้เล็งคำค้นฝั่งนายจ้าง
                ซึ่งค้นเป็นภาษาไทย ของเดิมเป็น "Visa & Work Permit Chiang Mai" ล้วน
                ซึ่งไปทับกับหน้า /expat-services ที่เป็นภาษาอังกฤษอยู่แล้ว
                คำว่า Work Permit คงไว้เพราะคนไทยพิมพ์ทับศัพท์กันจริง */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              รับทำ Work Permit เชียงใหม่<br />และวีซ่าทำงานต่างชาติ
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
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Services</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">บริการ Visa & Work Permit</h2>
              <p className="text-muted-foreground">ครอบคลุมทุกประเภทวีซ่าสำหรับชาวต่างชาติในเชียงใหม่</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s, i) => (
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

        {/* ── WHY US ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why Choose IC</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">ทำไมต้องเลือกใช้บริการกับเรา?</h2>
                </div>
                <div className="space-y-4">
                  {whyUs.map((item, i) => (
                    <div key={item.num} data-aos="fade-up" data-aos-delay={i * 100} className="flex gap-4 bg-background rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors">
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

              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm" data-aos="fade-up">
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

        {/* ── FAQ ── */}
        <ServiceFaq
          faqs={faqs}
          title="คำถามที่พบบ่อยเรื่อง Work Permit และวีซ่าทำงาน"
          intro="รวมคำถามที่นายจ้างในเชียงใหม่ถามเราบ่อยที่สุดก่อนจ้างพนักงานต่างชาติ"
        />

        {/* ── สะพานไปหน้าภาษาอังกฤษ ── */}
        <section className="pb-4" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/40 px-6 py-5">
              <p className="text-sm md:text-base text-muted-foreground" lang="en">
                Are you the foreign employee? Read this page in English.
              </p>
              <Link
                href="/expat-services"
                hrefLang="en"
                className="inline-flex items-center gap-2 shrink-0 font-bold text-primary hover:underline"
              >
                <span lang="en">IC Expat Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── บทความที่เกี่ยวข้อง ── */}
        <RelatedArticles
          slugs={['work-permit-chiangmai', 'company-registration-chiangmai', 'corporate-tax-chiangmai-guide']}
        />

        {/* ── CTA ── */}
        <section className="py-16" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">พร้อมเริ่มขั้นตอน Work Permit แล้วหรือยัง?</h3>
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
