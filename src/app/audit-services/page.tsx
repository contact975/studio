import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { AuditPricing } from '@/components/landing/audit-pricing';
import { AUDIT_TIERS, AUDIT_ONLY, BUNDLE } from '@/lib/audit-packages';
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  UserCheck,
  Users,
  CalendarDays,
  CalendarCheck,
  BadgeCheck,
  Info,
  HelpCircle,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema, type Faq } from '@/lib/seo';

/**
 * หน้าบริการตรวจสอบบัญชี — รอบบัญชีปี 2569
 *
 * เขียนให้ลูกค้าทั่วไปเข้าใจง่าย: มีให้เลือก 2 แบบ
 *   1) ตรวจสอบอย่างเดียว — "คุณทำบัญชีเอง เราตรวจและปิดงบให้" (เริ่ม 6,000/ปี)
 *   2) ครบวงจร — "เราทำบัญชีให้ทั้งปี แล้วปิดงบให้เสร็จ" (เริ่ม 12,000/ปี)
 * ตัวเลขทั้งหมดอยู่ที่ lib/audit-packages.ts — ถ้าแก้ราคาที่นั่น ต้องแก้ faqs และ metadata ด้านล่างให้ตรงกัน
 */
export const metadata: Metadata = {
  title: 'ปิดงบการเงินเชียงใหม่ ตรวจสอบโดย CPA เริ่ม 6,000/ปี | IC Accounting',
  description:
    'ตรวจสอบบัญชีและปิดงบประจำปีในเชียงใหม่โดยผู้สอบบัญชีรับอนุญาต ยื่น DBD และสรรพากรให้ครบ เริ่ม 6,000 บาท/ปี หรือแพ็กเกจครบวงจรทำบัญชี + ตรวจสอบ เริ่ม 12,000 บาท/ปี ราคารวม VAT',
  alternates: { canonical: 'https://icaccservice.com/audit-services' },
  openGraph: {
    title: 'ปิดงบการเงินเชียงใหม่ ตรวจสอบโดย CPA เริ่ม 6,000/ปี | IC Accounting',
    description: 'ตรวจสอบอย่างเดียว เริ่ม 6,000/ปี · ครบวงจร ทำบัญชี + ตรวจสอบ เริ่ม 12,000/ปี ราคารวม VAT',
    url: 'https://icaccservice.com/audit-services',
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

const heroChips = ['ตรวจโดยผู้สอบบัญชีรับอนุญาต (CPA)', 'ยื่น DBD และสรรพากรให้ครบ', 'ราคารวม VAT ตามช่วงรายได้', 'งบเปล่าก็รับทำ'];

const whyChooseUs = [
  { num: '01', title: 'ทีมงาน CPA มืออาชีพ', description: 'ดูแลโดยผู้สอบบัญชีรับอนุญาต (CPA) ที่มีประสบการณ์ตรงในหลากหลายอุตสาหกรรม' },
  { num: '02', title: 'บอกตรงๆ ว่าเจออะไร', description: 'ชี้แจงทุกประเด็นความเสี่ยงอย่างชัดเจน พร้อมแนวทางแก้ไขที่ถูกต้องตามกฎหมาย' },
  { num: '03', title: 'ทันกำหนดทุกปี', description: 'ระบบจัดการเอกสารแบบดิจิทัล ช่วยให้งานตรวจสอบและยื่นงบเสร็จตามกำหนด ไม่เสียค่าปรับ' },
];

/**
 * คำถามชุดนี้ต้องแสดงบนหน้าเว็บจริงผ่าน <ServiceFaq /> ด้านล่าง
 * ทุกคำตอบอ้างอิงตัวเลขและเงื่อนไขในเอกสารราคาเท่านั้น ไม่ได้แต่งเพิ่ม
 * (คำค้นเป้าหมาย: ปิดงบการเงิน เชียงใหม่ · รับปิดงบเปล่า เชียงใหม่ · ตรวจสอบบัญชี เชียงใหม่)
 */
const faqs: Faq[] = [
  {
    q: 'ค่าตรวจสอบบัญชีประจำปีเริ่มต้นเท่าไหร่?',
    a: 'ถ้าคุณมีคนทำบัญชีอยู่แล้วและต้องการแค่ผู้สอบบัญชีตรวจและปิดงบ เริ่มต้น 6,000 บาทต่อปีสำหรับงบเปล่า และ 6,900 บาทสำหรับรายได้ไม่เกิน 500,000 บาท ราคารวมภาษีมูลค่าเพิ่มแล้ว คิดตามช่วงรายได้ต่อปี ดูตารางเต็มได้ในหน้านี้',
  },
  {
    q: 'ตรวจสอบอย่างเดียว กับ แพ็กเกจครบวงจร ต่างกันอย่างไร?',
    a: 'ตรวจสอบอย่างเดียว เหมาะกับกิจการที่ทำบัญชีเองหรือมีสำนักงานบัญชีอยู่แล้ว เราตรวจสอบ รับรองงบ และยื่นให้ตอนสิ้นปี ส่วนแพ็กเกจครบวงจร เราทำบัญชีและยื่นภาษีให้ทุกเดือนตลอดปี แล้วปิดงบพร้อมผู้สอบบัญชีให้เสร็จในราคาเดียว เริ่ม 12,000 บาทต่อปี',
  },
  {
    q: 'บริษัทที่ยังไม่มีรายได้ ต้องตรวจสอบงบการเงินไหม?',
    a: 'ต้องทำ นิติบุคคลที่จดทะเบียนแล้วต้องนำส่งงบการเงินที่ผ่านการตรวจสอบทุกปี แม้ปีนั้นไม่มีรายการเลย เรียกว่างบเปล่า ค่าบริการตรวจสอบอย่างเดียว 6,000 บาท หรือแบบครบวงจร 12,000 บาทต่อปี รวม VAT',
  },
  {
    q: 'ถ้าเลือกตรวจสอบอย่างเดียว ต้องเตรียมอะไรให้บ้าง?',
    a: 'กิจการเป็นผู้จัดทำบัญชีและนำส่งงบทดลอง บัญชีแยกประเภท พร้อมเอกสารประกอบให้ครบถ้วน หากเอกสารไม่ครบหรือต้องปรับปรุงบัญชีใหม่ อาจมีค่าบริการเพิ่มเติมตามที่ตกลงกัน',
  },
  {
    q: 'ชำระค่าบริการอย่างไร?',
    a: 'ตรวจสอบอย่างเดียว ชำระ 50% เมื่อตกลงรับงาน และส่วนที่เหลือเมื่อส่งมอบรายงานผู้สอบบัญชี ส่วนแพ็กเกจครบวงจรคิดเป็นรายปี แบ่งชำระเป็นรายเดือนหรือรายไตรมาสได้ตามที่ตกลงกัน',
  },
  {
    q: 'รายได้เกิน 30 ล้านบาท หรือมีหลายบริษัท คิดราคาอย่างไร?',
    a: 'รายได้เกิน 30 ล้านบาทเสนอราคาเป็นรายกรณีตามความซับซ้อนของกิจการ และหากมีบริษัทในเครือหรือส่งงานหลายกิจการพร้อมกัน สามารถเจรจาส่วนลดเป็นกรณีพิเศษได้',
  },
];

export default function AuditServicesPage() {
  const priced = AUDIT_TIERS.filter((t) => t.auditOnly !== null);
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'บริการตรวจสอบบัญชีและปิดงบการเงิน เชียงใหม่',
            description:
              'ตรวจสอบงบการเงินโดยผู้สอบบัญชีรับอนุญาต จัดทำงบการเงินฉบับสมบูรณ์ นำส่ง ส.บช.3 ต่อกรมพัฒนาธุรกิจการค้า และ ภ.ง.ด.50 ต่อกรมสรรพากร มีทั้งแบบตรวจสอบอย่างเดียวและแบบครบวงจรทำบัญชี + ตรวจสอบ ราคารวม VAT คิดตามช่วงรายได้ต่อปี',
            path: '/audit-services',
            offers: [
              ...priced.map((t) => ({ name: `ตรวจสอบบัญชีประจำปี — ${t.label}`, price: String(t.auditOnly), description: 'ต่อปี รวม VAT กิจการมีผู้ทำบัญชีอยู่แล้ว' })),
              ...priced.map((t) => ({ name: `ครบวงจร ทำบัญชี + ตรวจสอบ — ${t.label}`, price: String(t.bundle), description: 'ต่อปี รวม VAT รวมทำบัญชีรายเดือนและปิดงบ' })),
            ],
          }),
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บริการตรวจสอบบัญชี', path: '/audit-services' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl" data-aos="fade-up">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>บริการตรวจสอบบัญชี</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Audit Services · ตรวจสอบบัญชีประจำปี</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              ปิดงบการเงินเชียงใหม่<br />ตรวจสอบโดย CPA เริ่ม 6,000/ปี
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              ทุกบริษัทต้องส่งงบการเงินที่ผ่านการตรวจสอบทุกปี — เราตรวจ รับรอง และยื่นให้ทั้งกรมพัฒนาธุรกิจการค้าและกรมสรรพากร
              เลือกได้ว่าจะให้เราตรวจอย่างเดียว หรือทำบัญชีให้ทั้งปีแล้วปิดงบให้เสร็จ
            </p>
            <div className="flex flex-wrap gap-3">
              {heroChips.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── เลือกแบบไหนดี ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Which one is for you</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">มีให้เลือก 2 แบบ ตอบคำถามเดียวก็รู้</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto inline-flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">ตอนนี้บริษัทคุณมีคนทำบัญชีรายเดือนอยู่แล้วหรือยัง?</strong>
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* แบบที่ 1 */}
              <div className="rounded-3xl border border-border bg-card overflow-hidden">
                <div className="bg-[#163674] text-white p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <UserCheck className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">มีแล้ว → แบบที่ 1</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">{AUDIT_ONLY.name}</h3>
                  <p className="text-base opacity-90 mt-1">{AUDIT_ONLY.short}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-sm opacity-80">เริ่มต้น</span>
                    <span className="text-5xl font-black">6,000</span>
                    <span className="text-sm opacity-80">บาท/ปี</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">คิดตามช่วงรายได้ต่อปี · รวม VAT · ไม่รวมค่าทำบัญชี</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-6 text-sm leading-relaxed">
                    <span className="font-bold text-primary">เหมาะกับ </span>
                    <span className="text-muted-foreground">{AUDIT_ONLY.fit}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">ที่คุณจะได้จากเรา</p>
                  <ul className="space-y-3">
                    {AUDIT_ONLY.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* แบบที่ 2 */}
              <div className="relative rounded-3xl border-2 border-primary bg-card overflow-hidden shadow-xl shadow-primary/10">
                <div className="absolute top-4 right-4 bg-white text-primary text-xs font-black px-3 py-1 rounded-full z-10">⭐ จบในที่เดียว</div>
                <div className="bg-primary text-primary-foreground p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <Users className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">ยังไม่มี → แบบที่ 2</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">{BUNDLE.name}</h3>
                  <p className="text-base opacity-90 mt-1">{BUNDLE.short}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-sm opacity-80">เริ่มต้น</span>
                    <span className="text-5xl font-black">12,000</span>
                    <span className="text-sm opacity-80">บาท/ปี</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">คิดตามช่วงรายได้ต่อปี · รวม VAT · แบ่งจ่ายรายเดือนได้</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-6 text-sm leading-relaxed">
                    <span className="font-bold text-primary">เหมาะกับ </span>
                    <span className="text-muted-foreground">{BUNDLE.fit}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        <CalendarDays className="h-4 w-4 text-primary" /> ทำให้ทุกเดือน
                      </p>
                      <ul className="space-y-2.5">
                        {BUNDLE.monthly.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        <CalendarCheck className="h-4 w-4 text-primary" /> ทำให้ตอนสิ้นปี
                      </p>
                      <ul className="space-y-2.5">
                        {BUNDLE.yearEnd.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ต้องการแค่ทำบัญชีรายเดือน ยังไม่ถึงตอนปิดงบ?{' '}
              <Link href="/accounting-services" className="font-bold text-primary hover:underline">
                ดูแพ็กเกจทำบัญชีรายเดือน →
              </Link>
            </p>
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section id="pricing" className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">ค่าบริการตามช่วงรายได้ต่อปี</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ราคาเดียวกันทั้งตาราง ไม่มีค่าใช้จ่ายแฝง ยิ่งรายได้น้อย ยิ่งจ่ายน้อย — เทียบทั้ง 2 แบบได้ในตารางเดียว
              </p>
            </div>
            <AuditPricing />
          </div>
        </section>

        {/* ── เงื่อนไข ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Terms</p>
              <h2 className="text-3xl md:text-4xl font-black">เงื่อนไขการให้บริการ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" /> แบบที่ 1 · ตรวจสอบอย่างเดียว
                </h3>
                <ul className="space-y-3">
                  {AUDIT_ONLY.terms.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-primary/40 bg-primary/5 p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" /> แบบที่ 2 · ครบวงจร ทำบัญชี + ตรวจสอบ
                </h3>
                <ul className="space-y-3">
                  {BUNDLE.terms.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              ตารางค่าบริการเบื้องต้นสำหรับรอบบัญชีปี 2569 มีผลถึงวันที่ 31 ธันวาคม 2569 ทุกราคารวมภาษีมูลค่าเพิ่มแล้ว
              ราคาสุดท้ายขึ้นอยู่กับปริมาณเอกสารและความซับซ้อนของกิจการ
            </p>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why IC</p>
              <h2 className="text-3xl md:text-4xl font-black">ทำไมผู้ประกอบการจึงเลือก IC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyChooseUs.map((item, i) => (
                <div key={item.num} data-aos="fade-up" data-aos-delay={i * 100} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-6xl font-black text-primary/10 mb-4 leading-none">{item.num}</div>
                  <h3 className="font-black text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">ยังไม่แน่ใจว่าควรเลือกแบบไหน?</h3>
                <p className="opacity-80 mb-8">ทักมาเล่าสถานการณ์บริษัทให้ฟัง ทีมงาน IC ช่วยประเมินและออกใบเสนอราคาให้ฟรี ไม่มีข้อผูกมัด</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://line.me/R/ti/p/@icacc"
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all"
                  >
                    <MessageSquare className="h-4 w-4" /> ติดต่อผ่าน Line
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceFaq
          faqs={faqs}
          title="คำถามที่พบบ่อยเรื่องตรวจสอบบัญชี"
          intro="รวมคำถามที่เจ้าของธุรกิจถามบ่อยที่สุดก่อนส่งงบให้เราตรวจ"
        />

        <RelatedArticles slugs={['deductible-expenses-sme', 'director-salary-dividend-loan', 'corporate-tax-chiangmai-guide', '5-common-accounting-mistakes-sme-chiangmai']} />
      </main>
      <Footer />
    </div>
  );
}
