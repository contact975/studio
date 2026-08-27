import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema, type Faq } from '@/lib/seo';

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

/**
 * คำถามชุดนี้เขียนจากคำค้นจริงใน Search Console ที่หน้านี้ควรรับผิดชอบ
 * แต่ยังติดอันดับ 20-28 (หน้า 3) จึงยังไม่เคยได้คลิกเลย:
 *   รับทำบัญชี เชียงใหม่ (59 impressions) · รับทําบัญชี เชียงใหม่ (11)
 *   รับ ทํา บัญชี เชียงใหม่ (3) · รับปิดงบเปล่า เชียงใหม่ (11)
 *
 * คำตอบทุกข้ออ้างอิงจากรายละเอียดแพ็กเกจที่อยู่บนหน้านี้แล้ว
 * ไม่ได้เพิ่มข้อเสนอหรือคำสัญญาใหม่
 */
const faqs: Faq[] = [
  {
    q: 'รับทำบัญชีเชียงใหม่ ราคาเริ่มต้นเท่าไหร่?',
    a: 'เริ่มต้น 2,500 บาทต่อเดือน สำหรับแพ็กเกจ Basic ที่รองรับไม่เกิน 20 รายการต่อเดือน เหมาะกับธุรกิจขนาดเล็กที่เพิ่งเริ่มจัดระบบบัญชี ราคาไม่มีค่าธรรมเนียมแอบแฝง',
  },
  {
    q: 'แพ็กเกจ S M L XL ต่างกันอย่างไร?',
    a: 'แบ่งตามจำนวนรายการค้าต่อเดือนเป็นหลัก คือไม่เกิน 20, 60, 120 และมากกว่า 120 รายการตามลำดับ ยิ่งแพ็กเกจใหญ่ขึ้นจะเพิ่มบริการเชิงลึก เช่น รายงานภาษีซื้อ-ขายรายเดือน งบการเงินครึ่งปีและประจำปี บริการรับ-ส่งเอกสาร และการเข้าพบให้คำปรึกษาถึงที่',
  },
  {
    q: 'ค่าบริการรวมการยื่นภาษีและประกันสังคมด้วยไหม?',
    a: 'รวมตั้งแต่แพ็กเกจเริ่มต้น ครอบคลุมการบันทึกรายการค้าครบทุกสมุดรายวัน การจัดทำและยื่นภาษี ภ.พ.30 ภ.ง.ด.1 ภ.ง.ด.3 ภ.ง.ด.53 รวมถึงการจัดทำและนำส่งประกันสังคม',
  },
  {
    q: 'ปิดงบการเงินประจำปีรวมอยู่ในแพ็กเกจไหม?',
    a: 'งบการเงินครึ่งปี (ภ.ง.ด.51) รวมอยู่ตั้งแต่แพ็กเกจ M ส่วนงบการเงินประจำปี (ภ.ง.ด.50) รวมอยู่ตั้งแต่แพ็กเกจ L ขึ้นไป และในแพ็กเกจ XL เรายังประสานงานกับผู้สอบบัญชีรับอนุญาตให้ด้วย',
  },
  {
    q: 'มีบริการรับ-ส่งเอกสารถึงที่ไหม?',
    a: 'มีในแพ็กเกจ L ขึ้นไป สำหรับลูกค้าในพื้นที่เชียงใหม่ และในแพ็กเกจ L ยังรวมการเข้าพบให้คำปรึกษาที่สำนักงานลูกค้าไตรมาสละ 1 ครั้ง',
  },
  {
    q: 'ถ้าถูกสรรพากรเรียกพบ ช่วยดูแลไหม?',
    a: 'ในแพ็กเกจ Pro Max เราเป็นตัวแทนเข้าพบเจ้าหน้าที่สรรพากรให้ในกรณีที่มีหนังสือเชิญพบ พร้อมให้คำปรึกษาแบบไม่จำกัดจำนวนครั้ง',
  },
];

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'รับทำบัญชีเชียงใหม่',
            description:
              'บริการรับทำบัญชีรายเดือนสำหรับธุรกิจในเชียงใหม่ ครอบคลุมการบันทึกรายการค้า จัดทำและยื่นภาษี ภ.พ.30 ภ.ง.ด.1 ภ.ง.ด.3 ภ.ง.ด.53 ประกันสังคม จนถึงปิดงบการเงินครึ่งปีและประจำปี',
            path: '/accounting-services',
            offers: [
              { name: 'Basic Package (S)', price: '2500', description: 'ไม่เกิน 20 รายการ/เดือน' },
              { name: 'Standard Package (M)', price: '6000', description: 'ไม่เกิน 60 รายการ/เดือน' },
              { name: 'Pro Package (L)', price: '12000', description: 'ไม่เกิน 120 รายการ/เดือน' },
              { name: 'Pro Max Package (XL)', price: '24000', description: 'มากกว่า 120 รายการ/เดือน' },
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บริการทำบัญชี', path: '/accounting-services' },
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
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing Plans</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">เลือกแพ็กเกจที่เหมาะกับธุรกิจคุณ</h2>
              <p className="text-muted-foreground">ทุกแพ็กเกจรวมค่าบริการครบถ้วน ไม่มีค่าใช้จ่ายซ่อนเร้น</p>
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
                    <Link href="https://line.me/R/ti/p/@icacc" target="_blank"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm transition-all ${pkg.highlight ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}>
                      <MessageSquare className="h-4 w-4" /> ขอใบเสนอราคา
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFaq
          faqs={faqs}
          title="คำถามที่พบบ่อยเรื่องรับทำบัญชี"
          intro="รวมคำถามที่เจ้าของธุรกิจในเชียงใหม่ถามเราบ่อยที่สุดก่อนเริ่มใช้บริการ"
        />

        {/* ── บทความที่เกี่ยวข้อง ── */}
        <RelatedArticles
          slugs={[
            'accounting-fee-chiangmai',
            'how-to-choose-accounting-office-chiangmai',
            '5-common-accounting-mistakes-sme-chiangmai',
            'tax-document-preparation-tips',
          ]}
        />

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40" data-aos="fade-up">
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
                  <Link href="https://line.me/R/ti/p/@icacc" target="_blank"
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
