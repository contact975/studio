"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "accounting",
    num: "01",
    title: "ทำบัญชี",
    fullTitle: "บริการทำบัญชี เชียงใหม่",
    tag: "Accounting Services",
    description: "รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง",
    imageUrl: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhY2NvdW50aW5nfGVufDB8fHx8MTc2OTE4ODE2Nnww&ixlib=rb-4.1.0&q=60&w=640",
    href: "/accounting-services"
  },
  {
    id: "audit",
    num: "02",
    title: "ปิดงบประจำปี",
    fullTitle: "ตรวจสอบบัญชีและปิดงบ เชียงใหม่",
    tag: "Audit Services",
    description: "ตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันกำหนด ดูแลโดยทีมงานสำนักงานบัญชีเชียงใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%",
    imageUrl: "https://images.unsplash.com/photo-1649209979970-f01d950cc5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmaW5hbmNlJTIwYXVkaXR8ZW58MHx8fHwxNzY5MTg5MjY3fDA&ixlib=rb-4.1.0&q=60&w=640",
    href: "/audit-services"
  },
  {
    id: "registration",
    num: "03",
    title: "จดทะเบียนบริษัท",
    fullTitle: "จดทะเบียนบริษัท เชียงใหม่",
    tag: "Company Registration",
    description: "รับจดทะเบียนธุรกิจในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา",
    imageUrl: "https://images.unsplash.com/photo-1681505504714-4ded1bc247e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDb21wYW55JTIwUmVnaXN0cmF0aW9ufGVufDB8fHx8MTc2OTE4OTU5OHww&ixlib=rb-4.1.0&q=60&w=640",
    href: "/company-registration"
  },
  {
    id: "expat",
    num: "04",
    title: "Visa & Work Permit",
    fullTitle: "Visa & Work Permit เชียงใหม่",
    tag: "Expat Services",
    description: "ดูแลการขอและต่ออายุวีซ่าทุกประเภทในพื้นที่เชียงใหม่ และจัดการใบอนุญาตทำงาน ประสานงานหน่วยงานราชการให้ครบทุกขั้นตอนสำหรับชาวต่างชาติ",
    imageUrl: "https://images.unsplash.com/photo-1641939872097-8626e3134d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8VmlzYSUyMFdvcmtwZXJtaXR8ZW58MHx8fHwxNzY5MTg5NjgxfDA&ixlib=rb-4.1.0&q=60&w=640",
    href: "/visa-work-permit"
  },
  {
    id: "system",
    num: "05",
    title: "วางระบบองค์กร",
    fullTitle: "วางระบบบัญชีและองค์กร",
    tag: "Organization System",
    description: "ปรับการจัดการหลังบ้านสำหรับธุรกิจเชียงใหม่ สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนเอกสารให้เป็นระบบ เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน",
    imageUrl: "https://images.unsplash.com/photo-1743385779347-1549dabf1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxTeXN0ZW0lMjBEZXNpZ24lMjBPcmdhbml6YXRpb258ZW58MHx8fHwxNzY5MTkwMDQ2fDA&ixlib=rb-4.1.0&q=60&w=640",
    href: "/organization-system"
  },
  {
    id: "media",
    num: "06",
    title: "ผลิต Media Content",
    fullTitle: "รับผลิต Media Content เชียงใหม่",
    tag: "Marketing Online",
    description: "สร้างภาพลักษณ์ธุรกิจให้น่าเชื่อถือด้วยบริการผลิตวิดีโอและกราฟิกคุณภาพสูงในเชียงใหม่ ช่วยให้แบรนด์ของคุณมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง",
    imageUrl: "https://images.unsplash.com/photo-1764664035133-0d2ca12016dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxNZWRpYSUyMENvbnRlbnR8ZW58MHx8fHwxNzY5MTkwMTMzfDA&ixlib=rb-4.1.0&q=60&w=640",
    href: "/media-content"
  },
  {
    id: "support",
    num: "07",
    title: "นัดหมายปรึกษา",
    fullTitle: "ปรึกษาสำนักงานบัญชีเชียงใหม่",
    tag: "Customer Support",
    description: "ทีมงาน IC Accounting พร้อมให้คำปรึกษาแบบใกล้ชิดและเป็นกันเองในฐานะ 'เลขาส่วนตัวธุรกิจ' สำหรับผู้ประกอบการในเชียงใหม่และพื้นที่ใกล้เคียง",
    imageUrl: "https://images.unsplash.com/photo-1604881990409-b9f246db39da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8c3VwcG9ydHxlbnwwfHx8fDE3NjkxOTAyNzd8MA&ixlib=rb-4.1.0&q=60&w=640",
    href: "/quote"
  },
];

export function ServicesSection() {
  const [active, setActive] = React.useState(0);

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            บริการจากสำนักงานบัญชีเชียงใหม่
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Service list — left column */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-24">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActive(index)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0",
                  active === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <span className={cn(
                  "text-xs font-black font-mono",
                  active === index ? "text-primary-foreground/60" : "text-muted-foreground/50"
                )}>
                  {service.num}
                </span>
                <span className="font-bold text-sm">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Service detail — right column */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/20">
              <Image
                src={services[active].imageUrl}
                alt={services[active].fullTitle}
                fill
                className="object-cover transition-opacity duration-300"
                loading={active === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {services[active].tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-6xl font-black text-primary/10 leading-none block mb-2">
                  {services[active].num}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-foreground -mt-4">
                  {services[active].fullTitle}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {services[active].description}
              </p>
              <Link
                href={services[active].href}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:opacity-90 transition-all hover:gap-3 text-sm"
              >
                ดูรายละเอียดและราคา <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Dot navigation */}
              <div className="flex gap-2 pt-2">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "transition-all rounded-full",
                      active === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}