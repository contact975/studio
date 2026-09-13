"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  FileCheck2,
  Building2,
  BadgeCheck,
  Workflow,
  Clapperboard,
} from "lucide-react";
import {
  BentoGrid,
  BentoCard,
  GrowingBars,
  ProgressReveal,
  PulseIcon,
  SequenceBadges,
  ShiftingLayout,
  BreathingIcon,
} from "@/components/ui/bento-grid-01";

/**
 * Section บริการ — เปลี่ยนจากเมนูซ้าย + รูปภาพ เป็น Bento Grid 6 การ์ด
 *
 * ตัด "นัดหมายปรึกษา" ออก (มีปุ่มในฟุตเตอร์แล้ว) และแทนรูปด้วยไอคอน + แอนิเมชันย่อย
 * ที่สื่อถึงบริการนั้นๆ — ชื่อบริการ คำอธิบาย และลิงก์ไปหน้าบริการทั้ง 6 ยังเป็น HTML จริง
 * เหมือนเดิม (fullTitle / description ยังใช้คีย์เวิร์ด "เชียงใหม่" ชุดเดิม)
 */
type Service = {
  id: string;
  num: string;
  fullTitle: string;
  tag: string;
  description: string;
  href: string;
  size: "standard" | "tall" | "wide";
  visual: React.ReactNode;
};

const services: Service[] = [
  {
    id: "accounting",
    num: "01",
    fullTitle: "บริการทำบัญชี เชียงใหม่",
    tag: "Accounting Services",
    description:
      "รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง",
    href: "/accounting-services",
    size: "tall",
    visual: <GrowingBars icon={Calculator} />,
  },
  {
    id: "audit",
    num: "02",
    fullTitle: "ตรวจสอบบัญชีและปิดงบ เชียงใหม่",
    tag: "Audit Services",
    description:
      "ตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันกำหนด ดูแลโดยทีมงานสำนักงานบัญชีเชียงใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%",
    href: "/audit-services",
    size: "standard",
    visual: <ProgressReveal value="100%" label="ถูกต้อง ทันกำหนด" />,
  },
  {
    id: "registration",
    num: "03",
    fullTitle: "จดทะเบียนบริษัท เชียงใหม่",
    tag: "Company Registration",
    description:
      "รับจดทะเบียนธุรกิจในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา",
    href: "/company-registration",
    size: "tall",
    visual: <PulseIcon icon={Building2} />,
  },
  {
    id: "expat",
    num: "04",
    fullTitle: "Visa & Work Permit เชียงใหม่",
    tag: "IC Visa / Work Permit",
    description:
      "ดูแลการขอและต่ออายุวีซ่าทุกประเภทในพื้นที่เชียงใหม่ และจัดการใบอนุญาตทำงาน ประสานงานหน่วยงานราชการให้ครบทุกขั้นตอนสำหรับชาวต่างชาติ",
    href: "/visa-work-permit",
    size: "standard",
    visual: <SequenceBadges icon={BadgeCheck} />,
  },
  {
    id: "system",
    num: "05",
    fullTitle: "วางระบบบัญชีและองค์กร",
    tag: "Organization System",
    description:
      "ปรับการจัดการหลังบ้านสำหรับธุรกิจเชียงใหม่ สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนเอกสารให้เป็นระบบ เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน",
    href: "/organization-system",
    size: "wide",
    visual: <ShiftingLayout icon={Workflow} />,
  },
  {
    id: "media",
    num: "06",
    fullTitle: "รับผลิต Media Content เชียงใหม่",
    tag: "Marketing Online",
    description:
      "สร้างภาพลักษณ์ธุรกิจให้น่าเชื่อถือด้วยบริการผลิตวิดีโอและกราฟิกคุณภาพสูงในเชียงใหม่ ช่วยให้แบรนด์ของคุณมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง",
    href: "/media-content",
    size: "wide",
    visual: <BreathingIcon icon={Clapperboard} />,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">Our Services</p>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">บริการจากสำนักงานบัญชีเชียงใหม่</h2>
        </div>

        <BentoGrid>
          {services.map((service, index) => {
            const tall = service.size === "tall";
            return (
              <BentoCard key={service.id} size={service.size} delay={index * 0.08}>
                <Link href={service.href} className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold text-[#2657c1]/40">{service.num}</span>
                    <span className="rounded-full border border-[#2657c1]/15 bg-[#2657c1]/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2657c1]">
                      {service.tag}
                    </span>
                  </div>

                  <div className={tall ? "flex-1 py-6" : "min-h-0 flex-1 py-2"}>{service.visual}</div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-black leading-snug text-[#2657c1] md:text-xl">{service.fullTitle}</h3>
                    <p className={tall ? "mt-2 text-sm leading-relaxed text-gray-500" : "mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500"}>
                      {service.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2657c1]/70 transition-all group-hover:gap-2.5 group-hover:text-[#2657c1]">
                      ดูรายละเอียดและราคา <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
