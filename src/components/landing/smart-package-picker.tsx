"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { SMART_SERVICES, SMART_BUNDLE_PRICE } from "@/lib/accounting-packages";

/**
 * ตัวเลือกบริการย่อยของแพ็กเกจ IC Smart — ติ๊กเฉพาะรายการที่ต้องการแล้วเห็นราคารวมทันที
 * เลือกครบทั้ง 4 รายการ = ราคาแพ็กเกจ 4,500 บาท/เดือน (ตามใบเสนอราคา)
 */
const fmt = (n: number) => n.toLocaleString("th-TH");

export function SmartPackagePicker() {
  const [picked, setPicked] = React.useState<string[]>(SMART_SERVICES.map((s) => s.id));

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const all = picked.length === SMART_SERVICES.length;
  const subtotal = SMART_SERVICES.filter((s) => picked.includes(s.id)).reduce((sum, s) => sum + s.price, 0);
  const total = all ? SMART_BUNDLE_PRICE : subtotal;

  return (
    <div>
      <ul className="divide-y divide-border">
        {SMART_SERVICES.map((s) => {
          const on = picked.includes(s.id);
          return (
            <li key={s.id}>
              <label className="flex cursor-pointer items-start gap-3 py-3 transition-colors hover:bg-primary/[0.03]">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(s.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#2657c1]"
                />
                <span className="flex flex-1 items-start justify-between gap-3">
                  <span>
                    <span className={cn("block text-sm font-semibold", on ? "text-foreground" : "text-muted-foreground")}>{s.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{s.en}</span>
                  </span>
                  <span className={cn("shrink-0 text-sm font-bold", on ? "text-foreground" : "text-muted-foreground/60")}>
                    {fmt(s.price)}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-2xl bg-primary/5 border border-primary/15 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{all ? "ใช้บริการครบทั้ง 4 รายการ" : `เลือก ${picked.length} จาก 4 รายการ`}</p>
            <p className="text-2xl font-black text-primary">
              {picked.length ? `฿${fmt(total)}` : "—"}
              <span className="text-sm font-medium text-muted-foreground"> /เดือน</span>
            </p>
          </div>
          {all && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">ราคาแพ็กเกจ</span>}
        </div>
        {!picked.length && <p className="mt-1 text-xs text-muted-foreground">เลือกอย่างน้อย 1 รายการ</p>}
      </div>

      <Link
        href="https://line.me/R/ti/p/@icacc"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        {all ? "สนใจ IC Smart 4,500/เดือน" : picked.length ? `สนใจ ${picked.length} รายการนี้` : "สอบถามผ่าน LINE"}
      </Link>
    </div>
  );
}
