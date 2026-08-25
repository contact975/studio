import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogMeta } from '@/lib/blog-meta';

/**
 * ลิงก์ไปบทความที่เกี่ยวข้อง
 *
 * ทำไมถึงสำคัญ: บทความ 5 ชิ้นเพิ่งถูกกู้กลับเข้า sitemap หลังจากหลุดไปนาน
 * การมีลิงก์จากหน้าบริการ (ซึ่งเป็นหน้าที่แข็งแรงกว่า) ช่วยให้ Google
 * เดินเข้าไปเก็บบทความเหล่านั้นได้เร็วขึ้น และช่วยให้หน้าบริการเองดู
 * มีเนื้อหาเชิงลึกรองรับมากขึ้นในสายตา Google ด้วย
 *
 * ชื่อบทความดึงจาก blogMeta โดยตรง จึงไม่มีทางพิมพ์ผิดหรือหลุดจากของจริง
 * slug ที่ไม่มีอยู่จะถูกข้ามไปเงียบๆ ไม่ทำให้หน้าพัง
 */
export function RelatedArticles({
  slugs,
  title = 'อ่านเพิ่มเติมก่อนตัดสินใจ',
}: {
  slugs: string[];
  title?: string;
}) {
  const posts = slugs
    .map((slug) => ({ slug, meta: blogMeta[slug] }))
    .filter((p): p is { slug: string; meta: (typeof blogMeta)[string] } => Boolean(p.meta));

  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-24" data-aos="fade-up">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Guides</p>
          <h2 className="text-3xl md:text-4xl font-black mb-3">{title}</h2>
          <p className="text-muted-foreground">
            บทความจากทีมงาน IC ที่เขียนจากเคสจริงของลูกค้าในเชียงใหม่
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map(({ slug, meta }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group flex flex-col gap-3 bg-secondary/40 border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <h3 className="font-black text-lg leading-snug group-hover:text-primary transition-colors">
                {meta.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {meta.description}
              </p>
              <span className="mt-auto pt-2 inline-flex items-center gap-2 text-primary text-sm font-bold">
                อ่านบทความ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
