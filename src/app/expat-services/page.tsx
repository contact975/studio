import type { Metadata } from "next";
import Link from "next/link";
import { Sora, Inter } from "next/font/google";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

/**
 * หน้านี้ = ฝั่งภาษาอังกฤษ สำหรับตัวชาวต่างชาติเอง
 * หน้าคู่กันคือ /visa-work-permit = ภาษาไทย สำหรับนายจ้างที่จ้างต่างชาติ
 *
 * title เดิมยาว 84 ตัวอักษร โดน Google ตัดท้ายทิ้ง และขึ้นต้นด้วยชื่อแบรนด์
 * ทำให้คีย์เวิร์ดจริง ("work permit chiang mai") ถูกดันไปอยู่กลางประโยค
 * ของใหม่เอาคีย์เวิร์ดขึ้นหน้า และสั้นพอที่จะแสดงครบ
 *
 * ตัด keywords ออก — Google เลิกใช้ meta keywords มานานแล้ว ไม่มีผลใดๆ
 */
export const metadata: Metadata = {
  title: "Work Permit & Non-B Visa in Chiang Mai | IC Expat Services",
  description:
    "English-speaking accountants in Chiang Mai handling Thai work permits, Non-B business visas and company registration — from setup through yearly renewal.",
  alternates: {
    canonical: "https://icaccservice.com/expat-services",
    languages: {
      en: "https://icaccservice.com/expat-services",
      th: "https://icaccservice.com/visa-work-permit",
    },
  },
  openGraph: {
    title: "Work Permit & Non-B Visa in Chiang Mai | IC Expat Services",
    description:
      "English-speaking accountants in Chiang Mai handling Thai work permits, Non-B business visas and company registration.",
    url: "https://icaccservice.com/expat-services",
    type: "website",
    locale: "en_US",
  },
};

/**
 * ฟอนต์ของหน้านี้
 *
 * เดิมโหลดผ่าน @import url(fonts.googleapis.com) ที่อยู่บรรทัดแรกของสตริง CSS
 * ซึ่งแย่ที่สุดในบรรดาวิธีโหลดฟอนต์ เพราะเบราว์เซอร์ต้องทำเป็นทอดๆ:
 *   อ่าน <style> -> เจอ @import -> ไปโหลด CSS จาก Google -> ค่อยโหลดไฟล์ฟอนต์
 * ระหว่างนั้นหน้าเว็บค้างรอ (render-blocking) และยังเป็นการต่อไปโดเมนภายนอกเพิ่ม
 *
 * next/font ดาวน์โหลดฟอนต์มาเก็บไว้ในเว็บเราตั้งแต่ตอน build จึงไม่ต้องต่อ
 * ไปหา Google เลยสักครั้ง แถม preload ให้ และใส่ fallback ที่ปรับขนาดให้
 * ใกล้เคียงของจริงเพื่อลดการกระตุกตอนฟอนต์โหลดเสร็จ (CLS)
 *
 * ไม่ระบุ weight เพราะทั้งสองตัวเป็น variable font — ได้ทุกน้ำหนักในไฟล์เดียว
 */
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const css = `
.exp{font-family:var(--font-inter),system-ui,sans-serif;color:#0f172a;line-height:1.6;}
.exp h1,.exp h2,.exp h3,.exp .f{font-family:var(--font-sora),sans-serif;letter-spacing:-.02em;}
.exp .w{max-width:1180px;margin:0 auto;padding:0 24px;}
.exp .eyebrow{color:#2563eb;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:13px;margin-bottom:12px;}
.exp .sec{padding:84px 0;}
.exp .sec.alt{background:#f7faff;}
.exp .title{font-size:clamp(28px,3.8vw,44px);font-weight:800;margin-bottom:14px;color:#0f172a;}
.exp .sublead{color:#5b6b86;font-size:17px;max-width:660px;}
.exp .center{text-align:center;}.exp .center .sublead{margin:0 auto;}
.exp .g{background:linear-gradient(100deg,#2563eb,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;}
.exp .btn{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:16px;padding:15px 28px;border-radius:999px;text-decoration:none;transition:.2s;}
.exp .btn-g{background:linear-gradient(100deg,#2563eb,#22d3ee);color:#fff;box-shadow:0 14px 30px -12px rgba(34,211,238,.6);}
.exp .btn-ghost{border:1.5px solid rgba(255,255,255,.28);color:#fff;}
.exp .btn-ghost:hover{background:rgba(255,255,255,.1);}
.exp .hero{position:relative;overflow:hidden;background:radial-gradient(900px 500px at 80% -10%,rgba(34,211,238,.18),transparent 60%),radial-gradient(700px 500px at 5% 10%,rgba(37,99,235,.28),transparent 55%),linear-gradient(160deg,#0a1730,#0f2350 60%,#0a1730);color:#fff;}
.exp .hero::before{content:"";position:absolute;inset:0;opacity:.5;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:52px 52px;-webkit-mask-image:radial-gradient(700px 400px at 60% 20%,#000,transparent);mask-image:radial-gradient(700px 400px at 60% 20%,#000,transparent);}
.exp .hero .w{position:relative;padding:88px 24px 92px;}
.exp .crumb{font-size:13px;color:#8ea6d4;margin-bottom:18px;display:flex;gap:9px;align-items:center;}
.exp .crumb a{color:#cfe7ff;text-decoration:none;}
.exp .crumb a:hover{text-decoration:underline;}
.exp .kb{display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#cfe7ff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;margin-bottom:26px;}
.exp .kb .dot{width:7px;height:7px;border-radius:50%;background:#22d3ee;box-shadow:0 0 10px #22d3ee;}
.exp .hero h1{font-size:clamp(38px,6vw,64px);font-weight:800;line-height:1.04;max-width:16ch;margin-bottom:20px;color:#fff;}
.exp .hero .lead{font-size:19px;color:#b9c7e4;max-width:620px;margin-bottom:14px;}
.exp .kws{font-size:13.5px;color:#8ea6d4;max-width:640px;margin-bottom:32px;}
.exp .hbtns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:42px;}
.exp .hstats{display:flex;gap:16px;flex-wrap:wrap;}
.exp .hstat{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:16px 22px;}
.exp .hstat b{font-family:var(--font-sora);font-size:22px;display:block;}
.exp .hstat span{font-size:12.5px;color:#9fb2d6;}
.exp .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:46px;text-align:left;}
.exp .card{position:relative;border:1px solid #e7edf5;border-radius:20px;padding:30px 28px;background:#fff;overflow:hidden;transition:.28s;}
.exp .card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(100deg,#2563eb,#22d3ee);transform:scaleX(0);transform-origin:left;transition:.3s;}
.exp .card:hover{transform:translateY(-6px);border-color:#c7ddff;box-shadow:0 24px 50px -26px rgba(37,99,235,.4);}
.exp .card:hover::before{transform:scaleX(1);}
.exp .card .no{position:absolute;top:22px;right:26px;font-family:var(--font-sora);font-weight:800;font-size:34px;color:#eef2f9;}
.exp .ic{width:54px;height:54px;border-radius:15px;background:#eef5ff;display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
.exp .ic svg{width:27px;height:27px;stroke:#2563eb;}
.exp .card h3{font-size:20px;font-weight:700;margin-bottom:9px;}
.exp .card p{font-size:14.5px;color:#5b6b86;margin-bottom:16px;}
.exp .kw{font-size:12px;color:#0e7490;background:#e6fbff;padding:4px 11px;border-radius:999px;font-weight:600;}
.exp .why{display:grid;grid-template-columns:1.1fr 1fr;gap:50px;align-items:center;}
.exp .why .panel{background:linear-gradient(160deg,#0f2350,#0a1730);color:#fff;border-radius:26px;padding:44px;}
.exp .why .panel h2{color:#fff;font-size:30px;margin-bottom:12px;}
.exp .why .panel p{color:#b9c7e4;}
.exp .whys{display:flex;flex-direction:column;gap:24px;}
.exp .wrow{display:flex;gap:16px;}
.exp .wrow .n{flex:0 0 auto;width:42px;height:42px;border-radius:12px;background:linear-gradient(100deg,#2563eb,#22d3ee);color:#fff;font-family:var(--font-sora);font-weight:800;display:flex;align-items:center;justify-content:center;}
.exp .wrow h3{font-size:18px;font-weight:700;margin-bottom:5px;}
.exp .wrow p{color:#5b6b86;font-size:14.5px;}
.exp .whofor{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-top:44px;text-align:left;}
.exp .whorow{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid #e7edf5;border-radius:16px;padding:20px 22px;}
.exp .whorow .tick{flex:0 0 auto;width:26px;height:26px;border-radius:8px;background:#eef5ff;display:flex;align-items:center;justify-content:center;margin-top:2px;}
.exp .whorow .tick svg{width:15px;height:15px;stroke:#2563eb;fill:none;stroke-width:2.6;}
.exp .whorow h3{font-size:16px;font-weight:700;margin-bottom:4px;}
.exp .whorow p{font-size:14px;color:#5b6b86;}
.exp .faq{max-width:820px;margin:46px auto 0;}
.exp .qa{border:1px solid #e7edf5;border-radius:16px;padding:22px 26px;margin-bottom:14px;background:#fff;}
.exp .qa h4{font-size:16.5px;font-weight:600;margin-bottom:8px;}
.exp .qa p{color:#5b6b86;font-size:14.5px;}
.exp .bandwrap{padding:74px 0;}
.exp .band{position:relative;overflow:hidden;background:linear-gradient(120deg,#0f2350,#123a86 60%,#0e7490);color:#fff;border-radius:28px;padding:60px 40px;text-align:center;margin:0 24px;}
.exp .band h2{font-size:clamp(28px,3.6vw,40px);color:#fff;margin-bottom:14px;}
.exp .band p{color:#c7d8f5;font-size:17px;max-width:580px;margin:0 auto 28px;}
.exp .band .hbtns{justify-content:center;margin-bottom:0;}
.exp .btn-w{background:#fff;color:#0f2350;}.exp .btn-w:hover{background:#eef4ff;}
.exp .btn-t{border:1.5px solid rgba(255,255,255,.6);color:#fff;}.exp .btn-t:hover{background:#fff;color:#0f2350;}
@media(max-width:900px){.exp .why{grid-template-columns:1fr;}}
`;


/**
 * FAQ ชุดนี้คือคำถาม 4 ข้อที่แสดงอยู่ในหน้าอยู่แล้ว (ส่วน "Common questions from expats")
 * นำมาทำเป็น FAQPage schema เพื่อให้ Google อ่านเป็นโครงสร้างได้
 * ถ้าแก้ข้อความในหน้า ต้องแก้ตรงนี้ให้ตรงกันด้วย ไม่งั้นผิดกติกาของ Google
 */
const expatFaqs = [
  {
    q: "Can I convert my tourist visa to a work visa in Chiang Mai?",
    a: "Yes — in most cases we convert a tourist or visa-exempt entry to a Non-B business visa inside Thailand, then process your work permit. We handle the paperwork and appointments.",
  },
  {
    q: "How long does a work permit in Chiang Mai take?",
    a: "Typically 7 to 10 business days once your company documents are ready. We prepare everything in advance to avoid delays.",
  },
  {
    q: "Do I need a Thai company to get a work permit?",
    a: "Usually yes — you need a sponsoring employer. We can register your Thai company and sponsor the work permit in one package.",
  },
  {
    q: "Can foreigners own 100% of a Thai business?",
    a: "In specific cases — via BOI promotion, a US Amity Treaty company, or a Foreign Business License. We advise the best route for you.",
  },
];

export default function ExpatServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: "Work Permit & Non-B Visa Services in Chiang Mai",
            description:
              "English-speaking accountants in Chiang Mai handling Thai work permits, Non-Immigrant B business visas, company registration, Thai tax and BOI advisory for foreigners living and working in Thailand.",
            path: "/expat-services",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "IC Expat Services", path: "/expat-services" },
          ]),
          faqSchema(expatFaqs),
        ]}
      />
      <Header />
      {/* หน้านี้เป็นภาษาอังกฤษล้วน แต่ <html> ของเว็บตั้ง lang="th" ไว้
          จึงต้องประกาศ lang="en" ตรงนี้ ไม่งั้นทั้ง Google และโปรแกรมอ่านหน้าจอ
          จะเข้าใจว่าเนื้อหาเป็นภาษาไทย */}
      <main className={`flex-1 exp ${sora.variable} ${inter.variable}`} lang="en">
        <style dangerouslySetInnerHTML={{ __html: css }} />

        <section className="hero">
          <div className="w">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>IC Expat Services</span>
            </nav>
            <span className="kb"><span className="dot" />A sub-brand of IC Accounting &amp; Service · Chiang Mai, Thailand</span>
            <h1>Work permit and visa services in <span className="g">Chiang Mai</span>.</h1>
            <p className="lead">Non-B business visas, work permits and company registration &mdash; handled end to end by an English-speaking accounting team in Chiang Mai that also keeps your Thai books and tax filings in order.</p>
            <p className="kws">For foreigners working, hiring or starting a business in Chiang Mai &mdash; whether you already have a Thai company or need one set up first.</p>
            <div className="hbtns">
              <a className="btn btn-g" href="https://line.me/R/ti/p/@374jshvh" target="_blank" rel="noopener noreferrer">Talk to us on LINE</a>
              <a className="btn btn-ghost" href="#services">Explore services</a>
            </div>
            <div className="hstats">
              <div className="hstat"><b>10+ yrs</b><span>Serving Chiang Mai</span></div>
              <div className="hstat"><b>English</b><span>Speaking team</span></div>
              <div className="hstat"><b>All-in-one</b><span>Visa + accounting + tax</span></div>
            </div>
          </div>
        </section>

        <section id="services" className="sec alt">
          <div className="w center">
            <p className="eyebrow">Our Services</p>
            <h2 className="title">Everything a foreigner needs in Chiang Mai</h2>
            <p className="sublead">From your first Thai visa to a fully compliant company — work permit, business visa (Non-B), company registration and tax, all in Chiang Mai.</p>
            <div className="grid">
              <div className="card"><div className="no">01</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg></div><h3>Thai Visa</h3><p>Non-B, tourist-to-work conversion, retirement, LTR and SMART visa — applications and renewals.</p><span className="kw">Non-B · Retirement · LTR · SMART</span></div>
              <div className="card"><div className="no">02</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg></div><h3>Work Permit</h3><p>New permits, renewals, employer changes and 90-day reporting handled end to end.</p><span className="kw">New · Renewal · 90-day reports</span></div>
              <div className="card"><div className="no">03</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg></div><h3>Company Registration</h3><p>Register a Thai Limited Company, VAT, social security and shareholder structuring for foreigners.</p><span className="kw">Thai Limited · VAT · Social security</span></div>
              <div className="card"><div className="no">04</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><h3>Thai Tax</h3><p>Personal and corporate tax filing, bookkeeping and monthly compliance for foreign-owned businesses.</p><span className="kw">Bookkeeping · Monthly filing · Year-end</span></div>
              <div className="card"><div className="no">05</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.1L12 17l-5.5 2.3 1-6.1L3 8.9 9 8z"/></svg></div><h3>BOI</h3><p>Board of Investment promotion — eligibility, application and the visa and work-permit privileges it unlocks.</p><span className="kw">Eligibility · Application · Visa privileges</span></div>
              <div className="card"><div className="no">06</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg></div><h3>Foreign Business</h3><p>Foreign Business License, US Amity Treaty, and structures for majority foreign ownership.</p><span className="kw">FBL · US Amity Treaty · Ownership</span></div>
              <div className="card"><div className="no">07</div><div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div><h3>Living in Chiang Mai</h3><p>Practical settling-in help — bank accounts, driving licence, TM.30 and everyday admin.</p><span className="kw">Bank account · Driving licence · TM.30</span></div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w">
            <div className="why">
              <div className="panel">
                <p className="eyebrow" style={{ color: "#22d3ee" }}>Why IC Expat Services</p>
                <h2>More than a visa agent — your local partner.</h2>
                <p>Most agencies stop at the paperwork. We run your accounting and tax too, so every visa renewal, work permit and audit lines up perfectly, year after year.</p>
              </div>
              <div className="whys">
                <div className="wrow"><div className="n f">1</div><div><h3>We speak your language</h3><p>A fluent English-speaking team liaises with Thai officials for you — no misunderstandings.</p></div></div>
                <div className="wrow"><div className="n f">2</div><div><h3>Visa + accounting in one</h3><p>Your permit depends on company financials. We handle both, so renewals stay smooth.</p></div></div>
                <div className="wrow"><div className="n f">3</div><div><h3>Chiang Mai experts</h3><p>First-hand knowledge of the local immigration and labour offices — faster, predictable results.</p></div></div>
                <div className="wrow"><div className="n f">4</div><div><h3>100% compliant</h3><p>Documents checked in detail to minimise rejections and keep you fully within Thai law.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w center">
            <p className="eyebrow">Who we work with</p>
            <h2 className="title">Is this you?</h2>
            <p className="sublead">Every situation below is one we handle week in, week out in Chiang Mai.</p>
            <div className="whofor">
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>Employees hired by a Thai company</h3><p>You have a job offer in Chiang Mai and need a Non-B visa plus a work permit before you can legally start.</p></div></div>
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>Owners setting up a Thai company</h3><p>You are registering a Thai Limited Company and need the structure, VAT and social security done right from day one.</p></div></div>
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>Teachers and school staff</h3><p>Schools and language centres in Chiang Mai sponsor your permit — the paperwork still has to match the school's filings.</p></div></div>
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>Retirees and long-stay residents</h3><p>Retirement, LTR and SMART visa applications and renewals, kept on schedule year after year.</p></div></div>
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>Foreign-owned businesses</h3><p>Bookkeeping, monthly filings and year-end accounts that keep your permit renewals straightforward.</p></div></div>
              <div className="whorow"><span className="tick"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7"/></svg></span><div><h3>People who just arrived</h3><p>Bank account, driving licence and TM.30 — the everyday admin nobody explains to you.</p></div></div>
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="w">
            <p className="eyebrow center">FAQ</p>
            <h2 className="title center">Common questions from expats</h2>
            <div className="faq">
              <div className="qa"><h4>Can I convert my tourist visa to a work visa in Chiang Mai?</h4><p>Yes — in most cases we convert a tourist or visa-exempt entry to a Non-B business visa inside Thailand, then process your work permit. We handle the paperwork and appointments.</p></div>
              <div className="qa"><h4>How long does a work permit in Chiang Mai take?</h4><p>Typically 7 to 10 business days once your company documents are ready. We prepare everything in advance to avoid delays.</p></div>
              <div className="qa"><h4>Do I need a Thai company to get a work permit?</h4><p>Usually yes — you need a sponsoring employer. We can register your Thai company and sponsor the work permit in one package.</p></div>
              <div className="qa"><h4>Can foreigners own 100% of a Thai business?</h4><p>In specific cases — via BOI promotion, a US Amity Treaty company, or a Foreign Business License. We advise the best route for you.</p></div>
            </div>
            <p className="center" style={{ marginTop: 28, fontSize: 14.5, color: '#5b6b86' }}>
              Hiring a foreigner for your Thai company?{' '}
              <Link href="/visa-work-permit" hrefLang="th" lang="th" style={{ color: '#2563eb', fontWeight: 600 }}>
                อ่านหน้าสำหรับนายจ้าง (ภาษาไทย)
              </Link>
            </p>
          </div>
        </section>

        <div className="bandwrap">
          <div className="band">
            <h2>Ready to sort out your Chiang Mai work permit?</h2>
            <p>Free, no-obligation consultation in English. Tell us your situation and we will map the right visa and business path for you.</p>
            <div className="hbtns">
              <a className="btn btn-w" href="https://line.me/R/ti/p/@374jshvh" target="_blank" rel="noopener noreferrer">Chat with us on LINE</a>
              <a className="btn btn-t" href="/quote">Book a free consultation</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
