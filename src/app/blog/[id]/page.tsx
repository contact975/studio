'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ChevronLeft, Facebook, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: '5 เคล็ดลับการเตรียมเอกสารภาษีสำหรับ SME มือใหม่',
    content: `
      การจัดการภาษีไม่ใช่เรื่องยาก หากคุณมีการเตรียมตัวที่ดีและเป็นระบบ มาดูขั้นตอนง่ายๆ ที่จะช่วยให้คุณประหยัดเวลาและลดความเสี่ยงในการถูกตรวจสอบย้อนหลัง

      1. รวบรวมเอกสารรายได้ให้ครบถ้วน: ไม่ว่าจะเป็นใบกำกับภาษีขาย ใบเสร็จรับเงิน หรือเอกสารการรับโอนเงิน
      2. แยกประเภทค่าใช้จ่าย: แบ่งหมวดหมู่เอกสารค่าใช้จ่ายให้ชัดเจน เช่น ค่าวัตถุดิบ ค่าเช่าสถานที่ และเงินเดือนพนักงาน
      3. ตรวจสอบความถูกต้องของใบกำกับภาษี: ตรวจเช็คชื่อ ที่อยู่ และเลขประจำตัวผู้เสียภาษีทั้งของผู้ซื้อและผู้ขาย
      4. จัดเก็บเอกสารอย่างเป็นระบบ: แนะนำให้จัดเก็บตามเดือนและตามประเภท เพื่อการค้นหาที่รวดเร็ว
      5. ใช้เทคโนโลยีเข้าช่วย: การใช้โปรแกรมบัญชี Cloud จะช่วยให้คุณบันทึกข้อมูลได้แบบ Real-time และลดความผิดพลาดได้มาก

      การเตรียมเอกสารที่ดีคือหัวใจสำคัญของการทำบัญชีที่ถูกต้องและช่วยให้คุณวางแผนภาษีได้อย่างมีประสิทธิภาพสูงสุดค่ะ
    `,
    category: 'ภาษีธุรกิจ',
    date: '15 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEb2N1bWVudHxlbnwwfHx8fDE3NzA4ODg1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'tax documents'
  },
  {
    id: 2,
    title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน แบบไหนเหมาะกับคุณมากกว่ากัน?',
    content: `
      เริ่มต้นธุรกิจใหม่ หลายคนมักตั้งคำถามว่าควรจดทะเบียนเป็น "บริษัทจำกัด" หรือ "ห้างหุ้นส่วนจำกัด" ดี? บทความนี้จะเปรียบเทียบข้อดีและข้อเสียเพื่อให้คุณตัดสินใจเลือกสิ่งที่คุ้มค่าที่สุดสำหรับธุรกิจของคุณ

      ห้างหุ้นส่วนจำกัด (หจก.):
      - ข้อดี: ขั้นตอนการจัดตั้งง่ายกว่า มีค่าธรรมเนียมต่ำกว่าบริษัท และความรับผิดชอบของหุ้นส่วนจำกัดจะจำกัดเท่ากับจำนวนเงินที่ลงทุน
      - ข้อเสีย: หุ้นส่วนผู้จัดการมีความรับผิดชอบไม่จำกัด และภาพลักษณ์ความน่าเชื่อถืออาจน้อยกว่าบริษัท

      บริษัทจำกัด:
      - ข้อดี: มีภาพลักษณ์ความเป็นมืออาชีพสูง การระดมทุนทำได้ง่ายกว่า และความรับผิดชอบของผู้ถือหุ้นจำกัดเท่ากับจำนวนเงินค่าหุ้นที่ยังส่งใช้ไม่ครบ
      - ข้อเสีย: มีขั้นตอนและเอกสารที่ซับซ้อนกว่า ต้องมีการทำบัญชีและตรวจสอบบัญชีที่เข้มงวด

      สรุปแล้ว หากคุณวางแผนจะขยายธุรกิจให้ใหญ่ขึ้นในอนาคต การจดทะเบียนบริษัทมักเป็นทางเลือกที่ดีกว่าในระยะยาวค่ะ
    `,
    category: 'จดทะเบียนธุรกิจ',
    date: '10 มี.ค. 2567',
    author: 'ผู้เชี่ยวชาญด้านกฎหมาย',
    image: 'https://picsum.photos/seed/blog2/1200/600',
    imageHint: 'business discussion'
  },
  {
    id: 3,
    title: '5 ข้อผิดพลาดที่ SME เชียงใหม่มักเจอ เมื่อถึงฤดูกาลปิดงบการเงิน',
    content: `
      เกริ่นนำ: การทำธุรกิจในเชียงใหม่ช่วงต้นปี สิ่งที่เจ้าของกิจการหลายท่านกังวลใจที่สุดคงหนีไม่พ้นการ "ปิดงบการเงิน" จากประสบการณ์ดูแลลูกค้าและปิดงบมาแล้วกว่าหลายร้อยเคส (รวมถึง 41 งบในปีนี้!) IC Accounting & Service สรุปข้อควรระวังมาให้แล้วครับ

      1. เอกสารไม่ครบถ้วนและไม่เป็นระบบ
      ปัญหาคลาสสิกที่ทำให้การปิดงบล่าช้าคือเอกสารรายรับ-รายจ่ายที่กระจัดกระจาย การเริ่มทำบัญชีที่เป็นระบบตั้งแต่วันแรกจะช่วยประหยัดเวลาและลดความเสี่ยงทางภาษีได้มหาศาลครับ

      2. แยกบัญชีส่วนตัวกับบัญชีบริษัทไม่ออก
      เจ้าของธุรกิจ SME มักใช้เงินปนกัน ซึ่งเป็นจุดที่สรรพากรตรวจสอบได้ง่ายที่สุด เราแนะนำให้แยกบัญชีชัดเจนเพื่อให้การบันทึกบัญชีแม่นยำและโปร่งใสครับ

      3. มองข้ามการวางแผนภาษีระหว่างปี
      หลายท่านรอให้ถึงสิ้นปีค่อยคิดเรื่องภาษี ซึ่งอาจจะสายเกินไป การมีที่ปรึกษาบัญชีที่มีประสบการณ์ช่วยวางแผนจะช่วยให้คุณประหยัดภาษีได้อย่างถูกต้องตามกฎหมายครับ

      4. เลือกสำนักงานบัญชีที่ไม่มีตัวตนจริงในพื้นที่
      การเลือก สำนักงานบัญชีเชียงใหม่ ที่มีที่ตั้งชัดเจน ช่วยให้การประสานงานและรับส่งเอกสารทำได้รวดเร็ว และเข้าใจบริบทของธุรกิจในท้องถิ่นมากกว่าครับ

      5. ลืมใช้ประโยชน์จาก "มีเดียคอนเทนต์" ในการโตธุรกิจ
      ในยุคนี้ บัญชีไม่ได้มีหน้าที่แค่เก็บตัวเลข แต่ข้อมูลบัญชีที่แม่นยำจะช่วยบอกเราได้ว่าควรทุ่มงบทำการตลาดหรือผลิตมีเดียคอนเทนต์ตัวไหนเพื่อให้ธุรกิจโตครับ
    `,
    category: 'ภาษีธุรกิจ',
    date: '20 มี.ค. 2567',
    author: 'ทีมงาน IC ACC',
    image: 'https://images.unsplash.com/photo-1737622020870-73d9f15e8a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzbWUlMjBjaGlhbmdtYWl8ZW58MHx8fHwxNzcwODg4NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'accounting error check'
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (params?.id) {
      const postId = Number(params.id);
      const foundPost = blogPosts.find(p => p.id === postId) || blogPosts[0];
      setPost(foundPost);
    }
  }, [params]);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-dvh bg-white text-foreground font-body">
      <Header />
      <main className="flex-1">
        <section className="py-6 border-b bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">บทความน่ารู้</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> กลับไปหน้ารวมบทความ
            </Link>
          </div>
        </section>

        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div data-aos="fade-up" className="mb-8">
                <Badge className="bg-primary hover:bg-primary/90 text-white mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>เผยแพร่เมื่อ: {post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>เขียนโดย: {post.author}</span>
                  </div>
                </div>
              </div>

              <div data-aos="fade-up" className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-12">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  data-ai-hint={post.imageHint}
                />
              </div>

              <div data-aos="fade-up" className="prose prose-lg max-w-none prose-slate">
                <div className="whitespace-pre-line text-lg leading-relaxed text-slate-700">
                  {post.content}
                </div>
              </div>

              <Separator className="my-12" />

              <div data-aos="fade-up" className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" /> แบ่งปันบทความนี้
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="rounded-full gap-2 hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 hover:bg-green-500 hover:text-white transition-all">
                    <MessageCircle className="h-4 w-4" /> Line
                  </Button>
                </div>
              </div>

              <div data-aos="fade-up" className="mt-16 flex items-start gap-6 p-8 border rounded-2xl bg-white shadow-sm">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{post.author}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    ทีมงานผู้เชี่ยวชาญด้านบัญชีและภาษีของ IC Accounting & Service พร้อมให้คำปรึกษาและแบ่งปันความรู้เพื่อสนับสนุนการเติบโตของธุรกิจคุณอย่างมั่นคง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-10 text-center">บทความที่คุณอาจสนใจ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(p => p.id !== (params?.id ? Number(params.id) : 0)).slice(0, 3).map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className="group">
                  <Card className="h-full border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="relative aspect-video">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">มีข้อสงสัยเกี่ยวกับเรื่องบัญชีและภาษี?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              ให้ทีมงาน IC Accounting & Service ดูแลคุณ เราพร้อมให้คำปรึกษาเบื้องต้นฟรี เพื่อให้ธุรกิจของคุณเดินหน้าได้อย่างถูกต้อง
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold">
              <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">พูดคุยกับเราทาง Line</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
