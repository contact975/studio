import type { Metadata } from 'next';
import { blogMeta } from '@/lib/blog-meta';

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const post = blogMeta[id];
  if (!post) {
    return { title: 'บทความ | IC Accounting & Service เชียงใหม่' };
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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
