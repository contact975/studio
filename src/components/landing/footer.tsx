"use client"

import { usePathname } from "next/navigation";
import { Facebook, MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { CinematicFooter, type FooterAction, type FooterLinkGroup } from "@/components/ui/motion-footer";
import { isEnglishPath, toEnglishHref } from "@/lib/i18n-routes";

/**
 * ฟุตเตอร์ของทุกหน้า — ข้อมูลของ IC อยู่ที่ไฟล์นี้ไฟล์เดียว
 * ส่วนหน้าตา/แอนิเมชันอยู่ที่ components/ui/motion-footer.tsx
 *
 * ลิงก์ในฟุตเตอร์ — ส่วนที่หายไปทั้งเว็บ
 *
 * เมนู "บริการของเรา" บน header สร้างลิงก์ต่อเมื่อผู้ใช้เอาเมาส์ไปชี้
 * ({isServicesOpen && ...}) แปลว่าใน HTML ที่ส่งให้ Google
 * ไม่มีลิงก์ไปหน้าบริการสักหน้าเดียว ทั้งเว็บมีลิงก์ภายในแค่ 3 ลิงก์
 *
 * Google ใช้โครงลิงก์ภายในเป็นตัวหลักในการเลือก sitelink และประเมินว่า
 * หน้าไหนสำคัญ เมื่อไม่มีลิงก์ให้เดินตาม จึงต้องเดาเอง — และไปหยิบ
 * alt ของโลโก้มาเป็นชื่อลิงก์แทน
 *
 * ฟุตเตอร์อยู่ทุกหน้าอยู่แล้ว การใส่ลิงก์ตรงนี้จึงทำให้ทุกหน้าบริการ
 * ได้ลิงก์จากทุกหน้าในเว็บทันที โดยไม่ต้องแตะโครงสร้าง header เลย
 * (ลิงก์ทุกตัวด้านล่างเรนเดอร์เป็น <a> จริงผ่าน next/link — ไม่ได้ซ่อนหลัง JS)
 *
 * ── สองภาษา ──
 * ฟุตเตอร์ดู URL เองว่าอยู่หน้าอังกฤษ (/en/*) หรือไม่ หน้าที่เรียกใช้จึงไม่ต้องส่งอะไรมา
 * ลิงก์เขียนเป็น URL ไทยชุดเดียว ฝั่งอังกฤษแปลงผ่าน toEnglishHref()
 * หน้าที่ไม่มีคู่ภาษา (/blog) ฝั่งอังกฤษลิงก์ไปหน้าไทยตรงๆ และป้ายบอกไว้
 */
type Lang = "th" | "en";

const COPY = {
  th: {
    servicesTitle: "บริการของเรา",
    services: {
      accounting: "รับทำบัญชีและภาษี",
      registration: "จดทะเบียนบริษัท",
      audit: "ตรวจสอบบัญชี",
      orgSystem: "วางระบบองค์กร",
    },
    aboutTitle: "เกี่ยวกับ IC",
    about: {
      about: "เกี่ยวกับเรา",
      blog: "บทความน่ารู้",
      internship: "นักศึกษาฝึกงาน",
      quote: "นัดหมายปรึกษา",
    },
    lineCta: "ปรึกษาฟรีผ่าน LINE",
    // ข้อความวิ่งด้านบน — ชุดบริการเดียวกับ hasOfferCatalog ใน app/layout.tsx
    marquee: [
      "รับทำบัญชีและภาษี",
      "ปิดงบการเงิน",
      "จดทะเบียนบริษัท",
      "ตรวจสอบบัญชี",
      "Visa & Work Permit",
      "วางระบบองค์กร",
      "Media Production",
      "สำนักงานบัญชีเชียงใหม่ · ดูแลกว่า 100 ธุรกิจ",
    ],
    headingLine1: "ให้ IC ดูแลตัวเลข",
    headingLine2: "ส่วนคุณดูแลธุรกิจ",
    address: "80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220",
    // ที่อยู่จดทะเบียนใช้ในใบกำกับภาษี/หัก ณ ที่จ่าย — แสดงเป็นข้อมูลรอง ไม่ใส่ใน schema (Google ใช้ที่ทำการจริงข้างบน)
    registeredAddress: "ที่อยู่จดทะเบียน: 339 หมู่ 3 ต.แม่สา อ.แม่ริม เชียงใหม่ 50180 · เลขประจำตัวผู้เสียภาษี 0-5055-68013-74-3",
    backToTop: "กลับขึ้นด้านบน",
  },
  en: {
    servicesTitle: "Our Services",
    services: {
      accounting: "Accounting & Tax",
      registration: "Company Registration",
      audit: "Audit Services",
      orgSystem: "Organization System Setup",
    },
    aboutTitle: "About IC",
    about: {
      about: "About Us",
      blog: "Articles (Thai)",
      internship: "Internship",
      quote: "Book a Consultation",
    },
    lineCta: "Free consultation on LINE",
    marquee: [
      "Accounting & Tax",
      "Financial Statements",
      "Company Registration",
      "Audit Services",
      "Visa & Work Permit",
      "Organization System Setup",
      "Media Production",
      "Accounting firm in Chiang Mai · Serving 100+ businesses",
    ],
    headingLine1: "Let IC handle the numbers,",
    headingLine2: "while you run the business",
    address: "80/142 San Pu Loei, Doi Saket, Chiang Mai 50220",
    registeredAddress: "Registered address: 339 Moo 3, Mae Sa, Mae Rim, Chiang Mai 50180 · Tax ID 0-5055-68013-74-3",
    backToTop: "Back to top",
  },
} as const;

function buildFooter(lang: Lang) {
  const c = COPY[lang];
  const href = (h: string) => (lang === "en" ? toEnglishHref(h) : h);

  const linkGroups: FooterLinkGroup[] = [
    {
      title: c.servicesTitle,
      links: [
        { href: href("/accounting-services"), label: c.services.accounting },
        { href: href("/company-registration"), label: c.services.registration },
        { href: href("/audit-services"), label: c.services.audit },
        { href: href("/visa-work-permit"), label: "IC Visa / Work Permit" },
        { href: href("/organization-system"), label: c.services.orgSystem },
        { href: href("/media-content"), label: "Exclusive Media Production" },
      ],
    },
    {
      title: c.aboutTitle,
      links: [
        { href: href("/about"), label: c.about.about },
        { href: "/blog", label: c.about.blog },
        { href: href("/internship"), label: c.about.internship },
        { href: href("/quote"), label: c.about.quote },
      ],
    },
  ];

  // ปุ่มหลัก — ช่องทางติดต่อหลัก (LINE / โทร / นัดหมาย) ส่วน CTA ท้ายหน้าแรกเดิมถูกยุบมารวมที่นี่
  const primaryActions: FooterAction[] = [
    { href: "https://line.me/R/ti/p/@icacc", label: c.lineCta, icon: MessageCircle, external: true },
    { href: "tel:0957161422", label: "095-716-1422", icon: Phone, external: true },
    { href: href("/quote"), label: c.about.quote, icon: CalendarCheck },
  ];

  return { c, linkGroups, primaryActions };
}

const social: FooterAction[] = [
  { href: "https://www.facebook.com/icaccservice", label: "Facebook", icon: Facebook, external: true },
  { href: "https://line.me/R/ti/p/@icacc", label: "LINE", icon: MessageCircle, external: true },
];

export function Footer() {
  const lang: Lang = isEnglishPath(usePathname()) ? "en" : "th";
  const { c, linkGroups, primaryActions } = buildFooter(lang);

  return (
    <CinematicFooter
      brandText="IC ACC"
      heading={
        <>
          {c.headingLine1}
          <br />
          {c.headingLine2}
        </>
      }
      marqueeItems={[...c.marquee]}
      primaryActions={primaryActions}
      linkGroups={linkGroups}
      contact={{
        address: c.address,
        // หมุดเดียวกับ Google Business Profile (cid แปลงมาจาก place id ของแผนที่ฝังเดิม)
        mapUrl: "https://maps.google.com/?cid=11080561333861967427",
        email: "contact@icaccservice.com",
        registeredAddress: c.registeredAddress,
      }}
      social={social}
      companyName="IC Accounting & Service"
      backToTopLabel={c.backToTop}
    />
  );
}
