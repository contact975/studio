import { NextRequest, NextResponse } from 'next/server';

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

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    // สาเหตุที่พบบ่อยที่สุดของอาการ "จองได้แต่ไม่มีแจ้งเตือน"
    console.error('[booking] ไม่พบ MAKE_WEBHOOK_URL ใน environment ของ runtime');
    return NextResponse.json({ success: false, error: 'webhook_not_configured' }, { status: 500 });
  }

  const message = `
🗓 นัดหมายใหม่!
👤 ชื่อ: ${name}
📞 โทร: ${phone}
📋 บริการ: ${service}
📅 วันที่: ${date}
⏰ เวลา: ${time}
📝 รายละเอียด: ${note?.trim() ? note.trim() : '-'}
  `.trim();

  try {
    // กันกรณี Make ค้าง ไม่ให้ลูกค้ารอจนหน้าเว็บหมดเวลาไปเอง
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, date, time, note: note ?? '', message }),
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
