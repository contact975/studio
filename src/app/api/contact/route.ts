import { NextRequest, NextResponse } from 'next/server';
import { allowRequest, clientIp } from '@/lib/rate-limit';

/**
 * รับข้อความจากบับเบิลแชทมุมขวาล่าง (components/landing/chat-bubble.tsx)
 * แล้วส่งต่อเข้า Make → LINE + Gmail ผ่าน webhook เดียวกับฟอร์มนัดหมาย
 *
 * ── ส่งอะไรไป Make ──
 * form_type: 'chat' ให้แยก branch ได้ถ้าตั้ง Router ไว้ และใส่ field ชุดเดียวกับฟอร์มนัดหมาย
 * (name, phone, service, date, time, note, message, messageHtml) ครบทุกตัว
 * ถ้า Make ยังไม่มี branch ของแชท ข้อความก็ยังไหลไปทาง branch นัดหมายแล้วอ่านรู้เรื่อง
 *
 * ── กันสแปม ──
 * ช่องข้อความพิมพ์อิสระ เป็นช่องที่สแปมชอบที่สุด (ดูเหตุการณ์ 29 ก.ย. 2569 ใน /api/booking)
 *   1. ช่องดัก (website) ที่คนมองไม่เห็น — บอตกรอก เราตอบสำเร็จแต่ไม่ส่งต่อ
 *   2. ห้ามมีลิงก์ในข้อความ ลูกค้าจริงแทบไม่เคยแปะลิงก์ แต่สแปมแทบทุกชิ้นมี
 *   3. เบอร์ต้องมีตัวเลขอย่างน้อย 9 หลัก
 *   4. จำกัด 3 ครั้งต่อ 10 นาทีต่อ IP (ปล่อยผ่านเมื่อระบุ IP ไม่ได้ — ดู lib/rate-limit.ts)
 *
 * ── ห้ามตอบสำเร็จแบบเงียบๆ ──
 * ทุกความล้มเหลวที่ไม่ใช่สแปมตอบ status จริง หน้าเว็บจะเสนอให้ติดต่อทาง LINE แทน (CLAUDE.md)
 * ดู log ได้ที่ Firebase Console → App Hosting → Logs (ค้นคำว่า [contact])
 */

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const LINK_PATTERN = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|top|info|link|click)\b)/i;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name);
  const phone = str(body.phone);
  const text = str(body.message);
  const trap = str(body.website);
  const page = str(body.page).slice(0, 200);

  // บอตกรอกช่องดัก — ตอบเหมือนสำเร็จ ไม่ให้รู้ว่าโดนจับได้
  if (trap) {
    console.warn('[contact] ช่องดักถูกกรอก ไม่ส่งต่อ');
    return NextResponse.json({ success: true });
  }

  const ip = clientIp(request);
  if (ip && !allowRequest(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    console.warn('[contact] ยิงถี่เกินเพดาน', { ip });
    return NextResponse.json({ success: false, error: 'rate_limited' }, { status: 429 });
  }

  const valid =
    name.length <= 100 &&
    phone.replace(/\D/g, '').length >= 9 &&
    phone.length <= 30 &&
    text.length >= 2 &&
    text.length <= 1000 &&
    !LINK_PATTERN.test(text) &&
    !LINK_PATTERN.test(name);

  if (!valid) {
    console.warn('[contact] ข้อมูลไม่ผ่านการตรวจ ปฏิเสธ', {
      ip,
      nameLen: name.length,
      phoneDigits: phone.replace(/\D/g, '').length,
      textLen: text.length,
      hasLink: LINK_PATTERN.test(text),
    });
    return NextResponse.json({ success: false, error: 'invalid_fields' }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[contact] ไม่พบ MAKE_WEBHOOK_URL ใน environment ของ runtime');
    return NextResponse.json({ success: false, error: 'webhook_not_configured' }, { status: 500 });
  }

  const displayName = name || '(ไม่ได้ระบุชื่อ)';
  const rows: [string, string][] = [
    ['👤 ชื่อ', displayName],
    ['📞 โทร', phone],
    ['💬 ข้อความ', text],
    ['🔗 หน้าที่ทักมา', page || '-'],
  ];

  /** ข้อความล้วนสำหรับ LINE */
  const message = ['💬 มีคนทักแชทจากเว็บไซต์', ...rows.map(([l, v]) => `${l}: ${v}`)].join('\n');

  /** HTML สำหรับ Gmail (รับ Raw HTML เท่านั้น) — ค่าทุกตัวมาจากผู้กรอก จึง escape ก่อน */
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const messageHtml = [
    '<div style="font-family:sans-serif;font-size:14px;line-height:1.7">',
    '<h2 style="margin:0 0 12px">💬 มีคนทักแชทจากเว็บไซต์</h2>',
    ...rows.map(([l, v]) => `<div><b>${esc(l)}:</b> ${esc(v).replace(/\r?\n/g, '<br>')}</div>`),
    '</div>',
  ].join('');

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'chat',
        name: displayName,
        phone,
        service: 'แชทจากเว็บไซต์',
        date: '-',
        time: '-',
        note: text,
        page,
        message,
        messageHtml,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const reply = await res.text().catch(() => '');
    if (!res.ok) {
      console.error('[contact] Make ตอบกลับไม่สำเร็จ', { status: res.status, reply: reply.slice(0, 300) });
      return NextResponse.json({ success: false, error: 'webhook_rejected' }, { status: 502 });
    }
    console.log('[contact] ส่งเข้า Make สำเร็จ', { page, reply: reply.slice(0, 100) });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] ยิงไป Make ไม่สำเร็จ', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'webhook_unreachable' }, { status: 502 });
  }
}
