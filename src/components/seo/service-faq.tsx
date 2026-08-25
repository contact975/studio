import type { Faq } from '@/lib/seo';

/**
 * คำถามที่พบบ่อยของหน้าบริการ
 *
 * ใช้ <details>/<summary> ของเบราว์เซอร์โดยตรง — ไม่ต้องใช้ JavaScript
 * จึงไม่เพิ่มภาระ main thread และ Google อ่านเนื้อหาได้ครบแม้ยังไม่กางออก
 *
 * เนื้อหาชุดนี้ต้องตรงกับ faqSchema() ที่ส่งเข้า <JsonLd /> ของหน้าเดียวกัน
 */
export function ServiceFaq({
  faqs,
  title = 'คำถามที่พบบ่อย',
  intro,
}: {
  faqs: Faq[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black mb-3">{title}</h2>
          {intro ? <p className="text-muted-foreground">{intro}</p> : null}
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-background border border-border rounded-2xl px-6 py-5 open:border-primary/40 transition-colors"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-bold text-base md:text-lg marker:hidden">
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-primary text-xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
