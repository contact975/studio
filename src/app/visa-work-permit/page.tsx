
"use client";

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, BadgeHelp, Star } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function VisaWorkPermitPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative animate-gradient py-24 text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image 
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000" 
                    fill
                    className="w-full h-full object-cover"
                    alt="Thailand Visa documents"
                    data-ai-hint="passport immigration"
                />
            </div>
            <div data-aos="fade-up" className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Expert Visa & Work Permit Services</h1>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                    ช่วยให้การพำนักและทำงานในประเทศไทยเป็นเรื่องง่าย เราดูแลทุกขั้นตอนอย่างมืออาชีพ เพื่อให้คุณโฟกัสกับการทำธุรกิจและใช้ชีวิตในเชียงใหม่ได้อย่างเต็มที่
                </p>
            </div>
        </section>

        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div data-aos="fade-up" className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">บริการหลักของเรา</h2>
                    <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card data-aos="fade-up" data-aos-delay="0" className="p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex justify-center mb-4">
                           <Briefcase className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Non-Immigrant B Visa</h3>
                        <p className="text-muted-foreground leading-relaxed">บริการยื่นขอและต่ออายุวีซ่าธุรกิจ สำหรับชาวต่างชาติที่เข้ามาทำงานหรือประกอบธุรกิจในไทย</p>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="100" className="p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                         <div className="flex justify-center mb-4">
                           <BadgeHelp className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Work Permit</h3>
                        <p className="text-muted-foreground leading-relaxed">ดำเนินการขอใบอนุญาตทำงาน เปลี่ยนแปลงข้อมูลนายจ้าง หรือแจ้งออกตามระเบียบกรมการจัดหางาน</p>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="200" className="p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                         <div className="flex justify-center mb-4">
                           <Star className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">LTR & SMART Visa</h3>
                        <p className="text-muted-foreground leading-relaxed">บริการที่ปรึกษาสำหรับวีซ่าระยะยาวประเภทพิเศษ สำหรับผู้เชี่ยวชาญ นักลงทุน หรือกลุ่ม Digital Nomad</p>
                    </Card>
                </div>
            </div>
        </section>

        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap items-center -mx-4">
                    <div data-aos="fade-right" className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-8">ทำไมต้องเลือกใช้บริการกับเรา?</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">ภาษาไม่ใช่ปัญหา</h4>
                                    <p className="text-muted-foreground">เรามีทีมงานที่สื่อสารภาษาอังกฤษได้อย่างคล่องแคล่ว พร้อมประสานงานกับเจ้าหน้าที่แทนคุณ</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">ความถูกต้อง 100%</h4>
                                    <p className="text-muted-foreground">ตรวจสอบเอกสารอย่างละเอียด ลดโอกาสการถูกปฏิเสธจากกองตรวจคนเข้าเมือง</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">3</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">บริการครบวงจร</h4>
                                    <p className="text-muted-foreground">เชื่อมต่อกับบริการบัญชีและภาษี ช่วยให้การต่อวีซ่าในปีต่อๆ ไปทำได้อย่างราบรื่น</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <Card data-aos="fade-left" className="p-8 rounded-2xl shadow-lg text-center">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-2xl font-bold">ปรึกษาเรื่องวีซ่าฟรีวันนี้</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Button asChild size="lg">
                                    <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">คลิกเลย</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
