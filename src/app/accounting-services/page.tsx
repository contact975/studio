import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { SmartPackagePicker } from '@/components/landing/smart-package-picker';
import {
  PACKAGES,
  SMART_SERVICES,
  TOTAL_EXTRAS,
  COMPARISON,
  GUIDANCE,
  GETTING_STARTED,
  TERMS,
} from '@/lib/accounting-packages';
import { CheckCircle, ArrowRight, Check, Minus, Info, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema, type Faq } from '@/lib/seo';

/**
 * หน้าบริการทำบัญชีรายเดือน — อ้างอิงใบเสนอราคา Quotation 2569/2026
 *
 * 2 แพ็กเกจ: IC Smart (ยื่นภาษีรายเดือน 4,500) และ IC Total (บัญชีอินเฮ้าส์เต็มระบบ 12,000)
 * ข้อมูลทั้งหมดอยู่ที่ lib/accounting-packages.ts — ถ้าแก้ราคาที่นั่น ต้องแก้ faqs และ metadata ด้านล่างให้ตรงกัน
 *
 * หมายเหตุ: การตรวจสอบบัญชีประจำปีโดย CPA ไม่รวมในราคารายเดือน (คิดแยกตามรายได้ — หน้า /audit-services)
 */
export const metadata: Metadata = {
  title: 'รับทำบัญชีเชียงใหม่ รายเดือน เริ่ม 4,500/เดือน | IC Accounting',
  description:
    'รับทำบัญชีและยื่นภาษีรายเดือนในเชียงใหม่ 2 แพ็กเกจ IC Smart ยื่นภาษีรายเดือน 4,500 บาท และ IC Total บัญชีอินเฮ้าส์เต็มระบบพร้อมโปรแกรมบัญชีออนไลน์ 12,000 บาท ราคารวม VAT',
  alternates: { canonical: 'https://icaccservice.com/accounting-services' },
  openGraph: {
    title: 'รับทำบัญชีเชียงใหม่ รายเดือน เริ่ม 4,500/เดือน | IC Accounting',
    description: 'IC Smart ยื่นภาษีรายเดือน 4,500 · IC Total บัญชีอินเฮ้าส์เต็มระบบ 12,000 ราคารวม VAT',
    url: 'https://icaccservice.com/accounting-services',
  },
};

const heroChips = ['ราคารวม VAT แล้ว', 'เลือกเฉพาะบริการที่ต้องการได้', 'มีโปรแกรมบัญชีออนไลน์ให้ใช้', 'ปรึกษาฟรีก่อนตัดสินใจ'];

/**
 * คำถามชุดนี้เขียนจากคำค้นจริงใน Search Console ที่หน้านี้ควรรับผิดชอบ:
 *   รับทำบัญชี เชียงใหม่ · รับทําบัญชี เชียงใหม่ · รับปิดงบเปล่า เชียงใหม่
 * คำตอบทุกข้ออ้างอิงจากใบเสนอราคาเท่านั้น ไม่เพิ่มคำสัญญาใหม่
 */
const faqs: Faq[] = [
  {
    q: 'รับทำบัญชีเชียงใหม่ ราคาเริ่มต้นเท่าไหร่?',
    a: 'แพ็กเกจ IC Smart ยื่นภาษีรายเดือน 4,500 บาทต่อเดือนเมื่อใช้ครบทั้ง 4 รายการ (ยื่น ภ.พ.30, ภ.ง.ด.1/3/53, ประกันสังคม และงบกำไรขาดทุน) ราคารวมภาษีมูลค่าเพิ่มแล้ว หรือเลือกเฉพาะบางรายการได้ เริ่มที่ 1,000 บาทต่อเดือน',
  },
  {
    q: 'IC Smart กับ IC Total ต่างกันอย่างไร?',
    a: 'IC Smart (4,500 บาท/เดือน) รับผิดชอบเฉพาะการยื่นแบบรายเดือน เหมาะกับกิจการที่มีผู้ทำบัญชีของตนเองอยู่แล้ว ส่วน IC Total (12,000 บาท/เดือน) ดูแลงานบัญชีทั้งระบบแทนพนักงานบัญชีประจำ ครอบคลุมทุกอย่างใน IC Smart และเพิ่มการบันทึกบัญชี กระทบยอด งานเงินเดือน งบการเงินรายเดือน วางระบบ ปิดงบครึ่งปี พร้อมโปรแกรมบัญชีออนไลน์และผู้ดูแลบัญชีประจำ',
  },
  {
    q: 'เลือกใช้เฉพาะบางบริการได้ไหม?',
    a: 'ได้ ในแพ็กเกจ IC Smart เลือกเฉพาะรายการที่ต้องการได้ ยื่น ภ.พ.30 2,500 บาท ยื่น ภ.ง.ด.1/3/53 1,500 บาท ยื่นประกันสังคม 1,000 บาท และงบกำไรขาดทุน 1,000 บาทต่อเดือน หากใช้ครบทั้ง 4 รายการคิดราคาแพ็กเกจ 4,500 บาท',
  },
  {
    q: 'งบกำไรขาดทุนใน IC Smart ใช้ปิดงบประจำปีได้ไหม?',
    a: 'ไม่ได้ งบกำไรขาดทุนในแพ็กเกจ IC Smart จัดทำจากเอกสารที่ได้รับเพื่อใช้ประกอบการบริหารเท่านั้น ไม่ใช่การจัดทำบัญชีตามกฎหมาย จึงไม่สามารถใช้ปิดงบการเงินนำส่งหน่วยงานราชการได้ หากต้องการบัญชีตามกฎหมายครบถ้วนต้องใช้แพ็กเกจ IC Total',
  },
  {
    q: 'IC Total รวมงานเงินเดือนพนักงานด้วยไหม?',
    a: 'รวม IC Total จัดทำเงินเดือนและสลิป แจ้งเข้า-ออกประกันสังคม รวมถึง กท.20ก และ ภ.ง.ด.1ก ประจำปี พร้อมทะเบียนทรัพย์สิน ทะเบียนลูกหนี้-เจ้าหนี้ และกระทบยอดบัญชีธนาคารทุกบัญชี',
  },
  {
    q: 'ค่าบริการรายเดือนรวมปิดงบและผู้สอบบัญชีประจำปีไหม?',
    a: 'ไม่รวม ค่าตรวจสอบบัญชีประจำปีโดยผู้สอบบัญชีรับอนุญาตคิดแยกตามช่วงรายได้ของกิจการ ส่วน IC Total รวมการปิดงบครึ่งปีและยื่น ภ.ง.ด.51 ไว้แล้ว ดูรายละเอียดบริการตรวจสอบบัญชีได้ที่หน้าตรวจสอบบัญชี',
  },
  {
    q: 'IC Total ต้องทำสัญญานานเท่าไหร่?',
    a: 'IC Total เป็นสัญญาระยะเวลา 1 ปี พร้อมโปรแกรมบัญชีออนไลน์และการอบรมใช้งาน การยกเลิกก่อนครบกำหนดต้องแจ้งล่วงหน้าไม่น้อยกว่า 30 วัน ส่วน IC Smart ไม่มีเงื่อนไขสัญญา 1 ปี',
  },
  {
    q: 'ต้องส่งเอกสารและชำระค่าบริการเมื่อไหร่?',
    a: 'นำส่งเอกสารประกอบการบันทึกบัญชีภายในวันที่ 10 ของเดือนถัดไป และชำระค่าบริการภายในวันที่ 5 ของทุกเดือน เพื่อให้ยื่นแบบภาษีได้ทันกำหนดทุกเดือน',
  },
];

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'รับทำบัญชีและยื่นภาษีรายเดือน เชียงใหม่',
            description:
              'บริการบัญชีและภาษีรายเดือนสำหรับธุรกิจในเชียงใหม่ 2 แพ็กเกจ IC Smart ยื่นภาษีรายเดือน และ IC Total บัญชีอินเฮ้าส์เต็มระบบ พร้อมโปรแกรมบัญชีออนไลน์ ราคารวม VAT',
            path: '/accounting-services',
            offers: [
              { name: 'IC Smart — ยื่นภาษีรายเดือน', price: String(PACKAGES.smart.price), description: 'ต่อเดือน รวม VAT เมื่อใช้ครบ 4 รายการ' },
              { name: 'IC Total — บัญชีอินเฮ้าส์เต็มระบบ', price: String(PACKAGES.total.price), description: 'ต่อเดือน รวม VAT สัญญา 1 ปี พร้อมโปรแกรมบัญชีออนไลน์' },
              ...SMART_SERVICES.map((s) => ({ name: s.name, price: String(s.price), description: 'ต่อเดือน รวม VAT เลือกแยกได้' })),
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
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl" data-aos="fade-up">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>บริการทำบัญชี</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Accounting Services · รายเดือน</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              รับทำบัญชีเชียงใหม่<br />
              รายเดือน เริ่ม 4,500/เดือน
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              เลือกได้ 2 รูปแบบตามโครงสร้างธุรกิจ — <strong className="font-bold text-white">IC Smart</strong> ให้เราดูแลเฉพาะการยื่นภาษีรายเดือน
              หรือ <strong className="font-bold text-white">IC Total</strong> ให้เราเป็นแผนกบัญชีทั้งระบบแทนการจ้างพนักงานประจำ
            </p>
            <div className="flex flex-wrap gap-3">
              {heroChips.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section id="packages" className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Pricing Plans</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">2 แพ็กเกจ เลือกให้ตรงกับธุรกิจคุณ</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">ค่าบริการบัญชีและภาษีรายเดือน รอบระยะเวลาบัญชีปี 2569 ทุกราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* แพ็กเกจ A — IC Smart */}
              <div className="rounded-3xl border border-border overflow-hidden bg-card">
                <div className="bg-[#163674] text-white p-8">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-70">Package {PACKAGES.smart.code}</p>
                  <h3 className="text-2xl md:text-3xl font-black mt-1">
                    {PACKAGES.smart.name} <span className="font-bold opacity-80">— {PACKAGES.smart.tagline}</span>
                  </h3>
                  <p className="text-sm opacity-70">{PACKAGES.smart.en}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-black">{PACKAGES.smart.price.toLocaleString('th-TH')}</span>
                    <span className="text-sm opacity-80">บาท/เดือน</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{PACKAGES.smart.priceNote}</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-5 text-sm leading-relaxed">
                    <span className="font-bold text-primary">เหมาะกับ </span>
                    <span className="text-muted-foreground">{PACKAGES.smart.fit}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">ติ๊กเลือกเฉพาะรายการที่ต้องการ</p>
                  <SmartPackagePicker />
                  <p className="mt-5 text-xs text-muted-foreground leading-relaxed rounded-xl bg-secondary/40 p-4">
                    งบกำไรขาดทุนในแพ็กเกจนี้จัดทำจากเอกสารที่ได้รับ เพื่อใช้ประกอบการบริหารเท่านั้น
                    มิใช่การจัดทำบัญชีตามกฎหมาย และไม่สามารถใช้ปิดงบการเงินนำส่งหน่วยงานราชการได้
                  </p>
                </div>
              </div>

              {/* แพ็กเกจ B — IC Total */}
              <div className="relative rounded-3xl border-2 border-primary overflow-hidden bg-card shadow-xl shadow-primary/10">
                <div className="absolute top-4 right-4 bg-white text-primary text-xs font-black px-3 py-1 rounded-full z-10">⭐ ครบที่สุด</div>
                <div className="bg-primary text-primary-foreground p-8">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-70">Package {PACKAGES.total.code}</p>
                  <h3 className="text-2xl md:text-3xl font-black mt-1">
                    {PACKAGES.total.name} <span className="font-bold opacity-80">— {PACKAGES.total.tagline}</span>
                  </h3>
                  <p className="text-sm opacity-70">{PACKAGES.total.en}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-black">{PACKAGES.total.price.toLocaleString('th-TH')}</span>
                    <span className="text-sm opacity-80">บาท/เดือน</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{PACKAGES.total.priceNote}</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-6 text-sm leading-relaxed">
                    <span className="font-bold text-primary">เหมาะกับ </span>
                    <span className="text-muted-foreground">{PACKAGES.total.fit}</span>
                  </div>
                  <div className="space-y-4">
                    {TOTAL_EXTRAS.map((group) => (
                      <div key={group.title}>
                        <p className="text-sm font-black text-foreground">
                          {group.title} <span className="text-xs font-normal text-muted-foreground">/ {group.en}</span>
                        </p>
                        <ul className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="https://line.me/R/ti/p/@icacc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <MessageSquare className="h-4 w-4" /> สนใจ IC Total 12,000/เดือน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Comparison of Services</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">รายละเอียดเปรียบเทียบบริการ</h2>
              <p className="text-muted-foreground">ทั้ง {COMPARISON.length} รายการที่แต่ละแพ็กเกจครอบคลุม</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#163674] text-white">
                    <th scope="col" className="px-4 md:px-6 py-4 text-left font-bold">รายการบริการ</th>
                    <th scope="col" className="w-24 md:w-36 px-2 py-4 text-center font-bold">
                      IC Smart
                      <span className="block text-[11px] font-medium opacity-80">4,500 บาท/เดือน</span>
                    </th>
                    <th scope="col" className="w-24 md:w-36 px-2 py-4 text-center font-bold bg-primary">
                      IC Total
                      <span className="block text-[11px] font-medium opacity-80">12,000 บาท/เดือน</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/30'}>
                      <td className="px-4 md:px-6 py-3.5 align-top">
                        <p className="font-bold text-foreground">{row.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{row.desc}</p>
                      </td>
                      <td className="px-2 py-3.5 text-center align-middle">
                        {row.smart ? (
                          <Check className="inline h-5 w-5 text-green-500" aria-label="รวม" />
                        ) : (
                          <Minus className="inline h-4 w-4 text-muted-foreground/40" aria-label="ไม่รวม" />
                        )}
                      </td>
                      <td className="px-2 py-3.5 text-center align-middle bg-primary/[0.04]">
                        <Check className="inline h-5 w-5 text-green-500" aria-label="รวม" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── GUIDANCE ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Guidance</p>
              <h2 className="text-3xl md:text-4xl font-black">แพ็กเกจไหนเหมาะกับคุณ?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(
                [
                  { key: 'smart', title: 'เลือก IC Smart เมื่อ', items: GUIDANCE.smart },
                  { key: 'total', title: 'เลือก IC Total เมื่อ', items: GUIDANCE.total },
                ] as const
              ).map((col) => (
                <div key={col.key} className={`rounded-3xl border p-8 ${col.key === 'total' ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'}`}>
                  <h3 className="font-black text-xl text-primary mb-4">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GETTING STARTED ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Getting Started</p>
              <h2 className="text-3xl md:text-4xl font-black">ขั้นตอนการเริ่มใช้บริการ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {GETTING_STARTED.map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                  <span className="text-4xl font-black text-primary/15">{s.step}</span>
                  <h3 className="font-black text-lg mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTES + TERMS ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-3xl border border-border bg-card p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> ขอบเขตของราคา
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-3"><Info className="h-4 w-4 text-primary mt-1 shrink-0" />ราคาทั้งหมดเป็นราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ไม่รวมค่าธรรมเนียมที่หน่วยงานราชการเรียกเก็บ</li>
                  <li className="flex gap-3"><Info className="h-4 w-4 text-primary mt-1 shrink-0" />ค่าบริการคิดตามปริมาณเอกสารในระดับปกติของแต่ละกิจการ</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-amber-900">
                  <Info className="h-5 w-5" /> บริการที่คิดค่าบริการแยกต่างหาก
                </h3>
                <ul className="space-y-3 text-sm text-amber-900/80 leading-relaxed">
                  <li className="flex gap-3">
                    <Minus className="h-4 w-4 mt-1 shrink-0" />
                    <span>
                      การตรวจสอบบัญชีประจำปีโดยผู้สอบบัญชีรับอนุญาต คิดตามช่วงรายได้ของกิจการ{' '}
                      <Link href="/audit-services" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                        ดูบริการตรวจสอบบัญชี <ExternalLink className="h-3 w-3" />
                      </Link>
                    </span>
                  </li>
                  <li className="flex gap-3"><Minus className="h-4 w-4 mt-1 shrink-0" />งานจดทะเบียนกับกรมพัฒนาธุรกิจการค้า งานขอคืนภาษี งานตรวจสอบพิเศษ และการจัดทำบัญชีย้อนหลัง</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <h2 className="font-black text-2xl mb-5">เงื่อนไขการให้บริการ</h2>
              <ul className="space-y-3">
                {TERMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground border-t border-border pt-4">
                ค่าบริการสำหรับรอบระยะเวลาบัญชีปี 2569 ทุกราคาเป็นราคารวมภาษีมูลค่าเพิ่มแล้ว ราคาสุดท้ายยืนยันในใบเสนอราคาเฉพาะกิจการ
              </p>
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
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">ไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับคุณ?</h3>
                <p className="opacity-80 mb-8">ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย เราช่วยประเมินขอบเขตงานและออกใบเสนอราคาเฉพาะกิจการให้</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all"
                  >
                    นัดหมายปรึกษาฟรี <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://line.me/R/ti/p/@icacc"
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all"
                  >
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
