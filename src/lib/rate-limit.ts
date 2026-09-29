/**
 * จำกัดจำนวนครั้งที่ IP หนึ่งยิงเข้ามาได้ในช่วงเวลาหนึ่ง
 *
 * ── ขอบเขตที่ทำได้จริง ──
 * เก็บใน memory ของ instance ที่รับ request นั้น ไม่ได้แชร์ข้ามเครื่อง
 * ถ้า App Hosting ขยายเป็นหลาย instance เพดานจริงจะกลายเป็น (limit × จำนวน instance)
 * และค่าจะหายทุกครั้งที่ deploy ใหม่
 *
 * ยอมรับข้อจำกัดนี้ได้ เพราะเป้าหมายคือกันบอตที่ยิงรัวเป็นสิบครั้งต่อนาที
 * ไม่ใช่กันคนที่ตั้งใจโจมตีจริงๆ ซึ่งต้องใช้ WAF หรือ Redis ที่แชร์สถานะกันได้
 * ด่านที่กันของเสียจริงคือการตรวจค่าที่ส่งเข้ามาว่าตรงกับตัวเลือกบนหน้าเว็บไหม
 */

type Hit = { count: number; resetAt: number };

const hits = new Map<string, Hit>();

/** ล้างของเก่าทิ้งเป็นระยะ ไม่ให้ Map โตไม่จำกัดจนกินหน่วยความจำ */
function sweep(now: number) {
  if (hits.size < 500) return;
  for (const [key, hit] of hits) {
    if (hit.resetAt <= now) hits.delete(key);
  }
}

/**
 * อ่าน IP ของผู้เรียกจาก header ที่ proxy ใส่มาให้
 * x-forwarded-for อาจมีหลาย IP คั่นด้วยจุลภาค ตัวแรกคือผู้เรียกจริง
 */
export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** คืนค่า true เมื่อยังส่งได้ และ false เมื่อเกินเพดานแล้ว */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);

  const hit = hits.get(key);
  if (!hit || hit.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (hit.count >= limit) return false;

  hit.count += 1;
  return true;
}
