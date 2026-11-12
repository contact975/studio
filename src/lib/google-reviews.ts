/**
 * ดึงรีวิว Google ของ IC Accounting ผ่าน Places API (New) — ใช้ได้เฉพาะฝั่งเซิร์ฟเวอร์
 * (ห้าม import จากคอมโพเนนต์ 'use client' ยกเว้นแบบ import type เพราะ key ต้องไม่หลุดไปฝั่งเบราว์เซอร์)
 *
 * ใช้สองที่:
 *   - /api/google-reviews  สำหรับคอมโพเนนต์ฝั่ง client ที่ยังดึงเองหลังโหลดหน้า
 *   - หน้าแรก (/ และ /en)  ดึงตอนเรนเดอร์ฝั่งเซิร์ฟเวอร์ ให้ข้อความรีวิวอยู่ใน HTML ตั้งแต่แรก
 *
 * ── ทำไมหน้าแรกต้องดึงฝั่งเซิร์ฟเวอร์ ──
 * เดิมรีวิวโหลดหลังเปิดหน้า HTML ที่ส่งออกไปจึงไม่มีเนื้อรีวิวเลย
 * บอตที่ไม่รัน JavaScript (บอต AI หลายตัว และเครื่องมือวิเคราะห์คู่แข่ง IC Insight)
 * จึงรายงานว่า "ไม่มีรีวิวลูกค้าบนเว็บ" ทั้งที่มีอยู่ (พบ 6 พ.ย. 2569)
 *
 * fetch ทั้งสองตัวใช้ Data Cache 24 ชม. ทุกทางที่เรียกจึงใช้ผลชุดเดียวกัน
 * และเรียก Places API (ซึ่งคิดเงิน) ไม่เกินวันละครั้ง
 */

export const CACHE_SECONDS = 60 * 60 * 24;
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

export type GoogleReviewsResult = { payload: GoogleReviewsPayload; status: number };

/** status ใช้ตอบ HTTP ใน route เท่านั้น — หน้าเว็บดูแค่ payload */
export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  if (process.env.GOOGLE_REVIEWS_MOCK === '1' && process.env.NODE_ENV !== 'production') {
    return { payload: MOCK, status: 200 };
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { payload: empty(), status: 200 };

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await resolvePlaceId(apiKey));
    if (!placeId) return { payload: empty(), status: 200 };

    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=th`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) {
      console.error('[google-reviews] place details ล้มเหลว', res.status, await res.text());
      return { payload: empty(), status: 502 };
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

    return {
      payload: {
        configured: true,
        rating: place.rating ?? null,
        total: place.userRatingCount ?? null,
        mapsUrl: place.googleMapsUri ?? null,
        reviews,
      },
      status: 200,
    };
  } catch (error) {
    console.error('[google-reviews] เกิดข้อผิดพลาด', error);
    return { payload: empty(), status: 500 };
  }
}
