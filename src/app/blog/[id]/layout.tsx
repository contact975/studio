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
    title: post.title + ' | IC Accounting & Service เชียงใหม่',
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
