"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bento Grid — ชิ้นส่วนสำหรับประกอบ section แบบตารางการ์ดขนาดไม่เท่ากัน
 *
 * ปรับจากต้นฉบับ (bento-grid-01) ที่เป็นการ์ดสีดำ zinc ให้เป็นโทนน้ำเงิน CI ของเว็บ
 * และแยกแอนิเมชันย่อยออกมาเป็นคอมโพเนนต์รับ icon จากภายนอก
 * เพื่อให้ section บริการเอาไปจับคู่กับไอคอนของแต่ละบริการได้
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// -------------------------------------------------------------------------
// Grid + Card
// -------------------------------------------------------------------------
export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[280px]", className)}>
      {children}
    </div>
  );
}

export type BentoCardProps = {
  /** ขนาดบนจอ ≥ md: tall = 2×2, wide = 3×1, standard = 2×1 */
  size?: "standard" | "tall" | "wide";
  /** ลำดับหน่วงการโผล่ (วินาที) */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

const SIZE_CLASS: Record<NonNullable<BentoCardProps["size"]>, string> = {
  standard: "md:col-span-2",
  tall: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-3",
};

export function BentoCard({ size = "standard", delay = 0, className, children }: BentoCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#2657c1]/15 p-6 text-foreground",
        size === "tall" ? "md:p-8" : "md:p-6",
        "bg-[linear-gradient(160deg,#ffffff_0%,#f4f7fd_100%)] shadow-sm",
        "transition-[border-color,box-shadow] duration-300 hover:border-[#2657c1]/50 hover:shadow-xl hover:shadow-[#2657c1]/10",
        SIZE_CLASS[size],
        className
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      whileHover={reduceMotion ? undefined : { scale: size === "tall" ? 1.02 : 0.98 }}
    >
      {/* แสงฟ้าจางๆ มุมบนขวา โผล่ตอน hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#2657c1]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

// -------------------------------------------------------------------------
// Mini animations — แต่ละตัวรับ icon จากภายนอก
// -------------------------------------------------------------------------
type IconProps = { icon: LucideIcon; className?: string };

/** ไอคอนหายใจเข้า-ออก (จาก TypeTester เดิม) */
export function BreathingIcon({ icon: Icon, className }: IconProps) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const interval = setInterval(() => setScale((prev) => (prev === 1 ? 1.35 : 1)), 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={cn("flex h-full items-center justify-center", className)}>
      <motion.div animate={{ scale }} transition={{ duration: 0.8, ease: EASE }}>
        <Icon className="h-16 w-16 text-[#2657c1]" strokeWidth={1.25} />
      </motion.div>
    </div>
  );
}

/** วงคลื่นกระจายรอบไอคอน (จาก GlobalNetwork เดิม) */
export function PulseIcon({ icon: Icon, className }: IconProps) {
  return (
    <div className={cn("relative flex h-full items-center justify-center", className)}>
      <Icon className="relative z-10 h-16 w-16 text-[#2657c1]" strokeWidth={1.25} />
      {[0, 1, 2, 3, 4].map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute h-16 w-16 rounded-full border-2 border-[#2657c1]/30"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: pulse * 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/** ช่องไอคอนติดสว่างทีละช่อง (จาก SecurityBadge เดิม) */
export function SequenceBadges({ icon: Icon, count = 3, className }: IconProps & { count?: number }) {
  const [activeCount, setActiveCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setActiveCount((prev) => (prev >= count ? 0 : prev + 1)), 800);
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className={cn("flex h-full items-center justify-center gap-2", className)}>
      {Array.from({ length: count }, (_, i) => {
        const active = i < activeCount;
        return (
          <motion.div
            key={i}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border transition-colors duration-300",
              active ? "border-[#2657c1]/40 bg-[#2657c1]" : "border-[#2657c1]/10 bg-[#2657c1]/5"
            )}
            animate={{ scale: active ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={cn("h-5 w-5 transition-colors", active ? "text-white" : "text-[#2657c1]/40")} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** ตารางบล็อกสลับเลย์เอาต์ (จาก LayoutAnimation เดิม) */
export function ShiftingLayout({ icon: Icon, className }: Partial<IconProps>) {
  const [layout, setLayout] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setLayout((prev) => (prev + 1) % 3), 2500);
    return () => clearInterval(interval);
  }, []);
  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"];
  return (
    <div className={cn("flex h-full items-center justify-center gap-6", className)}>
      {Icon && <Icon className="h-12 w-12 shrink-0 text-[#2657c1]" strokeWidth={1.25} />}
      <motion.div
        className={cn("grid w-full max-w-[140px] gap-1.5", layouts[layout])}
        layout
        transition={{ duration: 0.5, ease: EASE }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div key={i} className="h-5 w-full rounded-md bg-[#2657c1]/20" layout transition={{ duration: 0.5, ease: EASE }} />
        ))}
      </motion.div>
    </div>
  );
}

/** โหลดแล้วเผยตัวเลข + แถบความคืบหน้า (จาก SpeedIndicator เดิม) */
export function ProgressReveal({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const interval = setInterval(() => setLoading((prev) => !prev), 3000);
    const first = setTimeout(() => setLoading(false), 600);
    return () => {
      clearInterval(interval);
      clearTimeout(first);
    };
  }, []);
  return (
    <div className={cn("flex h-full flex-col items-center justify-center gap-2", className)}>
      <div className="relative flex h-10 w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-8 w-24 rounded bg-[#2657c1]/10"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: "absolute" }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="text-3xl font-black text-[#2657c1] md:text-4xl"
            >
              {value}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
      <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-[#2657c1]/10">
        <motion.div
          className="h-full rounded-full bg-[#2657c1]"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  );
}

/** แท่งกราฟโตขึ้นสลับกัน — ใหม่ สำหรับการ์ดบัญชี */
export function GrowingBars({ icon: Icon, className }: Partial<IconProps>) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(interval);
  }, []);
  // ความสูงชุดละ 6 แท่ง สลับไปมาให้ดูเหมือนตัวเลขขยับ
  const sets = [
    [40, 65, 50, 85, 60, 95],
    [55, 45, 80, 60, 90, 70],
    [30, 70, 55, 75, 95, 85],
  ];
  const heights = sets[tick % sets.length];
  return (
    <div className={cn("flex h-full flex-col items-center justify-center gap-5", className)}>
      {Icon && <Icon className="h-12 w-12 text-[#2657c1]" strokeWidth={1.25} />}
      <div className="flex h-24 w-full max-w-[200px] items-end gap-2">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className={cn("flex-1 rounded-t-md", i === heights.length - 1 ? "bg-[#2657c1]" : "bg-[#2657c1]/20")}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}
