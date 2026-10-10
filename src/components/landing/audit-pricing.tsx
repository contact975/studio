"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AUDIT_TIERS, formatAuditPrice as fmt } from "@/lib/audit-packages";
import type { AuditContent } from "@/app/audit-services/audit-content";

/**
 * ตารางราคาตรวจสอบบัญชี 2 คอลัมน์ (ตรวจสอบอย่างเดียว / เหมารวมทำบัญชี+ตรวจสอบ)
 * กรอกรายได้ต่อปีคร่าวๆ หรือกดแถว → ไฮไลต์ช่วงราคาของตัวเอง แล้วเห็นราคาทั้ง 2 แบบเทียบกันทันที
 * ตัวเลขอยู่ที่ lib/audit-packages.ts ข้อความรับมาจาก app/audit-services/audit-content.ts (ใช้ได้ทั้งไทยและอังกฤษ)
 * ข้อความที่มีตัวแปรใช้ {label} {price} เพราะส่งฟังก์ชันจาก server เข้า client ไม่ได้
 */
const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

function tierIndexFor(revenue: number): number {
  if (revenue <= 0) return 0;
  const idx = AUDIT_TIERS.findIndex((t) => t.maxRevenue !== null && revenue <= t.maxRevenue);
  return idx === -1 ? AUDIT_TIERS.length - 1 : idx;
}

export function AuditPricing({
  labels,
  tierLabels,
}: {
  labels: AuditContent["table"];
  /** ป้ายช่วงรายได้ของแต่ละแถว เรียงตาม AUDIT_TIERS */
  tierLabels: string[];
}) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [revenueInput, setRevenueInput] = React.useState("");

  const handleRevenue = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    setRevenueInput(digits ? fmt(Number(digits)) : "");
    setSelected(digits ? tierIndexFor(Number(digits)) : null);
  };

  const tier = selected !== null ? AUDIT_TIERS[selected] : null;

  return (
    <div className="space-y-6">
      {/* ค้นหาช่วงราคาของตัวเอง */}
      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 md:p-6">
        <label htmlFor="audit-revenue" className="block text-sm font-bold text-foreground">
          {labels.question}
        </label>
        <p className="mt-1 text-xs text-muted-foreground">{labels.hint}</p>
        <div className="relative mt-3 max-w-md">
          <input
            id="audit-revenue"
            inputMode="numeric"
            placeholder={labels.placeholder}
            value={revenueInput}
            onChange={(e) => handleRevenue(e.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-white pl-4 pr-14 text-base font-semibold text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{labels.unit}</span>
        </div>

        {tier && (
          <div aria-live="polite" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{labels.auditOnly}</p>
              <p className="text-2xl font-black text-foreground">{tier.auditOnly ? `฿${fmt(tier.auditOnly)}` : labels.customQuote}</p>
              <p className="text-xs text-muted-foreground">{labels.auditOnlyNote}</p>
            </div>
            <div className="rounded-xl bg-primary p-4 text-primary-foreground">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">{labels.bundle}</p>
              <p className="text-2xl font-black">{tier.bundle ? `฿${fmt(tier.bundle)}` : labels.customQuote}</p>
              <p className="text-xs opacity-80">
                {labels.perYear}
                {tier.bundle ? fill(labels.avgPerMonth, { price: fmt(Math.round(tier.bundle / 12)) }) : ""}
                {labels.bundleTail}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ตาราง */}
      <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#163674] text-white">
              <th scope="col" className="px-4 py-4 text-left font-bold md:px-6">
                {labels.colRevenue}
              </th>
              <th scope="col" className="px-3 py-4 text-right font-bold md:px-6">
                {labels.colAuditOnly}
                <span className="block text-[11px] font-medium opacity-80">{labels.colAuditOnlySub}</span>
              </th>
              <th scope="col" className="bg-primary px-3 py-4 text-right font-bold md:px-6">
                {labels.colBundle}
                <span className="block text-[11px] font-medium opacity-80">{labels.colBundleSub}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_TIERS.map((t, i) => {
              const active = selected === i;
              const custom = t.auditOnly === null;
              return (
                <tr
                  key={tierLabels[i]}
                  onClick={() => {
                    setSelected(i);
                    setRevenueInput("");
                  }}
                  aria-selected={active}
                  className={cn(
                    "cursor-pointer border-t border-border transition-colors",
                    custom ? "bg-amber-50/70 italic text-amber-800" : i % 2 === 0 ? "bg-white" : "bg-secondary/30",
                    active && "bg-primary/10 ring-2 ring-inset ring-primary"
                  )}
                >
                  <td className="px-4 py-3.5 md:px-6">
                    <span className="flex items-center gap-2">
                      <Check className={cn("h-4 w-4 shrink-0 text-primary transition-opacity", active ? "opacity-100" : "opacity-0")} />
                      {tierLabels[i]}
                    </span>
                  </td>
                  <td className={cn("px-3 py-3.5 text-right md:px-6", custom ? "font-semibold" : "font-bold text-foreground")}>
                    {custom ? labels.customQuote : `฿${fmt(t.auditOnly as number)}`}
                  </td>
                  <td className={cn("bg-primary/[0.04] px-3 py-3.5 text-right md:px-6", custom ? "font-semibold" : "text-lg font-black text-primary")}>
                    {custom ? labels.customQuote : `฿${fmt(t.bundle as number)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">{labels.footnote}</p>
        <Link
          href="https://line.me/R/ti/p/@icacc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageSquare className="h-4 w-4" />
          {tier?.auditOnly && selected !== null ? fill(labels.quoteForTier, { label: tierLabels[selected] }) : labels.quoteGeneric}
        </Link>
      </div>
    </div>
  );
}
