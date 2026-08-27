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

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: Entry['changeFrequency'];
}> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },

  // หน้าบริการ — เป็นหน้าที่ต้องแบกคำค้นเชิงพาณิชย์ จึงให้ priority สูงรองจากหน้าแรก
  { path: '/accounting-services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/company-registration', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/audit-services', priority: 0.9, changeFrequency: 'monthly' },
  // ยุบ /expat-services เข้ามาที่นี่แล้ว จึงเหลือ URL เดียวและได้ priority เต็ม
  // URL ที่ redirect ต้องไม่อยู่ใน sitemap — เท่ากับบอก Google ให้ไปเก็บของที่ย้ายไปแล้ว
  { path: '/visa-work-permit', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/organization-system', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/media-content', priority: 0.7, changeFrequency: 'monthly' },

  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/quote', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
      changeFrequency,
      priority,
    })
  );

  const posts: MetadataRoute.Sitemap = Object.keys(blogMeta).map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
