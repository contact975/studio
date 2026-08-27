import type { Faq } from '@/lib/seo';

/**
 * คำถามที่พบบ่อยของหน้าบริการ
 *
 * ใช้ <details>/<summary> ของเบราว์เซอร์โดยตรง — ไม่ต้องใช้ JavaScript
 * จึงไม่เพิ่มภาระ main thread และ Google อ่านเนื้อหาได้ครบแม้ยังไม่กางออก
 *
 * เนื้อหาชุดนี้ต้องตรงกับ faqSchema() ที่ส่งเข้า <JsonLd /> ของหน้าเดียวกัน
 *
 * ── เรื่อง tone ──
 * เดิม <summary> ไม่ได้กำหนดสีข้อความไว้เลย จึงไปรับค่าสีที่สืบทอดมาจาก
 * ตัวหุ้มของหน้า พอเอาไปวางในหน้า /media-content ที่ตั้ง text-white ไว้
 * ที่ระดับบนสุด คำถามทุกข้อจึงกลายเป็นตัวอักษรขาวบนการ์ดสีขาว
 * มองไม่เห็นเลยแม้แต่ตัวเดียว
 *
 * ตอนนี้ทั้งสองโทนกำหนดสีของตัวเองครบทุกชิ้น ไม่พึ่งการสืบทอดอีก
 *   tone="light" (ค่าเริ่มต้น) — หน้าบริการทั่วไปที่พื้นหลังสว่าง
 *   tone="dark"                — หน้าที่มีพื้นหลังเข้มเป็นของตัวเอง
 */
type Tone = 'light' | 'dark';

const styles: Record<
  Tone,
  {
    section: string;
    eyebrow: string;
    heading: string;
    intro: string;
    card: string;
    question: string;
    plus: string;
    answer: string;
  }
> = {
  light: {
    section: 'bg-secondary/30',
    eyebrow: 'text-primary',
    heading: 'text-foreground',
    intro: 'text-muted-foreground',
    card: 'bg-background border-border open:border-primary/40',
    question: 'text-foreground',
    plus: 'text-primary',
    answer: 'text-muted-foreground',
  },
  dark: {
    // ใช้ค่าสีตรงๆ ไม่ใช้ token ของธีม เพราะหน้าโทนเข้มพวกนี้กำหนดพื้นหลัง
    // ของตัวเองไว้ ไม่ได้มาจากระบบธีม การอ้าง token จึงได้สีที่ไม่เข้ากับหน้า
    section: 'bg-[#0b0b16]',
    eyebrow: 'text-blue-400',
    heading: 'text-white',
    intro: 'text-white/50',
    card: 'bg-white/[0.04] border-white/10 open:border-blue-400/50 open:bg-white/[0.07]',
    question: 'text-white',
    plus: 'text-blue-400',
    answer: 'text-white/70',
  },
};

export function ServiceFaq({
  faqs,
  title = 'คำถามที่พบบ่อย',
  intro,
  tone = 'light',
}: {
  faqs: Faq[];
  title?: string;
  intro?: string;
  tone?: Tone;
}) {
  const s = styles[tone];

  return (
    <section className={`py-20 md:py-24 ${s.section}`} data-aos="fade-up">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${s.eyebrow}`}>FAQ</p>
          <h2 className={`text-3xl md:text-4xl font-black mb-3 ${s.heading}`}>{title}</h2>
          {intro ? <p className={s.intro}>{intro}</p> : null}
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className={`group border rounded-2xl px-6 py-5 transition-colors ${s.card}`}
            >
              <summary
                className={`flex items-start justify-between gap-4 cursor-pointer list-none font-bold text-base md:text-lg marker:hidden ${s.question}`}
              >
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 shrink-0 text-xl leading-none transition-transform group-open:rotate-45 ${s.plus}`}
                >
                  +
                </span>
              </summary>
              <p className={`mt-4 leading-relaxed text-sm md:text-base ${s.answer}`}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
