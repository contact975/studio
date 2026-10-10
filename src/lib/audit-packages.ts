/**
 * ค่าบริการตรวจสอบบัญชีประจำปี — รอบบัญชีปี 2569 (ราคารวม VAT)
 *
 * อ้างอิงเอกสาร 2 ฉบับของบริษัท:
 *   1) "อัตราค่าบริการตรวจสอบบัญชีประจำปี (ไม่รวมค่าทำบัญชี)" — กิจการมีผู้ทำบัญชีอยู่แล้ว
 *   2) "อัตราค่าบริการแบบเหมารวม: ทำบัญชี + ตรวจสอบบัญชีประจำปี" — เราทำบัญชีให้ทั้งปีแล้วปิดงบ
 * ทั้งสองแบบคิดตามช่วงรายได้ต่อปีชุดเดียวกัน จึงเก็บเป็นตารางเดียว 2 คอลัมน์
 *
 * ไฟล์นี้เก็บแค่ตัวเลข ข้อความทั้งสองภาษาอยู่ที่ app/audit-services/audit-content.ts
 * ซึ่งดึงตัวเลขจากที่นี่ไปแทรกเอง (รวมถึงใน FAQ และ metadata) แก้ราคาที่นี่ที่เดียวพอ
 * ไฟล์นี้ไม่มี "use client" — page.tsx (JSON-LD) และตารางโต้ตอบใช้ร่วมกัน
 */
export type AuditTier = {
  /** dormant = งบเปล่า · upTo = รายได้ไม่เกิน amount · over = รายได้เกิน amount */
  kind: 'dormant' | 'upTo' | 'over';
  /** ตัวเลขที่แสดงในป้ายช่วงรายได้ — null สำหรับงบเปล่า */
  amount: number | null;
  /** เพดานรายได้ต่อปีที่ใช้หาช่วงจากตัวเลขที่ลูกค้ากรอก — null = งบเปล่า, Infinity = ช่วงสุดท้าย */
  maxRevenue: number | null;
  /** ตรวจสอบบัญชีอย่างเดียว (ต่อปี) — null = เสนอราคารายกรณี */
  auditOnly: number | null;
  /** เหมารวม ทำบัญชี + ตรวจสอบ (ต่อปี) — null = เสนอราคารายกรณี */
  bundle: number | null;
};

const upTo = (amount: number, auditOnly: number, bundle: number): AuditTier => ({
  kind: 'upTo',
  amount,
  maxRevenue: amount,
  auditOnly,
  bundle,
});

/** เพดานรายได้ของช่วงที่มีราคาตายตัว เกินนี้เสนอราคารายกรณี */
export const AUDIT_CUSTOM_ABOVE = 30_000_000;

export const AUDIT_TIERS: AuditTier[] = [
  { kind: 'dormant', amount: null, maxRevenue: null, auditOnly: 6000, bundle: 12000 },
  upTo(500_000, 6900, 14800),
  upTo(1_500_000, 7800, 19500),
  upTo(3_000_000, 9100, 22800),
  upTo(9_000_000, 11700, 29300),
  upTo(10_000_000, 14300, 35800),
  upTo(15_000_000, 19500, 48800),
  upTo(20_000_000, 24700, 61800),
  upTo(AUDIT_CUSTOM_ABOVE, 29900, 74800),
  { kind: 'over', amount: AUDIT_CUSTOM_ABOVE, maxRevenue: Infinity, auditOnly: null, bundle: null },
];

/** ช่วงแรก (งบเปล่า) และช่วงถัดไป ใช้เป็นราคา "เริ่มต้น" ในหัวข้อ การ์ด และ FAQ */
export const AUDIT_DORMANT = AUDIT_TIERS[0] as AuditTier & { auditOnly: number; bundle: number };
export const AUDIT_FIRST_REVENUE_TIER = AUDIT_TIERS[1] as AuditTier & { amount: number; auditOnly: number; bundle: number };

/** รอบบัญชีที่ราคานี้ใช้ (ค.ศ.) หน้าไทยแสดงเป็น พ.ศ. ด้วยการบวก 543 */
export const AUDIT_PRICE_YEAR = 2026;

/** ตรวจสอบอย่างเดียว: ชำระกี่เปอร์เซ็นต์เมื่อตกลงรับงาน */
export const AUDIT_DEPOSIT_PERCENT = 50;

/** ครบวงจร: ส่งเอกสารประกอบภายในวันที่เท่าไหร่ของเดือนถัดไป */
export const BUNDLE_DOC_DEADLINE_DAY = 10;

export const formatAuditPrice = (n: number) => n.toLocaleString('th-TH');
