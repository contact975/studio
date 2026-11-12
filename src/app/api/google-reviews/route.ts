import { NextResponse } from 'next/server';

/**
 * ดึงรีวิว Google ของ IC Accounting ผ่าน Places API (New) ฝั่งเซิร์ฟเวอร์
 *
 * ทำไมต้องผ่าน route นี้ ไม่เรียกจากเบราว์เซอร์ตรงๆ:
 *   - API key ต้องไม่หลุดไปอยู่ใน HTML/JS ฝั่ง client
 *   - Google คิดเงินต่อ request — cache ไว้ 24 ชม. ให้ทุกคนที่เข้าเว็บใช้ผลชุดเดียวกัน
 *
 * ข้อจำกัดของ Google: Place Details ให้รีวิวได้สูงสุด 5 รายการ (Google เลือกให้)
 * ถ้าต้องการมากกว่านั้นต้องใช้บริการเสริมที่มีค่าใช้จ่าย
 *
 * ตั้งค่า (ดู apphosting.yaml):
 *   GOOGLE_PLACES_API_KEY  — key จาก Google Cloud Console ที่เปิด "Places API (New)"
 *   GOOGLE_PLACE_ID        — (ไม่บังคับ) Place ID แบบ ChIJ… ถ้าไม่ใส่จะค้นหาจากชื่อ+ที่อยู่ให้
 *
 * ไม่มี key → ตอบ { configured: false } เฉยๆ หน้าเว็บจะซ่อนส่วนรีวิวสดโดยไม่ error
 */

import { CACHE_SECONDS, getGoogleReviews } from '@/lib/google-reviews';

export async function GET() {
  const { payload, status } = await getGoogleReviews();
  // cache ที่ CDN เฉพาะตอนได้ข้อมูลจริง — ค่าว่างจาก error ต้องไม่ค้างอยู่ทั้งวัน
  const headers: Record<string, string> =
    payload.configured && status === 200
      ? { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}` }
      : {};
  return NextResponse.json(payload, { status, headers });
}
