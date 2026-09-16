"use client"

import { Facebook, MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { CinematicFooter, type FooterAction, type FooterLinkGroup } from "@/components/ui/motion-footer";

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
 */
const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "บริการของเรา",
    links: [
      { href: "/accounting-services", label: "รับทำบัญชีและภาษี" },
      { href: "/company-registration", label: "จดทะเบียนบริษัท" },
      { href: "/audit-services", label: "ตรวจสอบบัญชี" },
      { href: "/visa-work-permit", label: "IC Visa / Work Permit" },
      { href: "/organization-system", label: "วางระบบองค์กร" },
      { href: "/media-content", label: "Exclusive Media Production" },
    ],
  },
  {
    title: "เกี่ยวกับ IC",
    links: [
      { href: "/about", label: "เกี่ยวกับเรา" },
      { href: "/blog", label: "บทความน่ารู้" },
      { href: "/quote", label: "นัดหมายปรึกษา" },
    ],
  },
];

// ปุ่มหลัก — ช่องทางติดต่อหลัก (LINE / โทร / นัดหมาย) ส่วน CTA ท้ายหน้าแรกเดิมถูกยุบมารวมที่นี่
const primaryActions: FooterAction[] = [
  { href: "https://line.me/R/ti/p/@icacc", label: "ปรึกษาฟรีผ่าน LINE", icon: MessageCircle, external: true },
  { href: "tel:0957161422", label: "095-716-1422", icon: Phone, external: true },
  { href: "/quote", label: "นัดหมายปรึกษา", icon: CalendarCheck },
];

const social: FooterAction[] = [
  { href: "https://www.facebook.com/icaccservice", label: "Facebook", icon: Facebook, external: true },
  { href: "https://line.me/R/ti/p/@icacc", label: "LINE", icon: MessageCircle, external: true },
];

// ข้อความวิ่งด้านบน — ชุดบริการเดียวกับ hasOfferCatalog ใน app/layout.tsx
const marqueeItems = [
  "รับทำบัญชีและภาษี",
  "ปิดงบการเงิน",
  "จดทะเบียนบริษัท",
  "ตรวจสอบบัญชี",
  "Visa & Work Permit",
  "วางระบบองค์กร",
  "Media Production",
  "สำนักงานบัญชีเชียงใหม่ · ดูแลกว่า 100 ธุรกิจ",
];

export function Footer() {
  return (
    <CinematicFooter
      brandText="IC ACC"
      heading={
        <>
          ให้ IC ดูแลตัวเลข
          <br />
          ส่วนคุณดูแลธุรกิจ
        </>
      }
      marqueeItems={marqueeItems}
      primaryActions={primaryActions}
      linkGroups={footerLinkGroups}
      contact={{
        address: "80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220",
        // หมุดเดียวกับ Google Business Profile (cid แปลงมาจาก place id ของแผนที่ฝังเดิม)
        mapUrl: "https://maps.google.com/?cid=11080561333861967427",
        email: "contact@icaccservice.com",
        // ที่อยู่จดทะเบียนใช้ในใบกำกับภาษี/หัก ณ ที่จ่าย — แสดงเป็นข้อมูลรอง ไม่ใส่ใน schema (Google ใช้ที่ทำการจริงข้างบน)
        registeredAddress: "ที่อยู่จดทะเบียน: 339 หมู่ 3 ต.แม่สา อ.แม่ริม เชียงใหม่ 50180 · เลขประจำตัวผู้เสียภาษี 0-5055-68013-74-3",
      }}
      social={social}
      companyName="IC Accounting & Service"
    />
  );
}
