import type { Metadata } from 'next';

const blogMeta: Record<string, { title: string; description: string; image: string }> = {
  'accounting-fee-chiangmai': {
    title: 'รับทำบัญชีเชียงใหม่ ราคาเท่าไหร่? เปรียบเทียบค่าบริการที่ควรรู้',
    description: 'ค่าทำบัญชีเชียงใหม่เริ่มต้นที่ 1,500 บาท/เดือน เปรียบเทียบค่าบริการตามขนาดธุรกิจ และช่วยให้คุณเลือกสำนักงานบัญชีได้คุ้มค่าที่สุด',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-account.jpg',
  },
  'company-registration-chiangmai': {
    title: 'จดทะเบียนบริษัทเชียงใหม่ 2568 ขั้นตอน เอกสาร และค่าใช้จ่ายที่ต้องรู้',
    description: 'จดทะเบียนบริษัทเชียงใหม่ใช้เวลาเพียง 3-5 วันทำการ ค่าใช้จ่ายเริ่มต้น 5,000-8,000 บาท ครบทุกขั้นตอนตั้งแต่เตรียมเอกสารจนได้หนังสือรับรองบริษัท',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-register.jpg',
  },
  'how-to-choose-accounting-office-chiangmai': {
    title: 'เลือกสำนักงานบัญชีเชียงใหม่ อย่างไรให้ธุรกิจได้ประโยชน์สูงสุด',
    description: 'ราคาไม่ใช่ปัจจัยเดียวในการเลือกสำนักงานบัญชี บทความนี้แนะนำ 5 เกณฑ์สำคัญที่ต้องตรวจสอบก่อนตัดสินใจ',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-consult.jpg',
  },
  'corporate-tax-chiangmai-guide': {
    title: 'ภาษีนิติบุคคลเชียงใหม่ 2568 เจ้าของธุรกิจต้องรู้อะไรบ้าง',
    description: 'SME เชียงใหม่กำไรไม่เกิน 300,000 บาทได้รับยกเว้นภาษี 0% อธิบายครบทุกอัตราและกำหนดการยื่นภาษีสำหรับนิติบุคคล',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-audit.jpg',
  },
  'work-permit-chiangmai': {
    title: 'Work Permit เชียงใหม่ ขั้นตอนและเอกสารที่ชาวต่างชาติต้องรู้',
    description: 'ทำ Work Permit เชียงใหม่ใช้เวลา 7-15 วันทำการ ค่าธรรมเนียม 3,000 บาท อธิบายทุกขั้นตอนตั้งแต่เตรียมเอกสารจนได้รับ Work Permit',
    image: 'https://icaccservice.com/images/blog/visa-work-permit-chiangmai.jpg',
  },
};

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