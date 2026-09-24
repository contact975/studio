import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GoogleRatingBadge } from "@/components/seo/google-rating-badge";
import { Sora, Inter } from "next/font/google";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

/**
 * หน้าบริการวีซ่าและใบอนุญาตทำงาน — หน้าเดียวจบ
 *
 * เดิมแยกเป็นสองหน้า: หน้าอังกฤษ 1,105 คำ กับหน้าไทย 285 คำ
 * ซึ่งเป็นบริการเดียวกัน Google ต้องเลือกหนึ่ง สัญญาณจึงแตกเป็น
 * สองทางและไม่ชนะสักหน้า
 *
 * ตอนนี้ยุบมาไว้ที่ /visa-work-permit ที่เดียว เพราะ URL ตรงกับ
 * คำที่คนค้นหาจริง และตรงกับชื่อแบรนด์ใหม่ IC Visa / Work Permit
 *
 * title เดิมยาว 84 ตัวอักษร โดน Google ตัดท้ายทิ้ง และขึ้นต้นด้วยชื่อแบรนด์
 * ทำให้คีย์เวิร์ดจริง ("work permit chiang mai") ถูกดันไปอยู่กลางประโยค
 * ของใหม่เอาคีย์เวิร์ดขึ้นหน้า และสั้นพอที่จะแสดงครบ
 *
 * ตัด keywords ออก — Google เลิกใช้ meta keywords มานานแล้ว ไม่มีผลใดๆ
 */
export const metadata: Metadata = {
  title: "Work Permit & Non-B Visa Chiang Mai — Cost & Process | IC",
  description:
    "Chiang Mai work permit and Non-B visa handled end to end for THB 112,000 including government fees, paid in three stages. English-speaking accountants, 3–5 months start to finish.",
  // ไม่มี languages/hreflang แล้ว เพราะเหลือหน้าเดียว ไม่มีคู่ภาษาไทย
  alternates: {
    canonical: "https://icaccservice.com/visa-work-permit",
  },
  openGraph: {
    title: "Work Permit & Non-B Visa Chiang Mai — Cost & Process | IC",
    description:
      "Chiang Mai work permit and Non-B visa handled end to end for THB 112,000 including government fees, paid in three stages.",
    url: "https://icaccservice.com/visa-work-permit",
    type: "website",
    locale: "en_US",
    // openGraph ของหน้าลูก override ของ root layout ทั้งก้อน จึงต้องใส่รูปซ้ำ ไม่งั้นแชร์ลิงก์ไม่มีรูป
    images: [{ url: "https://icaccservice.com/share-preview.jpg", width: 1200, height: 630 }],
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
.exp .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-top:40px;text-align:left;}
.exp .factbox{background:#fff;border:1px solid #e7edf5;border-radius:16px;padding:20px 22px;}
.exp .factbox b{font-family:"Sora";font-size:26px;display:block;color:#0f172a;line-height:1.2;}
.exp .factbox span{font-size:13.5px;color:#5b6b86;display:block;margin-top:4px;}
.exp .steps{display:flex;flex-direction:column;gap:12px;margin-top:44px;text-align:left;}
.exp .step{display:grid;grid-template-columns:44px 1fr;gap:18px;background:#fff;border:1px solid #e7edf5;border-radius:16px;padding:22px 24px;}
.exp .step .sn{width:44px;height:44px;border-radius:13px;background:linear-gradient(100deg,#2563eb,#22d3ee);color:#fff;font-family:"Sora";font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center;}
.exp .step h3{font-size:17px;font-weight:700;margin-bottom:5px;}
.exp .step p{font-size:14.5px;color:#5b6b86;}
.exp .step .when{display:inline-block;font-size:12px;font-weight:600;color:#0e7490;background:#e6fbff;padding:3px 10px;border-radius:999px;margin-top:9px;}
.exp .docs{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-top:44px;text-align:left;}
.exp .doccol{background:#fff;border:1px solid #e7edf5;border-radius:18px;padding:26px 28px;}
.exp .doccol h3{font-size:17px;font-weight:700;margin-bottom:14px;}
.exp .doccol ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
.exp .doccol li{display:flex;gap:10px;font-size:14.5px;color:#5b6b86;align-items:flex-start;}
.exp .doccol li svg{flex:0 0 auto;width:16px;height:16px;stroke:#2563eb;fill:none;stroke-width:2.6;margin-top:4px;}
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

/* ── บล็อกที่เพิ่มจากคู่มือ Non-B / Work Permit (ฉบับ ก.ค. 2569) ── */
/* ป้ายงวดชำระเงินในแต่ละขั้นตอน */
.exp .step .pay{display:inline-block;font-size:12px;font-weight:700;color:#0f2350;background:#fff3d6;border:1px solid #f4d795;padding:3px 10px;border-radius:999px;margin-top:9px;margin-left:8px;}
.exp .step ul{list-style:none;padding:0;margin:10px 0 0;display:flex;flex-direction:column;gap:7px;}
.exp .step li{display:flex;gap:9px;font-size:14px;color:#5b6b86;align-items:flex-start;}
.exp .step li::before{content:"";flex:0 0 auto;width:5px;height:5px;border-radius:50%;background:#22d3ee;margin-top:8px;}
/* ตาราง (ค่าบริการ / ค่าต่ออายุ / ไทม์ไลน์) */
.exp .tblwrap{margin-top:34px;overflow-x:auto;text-align:left;}
.exp .tbl{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e7edf5;border-radius:18px;overflow:hidden;font-size:15px;}
.exp .tbl th{background:#0f2350;color:#fff;font-family:var(--font-sora),sans-serif;font-weight:600;text-align:left;padding:14px 20px;white-space:nowrap;}
.exp .tbl td{padding:14px 20px;border-top:1px solid #eef2f8;color:#5b6b86;vertical-align:top;}
.exp .tbl td b{color:#0f172a;font-weight:600;display:block;}
.exp .tbl td .sm{font-size:13px;color:#8ea6d4;display:block;margin-top:2px;}
.exp .tbl .num{font-family:var(--font-sora),sans-serif;font-weight:700;color:#0f172a;white-space:nowrap;}
.exp .tbl tr.total td{background:#f2f7ff;border-top:2px solid #c7ddff;}
.exp .tbl tr.total td,.exp .tbl tr.total .num{color:#0f2350;font-weight:700;}
/* กล่องเตือน/ข้อควรทราบ */
.exp .notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;margin-top:44px;text-align:left;}
.exp .note{display:flex;gap:14px;background:#fff;border:1px solid #e7edf5;border-left:3px solid #22d3ee;border-radius:14px;padding:20px 22px;}
.exp .note.warn{border-left-color:#f59e0b;background:#fffdf7;}
.exp .note h3{font-size:15.5px;font-weight:700;margin-bottom:5px;color:#0f172a;}
.exp .note p{font-size:14px;color:#5b6b86;}
.exp .callout{display:flex;gap:14px;text-align:left;background:#fffdf7;border:1px solid #f4d795;border-radius:16px;padding:20px 24px;margin-top:30px;}
.exp .callout svg{flex:0 0 auto;width:22px;height:22px;stroke:#d97706;fill:none;stroke-width:2;margin-top:1px;}
.exp .callout p{font-size:14.5px;color:#5b4a1f;}
.exp .callout b{color:#7c4a03;}
/* checklist แบบมีหมายเลข */
.exp .doccol ol{list-style:none;counter-reset:d;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;}
.exp .doccol ol li{counter-increment:d;display:flex;gap:11px;font-size:14.5px;color:#5b6b86;align-items:flex-start;}
.exp .doccol ol li::before{content:counter(d);flex:0 0 auto;width:22px;height:22px;border-radius:7px;background:#eef5ff;color:#2563eb;font-size:11.5px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px;}
.exp .doccol ol li .th{display:block;color:#0f172a;font-weight:600;font-size:14.5px;}
.exp .doccol .cnt{font-size:12px;white-space:nowrap;font-weight:700;color:#0e7490;background:#e6fbff;padding:3px 10px;border-radius:999px;margin-left:8px;}
/* รูปจริงของทีมงานคู่กับข้อมูลออฟฟิศ — หน้านี้เดิมไม่มีรูปในเนื้อหาเลยสักรูป */
.exp .officegrid{display:grid;grid-template-columns:1fr 1.15fr;gap:34px;align-items:center;margin-top:40px;text-align:left;}
.exp .officeshot{position:relative;aspect-ratio:4/3;border-radius:22px;overflow:hidden;box-shadow:0 26px 50px -28px rgba(15,35,80,.45);}
.exp .officeshot img{object-fit:cover;}
.exp .officegrid .facts{margin-top:0;}
@media(max-width:900px){.exp .why{grid-template-columns:1fr;}.exp .officegrid{grid-template-columns:1fr;}}
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
    a: "The Department of Employment takes 7 to 15 working days to issue the permit once your documents are in order. End to end — document preparation, WP.3 pre-approval, the Non-B visa, the permit itself and the 12-month extension of stay — allow roughly three to five months.",
  },
  {
    q: "How much does a Non-B visa and work permit cost?",
    a: "Our service fee is 112,000 THB including government fees, paid in three installments: 45,000 on submission of the Non-B visa application, 22,000 on the day the work permit is collected, and 45,000 at the 12-month extension of stay. Renewal from the second year is 37,000 THB per year.",
  },
  {
    q: "What does my employer need to qualify to sponsor me?",
    a: "2,000,000 THB of paid-up registered capital per foreign employee, four Thai employees registered with Social Security per foreigner, and a minimum monthly salary of 25,000 to 50,000 THB depending on your nationality. These conditions must be maintained for as long as the permit is valid.",
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

export default function VisaWorkPermitPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          serviceSchema({
            name: "Work Permit & Non-B Visa Services in Chiang Mai",
            description:
              "English-speaking accountants in Chiang Mai handling Thai work permits, Non-Immigrant B business visas, company registration, Thai tax and BOI advisory for foreigners living and working in Thailand.",
            path: "/visa-work-permit",
            // ราคาชุดเดียวกับตารางค่าบริการที่แสดงอยู่บนหน้า (คู่มือฉบับ ก.ค. 2569)
            offers: [
              {
                name: "Non-B visa and work permit — full process",
                price: "112000",
                description:
                  "Service fee including government fees, paid in three installments: 45,000 on submission of the Non-B visa application, 22,000 on work permit collection, 45,000 at the 12-month extension of stay.",
              },
              {
                name: "Annual renewal — visa extension and work permit",
                price: "37000",
                description:
                  "Per year from the second year: 25,000 for the 12-month extension of stay and 12,000 for the work permit renewal.",
              },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "IC Visa / Work Permit", path: "/visa-work-permit" },
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
              <span>IC Visa / Work Permit</span>
            </nav>
            <span className="kb"><span className="dot" />A sub-brand of IC Accounting &amp; Service · Chiang Mai, Thailand</span>
            <h1>Work permit and visa services in <span className="g">Chiang Mai</span>.</h1>
            <p className="lead">Non-B business visas, work permits and company registration &mdash; handled end to end by an English-speaking accounting team in Chiang Mai that also keeps your Thai books and tax filings in order.</p>
            <p className="kws">For foreigners working, hiring or starting a business in Chiang Mai &mdash; whether you already have a Thai company or need one set up first.</p>
            <div className="hbtns">
              {/* ปุ่มนี้พาไปที่ส่วนขั้นตอน 6 ขั้น ค่าบริการ และเอกสาร (เนื้อหาชุดเดียวกับคู่มือ PDF ที่ทีมส่งให้ลูกค้า) */}
              <a className="btn btn-g" href="#process">See the full process &amp; fees</a>
              <a className="btn btn-ghost" href="https://line.me/R/ti/p/@icacc" target="_blank" rel="noopener noreferrer">Talk to us on LINE</a>
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
                <p className="eyebrow" style={{ color: "#22d3ee" }}>Why work with IC</p>
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

        {/*
          เนื้อหาส่วนนี้ยกมาจากคู่มือ Non-B Visa & Work Permit ฉบับ ก.ค. 2569 ของ IC
          (ไฟล์ Non-B_Visa_WorkPermit_Guide_TH-EN.pdf) เพื่อให้สิ่งที่ลูกค้าเห็นบนเว็บ
          ตรงกับเอกสารที่ทีมงานส่งให้ลูกค้าจริงทุกตัวเลข ทั้งขั้นตอน ระยะเวลา และค่าบริการ
        */}
        <section id="process" className="sec" style={{ scrollMarginTop: 90 }}>
          <div className="w center">
            <p className="eyebrow">The process</p>
            <h2 className="title">How a Chiang Mai work permit actually works</h2>
            <p className="sublead">Six steps, in order, from document preparation to collection &mdash; around three to five months end to end. We run every stage for you.</p>

            <div className="facts">
              <div className="factbox"><b>2,000,000&#3647;</b><span>paid-up registered capital required per foreign employee</span></div>
              <div className="factbox"><b>4 : 1</b><span>Thai employees registered with Social Security per foreigner</span></div>
              <div className="factbox"><b>25,000&ndash;50,000&#3647;</b><span>minimum monthly salary, varies by nationality (Immigration Bureau criteria)</span></div>
            </div>
            <p className="sublead center" style={{ marginTop: 16, fontSize: 14.5 }}>
              These are your employer&rsquo;s eligibility requirements. We check them before anything else &mdash; and they must stay in place for as long as the permit is valid.
            </p>

            <div className="steps">
              <div className="step">
                <span className="sn">1</span>
                <div>
                  <h3>Prepare all required documents</h3>
                  <ul>
                    <li>Two sets: company documents and applicant documents &mdash; the full checklist is below.</li>
                    <li>We verify the registered capital and the Thai-employee ratio before anything is filed.</li>
                  </ul>
                  <span className="when">1&ndash;2 weeks</span>
                </div>
              </div>
              <div className="step">
                <span className="sn">2</span>
                <div>
                  <h3>Obtain WP.3 pre-approval, then apply for the Non-B visa</h3>
                  <ul>
                    <li>As your employer&rsquo;s representative we file the WP.3 (Tor.Tor.3) at the Provincial Employment Office to obtain the pre-approval letter.</li>
                    <li>You then apply for the Non-B visa at a Royal Thai Embassy or Consulate abroad, or through the Thai e-Visa system.</li>
                  </ul>
                  <span className="when">2&ndash;4 weeks</span>
                  <span className="pay">Installment 1 &mdash; 45,000&#3647;</span>
                </div>
              </div>
              <div className="step">
                <span className="sn">3</span>
                <div>
                  <h3>Enter Thailand &mdash; you receive a 90-day permission to stay</h3>
                  <ul>
                    <li>Complete the Thailand Digital Arrival Card (TDAC) before every entry.</li>
                    <li>Your landlord or house owner must file the TM.30 within 24 hours of you taking up residence.</li>
                  </ul>
                </div>
              </div>
              <div className="step">
                <span className="sn">4</span>
                <div>
                  <h3>Apply for the work permit within 90 days of entry</h3>
                  <ul>
                    <li>Filed at the Chiang Mai Provincial Employment Office with the original company and applicant documents.</li>
                    <li>A medical certificate issued by a Thai hospital is required at this stage.</li>
                    <li>Permits are now issued through the e-Work Permit (digital) system.</li>
                  </ul>
                  <span className="when">7&ndash;15 working days</span>
                  <span className="pay">Installment 2 &mdash; 22,000&#3647;</span>
                </div>
              </div>
              <div className="step">
                <span className="sn">5</span>
                <div>
                  <h3>Extend your permission to stay to 12 months</h3>
                  <ul>
                    <li>Filed at Chiang Mai Immigration before your 90-day stay expires &mdash; we recommend starting 30 to 45 days ahead.</li>
                    <li>The work permit from step 4 is the key supporting document, together with your tax and Social Security evidence.</li>
                  </ul>
                  <span className="when">1&ndash;30 days</span>
                  <span className="pay">Installment 3 &mdash; 45,000&#3647;</span>
                </div>
              </div>
              <div className="step">
                <span className="sn">6</span>
                <div>
                  <h3>Process complete &mdash; your annual obligations begin</h3>
                  <ul>
                    <li>90-day address reporting, annual visa and work permit renewal, and personal income tax filing.</li>
                    <li>We keep all three on schedule alongside your company&rsquo;s accounts.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="callout">
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
              <p>
                <b>Important:</b> the Non-B visa alone does <b>not</b> authorise work. You may only start working once the work permit has been issued &mdash; otherwise fines and deportation apply.
              </p>
            </div>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">Estimated timeline for a Chiang Mai work permit</caption>
                <thead>
                  <tr><th>Stage</th><th>Duration</th><th>Authority</th></tr>
                </thead>
                <tbody>
                  <tr><td><b>Document preparation</b></td><td className="num">1&ndash;2 weeks</td><td>Employer + IC Accounting</td></tr>
                  <tr><td><b>WP.3 pre-approval</b><span className="sm">Tor.Tor.3</span></td><td className="num">7&ndash;15 working days</td><td>Provincial Employment Office</td></tr>
                  <tr><td><b>Non-B visa issuance</b></td><td className="num">5&ndash;10 working days</td><td>Royal Thai Embassy / Consulate</td></tr>
                  <tr><td><b>Work permit</b></td><td className="num">7&ndash;15 working days</td><td>Department of Employment</td></tr>
                  <tr><td><b>12-month extension of stay</b></td><td className="num">1&ndash;30 days</td><td>Immigration Bureau</td></tr>
                  <tr className="total"><td><b>Total end to end</b></td><td className="num" colSpan={2}>Approximately 3&ndash;5 months</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="w center">
            <p className="eyebrow">Service fees</p>
            <h2 className="title">What it costs, paid in three stages</h2>
            <p className="sublead">Our service fee includes the government fees at each stage. You pay as the process moves forward &mdash; never everything up front.</p>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">Work permit and Non-B visa service fees</caption>
                <thead>
                  <tr><th>Installment</th><th>When it is due</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  <tr><td><b>Installment 1</b></td><td>On submission of the Non-B visa application</td><td className="num">45,000&#3647;</td></tr>
                  <tr><td><b>Installment 2</b></td><td>On the day the work permit is collected</td><td className="num">22,000&#3647;</td></tr>
                  <tr><td><b>Installment 3</b></td><td>On the 12-month extension of stay</td><td className="num">45,000&#3647;</td></tr>
                  <tr className="total"><td><b>Total</b></td><td>Service fee including government fees</td><td className="num">112,000&#3647;</td></tr>
                </tbody>
              </table>
            </div>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">Annual renewal fees</caption>
                <thead>
                  <tr><th>Annual renewal</th><th>Per year</th></tr>
                </thead>
                <tbody>
                  <tr><td><b>Extension of stay &mdash; 12 months</b></td><td className="num">25,000&#3647;</td></tr>
                  <tr><td><b>Work permit renewal</b></td><td className="num">12,000&#3647;</td></tr>
                  <tr className="total"><td><b>Total per year</b></td><td className="num">37,000&#3647;</td></tr>
                </tbody>
              </table>
            </div>

            <p className="sublead center" style={{ marginTop: 20, fontSize: 14, color: '#8ea6d4' }}>
              Re-entry permits are paid separately and in cash by the applicant at Immigration or the airport &mdash; 1,000&#3647; single entry, 3,800&#3647; multiple (around 1,200&#3647; at the airport).
            </p>
          </div>
        </section>

        <section id="documents" className="sec" style={{ scrollMarginTop: 90 }}>
          <div className="w center">
            <p className="eyebrow">What to prepare</p>
            <h2 className="title">Your work permit document checklist</h2>
            <p className="sublead">Two sets of documents. Most of the company side comes straight out of your accounts and tax filings &mdash; which is exactly the half we already look after.</p>
            <div className="docs">
              <div className="doccol">
                <h3>Part 1 &middot; Company documents<span className="cnt">12 items</span></h3>
                <p style={{ fontSize: 13.5, color: '#8ea6d4', marginBottom: 14 }}>From the sponsoring Thai company</p>
                <ol>
                  <li><span><span className="th">Company Affidavit / Certificate of Registration</span>Issued within the last 6 months</span></li>
                  <li><span><span className="th">Memorandum of Association</span>Plus all amendment records</span></li>
                  <li><span><span className="th">List of Shareholders</span>Bor.Or.Jor.5</span></li>
                  <li><span><span className="th">Latest audited financial statements</span>Certified by a licensed auditor</span></li>
                  <li><span><span className="th">PND.50 / PND.51</span>Annual and half-year corporate income tax returns</span></li>
                  <li><span><span className="th">PND.1 and PP.30, last 3 months</span>Withholding tax and VAT returns</span></li>
                  <li><span><span className="th">SorPorSor.1-10</span>Monthly Social Security contribution filings</span></li>
                  <li><span><span className="th">VAT registration certificate</span>Por.Por.20 and Por.Por.01</span></li>
                  <li><span><span className="th">Office map and photographs</span>Signage, interior and exterior</span></li>
                  <li><span><span className="th">Authorised director&rsquo;s ID</span>ID card and house registration</span></li>
                  <li><span><span className="th">Letter of Employment / Appointment</span>Including the job description</span></li>
                  <li><span><span className="th">Employment Contract</span>Stating position, salary and workplace</span></li>
                </ol>
              </div>
              <div className="doccol">
                <h3>Part 2 &middot; Applicant documents<span className="cnt">8 items</span></h3>
                <p style={{ fontSize: 13.5, color: '#8ea6d4', marginBottom: 14 }}>From you, the foreign applicant</p>
                <ol>
                  <li><span><span className="th">Original passport</span>At least 6 months validity, plus copies of every stamped page</span></li>
                  <li><span><span className="th">Six photos, 3&times;4 cm</span>White background, taken within the last 6 months</span></li>
                  <li><span><span className="th">Educational proof</span>Degree certificate or transcript</span></li>
                  <li><span><span className="th">Proof of work experience</span>CV or r&eacute;sum&eacute;</span></li>
                  <li><span><span className="th">Reference letters</span>From previous employers, if any</span></li>
                  <li><span><span className="th">Medical certificate</span>From a Thai hospital, for the work permit stage</span></li>
                  <li><span><span className="th">TM.6 form and proof of residence</span>Lease agreement or TM.30</span></li>
                  <li><span><span className="th">Certified translations</span>All foreign-language documents must be translated and certified as required</span></li>
                </ol>
              </div>
            </div>
            <p className="center" style={{ marginTop: 30, fontSize: 14.5, color: '#5b6b86' }}>
              Want every detail? Read our full guide{' '}
              <Link href="/blog/work-permit-chiangmai" hrefLang="th" style={{ color: '#2563eb', fontWeight: 600 }}>
                Work Permit เชียงใหม่ (in Thai)
              </Link>
            </p>
          </div>
        </section>

        <section className="sec alt">
          <div className="w center">
            <p className="eyebrow">Important notes</p>
            <h2 className="title">Obligations that continue after the permit</h2>
            <p className="sublead">A work permit is not a one-off. These are the rules that decide whether next year&rsquo;s renewal goes through &mdash; we track every one of them for you.</p>
            <div className="notes">
              <div className="note warn">
                <div>
                  <h3>Re-entry permit before every departure</h3>
                  <p>Without one, your permission to stay is cancelled the moment you leave. Official fee 1,000&#3647; single or 3,800&#3647; multiple (around 1,200&#3647; at the airport), cash, paid in person at Immigration or the airport.</p>
                </div>
              </div>
              <div className="note">
                <div>
                  <h3>90-day reporting</h3>
                  <p>You must report your address to Immigration every 90 days &mdash; online, by post or in person. Free of charge when filed on time.</p>
                </div>
              </div>
              <div className="note">
                <div>
                  <h3>TM.30 after every move and re-entry</h3>
                  <p>Your house owner or landlord must notify Immigration of your residence within 24 hours, every time you move or return to Thailand.</p>
                </div>
              </div>
              <div className="note warn">
                <div>
                  <h3>The permit is tied to one employer and role</h3>
                  <p>It covers a specific employer, position and workplace. Any change requires an amendment or an entirely new permit.</p>
                </div>
              </div>
              <div className="note">
                <div>
                  <h3>Personal income tax</h3>
                  <p>Work permit holders must file an annual PND.91 return. Proof of tax paid is essential evidence for the following year&rsquo;s visa renewal.</p>
                </div>
              </div>
              <div className="note">
                <div>
                  <h3>Start renewals early</h3>
                  <p>Begin the work permit renewal 60 days ahead, and the visa extension 30 to 45 days before expiry.</p>
                </div>
              </div>
              <div className="note warn">
                <div>
                  <h3>Your employer must stay eligible</h3>
                  <p>2,000,000&#3647; registered capital and four Thai Social Security-registered employees per foreigner must hold throughout the permit&rsquo;s validity, or renewal may be refused.</p>
                </div>
              </div>
              <div className="note warn">
                <div>
                  <h3>Some occupations are reserved for Thai nationals</h3>
                  <p>Certain jobs are restricted by law. Confirm the intended position with us before starting the process.</p>
                </div>
              </div>
            </div>
            <p className="center" style={{ marginTop: 28, fontSize: 13.5, color: '#8ea6d4', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
              This page is for general guidance only. Government fees, processing times and requirements are subject to change by the relevant authorities &mdash; please confirm current details with our team before proceeding. Last updated: July 2026.
            </p>
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
              <div className="qa"><h4>How long does a work permit in Chiang Mai take?</h4><p>The Department of Employment takes 7 to 15 working days to issue the permit once your documents are in order. End to end — document preparation, WP.3 pre-approval, the Non-B visa, the permit itself and the 12-month extension of stay — allow roughly three to five months.</p></div>
              <div className="qa"><h4>How much does a Non-B visa and work permit cost?</h4><p>Our service fee is 112,000 THB including government fees, paid in three installments: 45,000 on submission of the Non-B visa application, 22,000 on the day the work permit is collected, and 45,000 at the 12-month extension of stay. Renewal from the second year is 37,000 THB per year.</p></div>
              <div className="qa"><h4>What does my employer need to qualify to sponsor me?</h4><p>2,000,000 THB of paid-up registered capital per foreign employee, four Thai employees registered with Social Security per foreigner, and a minimum monthly salary of 25,000 to 50,000 THB depending on your nationality. These conditions must be maintained for as long as the permit is valid.</p></div>
              <div className="qa"><h4>Do I need a Thai company to get a work permit?</h4><p>Usually yes — you need a sponsoring employer. We can register your Thai company and sponsor the work permit in one package.</p></div>
              <div className="qa"><h4>Can foreigners own 100% of a Thai business?</h4><p>In specific cases — via BOI promotion, a US Amity Treaty company, or a Foreign Business License. We advise the best route for you.</p></div>
            </div>
            <p className="center" style={{ marginTop: 28, fontSize: 14.5, color: '#5b6b86' }}>
              {/* เดิมลิงก์กลับมาหน้าตัวเอง — ตกค้างจากตอนที่ยังมีหน้าไทยแยกอีกหน้า
                  เปลี่ยนเป็นขั้นตอนถัดไปจริงของคนที่ยังไม่มีบริษัทไทย */}
              Don&rsquo;t have a Thai company yet?{' '}
              <Link href="/company-registration" hrefLang="th" style={{ color: '#2563eb', fontWeight: 600 }}>
                We can register one for you first
              </Link>
            </p>
          </div>
        </section>

        <section className="sec">
          <div className="w center">
            <p className="eyebrow">Visit us</p>
            <h2 className="title">Our office in Chiang Mai</h2>
            <p className="sublead">
              We are a licensed Thai accounting firm, not a visa broker &mdash; the same team that files your
              work permit also keeps your company&rsquo;s books and tax filings in order.
            </p>
            <div style={{ marginTop: 22 }}>
              {/* คะแนนดึงสดจาก Google — หน้านี้เดิมไม่มี social proof เลย */}
              <GoogleRatingBadge label="on Google" reviewsLabel="reviews" />
            </div>
            <div className="officegrid">
              <div className="officeshot">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Behide%20Scene%2FBehide%20Scene%2015.png?alt=media"
                  alt="The IC Accounting &amp; Service team at work in our Doi Saket office, Chiang Mai"
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                />
              </div>
            <div className="facts" style={{ textAlign: "left" }}>
              <div className="factbox">
                <b style={{ fontSize: 17 }}>IC Accounting &amp; Service Co., Ltd.</b>
                <span>80/142 Tambon San Pu Loei, Doi Saket District, Chiang Mai 50220, Thailand</span>
                <span style={{ marginTop: 8 }}>
                  <a href="https://maps.google.com/?cid=11080561333861967427" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 600 }}>
                    Open in Google Maps
                  </a>
                </span>
              </div>
              <div className="factbox">
                <b style={{ fontSize: 17 }}>Talk to us</b>
                <span>Phone <a href="tel:0957161422" style={{ color: "#2563eb", fontWeight: 600 }}>095-716-1422</a></span>
                <span>LINE <a href="https://line.me/R/ti/p/@icacc" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 600 }}>@icacc</a></span>
                <span>Email contact@icaccservice.com</span>
              </div>
              <div className="factbox">
                <b style={{ fontSize: 17 }}>Office hours</b>
                <span>Monday to Friday, 09:00&ndash;18:00</span>
                <span>Appointments outside these hours can be arranged on LINE.</span>
              </div>
            </div>
            </div>
          </div>
        </section>

        <div className="bandwrap">
          <div className="band">
            <h2>Ready to sort out your Chiang Mai work permit?</h2>
            <p>Free, no-obligation consultation in English. Tell us your situation and we will map the right visa and business path for you.</p>
            <div className="hbtns">
              <a className="btn btn-w" href="https://line.me/R/ti/p/@icacc" target="_blank" rel="noopener noreferrer">Chat with us on LINE</a>
              <a className="btn btn-t" href="/quote">Book a free consultation</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
