import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { ArrowRight, CheckCircle2, AlertTriangle, Users, Wallet, CalendarClock } from 'lucide-react';
import {
  VISA_TOTAL_FEE,
  VISA_INSTALLMENTS,
  VISA_RENEWAL_FEE,
  VISA_RENEWAL_BREAKDOWN,
  EMPLOYER_REQUIREMENTS,
  VISA_DURATION_MONTHS,
  WORK_PERMIT_ISSUE_DAYS,
  baht,
} from '@/lib/visa-pricing';

/**
 * หน้าไทยของบริการ Visa & Work Permit
 *
 * ── ทำไมไม่ใช่คำแปลของหน้าอังกฤษ ──
 * หน้าอังกฤษที่ /en/visa-work-permit เขียนให้ชาวต่างชาติที่อยากได้วีซ่า
 * คำถามของเขาคือ "ผมต้องทำยังไง ใช้เวลานานไหม ราคาเท่าไหร่"
 *
 * ส่วนคนไทยที่ค้นหาเรื่องนี้ส่วนใหญ่คือ "นายจ้าง" ที่กำลังจะจ้างชาวต่างชาติ
 * คำถามของเขาคนละเรื่องเลย คือ "บริษัทผมมีคุณสมบัติพอไหม ต้องเตรียมอะไร
 * จ้างแล้วผิดกฎหมายหรือเปล่า" หน้านี้จึงเริ่มจากเงื่อนไขของบริษัทเป็นอันดับแรก
 *
 * ถ้าแปลหน้าอังกฤษมาตรงๆ จะได้หน้าที่ตอบคำถามผิดคน
 *
 * ── ตัวเลข ──
 * ทุกตัวเลขดึงจาก src/lib/visa-pricing.ts ที่หน้าอังกฤษใช้ร่วมกัน
 * ห้ามพิมพ์ตัวเลขลงในหน้านี้ตรงๆ เพราะวันที่ขึ้นราคาแล้วแก้แค่หน้าเดียว
 * อีกภาษาจะกลายเป็นข้อมูลผิดโดยไม่มีใครรู้
 */

const TH_URL = 'https://icaccservice.com/visa-work-permit';
const EN_URL = 'https://icaccservice.com/en/visa-work-permit';

const title = 'ทำ Work Permit และวีซ่า Non-B เชียงใหม่ สำหรับนายจ้าง | IC Accounting';
const description = `รับทำใบอนุญาตทำงานและวีซ่า Non-B ให้พนักงานต่างชาติ ครบวงจรที่เชียงใหม่ ตรวจคุณสมบัติบริษัทให้ก่อนเริ่ม ค่าบริการ ${baht(VISA_TOTAL_FEE)} บาท รวมค่าธรรมเนียมราชการ แบ่งจ่าย 3 งวด`;

export const metadata: Metadata = {
  title,
  description,
  /**
   * ประกาศคู่ภาษาให้ชี้หากันไปกลับกับหน้าอังกฤษ
   * ถ้าฝั่งใดฝั่งหนึ่งไม่ประกาศ Google จะไม่เชื่อ hreflang ทั้งคู่
   */
  alternates: {
    canonical: TH_URL,
    languages: { th: TH_URL, en: EN_URL, 'x-default': TH_URL },
  },
  openGraph: {
    title,
    description,
    url: TH_URL,
    type: 'website',
    locale: 'th_TH',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

/** เงื่อนไขตามกฎหมายที่บริษัทต้องมีก่อน ไม่ใช่เงื่อนไขของเรา */
const requirements = [
  {
    icon: Wallet,
    title: `ทุนจดทะเบียนชำระแล้ว ${baht(EMPLOYER_REQUIREMENTS.paidUpCapitalPerForeigner)} บาท`,
    desc: 'ต่อชาวต่างชาติ 1 คน ถ้าจะจ้าง 2 คน ต้องมีทุนชำระแล้ว 4 ล้านบาท',
  },
  {
    icon: Users,
    title: `พนักงานไทย ${EMPLOYER_REQUIREMENTS.thaiEmployeesPerForeigner} คน`,
    desc: 'ต่อชาวต่างชาติ 1 คน และต้องขึ้นทะเบียนประกันสังคมจริง ไม่ใช่แค่มีชื่อในบัญชีเงินเดือน',
  },
  {
    icon: CalendarClock,
    title: `เงินเดือนขั้นต่ำ ${baht(EMPLOYER_REQUIREMENTS.minimumSalary.min)}–${baht(EMPLOYER_REQUIREMENTS.minimumSalary.max)} บาท`,
    desc: 'ขึ้นอยู่กับสัญชาติของพนักงาน และต้องจ่ายจริงตามที่แจ้งไว้ตลอดอายุใบอนุญาต',
  },
];

const steps = [
  {
    step: '1',
    title: 'ตรวจคุณสมบัติบริษัทก่อนเริ่ม',
    desc: 'เราดูทุนจดทะเบียน จำนวนพนักงานไทยที่ขึ้นประกันสังคม และงบการเงินล่าสุดให้ก่อน ถ้ายังไม่ผ่านเงื่อนไข จะบอกตั้งแต่วันแรกว่าต้องแก้อะไร ไม่ใช่ปล่อยให้ยื่นแล้วโดนปฏิเสธ',
  },
  {
    step: '2',
    title: 'จัดเตรียมเอกสารบริษัทและพนักงาน',
    desc: 'หนังสือรับรอง บัญชีรายชื่อผู้ถือหุ้น งบการเงิน แบบยื่นภาษี รายชื่อผู้ประกันตน พร้อมเอกสารฝั่งพนักงานต่างชาติ เราทำรายการให้ครบว่าต้องใช้อะไรบ้าง',
  },
  {
    step: '3',
    title: 'ขอหนังสือรับรองการจ้าง (WP.3)',
    desc: 'ยื่นต่อกรมการจัดหางานเพื่อให้พนักงานนำไปขอวีซ่า Non-B ขั้นตอนนี้คือด่านที่ตัดสินว่าบริษัทผ่านเงื่อนไขหรือไม่',
  },
  {
    step: '4',
    title: 'ขอวีซ่า Non-B',
    desc: 'กรณีพนักงานอยู่ในไทยแล้ว ส่วนใหญ่เปลี่ยนจากวีซ่าท่องเที่ยวเป็น Non-B ได้ในประเทศ ไม่ต้องบินออกไปขอที่สถานทูต',
  },
  {
    step: '5',
    title: 'ยื่นขอใบอนุญาตทำงาน',
    desc: `กรมการจัดหางานใช้เวลา ${WORK_PERMIT_ISSUE_DAYS.min}–${WORK_PERMIT_ISSUE_DAYS.max} วันทำการในการออกใบอนุญาต เมื่อเอกสารครบถ้วนแล้ว`,
  },
  {
    step: '6',
    title: 'ขออยู่ต่อ 12 เดือน',
    desc: 'เมื่อได้ใบอนุญาตทำงานแล้ว ยื่นขออยู่ต่อเพื่อให้พนักงานอยู่ทำงานได้ครบปีโดยไม่ต้องออกนอกประเทศทุก 90 วัน',
  },
];

/** สิ่งที่นายจ้างต้องทำต่อเนื่อง — คนส่วนใหญ่ไม่รู้และมักพลาดตรงนี้ */
const obligations = [
  'รายงานตัวทุก 90 วัน ตลอดเวลาที่พนักงานอยู่ในประเทศไทย',
  'แจ้งกรมการจัดหางานทุกครั้งที่เปลี่ยนตำแหน่ง สถานที่ทำงาน หรือเลิกจ้าง',
  'รักษาทุนจดทะเบียนและจำนวนพนักงานไทยให้ครบตามเงื่อนไขตลอดอายุใบอนุญาต',
  'ต่ออายุใบอนุญาตทำงานและวีซ่าก่อนหมดอายุ ไม่ควรรอจนวันสุดท้าย',
];

const faqs = [
  {
    q: 'บริษัทเพิ่งจดทะเบียนใหม่ จ้างชาวต่างชาติได้เลยไหม',
    a: 'ได้ ถ้ามีทุนจดทะเบียนชำระแล้วครบตามเงื่อนไขและมีพนักงานไทยขึ้นประกันสังคมครบ แต่บริษัทที่ยังไม่เคยยื่นงบการเงินมักถูกขอเอกสารเพิ่ม เราจะประเมินให้ก่อนว่าควรยื่นเลยหรือรอรอบงบแรก',
  },
  {
    q: 'ถ้าพนักงานต่างชาติเข้ามาด้วยวีซ่าท่องเที่ยวแล้ว ต้องบินกลับไปขอใหม่ไหม',
    a: 'ส่วนใหญ่ไม่ต้อง เราเปลี่ยนจากวีซ่าท่องเที่ยวหรือผู้ได้รับยกเว้นวีซ่าเป็น Non-B ภายในประเทศได้ โดยต้องมีวันคงเหลือในวีซ่าเพียงพอ จึงควรติดต่อเราก่อนวีซ่าใกล้หมด',
  },
  {
    q: 'ทั้งหมดใช้เวลานานแค่ไหน',
    a: `ตั้งแต่เริ่มเตรียมเอกสารจนได้ใบอนุญาตทำงานและอยู่ต่อครบ 12 เดือน ใช้เวลาประมาณ ${VISA_DURATION_MONTHS.min}–${VISA_DURATION_MONTHS.max} เดือน เฉพาะขั้นตอนออกใบอนุญาตใช้ ${WORK_PERMIT_ISSUE_DAYS.min}–${WORK_PERMIT_ISSUE_DAYS.max} วันทำการ`,
  },
  {
    q: 'ค่าบริการเท่าไหร่ จ่ายอย่างไร',
    a: `${baht(VISA_TOTAL_FEE)} บาท รวมค่าธรรมเนียมราชการแล้ว แบ่งจ่าย 3 งวด คือ ${baht(VISA_INSTALLMENTS.onSubmission)} บาทตอนยื่นขอวีซ่า Non-B, ${baht(VISA_INSTALLMENTS.onPermitCollection)} บาทวันรับใบอนุญาตทำงาน และ ${baht(VISA_INSTALLMENTS.onExtension)} บาทตอนขออยู่ต่อ 12 เดือน ปีถัดไปค่าต่ออายุปีละ ${baht(VISA_RENEWAL_FEE)} บาท`,
  },
  {
    q: 'ถ้าจ้างชาวต่างชาติโดยไม่มีใบอนุญาตทำงาน มีโทษอย่างไร',
    a: 'ทั้งนายจ้างและลูกจ้างมีความผิดตามพระราชกำหนดการบริหารจัดการการทำงานของคนต่างด้าว นายจ้างมีโทษปรับต่อลูกจ้างหนึ่งคน และลูกจ้างอาจถูกส่งกลับและห้ามเข้าประเทศ จึงไม่ควรให้เริ่มงานก่อนใบอนุญาตออก',
  },
];

export default function VisaWorkPermitThaiPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: 'บริการขอใบอนุญาตทำงานและวีซ่า Non-B เชียงใหม่',
            description:
              'รับดำเนินการขอใบอนุญาตทำงานและวีซ่า Non-Immigrant B ให้พนักงานต่างชาติ สำหรับนายจ้างในเชียงใหม่และทั่วประเทศ ตรวจคุณสมบัติบริษัทก่อนเริ่ม พร้อมดูแลบัญชีและภาษีของบริษัทควบคู่กัน',
            path: '/visa-work-permit',
            offers: [
              {
                name: 'ขอใบอนุญาตทำงานและวีซ่า Non-B ครบกระบวนการ',
                price: String(VISA_TOTAL_FEE),
                description: `รวมค่าธรรมเนียมราชการ แบ่งชำระ 3 งวด: ${baht(VISA_INSTALLMENTS.onSubmission)} ตอนยื่นขอวีซ่า, ${baht(VISA_INSTALLMENTS.onPermitCollection)} วันรับใบอนุญาตทำงาน, ${baht(VISA_INSTALLMENTS.onExtension)} ตอนขออยู่ต่อ 12 เดือน`,
              },
              {
                name: 'ต่ออายุรายปี วีซ่าและใบอนุญาตทำงาน',
                price: String(VISA_RENEWAL_FEE),
                description: `ปีละ ${baht(VISA_RENEWAL_FEE)} บาท ตั้งแต่ปีที่สอง แบ่งเป็นขออยู่ต่อ 12 เดือน ${baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)} บาท และต่อใบอนุญาตทำงาน ${baht(VISA_RENEWAL_BREAKDOWN.workPermit)} บาท`,
              },
            ],
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
        {/* ── HERO ── */}
        <section className="relative bg-[#163674] text-white py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl relative">
            <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase mb-4">Visa &amp; Work Permit</p>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              จ้างพนักงานต่างชาติให้ถูกกฎหมาย<br />โดยไม่ต้องเดาว่าต้องทำอะไรบ้าง
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-3xl">
              เราดูแลตั้งแต่ตรวจว่าบริษัทคุณมีคุณสมบัติพอหรือยัง ไปจนถึงวันที่พนักงานได้ใบอนุญาตทำงานและอยู่ต่อครบ 12 เดือน
              พร้อมดูแลบัญชีและภาษีของบริษัทควบคู่กัน เพราะเอกสารที่ใช้ยื่นคือชุดเดียวกับที่เราทำให้อยู่แล้ว
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-white text-[#163674] font-black px-8 py-4 rounded-full hover:opacity-90 transition"
              >
                ปรึกษาฟรี ตรวจคุณสมบัติบริษัท <ArrowRight className="h-4 w-4" />
              </Link>
              {/*
                ลิงก์ข้ามภาษาในเนื้อหา ไม่ใช่แค่ปุ่มบนเมนู
                เพราะนายจ้างคนไทยมักส่งหน้านี้ให้พนักงานต่างชาติอ่านต่อ
              */}
              <Link
                href="/en/visa-work-permit"
                hrefLang="en"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition"
              >
                Read in English
              </Link>
            </div>
          </div>
        </section>

        {/* ── เงื่อนไขของบริษัท ── */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">ก่อนอื่น</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4">บริษัทต้องผ่าน 3 เงื่อนไขนี้ก่อน</h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              นี่เป็นข้อกำหนดตามกฎหมาย ไม่ใช่เงื่อนไขของเรา และเป็นจุดที่คำขอส่วนใหญ่ถูกปฏิเสธ
              เราจึงตรวจให้ก่อนตั้งแต่วันแรก ไม่ใช่ปล่อยให้ยื่นไปแล้วค่อยรู้
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {requirements.map((r) => (
                <div key={r.title} className="rounded-2xl border border-border bg-secondary/40 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-black mb-2 leading-snug">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ขั้นตอน ── */}
        <section className="py-20 md:py-24 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Process</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4">6 ขั้นตอน ใช้เวลาประมาณ {VISA_DURATION_MONTHS.min}–{VISA_DURATION_MONTHS.max} เดือน</h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              ระยะเวลาขึ้นกับความพร้อมของเอกสารบริษัทเป็นหลัก ถ้างบการเงินและประกันสังคมเรียบร้อยอยู่แล้ว จะเร็วกว่านี้มาก
            </p>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.step} className="flex gap-5 rounded-2xl bg-background border border-border p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-black mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── ค่าบริการ ── */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">ค่าบริการ</p>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              {baht(VISA_TOTAL_FEE)} บาท รวมค่าธรรมเนียมราชการแล้ว
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              ไม่มีค่าใช้จ่ายแอบแฝง และแบ่งจ่ายตามความคืบหน้าจริง 3 งวด
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-[#163674] text-white">
                    <th className="px-6 py-4 font-bold">งวด</th>
                    <th className="px-6 py-4 font-bold">ชำระเมื่อ</th>
                    <th className="px-6 py-4 font-bold text-right whitespace-nowrap">จำนวน (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 font-bold">1</td>
                    <td className="px-6 py-4 text-muted-foreground">ยื่นขอวีซ่า Non-B</td>
                    <td className="px-6 py-4 text-right font-bold whitespace-nowrap">{baht(VISA_INSTALLMENTS.onSubmission)}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 font-bold">2</td>
                    <td className="px-6 py-4 text-muted-foreground">วันรับใบอนุญาตทำงาน</td>
                    <td className="px-6 py-4 text-right font-bold whitespace-nowrap">{baht(VISA_INSTALLMENTS.onPermitCollection)}</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 font-bold">3</td>
                    <td className="px-6 py-4 text-muted-foreground">ขออยู่ต่อ 12 เดือน</td>
                    <td className="px-6 py-4 text-right font-bold whitespace-nowrap">{baht(VISA_INSTALLMENTS.onExtension)}</td>
                  </tr>
                  <tr className="border-t-2 border-primary/30 bg-secondary/50">
                    <td className="px-6 py-4 font-black" colSpan={2}>รวมทั้งหมด</td>
                    <td className="px-6 py-4 text-right font-black whitespace-nowrap">{baht(VISA_TOTAL_FEE)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
              <p className="font-black mb-1">ปีถัดไป ต่ออายุปีละ {baht(VISA_RENEWAL_FEE)} บาท</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                แบ่งเป็นขออยู่ต่อ 12 เดือน {baht(VISA_RENEWAL_BREAKDOWN.extensionOfStay)} บาท
                และต่ออายุใบอนุญาตทำงาน {baht(VISA_RENEWAL_BREAKDOWN.workPermit)} บาท
              </p>
            </div>
          </div>
        </section>

        {/* ── หน้าที่ต่อเนื่อง ── */}
        <section className="py-20 md:py-24 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-2">ได้ใบอนุญาตแล้วยังไม่จบ</h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  นี่คือจุดที่นายจ้างพลาดกันบ่อยที่สุด เพราะเข้าใจว่าได้ใบอนุญาตแล้วคือเสร็จ
                  แต่ความจริงมีหน้าที่ที่ต้องทำต่อเนื่อง ถ้าขาดอย่างใดอย่างหนึ่งอาจถูกเพิกถอนใบอนุญาตได้
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {obligations.map((o) => (
                <li key={o} className="flex items-start gap-3 rounded-xl bg-background border border-border p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              ลูกค้าที่ให้เราดูแลบัญชีอยู่แล้ว เราจะเตือนกำหนดต่ออายุและรายงานตัว 90 วันให้เอง ไม่ต้องจำเอง
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-black mb-10">คำถามที่นายจ้างถามบ่อย</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-secondary/40 p-6">
                  <summary className="font-black cursor-pointer list-none flex items-start justify-between gap-4">
                    <span>{f.q}</span>
                    <span className="text-primary shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 md:py-24 bg-[#163674] text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">ไม่แน่ใจว่าบริษัทผ่านเงื่อนไขหรือยัง</h2>
            <p className="text-white/70 leading-relaxed mb-8">
              ส่งข้อมูลทุนจดทะเบียนและจำนวนพนักงานมาให้เราดูก่อนได้ ตรวจให้ฟรี ไม่มีค่าใช้จ่าย
              ถ้ายังไม่ผ่าน เราจะบอกว่าต้องแก้อะไรและใช้เวลาเท่าไหร่
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-white text-[#163674] font-black px-10 py-4 rounded-full hover:opacity-90 transition"
            >
              ปรึกษาฟรี <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
