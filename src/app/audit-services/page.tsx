"use client";

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PromoCarousel } from '@/components/landing/promo-carousel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle2, ShieldCheck, BadgeCheck, Zap } from 'lucide-react';

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

const pricingData = [
  { revenue: "งบเปล่า", price: "15,000" },
  { revenue: "รายได้ไม่เกิน 5 แสนบาท", price: "16,000" },
  { revenue: "รายได้ไม่เกิน 1 ล้านบาท", price: "16,500" },
  { revenue: "รายได้ไม่เกิน 1.5 ล้านบาท", price: "17,000" },
  { revenue: "รายได้ไม่เกิน 2 ล้านบาท", price: "18,000" },
  { revenue: "รายได้ไม่เกิน 2.5 ล้านบาท", price: "20,000" },
  { revenue: "รายได้ไม่เกิน 5 ล้านบาท", price: "22,000" },
  { revenue: "รายได้ไม่เกิน 9 ล้านบาท", price: "25,000" },
  { revenue: "รายได้ไม่เกิน 15 ล้านบาท", price: "27,000" },
  { revenue: "รายได้ไม่เกิน 20 ล้านบาท", price: "30,000" },
  { revenue: "รายได้ไม่เกิน 30 ล้านบาท", price: "32,000" },
  { revenue: "รายได้ไม่เกิน 40 ล้านบาท", price: "35,000" },
  { revenue: "รายได้ไม่เกิน 50 ล้านบาท", price: "38,000" },
  { revenue: "รายได้ไม่เกิน 60 ล้านบาท", price: "43,000" },
  { revenue: "รายได้ไม่เกิน 70 ล้านบาท", price: "49,000" },
  { revenue: "รายได้ไม่เกิน 80 ล้านบาท", price: "55,000" },
  { revenue: "รายได้ไม่เกิน 90 ล้านบาท", price: "60,000" },
  { revenue: "รายได้ไม่เกิน 100 ล้านบาท", price: "65,000" },
];

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
        <PromoCarousel />
        
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
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircle2 className="h-5 w-5" /> ตรวจสอบโดย CPA ประสบการณ์สูง
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircle2 className="h-5 w-5" /> รายงานตามมาตรฐานสากล
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircle2 className="h-5 w-5" /> ให้คำปรึกษาเพื่อลดความเสี่ยง
                            </div>
                        </div>
                        <Button asChild size="lg" className="rounded-full w-full sm:w-auto">
                            <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">ขอใบเสนอราคาตรวจสอบบัญชี</Link>
                        </Button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {auditServices.map((service, index) => (
                                <Card key={index} className="bg-secondary/30 border-none shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary flex items-center gap-2">
                                            {index === 0 && <ShieldCheck className="h-5 w-5" />}
                                            {index === 1 && <BadgeCheck className="h-5 w-5" />}
                                            {index === 2 && <Zap className="h-5 w-5" />}
                                            {service.title}
                                        </CardTitle>
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

        {/* Pricing Table Section */}
        <section className="py-20 md:py-28 bg-slate-50 border-y">
            <div className="container mx-auto px-4 md:px-6">
                <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-6">ราคาจัดทำบัญชี และตรวจสอบบัญชีประจำปี</h2>
                    <p className="text-lg text-muted-foreground">
                        ค่าบริการที่คุ้มค่า มาพร้อมความถูกต้องและความสบายใจ <br className="hidden md:block" />
                        ราคาโปร่งใสตามฐานรายได้ ไม่มีค่าธรรมเนียมแอบแฝง
                    </p>
                </div>

                <div data-aos="fade-up" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/20">
                    <div className="bg-primary text-primary-foreground p-4 text-center font-bold text-lg md:text-xl">
                        ประมาณการค่าธรรมเนียมตามเกณฑ์รายได้
                    </div>
                    <Table>
                        <TableHeader className="bg-slate-100">
                            <TableRow>
                                <TableHead className="text-center font-bold text-slate-900 h-14 text-base">รายการรายได้</TableHead>
                                <TableHead className="text-center font-bold text-slate-900 h-14 text-base">ราคาเริ่มต้น (บาท)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pricingData.map((row, index) => (
                                <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    <TableCell className="text-center py-4 font-medium text-slate-700">{row.revenue}</TableCell>
                                    <TableCell className="text-center py-4 font-bold text-primary text-lg">{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="bg-slate-50 p-6 text-center border-t">
                        <p className="text-sm text-muted-foreground mb-4 italic">
                            * อัตราค่าบริการข้างต้นเป็นราคาเริ่มต้น และอาจเปลี่ยนแปลงตามความซับซ้อนของรายการค้า <br />
                            รบกวนส่งไฟล์งบการเงินหรือทดลองเพื่อให้เจ้าหน้าที่ประเมินราคาที่แน่นอนอีกครั้งค่ะ
                        </p>
                        <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                            <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">สอบถามราคาสำหรับธุรกิจของคุณ</Link>
                        </Button>
                    </div>
                </div>

                {/* Call to Action for Pricing */}
                <div data-aos="fade-up" className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center p-6 space-y-3">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg">ประหยัดภาษีได้จริง</h4>
                        <p className="text-sm text-muted-foreground">เราแนะนำการวางแผนภาษีที่ถูกต้องเพื่อให้คุณเสียภาษีอย่างคุ้มค่าที่สุด</p>
                    </div>
                    <div className="text-center p-6 space-y-3">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg">ถูกต้องตามกฎหมาย</h4>
                        <p className="text-sm text-muted-foreground">มั่นใจได้ 100% ว่างบการเงินผ่านการตรวจสอบตามมาตรฐานสภาวิชาชีพ</p>
                    </div>
                    <div className="text-center p-6 space-y-3">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-lg">ซัพพอร์ตตลอดปี</h4>
                        <p className="text-sm text-muted-foreground">ไม่ได้แค่ตรวจสอบแล้วจบ แต่เราพร้อมเป็นที่ปรึกษาให้คุณตลอดอายุสัญญา</p>
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
