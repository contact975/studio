import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Timeline แนวตั้ง: หัวข้ออยู่ซ้าย รายการเรียงเป็นเส้นเวลามีเลขกำกับอยู่ขวา
 * ดัดแปลงจาก path-to-resilience-orbital-timeline ของ 21st.dev ให้เข้ากับเว็บนี้
 *
 * ── ต่างจากต้นฉบับ ──
 * - ใช้สีจากธีม (primary = น้ำเงิน CI) แทน cyan/fuchsia ที่ฝังไว้ จึงตามโหมดสีและแบรนด์เอง
 * - แต่ละข้อรับ icon และ subtitle ได้ (ไม่ใส่ icon จะใช้เครื่องหมายถูกแบบต้นฉบับ)
 * - รับ eyebrow / lead จาก props แทนข้อความตัวอย่างภาษาอังกฤษที่เขียนตายตัว
 * - คอลัมน์หัวข้อเกาะอยู่กับที่ (sticky) บนจอใหญ่ ระหว่างเลื่อนดูรายการที่ยาวกว่า
 * - วงกลมตัวเลขคำนวณตำแหน่งให้อยู่กึ่งกลางเส้นพอดี (ต้นฉบับใช้ -2.85rem ซึ่งเยื้องเส้น)
 */

export interface TimelineStep {
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
}

export interface PathToResilienceOrbitalTimelineProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  steps: TimelineStep[];
  className?: string;
  /** id ของหัวข้อ ใช้ผูก aria-labelledby — ต้องไม่ซ้ำในหน้าเดียวกัน */
  headingId?: string;
}

export default function PathToResilienceOrbitalTimeline({
  eyebrow,
  title,
  lead,
  steps,
  className,
  headingId = "orbital-timeline-title",
}: PathToResilienceOrbitalTimelineProps) {
  return (
    <section aria-labelledby={headingId} className={cn("bg-background py-20 md:py-28 text-foreground", className)}>
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>}
          <h2 id={headingId} className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{lead}</p>}
        </div>

        {/* เส้น 2px อยู่ซ้ายสุดของ <ol> วงกลม 32px จึงต้องเลื่อนซ้าย = pl(32) + เส้นครึ่งหนึ่ง(1) + วงกลมครึ่งหนึ่ง(16) = 49px */}
        <ol className="relative ml-4 space-y-6 border-l-2 border-primary/25 pl-8">
          {steps.map((step, index) => {
            const Icon = step.icon ?? CheckCircle2;
            return (
              <li
                key={step.title}
                className="group relative rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60 hover:shadow-md"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[49px] top-5 sm:top-6 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background"
                >
                  {index + 1}
                </span>
                {/* จอเล็กไอคอนอยู่บนข้อความ ไม่งั้นข้อความไทยถูกบีบเหลือคอลัมน์แคบ */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black leading-snug">{step.title}</h3>
                    {step.subtitle && <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-primary">{step.subtitle}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
