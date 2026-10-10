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
import type { HomeContent, ServiceId } from "./home-content";

/**
 * Section บริการ — เปลี่ยนจากเมนูซ้าย + รูปภาพ เป็น Bento Grid 6 การ์ด
 *
 * ตัด "นัดหมายปรึกษา" ออก (มีปุ่มในฟุตเตอร์แล้ว) และแทนรูปด้วยไอคอน + แอนิเมชันย่อย
 * ที่สื่อถึงบริการนั้นๆ — ชื่อบริการ คำอธิบาย และลิงก์ไปหน้าบริการทั้ง 6 ยังเป็น HTML จริง
 * เหมือนเดิม (fullTitle / description ยังใช้คีย์เวิร์ด "เชียงใหม่" ชุดเดิม)
 */
type ServiceLayout = {
  id: ServiceId;
  num: string;
  size: "standard" | "tall" | "wide";
};

/** ลำดับ ขนาดการ์ด และแอนิเมชัน — ข้อความ/ลิงก์ของแต่ละการ์ดอยู่ใน home-content.ts */
const layout: ServiceLayout[] = [
  { id: "accounting", num: "01", size: "tall" },
  { id: "audit", num: "02", size: "standard" },
  { id: "registration", num: "03", size: "tall" },
  { id: "expat", num: "04", size: "standard" },
  { id: "system", num: "05", size: "wide" },
  { id: "media", num: "06", size: "wide" },
];

function visualFor(id: ServiceId, auditLabel: string): React.ReactNode {
  switch (id) {
    case "accounting":
      return <GrowingBars icon={Calculator} />;
    case "audit":
      return <ProgressReveal value="100%" label={auditLabel} />;
    case "registration":
      return <PulseIcon icon={Building2} />;
    case "expat":
      return <SequenceBadges icon={BadgeCheck} />;
    case "system":
      return <ShiftingLayout icon={Workflow} />;
    case "media":
      return <BreathingIcon icon={Clapperboard} />;
  }
}

export function ServicesSection({ c }: { c: HomeContent['services'] }) {
  const services = layout.map((l) => ({ ...l, ...c.items[l.id], visual: visualFor(l.id, c.auditVisualLabel) }));

  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">{c.eyebrow}</p>
          {/*
            หัวข้อเดิม "บริการจากสำนักงานบัญชีเชียงใหม่" เป็นรูปประโยคแบบแปลตรงจาก
            "Services from..." ซึ่งภาษาไทยไม่ค่อยใช้ขึ้นต้นหัวข้อ อ่านแล้วแข็ง

            เปลี่ยนหัวข้อเป็นคำถามที่คนอ่านเข้าใจทันที แล้วย้ายคำค้น
            "สำนักงานบัญชีเชียงใหม่" ลงมาอยู่ในบรรทัดคำอธิบายแทน
            — section นี้เดิมมีแต่หัวข้อกับการ์ด ไม่มีข้อความบรรยายเลย
            การเพิ่มบรรทัดนี้จึงได้ทั้งความลื่นไหลและเนื้อหาให้ Google อ่านเพิ่ม
          */}
          <h2 className="text-3xl font-black text-foreground md:text-4xl">{c.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {c.lead}
          </p>
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
                      {c.linkLabel} <ArrowRight className="h-4 w-4" />
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
