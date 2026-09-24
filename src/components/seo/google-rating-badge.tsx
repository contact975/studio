'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import type { GoogleReviewsPayload } from '@/app/api/google-reviews/route';

/**
 * แถบคะแนน Google แบบสด — ใช้บนหน้าที่ยังไม่มี social proof เลย
 *
 * ── ทำไมไม่ฮาร์ดโค้ดตัวเลข ──
 * "5.0 จาก 18 รีวิว" จะกลายเป็นข้อมูลผิดทันทีที่มีรีวิวเพิ่ม และเป็นคำกล่าวอ้าง
 * ที่ตรวจสอบได้ ถ้าตัวเลขบนเว็บไม่ตรงกับหน้า Google จริงจะเสียความน่าเชื่อถือมากกว่าได้
 * จึงดึงจาก /api/google-reviews ซึ่ง cache ไว้ 24 ชม. เหมือนที่หน้าแรกใช้
 *
 * ── ทำไมไม่ใส่ aggregateRating ลง schema ──
 * Google ห้ามมาร์กอัปคะแนนรีวิวของตัวเองบนเว็บตัวเอง (self-serving review markup)
 * การแสดงให้คนอ่านเห็นทำได้ แต่ห้ามประกาศเป็น structured data
 *
 * ถ้าดึงข้อมูลไม่ได้หรือยังไม่ได้ตั้งค่า API จะไม่เรนเดอร์อะไรเลย ไม่ใช่โชว์ค่าว่าง
 */
export function GoogleRatingBadge({
  label = 'on Google',
  reviewsLabel = 'reviews',
  className = '',
}: {
  label?: string;
  reviewsLabel?: string;
  className?: string;
}) {
  const [data, setData] = useState<GoogleReviewsPayload | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/google-reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((json: GoogleReviewsPayload | null) => {
        if (alive) setData(json);
      })
      .catch(() => {
        /* ไม่มีคะแนนดีกว่าโชว์ค่าผิด */
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!data?.configured || data.rating == null) return null;

  return (
    <a
      href={data.mapsUrl ?? 'https://maps.google.com/?cid=11080561333861967427'}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 18px',
        borderRadius: 999,
        border: '1px solid #e7edf5',
        background: '#fff',
        textDecoration: 'none',
        color: '#0f172a',
        fontSize: 14.5,
        fontWeight: 600,
      }}
    >
      <span style={{ display: 'inline-flex', gap: 2 }} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} style={{ width: 15, height: 15, fill: '#f5b301', stroke: 'none' }} />
        ))}
      </span>
      <span>
        {data.rating.toFixed(1)} {label}
        {data.total ? (
          <span style={{ color: '#5b6b86', fontWeight: 500 }}> · {data.total} {reviewsLabel}</span>
        ) : null}
      </span>
    </a>
  );
}
