"use client";

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const auditServices = [
    {
        title: "ตรวจสอบงบการเงินประจำปี",
        description: "ตรวจสอบและแสดงความเห็นต่องบการเงินเพื่อให้เป็นไปตามมาตรฐานการรายงานทางการเงิน (TFRS)",
    },
    {
        title: "ตรวจสอบกรณีพิเศษ (Special Audit)",
        description: "ตรวจสอบตามวัตถุประสงค์เฉพาะด้าน เช่น การตรวจสอบทุจริต หรือตรวจสอบตามเงื่อนไขของ BOI",
    },
    {
        title: "ตรวจสอบภายใน (Internal Audit)",
        description: "ประเมินระบบการควบคุมภายในขององค์กร เพื่อลดความเสี่ยงและเพิ่มประสิทธิภาพการทำงาน",
    },
    {
        title: "จัดทำงบกระแสเงินสด",
        description: "บริการจัดเตรียมข้อมูลและวิเคราะห์งบกระแสเงินสดเพื่อการบริหารจัดการเงินทุนอย่างมีประสิทธิภาพ",
    }
]

const whyChooseUs = [
    {
        title: "ทีมงาน CPA มืออาชีพ",
        description: "ดูแลโดยผู้สอบบัญชีรับอนุญาต (CPA) ที่มีประสบการณ์ตรงในหลากหลายอุตสาหกรรม"
    },
    {
        title: "ตรงไปตรงมา",
        description: "ชี้แจงทุกประเด็นความเสี่ยงอย่างชัดเจน พร้อมแนวทางแก้ไขที่ถูกต้องตามกฎหมาย"
    },
    {
        title: "ทำงานรวดเร็ว",
        description: "มีระบบการจัดการเอกสารที่เป็นระบบ (Digital Based) ช่วยให้งานตรวจสอบจบได้ตามกำหนด"
    }
]

export default function AuditServicesPage() {
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
        <section className="py-12 bg-background">
          <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
             <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full"
              >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl">
                     <Image src="https://picsum.photos/seed/promo-audit/1280/427" fill alt="บริการตรวจสอบบัญชี โปรโมชั่น" className="object-cover" data-ai-hint="audit service banner"/>
                  </div>
                </CarouselItem>
                 <CarouselItem>
                  <div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl">
                     <Image src="https://picsum.photos/seed/promo-cpa/1280/427" fill alt="CPA โปรโมชั่น" className="object-cover" data-ai-hint="cpa promotion banner"/>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
            </Carousel>
          </div>
        </section>
        <section className="animate-gradient text-primary-foreground py-20 md:py-28">
            <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
                <nav className="text-sm mb-4 opacity-80">
                    <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link> / <span>บริการตรวจสอบบัญชี</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">บริการตรวจสอบบัญชี (Audit Services)</h1>
                <p className="text-lg md:text-xl opacity-90 max-w-3xl">สร้างความเชื่อมั่นในงบการเงินของคุณ ด้วยการตรวจสอบที่แม่นยำ ตามมาตรฐานการสอบบัญชีที่รับรองโดยสภาวิชาชีพบัญชี</p>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div data-aos="fade-up" className="grid lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-3xl font-bold font-headline text-foreground">ให้มากกว่าแค่การลงลายมือชื่อ</h2>
                        <p className="text-muted-foreground leading-relaxed">เราไม่ได้เพียงแค่ตรวจสอบความถูกต้อง แต่เราช่วยค้นหาจุดอ่อนในระบบควบคุมภายใน เพื่อให้ผู้ประกอบการนำไปปรับปรุงธุรกิจได้จริง</p>
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/#contact">ขอใบเสนอราคาตรวจสอบบัญชี</Link>
                        </Button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {auditServices.map((service, index) => (
                                <Card key={index} className="bg-secondary/50 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-secondary">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold font-headline mb-16 text-foreground">ทำไมผู้ประกอบการจึงเลือก IC Accounting & Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {whyChooseUs.map((item, index) => (
                        <Card key={index} data-aos="fade-up" data-aos-delay={index * 100} className="bg-card text-center p-6 shadow-sm hover:shadow-lg transition-shadow">
                            <h3 className="text-5xl font-bold text-primary mb-4">0{index + 1}</h3>
                            <CardHeader className="p-0">
                              <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
