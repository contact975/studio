import type { MetadataRoute } from 'next';
import { blogMeta } from '@/lib/blog-meta';

const BASE_URL = 'https://icaccservice.com';

/**
 * Sitemap แบบสร้างอัตโนมัติ
 *
 * เดิมเป็นไฟล์นิ่ง public/sitemap.xml ที่ต้องแก้มือ ทำให้บทความ 5 ชิ้น
 * (company-registration-chiangmai, work-permit-chiangmai, accounting-fee-chiangmai,
 *  corporate-tax-chiangmai-guide, how-to-choose-accounting-office-chiangmai)
 * หลุดจาก sitemap ไป Google จึงอาจไม่รู้ว่ามีบทความเหล่านี้อยู่
 *
 * ตอนนี้รายชื่อบทความดึงจาก lib/blog-meta.ts ซึ่งเป็นแหล่งข้อมูลเดียวของระบบ
 * เพิ่มบทความใหม่ใน lib/blog-meta.ts ที่เดียว sitemap จะตามเองทันที
 *
 * ⚠️ ต้องลบ public/sitemap.xml ทิ้ง — ถ้ามีทั้งสองไฟล์ Next จะ build ไม่ผ่าน
 */

type Entry = MetadataRoute.Sitemap[number];

/**
 * lastmod — บอก Google ว่าหน้าไหนเพิ่งเปลี่ยน จะได้มา crawl ใหม่เร็วขึ้น
 *
 * กรณีจริง: /organization-system ถูกแสดงในผลค้นหาด้วย title "IC Accounting & Service Logo"
 * ซึ่งเป็น alt โลโก้เก่าที่เลิกใช้ตั้งแต่ 27 ส.ค. — คือ Google ยังถือสำเนาก่อนหน้านั้นอยู่
 * เพราะ sitemap ไม่มี lastmod บอกว่าหน้าเปลี่ยนแล้ว
 *
 * ใส่วันที่จริงที่เนื้อหาเปลี่ยนเท่านั้น — อย่าใช้ new Date() ตอน build
 * เพราะทุก deploy จะกลายเป็น "เปลี่ยนใหม่" ทั้งเว็บ Google จะเลิกเชื่อค่านี้
 * ฟุตเตอร์ที่ใช้ร่วมทุกหน้าเปลี่ยนเมื่อ 13 ก.ย. 2569 จึงใช้วันนั้นเป็นค่าตั้งต้น
 */
const SHARED_LAYOUT_UPDATED = '2026-09-13';

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: Entry['changeFrequency'];
  /** วันที่เนื้อหาเฉพาะของหน้านั้นเปลี่ยนล่าสุด (YYYY-MM-DD) ถ้าไม่ใส่ใช้ SHARED_LAYOUT_UPDATED */
  lastModified?: string;
}> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-09-23' },

  // หน้าบริการ — เป็นหน้าที่ต้องแบกคำค้นเชิงพาณิชย์ จึงให้ priority สูงรองจากหน้าแรก
  { path: '/accounting-services', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-10-11' },
  { path: '/company-registration', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-23' },
  { path: '/audit-services', priority: 0.9, changeFrequency: 'monthly' },
  // ยุบ /expat-services เข้ามาที่นี่แล้ว จึงเหลือ URL เดียวและได้ priority เต็ม
  // URL ที่ redirect ต้องไม่อยู่ใน sitemap — เท่ากับบอก Google ให้ไปเก็บของที่ย้ายไปแล้ว
  { path: '/visa-work-permit', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-10-07' },
  // ฉบับภาษาอังกฤษของหน้าเดียวกัน ประกาศ hreflang คู่กันไว้ในหน้าทั้งสองแล้ว
  // ต้องอยู่ใน sitemap ด้วย ไม่งั้น Google อาจไม่เจอหน้านี้เลยเพราะลิงก์เข้าถึงน้อย
  { path: '/en/visa-work-permit', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-10-07' },
  // หน้ารวมภาษาอังกฤษ — ปลายทางของปุ่มสลับภาษาในหน้าที่ยังไม่มีคู่ภาษา
  // priority ต่ำเพราะเป้าหมายของเว็บยังเป็นคำค้นภาษาไทย หน้านี้มีไว้รองรับ
  // ชาวต่างชาติที่เข้ามาในเว็บแล้ว ไม่ได้ทำไว้ไล่อันดับคำอังกฤษ
  { path: '/en', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-10-07' },
  { path: '/en/quote', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-10-07' },
  { path: '/en/company-registration', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-10-07' },
  { path: '/en/accounting-services', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-10-11' },
  { path: '/organization-system', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-09-14' },
  { path: '/media-content', priority: 0.7, changeFrequency: 'monthly' },

  // เครื่องคำนวณภาษี — เป็นหน้าที่คนค้นหาเองอยู่แล้ว ("คำนวณภาษี 2569")
  // และดึงคนที่ยังไม่พร้อมจ้างเข้ามารู้จักเราก่อน จึงให้ priority สูงกว่าหน้าแนะนำตัว
  { path: '/tax-calculator', priority: 0.8, changeFrequency: 'yearly', lastModified: '2026-09-28' },

  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  // หน้านักศึกษาฝึกงาน — อัปเดตเมื่อมีรุ่นใหม่ จึงตั้ง yearly
  { path: '/internship', priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-09-28' },
  { path: '/quote', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
      lastModified: lastModified ?? SHARED_LAYOUT_UPDATED,
      changeFrequency,
      priority,
    })
  );

  const posts: MetadataRoute.Sitemap = Object.entries(blogMeta).map(([slug, meta]) => ({
    url: `${BASE_URL}/blog/${slug}`,
    // บทความรุ่นใหม่ระบุวันที่ไว้ใน blogMeta — บทความเก่าไม่ใส่ lastmod (ไม่รู้วันที่จริง ใส่มั่วแย่กว่าไม่ใส่)
    ...(meta.lastModified ? { lastModified: meta.lastModified } : {}),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
