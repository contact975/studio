import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  
  const blogData: { [key: string]: { title: string; description: string; image: string } } = {
    'tax-document-preparation-tips': {
      title: '5 เคล็ดลับการเตรียมเอกสารภาษีสำหรับ SME มือใหม่ | IC Accounting',
      description: 'เรียนรู้วิธีการจัดการเอกสารภาษีอย่างเป็นระบบ เพื่อความถูกต้องและรวดเร็ว',
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1200&auto=format&fit=crop'
    },
    'company-vs-partnership-comparison': {
      title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน แบบไหนเหมาะกับคุณมากกว่ากัน?',
      description: 'เปรียบเทียบข้อดีและข้อเสียของการจดทะเบียนธุรกิจแต่ละประเภท',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    },
    '5-common-accounting-mistakes-sme-chiangmai': {
      title: '5 ข้อผิดพลาดที่ SME เชียงใหม่มักเจอ เมื่อถึงฤดูกาลปิดงบการเงิน',
      description: 'สรุปประเด็นสำคัญที่เจ้าของธุรกิจในเชียงใหม่ต้องระวังเพื่อลดความเสี่ยงทางภาษี',
      image: 'https://images.unsplash.com/photo-1737622020870-73d9f15e8a46?q=80&w=1200&auto=format&fit=crop'
    },
    'sme-chiang-mai-accounting-guide': {
      title: 'คัมภีร์ SME เชียงใหม่: บริหารจัดการบัญชีและภาษีให้ธุรกิจโตแบบก้าวกระโดด',
      description: 'คู่มือฉบับสมบูรณ์สำหรับผู้ประกอบการในเชียงใหม่ โดยผู้เชี่ยวชาญกว่า 10 ปี',
      image: 'https://images.unsplash.com/photo-1758115271914-6d5d8bb3d277?q=80&w=1200&auto=format&fit=crop'
    },
    'tax-guide-chiang-mai-restaurants': {
      title: 'ภาษีร้านอาหารและคาเฟ่ในเชียงใหม่: บริหารจัดการอย่างไรไม่ให้โดนตรวจย้อนหลัง',
      description: 'เจาะลึกการทำบัญชีสต็อกและภาษีที่เกี่ยวข้องกับธุรกิจอาหารและเครื่องดื่ม',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop'
    },
    'pool-villa-tax-guide-chiang-mai': {
      title: 'เปิดเช่าที่พัก/Pool Villa ในเชียงใหม่ ต้องเสียภาษีอะไรบ้าง?',
      description: 'คู่มือภาษีสำหรับเจ้าของธุรกิจที่พักและพูลวิลล่ามือใหม่ในเชียงใหม่',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
    }
  };

  const currentPost = blogData[id] || {
    title: 'บทความน่ารู้ด้านบัญชีและภาษี | IC Accounting & Service',
    description: 'ที่ปรึกษาด้านบัญชีและภาษีมืออาชีพในเชียงใหม่ ประสบการณ์กว่า 10 ปี',
    image: 'https://icaccservice.com/logo%20icon.png'
  };

  return {
    title: `${currentPost.title} | IC Accounting`,
    description: currentPost.description,
    openGraph: {
      title: `${currentPost.title} | IC Accounting`,
      description: currentPost.description,
      url: `https://icaccservice.com/blog/${id}`,
      siteName: 'IC Accounting & Service',
      images: [
        {
          url: currentPost.image,
          width: 1200,
          height: 630,
          alt: currentPost.title,
        },
      ],
      type: 'article',
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}