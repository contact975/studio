import { Award, Laptop, Handshake, Briefcase, Smartphone, Code2 } from "lucide-react";
import PathToResilienceOrbitalTimeline from "@/components/ui/path-to-resilience-orbital-timeline";
import type { HomeContent } from "./home-content";

/**
 * ทำไมต้องเลือก IC — แสดงเป็น timeline แนวตั้ง (components/ui/path-to-resilience-orbital-timeline.tsx)
 * หัวข้ออยู่ซ้าย 6 เหตุผลเรียงลงมาทางขวาพร้อมเลขกำกับ บนมือถือหัวข้ออยู่บน รายการเรียงลงมาด้านล่าง
 *
 * ไอคอนเรียงตามลำดับ items ใน home-content.ts (ข้อความทั้งสองภาษาอยู่ที่นั่น)
 *
 * ข้อ 02, 05, 06 แยกจากกันโดยตั้งใจ ไม่ได้เขียนรวมกัน
 *   02 = โปรแกรมบัญชีออนไลน์ที่ใช้ทำงานให้ลูกค้า
 *   05 = วิธีส่งเอกสาร ซึ่งลูกค้าสัมผัสเองทุกเดือน
 *   06 = ระบบที่สำนักงานเขียนขึ้นใช้เอง
 * ถ้ายุบรวมเป็น "เราใช้เทคโนโลยี" จะกลายเป็นคำกว้างๆ ที่ใครก็พูดได้
 */
const ICONS = [Award, Laptop, Handshake, Briefcase, Smartphone, Code2];

export function WhyUsSection({ c }: { c: HomeContent["whyUs"] }) {
  return (
    <PathToResilienceOrbitalTimeline
      headingId="why-us-title"
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      steps={c.items.map((item, i) => ({ ...item, icon: ICONS[i] }))}
    />
  );
}
