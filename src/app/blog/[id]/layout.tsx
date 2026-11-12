import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogMeta } from '@/lib/blog-meta';

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const post = blogMeta[id];
  if (!post) {
    // layout ด้านล่างตอบ 404 ให้ slug นี้ ชื่อแท็บจึงต้องตรงกับหน้า not-found
    return { title: 'ไม่พบหน้าที่คุณค้นหา | IC Accounting', robots: { index: false } };
  }
  return {
    // ส่วนต่อท้ายเดิมยาว 35 ตัวอักษร กินที่จนชื่อบทความโดน Google ตัดทิ้งทุกบทความ
    // (ยาวสุด 128 ตัวอักษร ทั้งที่แสดงได้ราว 60) ย่อเหลือเท่าที่จำเป็นต่อการจำแบรนด์
    title: post.title + ' | IC Accounting',
    description: post.description,
    alternates: { canonical: 'https://icaccservice.com/blog/' + id },
    openGraph: {
      title: post.title,
      description: post.description,
      url: 'https://icaccservice.com/blog/' + id,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      locale: 'th_TH',
      siteName: 'IC Accounting & Service เชียงใหม่',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

/**
 * slug ที่ไม่มีใน blogMeta ต้องตอบ 404
 *
 * เดิมหน้าบทความ (client component) หาไม่เจอก็แสดงบทความแรกแทน และตอบ 200
 * URL ผิดหรือบทความที่ลบไปแล้วจึงกลายเป็นหน้าซ้ำที่ Google เก็บเข้าดัชนีได้ (soft 404 — พบ 12 พ.ย. 2569)
 * blogMeta มีครบทุกบทความอยู่แล้ว (sitemap ก็ใช้ชุดเดียวกัน) จึงใช้เป็นตัวตัดสิน
 */
export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!blogMeta[id]) notFound();
  return <>{children}</>;
}
