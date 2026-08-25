import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  /**
   * note = ช่อง "รายละเอียดเพิ่มเติม" ในฟอร์ม
   *
   * ฟอร์มส่ง note มาด้วยตลอด แต่เดิมโค้ดตรงนี้ไม่ได้รับไว้และไม่ได้ส่งต่อ
   * ข้อความที่ลูกค้าพิมพ์จึงหายไปเงียบๆ ทุกครั้ง โดยที่ลูกค้าเห็นว่าจองสำเร็จ
   *
   * สำคัญขึ้นอีกหลังเพิ่มบริการ Visa & Work Permit เพราะเคสวีซ่าต้องรู้บริบท
   * ตั้งแต่ต้น เช่น สัญชาติ วีซ่าปัจจุบัน และวันหมดอายุ
   */
  const { name, phone, service, date, time, note } = body;

  const message = `
🗓 นัดหมายใหม่!
👤 ชื่อ: ${name}
📞 โทร: ${phone}
📋 บริการ: ${service}
📅 วันที่: ${date}
⏰ เวลา: ${time}
📝 รายละเอียด: ${note?.trim() ? note.trim() : '-'}
  `;

  await fetch(process.env.MAKE_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, service, date, time, note: note ?? '', message }),
  });

  return NextResponse.json({ success: true });
}
