import { ExternalLink, Star } from 'lucide-react';
import type { GoogleReviewsPayload } from '@/lib/google-reviews';

/**
 * แถบรีวิว Google สำหรับหน้าบริการ/หน้าราคา (เพิ่ม 26 พ.ย. 2569 ตามคำแนะนำ IC Insight)
 *
 * ── ทำไมเป็น server component ──
 * รีวิวต้องอยู่ใน HTML ตั้งแต่แรก บอตที่ไม่รัน JavaScript (AI crawler, IC Insight)
 * จึงจะเห็นว่าหน้านี้มีรีวิว — หน้าที่เรียกใช้ต้องดึง getGoogleReviews() ฝั่งเซิร์ฟเวอร์
 * แล้วตั้ง revalidate เพราะ API key มีเฉพาะตอนรัน ไม่มีตอน build (ดู app/page.tsx)
 *
 * ── ทำไมไม่มี schema AggregateRating / Review ──
 * Google ห้ามธุรกิจมาร์กอัปรีวิวของตัวเองบนเว็บตัวเอง (self-serving review markup)
 * ใส่ไปก็ไม่ขึ้นดาวในผลค้นหา และเสี่ยงถูกมองว่ามาร์กอัปผิดหลักเกณฑ์ — แสดงให้คนอ่านเห็นอย่างเดียว
 *
 * ไม่ฮาร์ดโค้ดตัวเลขหรือข้อความรีวิว ถ้าดึงไม่ได้จะไม่เรนเดอร์อะไรเลย
 */

export type ReviewStripCopy = {
  eyebrow: string;
  title: string;
  /** ต่อท้ายคะแนน เช่น "บน Google" */
  ratingLabel: string;
  /** ต่อท้ายจำนวน เช่น "รีวิว" */
  reviewsLabel: string;
  /** ปุ่มไปหน้า Google */
  more: string;
};

export function ReviewStrip({
  data,
  copy,
  limit = 3,
  className = '',
}: {
  data?: GoogleReviewsPayload | null;
  copy: ReviewStripCopy;
  limit?: number;
  className?: string;
}) {
  if (!data?.configured || data.rating == null) return null;
  // เลือกรีวิว 5 ดาวที่มีเนื้อหาก่อน ส่วนที่สั้นมากอ่านแล้วไม่ช่วยตัดสินใจ
  const reviews = data.reviews.filter((r) => r.rating >= 4 && r.text.length >= 20).slice(0, limit);
  const mapsUrl = data.mapsUrl ?? 'https://maps.google.com/?cid=11080561333861967427';

  return (
    <section aria-labelledby="review-strip-title" className={`py-20 md:py-24 ${className}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{copy.eyebrow}</p>
          <h2 id="review-strip-title" className="text-3xl md:text-4xl font-black mb-4">
            {copy.title}
          </h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
          >
            <Stars />
            <span>
              {data.rating.toFixed(1)} {copy.ratingLabel}
              {data.total ? (
                <span className="font-normal text-muted-foreground">
                  {' '}
                  · {data.total} {copy.reviewsLabel}
                </span>
              ) : null}
            </span>
          </a>
        </div>

        {reviews.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <li key={r.id} className="flex flex-col rounded-3xl border border-border bg-card p-6">
                <Stars count={r.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-6">
                  “{r.text}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  {r.photo ? (
                    // รูปโปรไฟล์จาก Google เล็กมาก ใช้ <img> ตรงๆ ไม่ต้องผ่าน next/image (โดเมนไม่ได้อยู่ใน remotePatterns)
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photo} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" className="h-9 w-9 rounded-full" />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {r.author.slice(0, 1)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{r.author}</p>
                    {r.relativeTime && <p className="text-xs text-muted-foreground">{r.relativeTime}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            {copy.more} <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 stroke-none ${i < Math.round(count) ? 'fill-[#f5b301]' : 'fill-muted'}`} />
      ))}
    </span>
  );
}
