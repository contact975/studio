'use client';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: '5 เคล็ดลับการเตรียมเอกสารภาษีสำหรับ SME มือใหม่',
    excerpt: 'การจัดการภาษีไม่ใช่เรื่องยาก หากคุณมีการเตรียมตัวที่ดีและเป็นระบบ มาดูขั้นตอนง่ายๆ ที่จะช่วยให้คุณประหยัดเวลา...',
    category: 'ภาษีธุรกิจ',
    date: '15 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEb2N1bWVudHxlbnwwfHx8fDE3NzA4ODg1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'tax documents'
  },
  {
    id: 2,
    title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน แบบไหนเหมาะกับคุณมากกว่ากัน?',
    excerpt: 'เปรียบเทียบข้อดีและข้อเสียของการจดทะเบียนนิติบุคคลแต่ละประเภท เพื่อให้คุณตัดสินใจเลือกสิ่งที่คุ้มค่าที่สุดสำหรับธุรกิจของคุณ...',
    category: 'จดทะเบียนธุรกิจ',
    date: '10 มี.ค. 2567',
    author: 'ผู้เชี่ยวชาญด้านกฎหมาย',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8QnVzaW5lc3N8ZW58MHx8fHwxNzcwODg4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'business meeting'
  },
  {
    id: 3,
    title: '5 ข้อผิดพลาดที่ SME เชียงใหม่มักเจอ เมื่อถึงฤดูกาลปิดงบการเงิน',
    excerpt: 'การทำธุรกิจในเชียงใหม่ช่วงต้นปี สิ่งที่เจ้าของกิจการหลายท่านกังวลใจที่สุดคงหนีไม่พ้นการ "ปิดงบการเงิน" สรุปข้อควรระวังมาให้แล้วครับ...',
    category: 'ภาษีธุรกิจ',
    date: '20 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1737622020870-73d9f15e8a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzbWUlMjBjaGlhbmdtYWl8ZW58MHx8fHwxNzcwODg4NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'accounting error check'
  },
  {
    id: 4,
    title: 'คัมภีร์ SME เชียงใหม่: บริหารจัดการบัญชีและภาษีอย่างไรให้ธุรกิจโตแบบก้าวกระโดดในปี 2026',
    excerpt: 'เกริ่นนำ: ในยุคที่เศรษฐกิจเชียงใหม่กลับมาคึกคักอีกครั้ง ไม่ว่าจะเป็นธุรกิจคาเฟ่ ร้านอาหาร หรือที่พักขนาดเล็ก (SME) การบริหารจัดการ...',
    category: 'ภาษีธุรกิจ',
    date: '01 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1758115271914-6d5d8bb3d277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8Y2hpYW5nbWFpfGVufDB8fHx8MTc3MDg5MDM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'e-commerce box'
  },
  {
    id: 5,
    title: 'การบริหารกระแสเงินสด (Cash Flow) สำหรับธุรกิจช่วงเริ่มต้น',
    excerpt: 'เทคนิคการจัดการเงินหมุนเวียนให้ธุรกิจไม่สะดุด แม้ในสภาวะเศรษฐกิจที่มีความผันผวน...',
    category: 'การเงินการบัญชี',
    date: '25 ก.พ. 2567',
    author: 'ที่ปรึกษาการเงิน',
    image: 'https://picsum.photos/seed/blog5/800/500',
    imageHint: 'money growth'
  },
  {
    id: 6,
    title: 'สวัสดิการพนักงานและการจัดการประกันสังคมที่ถูกต้อง',
    excerpt: 'หน้าที่ของนายจ้างในการดูแลสวัสดิการพนักงานตามกฎหมาย และเทคนิคการบริหารจัดการที่ช่วยลดภาระองค์กร...',
    category: 'งานบุคคล',
    date: '20 ก.พ. 2567',
    author: 'ทีมงาน HR',
    image: 'https://picsum.photos/seed/blog6/800/500',
    imageHint: 'happy office workers'
  }
];

export default function BlogPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const now = new Date();
    setCurrentDate(now.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }));
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50 text-foreground font-body">
      <Header />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -z-0"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-bold font-headline mb-6">บทความน่ารู้</h1>
            <p data-aos="fade-up" data-aos-delay="100" className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              รวบรวมความรู้ ข่าวสาร และเทคนิคด้านบัญชี ภาษี และการบริหารธุรกิจ 
              จากทีมงานมืออาชีพของ IC Accounting & Service
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100} 
                  className="group bg-card border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary hover:bg-primary/90 text-white font-normal px-3 py-1">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {currentDate || post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {post.author}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors mb-3">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold flex items-center gap-2 group/btn">
                      <Link href={`/blog/${post.id}`}>
                        อ่านเพิ่มเติม <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div data-aos="fade-up" className="mt-16 flex justify-center gap-2">
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white hover:bg-primary hover:text-white">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white hover:bg-primary hover:text-white">3</Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div data-aos="zoom-in" className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4 font-headline text-primary">รับความรู้ใหม่ๆ ก่อนใคร</h2>
              <p className="text-muted-foreground mb-8">
                ลงชื่อเพื่อรับบทความและอัปเดตเรื่องกฎหมายภาษีล่าสุดส่งตรงถึงหน้าจอคุณ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="อีเมลของคุณ" 
                  className="flex-1 px-6 py-3 rounded-full border border-border focus:ring-2 focus:ring-primary outline-none"
                />
                <Button className="rounded-full px-8 py-6">ติดตามข่าวสาร</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
