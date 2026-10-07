/**
 * สไตล์ของหน้า Visa & Work Permit — ใช้ร่วมกันทั้งฉบับไทยและฉบับอังกฤษ
 *
 * ── ทำไมต้องแยกออกมา ──
 * ตอนแยกหน้าเป็นสองภาษาครั้งแรก หน้าไทยถูกสร้างด้วยคอมโพเนนต์มาตรฐานของเว็บ
 * ส่วนหน้าอังกฤษใช้ดีไซน์เฉพาะตัวชุดนี้ ผลคือพอผู้ใช้กดสลับภาษาแล้วเหมือนหลุด
 * ไปอีกเว็บหนึ่ง ทั้งที่เป็นหน้าเดียวกันคนละภาษา
 *
 * ย้ายมาไว้ที่เดียวแล้วให้ทั้งสองหน้า import ไฟล์นี้ ดีไซน์จึงแยกจากกันไม่ได้อีก
 * แก้สีหรือระยะห่างที่นี่ที่เดียว เปลี่ยนพร้อมกันทั้งสองภาษาเสมอ
 *
 * ── เรื่องฟอนต์ ──
 * CSS ชุดนี้อ้างถึง --font-sora (หัวข้อ) กับ --font-inter (เนื้อความ)
 * ซึ่งเป็นฟอนต์ละตินล้วน ไม่มีอักษรไทย
 * หน้าไทยจึง override ตัวแปรสองตัวนี้ให้ชี้ไปที่ Kanit แทน
 * โครงสร้าง สี และระยะห่างยังเหมือนกันทุกประการ ต่างกันแค่ชุดอักษร
 */
export const visaPageCss = `
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
