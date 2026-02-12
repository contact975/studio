import { Metadata } from 'next';

// ฟังก์ชันนี้จะช่วยดึงข้อมูลบทความมาทำเป็นภาพและหัวข้อตอนแชร์อัตโนมัติ
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  
  // แนะนำให้ตั้งชื่อภาพหลักของเว็บไว้ที่นี่ หรือจะทำระบบดึงภาพตามบทความในอนาคตก็ได้ครับ
  const shareImage = "https://icaccservice.com/og-image.jpg"; 

  return {
    openGraph: {
      title: 'บทความน่ารู้ด้านบัญชีและภาษี | IC Accounting & Service',
      description: 'ที่ปรึกษาด้านบัญชีและภาษีมืออาชีพในเชียงใหม่ ประสบการณ์กว่า 10 ปี',
      url: `https://icaccservice.com/blog/${id}`,
      siteName: 'IC Accounting & Service',
      images: [
        {
          url: shareImage, 
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}