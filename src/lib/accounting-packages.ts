/**
 * แพ็กเกจบริการบัญชีและภาษีรายเดือน — รอบบัญชีปี 2569
 *
 * อ้างอิงใบเสนอราคา Quotation 2569/2026 ของบริษัท (3 หน้า) ทุกราคารวม VAT แล้ว
 * ไฟล์นี้ไม่มี "use client" เพื่อให้ page.tsx (server, JSON-LD) และคอมโพเนนต์โต้ตอบ
 * import ชุดเดียวกัน
 *
 * ── ไฟล์นี้เก็บเฉพาะตัวเลขและข้อเท็จจริงที่ใช้ร่วมทุกภาษา ──
 * ข้อความทั้งไทยและอังกฤษอยู่ที่ app/accounting-services/accounting-content.ts
 * FAQ และ metadata ก็ดึงราคาจากที่นี่ แก้ราคาที่นี่ที่เดียว ทุกจุดทั้งสองภาษาตามเอง
 */

/** บริการย่อยในแพ็กเกจ A (IC Smart) เลือกเฉพาะบางรายการได้ */
export const SMART_SERVICES = [
  { id: 'vat', price: 2500 },
  { id: 'wht', price: 1500 },
  { id: 'sso', price: 1000 },
  { id: 'pl', price: 1000 },
] as const;

export type SmartServiceId = (typeof SMART_SERVICES)[number]['id'];

/** ราคาบริการย่อยแต่ละรายการ เรียกด้วย id */
export const SMART_PRICE = Object.fromEntries(SMART_SERVICES.map((s) => [s.id, s.price])) as Record<SmartServiceId, number>;

/** ราคาต่ำสุดเมื่อเลือกแยกรายการ */
export const SMART_MIN_PRICE = Math.min(...SMART_SERVICES.map((s) => s.price));

/** ราคาแพ็กเกจ A เมื่อใช้ครบทั้ง 4 รายการ (ราคาปกติรวม 6,000 — ในใบเสนอราคาระบุ "จากราคาปกติ 5,000") */
export const SMART_BUNDLE_PRICE = 4500;
export const SMART_STANDARD_PRICE = 5000;

export const TOTAL_PRICE = 12000;

/** ชื่อแพ็กเกจเป็นชื่อแบรนด์ ใช้เหมือนกันทุกภาษา */
export const PACKAGES = {
  smart: { code: 'A', name: 'IC Smart', price: SMART_BUNDLE_PRICE },
  total: { code: 'B', name: 'IC Total', price: TOTAL_PRICE },
} as const;

/** ตารางเปรียบเทียบ 17 รายการ — smart: true = อยู่ใน IC Smart ด้วย (IC Total มีครบทุกรายการ) */
export const COMPARISON_ROWS = [
  { id: 'vat', smart: true },
  { id: 'wht', smart: true },
  { id: 'sso', smart: true },
  { id: 'pl', smart: true },
  { id: 'ledger', smart: false },
  { id: 'bankRec', smart: false },
  { id: 'vatRec', smart: false },
  { id: 'balanceSheet', smart: false },
  { id: 'assets', smart: false },
  { id: 'arap', smart: false },
  { id: 'payroll', smart: false },
  { id: 'chart', smart: false },
  { id: 'bookkeeper', smart: false },
  { id: 'halfYear', smart: false },
  { id: 'software', smart: false },
  { id: 'manager', smart: false },
  { id: 'quarterly', smart: false },
] as const;

export type ComparisonId = (typeof COMPARISON_ROWS)[number]['id'];

/** หมวดสิ่งที่ IC Total ได้เพิ่มจาก IC Smart — ลำดับตามใบเสนอราคา */
export const TOTAL_EXTRA_GROUPS = ['bookkeeping', 'reconciliation', 'payroll', 'reporting', 'perks'] as const;

export type TotalExtraGroup = (typeof TOTAL_EXTRA_GROUPS)[number];

/** จัดรูปแบบตัวเลขราคา เช่น 4500 → "4,500" ใช้ร่วมกันทั้งสองภาษา */
export const formatPrice = (n: number) => n.toLocaleString('th-TH');
