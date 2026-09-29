import { NextRequest, NextResponse } from 'next/server';
import { BOOKING_SERVICES, BOOKING_TIMES } from '@/lib/booking-options';
import { allowRequest, clientIp } from '@/lib/rate-limit';

/**
 * ด่านตรวจข้อมูลก่อนส่งต่อเข้า Make
 *
 * ── ทำไมต้องมี ──
 * 29 ก.ย. 2026 มีคนยิงเข้า endpoint นี้ตรงๆ (ไม่ผ่านหน้าเว็บ) ด้วยข้อมูล
 *   ชื่อ "x" · โทร "1" · บริการ "spam-test-do-not-book" · วันที่ 1999-01-01
 *   รายละเอียด: ลิงก์สองอัน
 * ข้อความหลุดไปถึง LINE และอีเมลของทีมครบ เป็นการทดสอบว่าเว็บนี้
 * ใช้เป็นตัวส่งต่อข้อความให้สแปมเมอร์ได้ไหม ซึ่งคำตอบตอนนั้นคือได้
 *
 * ── หลักที่ใช้ ──
 * ค่าที่หน้าเว็บส่งได้มีจำกัดและรู้ล่วงหน้าทั้งหมด (ปุ่มตัวเลือกกับ dropdown)
 * จึงตรวจว่าตรงกับรายการนั้นไหม แทนที่จะเดาว่าอะไรคือสแปม
 * วิธีนี้ปฏิเสธของปลอมได้โดยไม่มีทางปฏิเสธลูกค้าจริง เพราะลูกค้าจริงกดจากหน้าเว็บ
 * ซึ่งส่งค่าจากรายการนี้เสมอ
 */

/** ยิงได้ 5 ครั้งต่อ 10 นาทีต่อ IP — คนจริงจองไม่ถึง บอตยิงรัวจะโดนตัด */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** เผื่อคนกรอกข้ามเขตเวลา วันที่ย้อนหลังได้ 1 วัน แต่ 1999-01-01 ไม่ผ่านแน่ */
function isSaneDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const picked = Date.parse(value + 'T00:00:00Z');
  if (Number.isNaN(picked)) return false;
  const yesterday = Date.now() - 24 * 60 * 60 * 1000;
  const oneYearOut = Date.now() + 365 * 24 * 60 * 60 * 1000;
  return picked >= yesterday && picked <= oneYearOut;
}

/**
 * รับข้อมูลนัดหมายจากหน้า /quote แล้วส่งต่อเข้า Make เพื่อแจ้งเตือน LINE Official
 *
 * เดิมโค้ดนี้ตอบ success: true เสมอ ไม่ว่าจะเกิดอะไรขึ้น
 *   - ไม่เช็กว่า MAKE_WEBHOOK_URL มีค่าไหม
 *   - ไม่เช็กว่า Make ตอบกลับมาว่าอะไร
 *   - ไม่มี log ให้ตามหลัง
 * ผลคือถ้า Make ไม่ทำงาน จะไม่มีใครรู้เลย ลูกค้าเห็นว่าจองสำเร็จ
 * แต่ทีมงานไม่เคยได้รับแจ้งเตือน — ซึ่งแย่กว่าการที่ฟอร์มพังตรงๆ
 *
 * ตอนนี้ทุกความล้มเหลวจะถูก log และส่ง status ที่ถูกต้องกลับไปให้ฟอร์ม
 * ดู log ได้ที่ Firebase Console -> App Hosting -> Logs (ค้นคำว่า [booking])
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    console.error('[booking] อ่าน JSON จาก request ไม่ได้');
    return NextResponse.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  const { name, phone, service, date, time, note } = body as Record<string, string | undefined>;

  if (!name || !phone || !service || !date || !time) {
    console.error('[booking] ข้อมูลไม่ครบ', { name: !!name, phone: !!phone, service: !!service, date: !!date, time: !!time });
    return NextResponse.json({ success: false, error: 'missing_fields' }, { status: 400 });
  }

  const ip = clientIp(request);
  if (!allowRequest(`booking:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    console.warn('[booking] ยิงถี่เกินเพดาน', { ip });
    return NextResponse.json({ success: false, error: 'rate_limited' }, { status: 429 });
  }

  /**
   * ตรวจว่าค่าที่ส่งมาตรงกับตัวเลือกบนหน้าเว็บจริงไหม
   *
   * ตอบ error เดียวกันหมด ไม่บอกว่าผิดช่องไหน เพราะคนที่เจอข้อความนี้
   * มีแต่คนที่ยิงเข้ามาเอง ลูกค้าจริงกดจากหน้าเว็บจะไม่มีทางส่งค่านอกรายการ
   * การบอกละเอียดมีแต่จะช่วยให้คนยิงรู้ว่าต้องแก้อะไรถึงจะผ่าน
   */
  const looksLikeForm =
    (BOOKING_SERVICES as readonly string[]).includes(service) &&
    (BOOKING_TIMES as readonly string[]).includes(time) &&
    isSaneDate(date) &&
    name.trim().length >= 2 &&
    name.length <= 100 &&
    phone.replace(/\D/g, '').length >= 9 &&
    phone.length <= 30 &&
    (note ?? '').length <= 1000;

  if (!looksLikeForm) {
    console.warn('[booking] ข้อมูลไม่ตรงกับตัวเลือกบนหน้าเว็บ ปฏิเสธ', {
      ip,
      service: service.slice(0, 60),
      time: time.slice(0, 20),
      date: date.slice(0, 20),
      nameLen: name.length,
      phoneDigits: phone.replace(/\D/g, '').length,
    });
    return NextResponse.json({ success: false, error: 'invalid_fields' }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    // สาเหตุที่พบบ่อยที่สุดของอาการ "จองได้แต่ไม่มีแจ้งเตือน"
    console.error('[booking] ไม่พบ MAKE_WEBHOOK_URL ใน environment ของ runtime');
    return NextResponse.json({ success: false, error: 'webhook_not_configured' }, { status: 500 });
  }

  const rows: [string, string][] = [
    ['👤 ชื่อ', name],
    ['📞 โทร', phone],
    ['📋 บริการ', service],
    ['📅 วันที่', date],
    ['⏰ เวลา', time],
    ['📝 รายละเอียด', note?.trim() ? note.trim() : '-'],
  ];

  /** ข้อความล้วน ใช้กับ LINE ซึ่งแสดง HTML tag เป็นตัวอักษรดิบ */
  const message = [
    '🗓 นัดหมายใหม่!',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  /**
   * ฉบับ HTML สำหรับอีเมล — Gmail module ของ Make รองรับ body แบบ Raw HTML เท่านั้น
   * ที่ผ่านมาส่งข้อความล้วนไป อีเมลจึงยุบเหลือบรรทัดเดียวอ่านยาก
   * ทุกค่ามาจากผู้กรอก จึง escape อักขระ HTML ก่อนเสมอ
   */
  const esc = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const messageHtml = [
    '<div style="font-family:sans-serif;font-size:14px;line-height:1.7">',
    '<h2 style="margin:0 0 12px">🗓 นัดหมายใหม่</h2>',
    ...rows.map(
      ([label, value]) =>
        `<div><b>${esc(label)}:</b> ${esc(value).replace(/\r?\n/g, '<br>')}</div>`,
    ),
    '</div>',
  ].join('');

  try {
    // กันกรณี Make ค้าง ไม่ให้ลูกค้ารอจนหน้าเว็บหมดเวลาไปเอง
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, date, time, note: note ?? '', message, messageHtml }),
      signal: AbortSignal.timeout(10_000),
    });

    const replyText = await res.text().catch(() => '');

    if (!res.ok) {
      console.error('[booking] Make ตอบกลับไม่สำเร็จ', { status: res.status, reply: replyText.slice(0, 300) });
      return NextResponse.json({ success: false, error: 'webhook_rejected', status: res.status }, { status: 502 });
    }

    // Make ตอบ "Accepted" เมื่อรับงานแล้ว — log ไว้เพื่อยืนยันว่าถึงปลายทางจริง
    console.log('[booking] ส่งเข้า Make สำเร็จ', { service, date, time, reply: replyText.slice(0, 100) });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[booking] ยิงไป Make ไม่สำเร็จ', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'webhook_unreachable' }, { status: 502 });
  }
}
