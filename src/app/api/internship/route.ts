import { NextRequest, NextResponse } from 'next/server';

/**
 * รับใบสมัครฝึกงานจากหน้า /internship แล้วส่งต่อเข้า Make เพื่อแจ้งเตือน
 *
 * ── ทำไมไม่เก็บไฟล์ไว้ที่ Firebase Storage ──
 * Portfolio ของนักศึกษามีทั้งชื่อ รูป ประวัติการศึกษา และบางครั้งเลขบัตรประชาชน
 * ถ้าอัปขึ้น Storage แล้วส่งลิงก์ไปทางอีเมล ไฟล์จะเปิดได้โดยใครก็ตามที่มีลิงก์
 * และค้างอยู่บน Storage ตลอดไปโดยไม่มีใครลบ ซึ่งขัดกับหลักเก็บข้อมูลเท่าที่จำเป็นของ PDPA
 *
 * วิธีนี้ส่งไฟล์เป็น base64 ผ่าน Make ไปเป็นไฟล์แนบในอีเมลเลย
 * ไฟล์จึงอยู่แค่ในกล่องจดหมายของบริษัท ไม่มีสำเนาค้างบนอินเทอร์เน็ต
 *
 * ── ทำไมจำกัด 5MB ──
 * base64 ทำให้ขนาดโตขึ้นราว 33% ไฟล์ 5MB จึงกลายเป็น payload ~6.7MB
 * ซึ่งยังอยู่ในวิสัยที่ Make รับไหว ถ้าปล่อยถึง 10MB จะเป็น ~13.4MB และเสี่ยงถูกปฏิเสธ
 *
 * ── ใช้ webhook เดียวกับฟอร์มนัดหมาย ──
 * ส่ง form_type: 'internship' ไปด้วย เพื่อให้แยก branch ใน Make ได้
 * และใส่ field message มาให้ครบ เผื่อกรณียังไม่ได้ตั้ง Router ใน Make
 * อีเมลก็จะยังอ่านรู้เรื่อง (แค่ไม่มีไฟล์แนบ)
 */

/** 5MB — ดูเหตุผลในคอมเมนต์ด้านบน */
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    console.error('[internship] อ่าน form data ไม่ได้');
    return NextResponse.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  const get = (key: string) => (form.get(key) ?? '').toString().trim();

  const name = get('name');
  const email = get('email');
  const university = get('university');
  const major = get('major');
  const level = get('level');
  const phone = get('phone');
  const startDate = get('startDate');
  const endDate = get('endDate');
  const heardFrom = get('heardFrom');
  const reason = get('reason');

  // ชื่อกับอีเมลคือขั้นต่ำที่ทำให้ติดต่อกลับได้ ฟิลด์อื่นขาดได้
  if (!name || !email) {
    return NextResponse.json({ success: false, error: 'missing_fields' }, { status: 400 });
  }

  const file = form.get('portfolio');
  let attachmentName = '';
  let attachmentData = '';

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ success: false, error: 'file_too_large' }, { status: 413 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'file_type_not_allowed' }, { status: 415 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachmentName = file.name;
    attachmentData = buffer.toString('base64');
  }

  const rows: [string, string][] = [
    ['ชื่อ-นามสกุล', name],
    ['อีเมล', email],
    ['เบอร์โทร', phone || '-'],
    ['สถาบัน', university || '-'],
    ['คณะ/สาขา', major || '-'],
    ['ระดับการศึกษา', level || '-'],
    ['ช่วงฝึกงาน', `${startDate || '-'} ถึง ${endDate || '-'}`],
    ['ทราบข้อมูลจาก', heardFrom || '-'],
    ['เหตุผลที่อยากฝึกงานกับเรา', reason || '-'],
    ['ไฟล์แนบ', attachmentName || 'ไม่มี'],
  ];

  /** ข้อความล้วน ใช้กับ LINE ซึ่งแสดง HTML tag เป็นตัวอักษรดิบ */
  const message = [
    'ใบสมัครฝึกงานใหม่',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  /**
   * ฉบับ HTML สำหรับอีเมล — Gmail module ของ Make รองรับแต่ Raw HTML
   * ถ้าส่งข้อความล้วนไป การขึ้นบรรทัดใหม่จะถูกยุบหายหมด
   *
   * ประกอบ HTML ที่ฝั่งนี้แทนการพิมพ์ tag ลงในช่อง Content ของ Make
   * เพราะช่องนั้นดักอักษร "/" ไว้เปิด autocomplete จึงพิมพ์ปิด tag ไม่ได้
   */
  const esc = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const messageHtml = [
    '<div style="font-family:sans-serif;font-size:14px;line-height:1.7">',
    '<h2 style="margin:0 0 12px">ใบสมัครฝึกงานใหม่</h2>',
    ...rows.map(
      ([label, value]) =>
        `<div><b>${esc(label)}:</b> ${esc(value).replace(/\r?\n/g, '<br>')}</div>`,
    ),
    '</div>',
  ].join('');

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[internship] ไม่พบ MAKE_WEBHOOK_URL ใน environment ของ runtime');
    return NextResponse.json({ success: false, error: 'webhook_not_configured' }, { status: 500 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: 'internship',
        // ใส่ชื่อฟิลด์ให้ตรงกับฟอร์มนัดหมาย เพื่อให้โมดูลเดิมใน Make ใช้ร่วมกันได้
        name,
        phone,
        service: 'ใบสมัครฝึกงาน',
        date: startDate,
        time: endDate,
        note: reason,
        message,
        messageHtml,
        // ฟิลด์เฉพาะของใบสมัครฝึกงาน
        email,
        university,
        major,
        level,
        heardFrom,
        attachmentName,
        attachmentData,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const replyText = await res.text().catch(() => '');

    if (!res.ok) {
      console.error('[internship] Make ตอบกลับไม่สำเร็จ', { status: res.status, reply: replyText.slice(0, 300) });
      return NextResponse.json({ success: false, error: 'webhook_rejected', status: res.status }, { status: 502 });
    }

    console.log('[internship] ส่งใบสมัครเข้า Make สำเร็จ', {
      university,
      hasFile: Boolean(attachmentName),
      reply: replyText.slice(0, 100),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[internship] ยิงไป Make ไม่สำเร็จ', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'webhook_unreachable' }, { status: 502 });
  }
}
