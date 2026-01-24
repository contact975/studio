import Image from 'next/image';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Heart, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-16 text-primary">
              เรื่องราวของ IC Accounting & Service
            </h1>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Heart className="h-10 w-10 text-primary" />
                  <h2 className="text-3xl font-bold font-headline">
                    หัวใจหลักของเรา (Our Core Heart)
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ที่ IC Accounting & Service เราไม่ได้มองตัวเองเป็นเพียงสำนักงานบัญชีที่จัดการแค่ตัวเลข แต่เราคือ "เลขาส่วนตัวธุรกิจ" ที่พร้อมเดินเคียงข้างคุณ เราเชื่อว่าเบื้องหลังธุรกิจที่เติบโตอย่างก้าวกระโดด คือระบบหลังบ้านที่แข็งแรงและโปร่งใส
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  เราจึงมุ่งมั่นที่จะเปลี่ยนภาพจำของงานบัญชีที่ยุ่งยาก ให้กลายเป็นเรื่องง่ายและเข้าถึงได้สำหรับ SME รุ่นใหม่ ด้วยบริการที่จริงใจ เข้าใจหน้างานจริง และการนำเทคโนโลยีเข้ามาช่วยให้การบริหารจัดการมีประสิทธิภาพสูงสุด
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
                 <Image
                    src="https://live.staticflickr.com/65535/55057964151_523a54b38d_b.jpg"
                    alt="Founder of IC Accounting & Service"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="woman portrait"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            <div className="mb-24">
               <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
                ทำไมต้องเลือกเรา? (Why Choose IC)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-primary text-center p-6 flex flex-col items-center justify-start shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-primary-foreground mb-2">Modern & Partner Mindset</h3>
                    <p className="text-primary-foreground/90">เราทำงานเหมือนเป็นพาร์ทเนอร์ในทีมของคุณ พร้อมให้คำปรึกษาที่เข้าใจง่าย ไม่ใช้ศัพท์เทคนิคที่ซับซ้อน</p>
                </Card>
                <Card className="bg-primary text-center p-6 flex flex-col items-center justify-start shadow-sm hover:shadow-lg transition-shadow">
                     <h3 className="text-xl font-semibold text-primary-foreground mb-2">One Stop Solution</h3>
                    <p className="text-primary-foreground/90">ดูแลครบวงจรในที่เดียว ตั้งแต่จดทะเบียนบริษัท วางระบบบัญชี งานเอกสารต่างชาติ ไปจนถึงการทำสื่อการตลาด</p>
                </Card>
                <Card className="bg-primary text-center p-6 flex flex-col items-center justify-start shadow-sm hover:shadow-lg transition-shadow">
                     <h3 className="text-xl font-semibold text-primary-foreground mb-2">Action Oriented</h3>
                    <p className="text-primary-foreground/90">เราเน้นการลงพื้นที่จริง (Consult) เพื่อวางระบบหลังบ้านให้เหมาะสมกับประเภทธุรกิจของคุณมากที่สุด</p>
                </Card>
                <Card className="bg-primary text-center p-6 flex flex-col items-center justify-start shadow-sm hover:shadow-lg transition-shadow">
                     <h3 className="text-xl font-semibold text-primary-foreground mb-2">Creative Thinking</h3>
                    <p className="text-primary-foreground/90">เราเป็นสำนักงานบัญชีไม่กี่แห่งที่เข้าใจการตลาด และพร้อมช่วยคุณผลิต Media Content เพื่ออัปเกรดแบรนด์ให้ดูเป็นมืออาชีพ</p>
                </Card>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-24 bg-secondary p-8 rounded-xl">
              <div className="flex justify-center items-center gap-4 mb-4">
                 <Target className="h-10 w-10 text-primary" />
                 <h2 className="text-3xl font-bold font-headline">ภารกิจของเรา (Our Mission)</h2>
              </div>
              <blockquote className="text-xl italic text-muted-foreground">
                "ส่งมอบความสบายใจให้เจ้าของธุรกิจ ด้วยระบบบัญชีที่เป๊ะ และบริการที่เป็นมากกว่าคู่สัญญา แต่คือเพื่อนคู่คิดที่ช่วยคุณปั้นผลกำไรให้เติบโตอย่างยั่งยืน"
              </blockquote>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
                สรุปบริการของเรา (Our Services at a Glance)
              </h2>
              <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-sm">
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span><b>Accounting & Tax:</b> รับทำบัญชีรายเดือน ปิดงบประจำปี และวางแผนภาษี</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span><b>Business Registration:</b> บริการจดทะเบียนบริษัทและห้างหุ้นส่วน</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span><b>Expat Services:</b> ดูแลเรื่อง Visa และ Work Permit สำหรับชาวต่างชาติ</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span><b>Organization System:</b> วางระบบหลังบ้าน สอนใช้งานโปรแกรมบัญชี และจัดระเบียบเอกสาร</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span><b>Creative Media:</b> รับผลิตวิดีโอและกราฟิกเพื่อการตลาดออนไลน์</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
