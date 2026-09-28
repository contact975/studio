/**
 * IC Tax Check — รับข้อมูลลูกค้าจากหน้าเว็บ ลง Google Sheet
 *
 * วิธีติดตั้ง (ทำครั้งเดียว ประมาณ 5 นาที)
 * 1. สร้าง Google Sheet ใหม่ ชื่อ "IC Tax Check – Leads"
 * 2. เมนู ส่วนขยาย > Apps Script แล้ววางโค้ดนี้ทั้งหมด กดบันทึก
 * 3. กด ทำให้ใช้งานได้ > การทำให้ใช้งานได้รายการใหม่ > ประเภท "เว็บแอป"
 *    - เรียกใช้ในฐานะ: ฉัน
 *    - ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน
 * 4. คัดลอก URL ของเว็บแอป ไปใส่ที่ IC_CONFIG.submitUrl ในไฟล์ ic-tax-check.html
 * 5. (ไม่บังคับ) ใส่อีเมลที่ NOTIFY_EMAIL เพื่อรับแจ้งเตือนทุกครั้งที่มีลูกค้าส่งข้อมูล
 */
const NOTIFY_EMAIL = "contact@icaccservice.com";

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["วันที่ส่ง", "ชื่อ", "เบอร์โทร", "LINE", "อีเมล", "ต้องการให้ช่วย", "ข้อความ",
      "แบบ", "ปีภาษี", "เงินได้", "เงินได้สุทธิ", "ภาษี", "จ่ายเพิ่ม(+)/คืน(-)", "ประหยัดได้ตามแผน", "สรุป", "หน้าเว็บ"]);
  }
  const c = data.calc || {};
  sheet.appendRow([new Date(), data.name, "'" + (data.phone || ""), data.line, data.email, (data.wants || []).join(", "), data.message,
    c.form || "", c.year || "", c.total || "", c.net || "", c.tax || "", c.bal || "", c.planSaving || "", data.summary, data.page]);
  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, "ลูกค้าใหม่จาก IC Tax Check: " + data.name,
      `ชื่อ: ${data.name}\nโทร: ${data.phone}\nLINE: ${data.line || "-"}\nอีเมล: ${data.email || "-"}\nต้องการ: ${(data.wants || []).join(", ")}\n\n${data.message || ""}\n\n${data.summary || ""}`);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
