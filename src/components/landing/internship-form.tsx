'use client';

import { useRef, useState } from 'react';
import { CheckCircle2, Loader2, Paperclip, Send } from 'lucide-react';
import { trackEvent } from '@/components/analytics/google-analytics';

/**
 * แบบฟอร์มสมัครฝึกงาน
 *
 * ── ทำไมแยกจากฟอร์มนัดหมายที่ /quote ──
 * ฟอร์มนัดหมายถามวันและเวลาที่สะดวกเพื่อนัดคุย ส่วนใบสมัครฝึกงานต้องการ
 * ข้อมูลการศึกษาและไฟล์แนบ ถ้ายัดรวมกันฟอร์มเดียวจะยาวและถามสิ่งที่ไม่เกี่ยวข้อง
 * กับอีกฝ่ายเสมอ
 *
 * ── ขนาดไฟล์ ──
 * จำกัด 5MB เพราะต้องแปลงเป็น base64 ส่งผ่าน Make (โตขึ้นราว 33%)
 * เช็กฝั่ง client ก่อนเพื่อไม่ให้ผู้ใช้รออัปโหลดจนจบแล้วค่อยโดนปฏิเสธ
 * ฝั่ง server เช็กซ้ำอีกครั้งเพราะเช็กที่ client อย่างเดียวเลี่ยงได้
 */

const MAX_FILE_MB = 5;
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp';

type Status = 'idle' | 'sending' | 'success';

export function InternshipForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [heardFromSelf, setHeardFromSelf] = useState(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    const file = data.get('portfolio');
    if (file instanceof File && file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`ไฟล์ใหญ่เกิน ${MAX_FILE_MB}MB กรุณาบีบอัดหรือส่งไฟล์ที่เล็กลง`);
      return;
    }

    // รวมคำตอบสองช่องของ "ทราบข้อมูลจากแหล่งใด" ให้เหลือค่าเดียวก่อนส่ง
    const heardFromOther = (data.get('heardFromOther') ?? '').toString().trim();
    data.set('heardFrom', heardFromSelf ? 'ทราบข้อมูลด้วยตัวเอง' : heardFromOther || 'ไม่ได้ระบุ');
    data.delete('heardFromOther');

    setStatus('sending');
    try {
      const res = await fetch('/api/internship', { method: 'POST', body: data });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const map: Record<string, string> = {
          file_too_large: `ไฟล์ใหญ่เกิน ${MAX_FILE_MB}MB`,
          file_type_not_allowed: 'รองรับเฉพาะไฟล์ PDF, Word และรูปภาพ',
          missing_fields: 'กรุณากรอกชื่อและอีเมล',
        };
        setError(map[json?.error] ?? 'ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อเราทาง LINE @icacc');
        setStatus('idle');
        return;
      }
      trackEvent('generate_lead', { service: 'ใบสมัครฝึกงาน', page_path: '/internship' });
      setStatus('success');
      formEl.reset();
      setFileName('');
    } catch {
      setError('เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อเราทาง LINE @icacc');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-border bg-background p-10 md:p-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-5" />
        <h3 className="text-2xl font-black mb-3">ได้รับใบสมัครแล้ว</h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          ขอบคุณที่สนใจฝึกงานกับ IC Accounting &amp; Service
          ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับทางอีเมลหรือเบอร์โทรที่ให้ไว้
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-primary font-bold hover:underline"
        >
          ส่งใบสมัครอีกครั้ง
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20';
  const labelClass = 'block font-bold mb-2 text-sm';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-background p-6 md:p-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="int-name">
            ชื่อ - นามสกุล <span className="text-destructive">*</span>
          </label>
          <input id="int-name" name="name" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="int-university">ชื่อสถาบันการศึกษา</label>
          <input id="int-university" name="university" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="int-major">คณะ / สาขา</label>
          <input id="int-major" name="major" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="int-level">ระดับการศึกษา</label>
          <input id="int-level" name="level" placeholder="เช่น ปริญญาตรี ชั้นปีที่ 3" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="int-email">
            อีเมล <span className="text-destructive">*</span>
          </label>
          <input id="int-email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="int-phone">เบอร์โทรศัพท์</label>
          <input id="int-phone" name="phone" type="tel" inputMode="tel" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="int-start">ระยะเวลาฝึกงานเริ่มต้น</label>
          <input id="int-start" name="startDate" type="date" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="int-end">ระยะเวลาฝึกงานสิ้นสุด</label>
          <input id="int-end" name="endDate" type="date" className={inputClass} />
        </div>
      </div>

      {/* ไฟล์แนบ */}
      <div className="mt-5">
        <label className={labelClass} htmlFor="int-portfolio">แนบ Portfolio หรือ Resume</label>
        <label
          htmlFor="int-portfolio"
          className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-4 cursor-pointer hover:border-primary transition"
        >
          <Paperclip className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="text-sm text-muted-foreground truncate">
            {fileName || 'เลือกไฟล์ที่ต้องการแนบ'}
          </span>
        </label>
        <input
          id="int-portfolio"
          name="portfolio"
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
        />
        <p className="text-xs text-muted-foreground mt-2">
          รองรับไฟล์ PDF, Word หรือรูปภาพ ขนาดไม่เกิน {MAX_FILE_MB}MB
        </p>
      </div>

      {/* ทราบข้อมูลจากแหล่งใด */}
      <fieldset className="mt-6 rounded-xl border border-border p-5">
        <legend className="px-2 font-bold text-sm">ทราบข้อมูลของบริษัทนี้จากแหล่งใด</legend>
        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="radio"
            name="heardFromChoice"
            checked={heardFromSelf}
            onChange={() => setHeardFromSelf(true)}
            className="h-4 w-4"
          />
          <span className="text-sm">ทราบข้อมูลด้วยตัวเอง</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="heardFromChoice"
            checked={!heardFromSelf}
            onChange={() => setHeardFromSelf(false)}
            className="h-4 w-4"
          />
          <span className="text-sm">ทราบข้อมูลจาก</span>
        </label>
        {!heardFromSelf && (
          <input
            name="heardFromOther"
            placeholder="เช่น อาจารย์แนะนำ รุ่นพี่ที่เคยฝึกงาน หรือค้นเจอใน Google"
            className={`${inputClass} mt-3`}
          />
        )}
      </fieldset>

      <div className="mt-5">
        <label className={labelClass} htmlFor="int-reason">เหตุผลที่ต้องการฝึกงานกับบริษัทเรา</label>
        <textarea id="int-reason" name="reason" rows={4} className={inputClass} />
      </div>

      {error && (
        <p className="mt-5 rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black px-10 py-4 rounded-full hover:opacity-90 transition disabled:opacity-60"
      >
        {status === 'sending' ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> กำลังส่ง...</>
        ) : (
          <><Send className="h-5 w-5" /> ส่งใบสมัครฝึกงาน</>
        )}
      </button>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        ข้อมูลที่กรอกจะถูกใช้เพื่อพิจารณารับนักศึกษาฝึกงานเท่านั้น
        และจะไม่ถูกเผยแพร่หรือส่งต่อให้บุคคลภายนอก
      </p>
    </form>
  );
}
