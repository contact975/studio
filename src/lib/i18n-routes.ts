/**
 * คู่ URL ไทย ↔ อังกฤษ ของทั้งเว็บ — แหล่งเดียวที่ปุ่มสลับภาษา เมนู และฟุตเตอร์ใช้ร่วมกัน
 *
 * URL ไทยอยู่ที่ root เสมอ อังกฤษอยู่ใต้ /en (ห้ามย้ายหน้าไทยไป /th — ดู CLAUDE.md)
 * แปลหน้าไหนเสร็จ เพิ่มคู่ที่นี่ที่เดียว ทั้งปุ่มสลับภาษาและลิงก์ในเมนู/ฟุตเตอร์ฝั่งอังกฤษจะตามเอง
 *
 * หน้าที่ไม่มีคู่ (บทความ /blog/*, เครื่องคำนวณภาษี) ลิงก์จากฝั่งอังกฤษจะไปหน้าไทยตรงๆ
 * และปุ่มสลับภาษาบนหน้าไทยเหล่านั้นพาไป /en
 */
export const PAIRS: Record<string, string> = {
  '/': '/en',
  '/about': '/en/about',
  '/accounting-services': '/en/accounting-services',
  '/audit-services': '/en/audit-services',
  '/company-registration': '/en/company-registration',
  '/internship': '/en/internship',
  '/media-content': '/en/media-content',
  '/organization-system': '/en/organization-system',
  '/quote': '/en/quote',
  '/visa-work-permit': '/en/visa-work-permit',
};

export const EN_HOME = '/en';

export function isEnglishPath(pathname: string | null | undefined): boolean {
  const p = pathname || '/';
  return p === '/en' || p.startsWith('/en/');
}

/** ลิงก์ภายในของหน้าไทย → ลิงก์ที่ควรใช้บนหน้าอังกฤษ (คงส่วน #hash ไว้) ถ้าไม่มีคู่ คืนลิงก์เดิม */
export function toEnglishHref(href: string): string {
  const [path, hash] = href.split('#');
  const en = PAIRS[path || '/'];
  if (!en) return href;
  return hash ? `${en}#${hash}` : en;
}
