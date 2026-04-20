import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, service, date, time } = body;

  const message = `
🗓 นัดหมายใหม่!
👤 ชื่อ: ${name}
📞 โทร: ${phone}
📋 บริการ: ${service}
📅 วันที่: ${date}
⏰ เวลา: ${time}
  `;

  await fetch(process.env.MAKE_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, service, date, time, message }),
  });

  return NextResponse.json({ success: true });
}