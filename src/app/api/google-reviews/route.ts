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

const CACHE_SECONDS = 60 * 60 * 24;
const SEARCH_QUERY = 'IC Accounting & Service ดอยสะเก็ด เชียงใหม่';

export type GoogleReview = {
  id: string;
  author: string;
  photo: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  url: string | null;
};

export type GoogleReviewsPayload = {
  configured: boolean;
  rating: number | null;
  total: number | null;
  mapsUrl: string | null;
  reviews: GoogleReview[];
};

type PlaceReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  googleMapsUri?: string;
};

type PlaceDetails = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

const empty = (): GoogleReviewsPayload => ({ configured: false, rating: null, total: null, mapsUrl: null, reviews: [] });

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY, languageCode: 'th', regionCode: 'TH' }),
    next: { revalidate: CACHE_SECONDS },
  });
  if (!res.ok) {
    console.error('[google-reviews] searchText ล้มเหลว', res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { places?: { id: string; displayName?: { text?: string } }[] };
  const first = data.places?.[0];
  if (first) {
    // เอาค่านี้ไปใส่ GOOGLE_PLACE_ID ใน apphosting.yaml จะได้ไม่ต้องค้นหาทุกครั้ง
    console.log('[google-reviews] พบ Place ID:', first.id, first.displayName?.text);
  }
  return first?.id ?? null;
}

// ข้อมูลตัวอย่างสำหรับดูหน้าตาก่อนมี API key — เปิดด้วย GOOGLE_REVIEWS_MOCK=1 ใน .env.local เท่านั้น
const MOCK: GoogleReviewsPayload = {
  configured: true,
  rating: 5,
  total: 100,
  mapsUrl: 'https://maps.google.com/?cid=11080561333861967427',
  reviews: [
    { id: 'm1', author: 'Nattapong K.', photo: 'https://i.pravatar.cc/150?img=12', rating: 5, text: 'ทีมงานดูแลดีมาก ตอบไว อธิบายเรื่องภาษีให้เข้าใจง่าย ไม่เคยพลาดยื่นแบบเลยตั้งแต่ใช้บริการ', relativeTime: '2 เดือนที่แล้ว', url: null },
    { id: 'm2', author: 'Pimchanok S.', photo: 'https://i.pravatar.cc/150?img=47', rating: 5, text: 'จดทะเบียนบริษัทเสร็จภายใน 3 วัน เอกสารครบ ประทับใจมากค่ะ', relativeTime: '3 เดือนที่แล้ว', url: null },
    { id: 'm3', author: 'Michael R.', photo: 'https://i.pravatar.cc/150?img=33', rating: 5, text: 'Handled my work permit renewal smoothly. Clear communication in English and very professional.', relativeTime: '5 เดือนที่แล้ว', url: null },
    { id: 'm4', author: 'สุภาพร ว.', photo: 'https://i.pravatar.cc/150?img=5', rating: 5, text: 'วางระบบบัญชีให้ร้าน ทำให้เห็นกำไรขาดทุนรายเดือนชัดเจน แนะนำเลยค่ะ', relativeTime: '6 เดือนที่แล้ว', url: null },
    { id: 'm5', author: 'Thanawat P.', photo: 'https://i.pravatar.cc/150?img=68', rating: 5, text: 'ปิดงบให้ทันกำหนดทุกปี ราคาสมเหตุสมผล บริการเป็นกันเอง', relativeTime: '8 เดือนที่แล้ว', url: null },
  ],
};

export async function GET() {
  if (process.env.GOOGLE_REVIEWS_MOCK === '1' && process.env.NODE_ENV !== 'production') {
    return NextResponse.json(MOCK);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return NextResponse.json(empty());

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await resolvePlaceId(apiKey));
    if (!placeId) return NextResponse.json(empty());

    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=th`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) {
      console.error('[google-reviews] place details ล้มเหลว', res.status, await res.text());
      return NextResponse.json(empty(), { status: 502 });
    }

    const place = (await res.json()) as PlaceDetails;
    const reviews: GoogleReview[] = (place.reviews ?? [])
      .filter((r) => (r.text?.text ?? r.originalText?.text ?? '').trim().length > 0)
      .map((r, i) => ({
        id: r.name ?? `review-${i}`,
        author: r.authorAttribution?.displayName ?? 'ผู้ใช้ Google',
        photo: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? 5,
        text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
        relativeTime: r.relativePublishTimeDescription ?? '',
        url: r.googleMapsUri ?? r.authorAttribution?.uri ?? null,
      }));

    const payload: GoogleReviewsPayload = {
      configured: true,
      rating: place.rating ?? null,
      total: place.userRatingCount ?? null,
      mapsUrl: place.googleMapsUri ?? null,
      reviews,
    };
    return NextResponse.json(payload, {
      headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}` },
    });
  } catch (error) {
    console.error('[google-reviews] เกิดข้อผิดพลาด', error);
    return NextResponse.json(empty(), { status: 500 });
  }
}
