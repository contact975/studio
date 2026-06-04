"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { id: "accounting", num: "01", title: "ทำบัญชี", fullTitle: "บริการทำบัญชี เชียงใหม่", tag: "Accounting Services", description: "รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-chiangmai-service-account.jpg?alt=media&token=fc1cee19-5765-4cea-b2ca-81b6a08b3cb5", href: "/accounting-services" },
  { id: "audit", num: "02", title: "ปิดงบประจำปี", fullTitle: "ตรวจสอบบัญชีและปิดงบ เชียงใหม่", tag: "Audit Services", description: "ตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันกำหนด ดูแลโดยทีมงานสำนักงานบัญชีเชียงใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-chiangmai-service-audit.jpg?alt=media&token=b0fbb4a8-886e-4d3d-95ec-91a4a5824058", href: "/audit-services" },
  { id: "registration", num: "03", title: "จดทะเบียนบริษัท", fullTitle: "จดทะเบียนบริษัท เชียงใหม่", tag: "Company Registration", description: "รับจดทะเบียนธุรกิจในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-chiangmai-service-register.jpg?alt=media&token=34939e7f-da54-48c1-b5de-83d5c82aa9ba", href: "/company-registration" },
  { id: "expat", num: "04", title: "Visa & Work Permit", fullTitle: "Visa & Work Permit เชียงใหม่", tag: "Expat Services", description: "ดูแลการขอและต่ออายุวีซ่าทุกประเภทในพื้นที่เชียงใหม่ และจัดการใบอนุญาตทำงาน ประสานงานหน่วยงานราชการให้ครบทุกขั้นตอนสำหรับชาวต่างชาติ", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fvisa-work-permit-chiangmai.jpg?alt=media&token=8d3e33b0-12ec-4921-b9d6-ad4d10393047", href: "/visa-work-permit" },
  { id: "system", num: "05", title: "วางระบบองค์กร", fullTitle: "วางระบบบัญชีและองค์กร", tag: "Organization System", description: "ปรับการจัดการหลังบ้านสำหรับธุรกิจเชียงใหม่ สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนเอกสารให้เป็นระบบ เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-chiangmai-service-business.jpg?alt=media&token=be901642-bc01-4f85-a3ce-9af2a85a9ba4", href: "/organization-system" },
  { id: "media", num: "06", title: "ผลิต Media Content", fullTitle: "รับผลิต Media Content เชียงใหม่", tag: "Marketing Online", description: "สร้างภาพลักษณ์ธุรกิจให้น่าเชื่อถือด้วยบริการผลิตวิดีโอและกราฟิกคุณภาพสูงในเชียงใหม่ ช่วยให้แบรนด์ของคุณมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-chiangmai-service-consult.jpg?alt=media&token=7383c116-df92-4925-ab8b-9c0c148ba0dc", href: "/media-content" },
  { id: "support", num: "07", title: "นัดหมายปรึกษา", fullTitle: "ปรึกษาสำนักงานบัญชีเชียงใหม่", tag: "Customer Support", description: "ทีมงาน IC Accounting พร้อมให้คำปรึกษาแบบใกล้ชิดและเป็นกันเองในฐานะ 'เลขาส่วนตัวธุรกิจ' สำหรับผู้ประกอบการในเชียงใหม่และพื้นที่ใกล้เคียง", imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Photo%20Services%2Fic-accounting-team-chiangmai.jpg?alt=media&token=f20d4e53-633a-42f8-9bdf-4ab0dec5598c", href: "/quote" },
];

export function ServicesSection() {
  const [active, setActive] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  const prevActive = React.useRef(active);

  // Scroll reveal
  const headerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = React.useState(false);
  const [menuVis, setMenuVis] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVis(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMenuVis(true); }, { threshold: 0.1 });
    if (menuRef.current) obs.observe(menuRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSetActive = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 220);
    prevActive.current = i;
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div
          ref={headerRef}
          style={{ opacity: headerVis ? 1 : 0, transform: headerVis ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          className="mb-16"
        >
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">บริการจากสำนักงานบัญชีเชียงใหม่</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Left menu */}
          <div
            ref={menuRef}
            style={{ opacity: menuVis ? 1 : 0, transform: menuVis ? 'translateX(0)' : 'translateX(-24px)', transition: 'opacity 0.6s ease, transform 0.6s ease', transitionDelay: '100ms' }}
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:sticky lg:top-24"
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => handleSetActive(index)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0",
                  active === index ? "bg-primary text-primary-foreground" : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <span className={cn("text-xs font-black font-mono", active === index ? "text-primary-foreground/60" : "text-muted-foreground/50")}>{service.num}</span>
                <span className="font-bold text-sm">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Right content — fades on switch */}
          <div
            className="grid md:grid-cols-2 gap-8 items-center"
            style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.22s ease, transform 0.22s ease' }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/20">
              <Image src={services[active].imageUrl} alt={services[active].fullTitle} fill className="object-cover" loading={active === 0 ? "eager" : "lazy"} sizes="(max-width: 768px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{services[active].tag}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-6xl font-black text-primary/10 leading-none block mb-2">{services[active].num}</span>
                <h3 className="text-2xl md:text-3xl font-black text-foreground -mt-4">{services[active].fullTitle}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{services[active].description}</p>
              <Link href={services[active].href} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:opacity-90 transition-all hover:gap-3 text-sm">
                ดูรายละเอียดและราคา <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-2 pt-2">
                {services.map((_, i) => (
                  <button key={i} onClick={() => handleSetActive(i)} className={cn("transition-all rounded-full", active === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
