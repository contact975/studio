"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "accounting",
    title: "บริการทำบัญชี",
    fullTitle: "บริการทำบัญชี (Accounting Services)",
    description: "จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง",
    imageUrl: "https://picsum.photos/seed/accounting/800/600",
    imageHint: "accounting paperwork",
  },
  {
    id: "audit",
    title: "ปิดงบประจำปี",
    fullTitle: "ปิดงบประจำปี (Annual Financial Audit)",
    description: "ตรวจสอบและจัดทำงบการเงินเพื่อยื่นต่อกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันตามกำหนด ดูแลโดยทีมงานคนรุ่นใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%",
    imageUrl: "https://picsum.photos/seed/audit/800/600",
    imageHint: "financial report",
  },
  {
    id: "registration",
    title: "จดทะเบียนบริษัท",
    fullTitle: "จดทะเบียนบริษัท (Company Registration)",
    description: "เริ่มต้นธุรกิจให้ถูกกฎหมาย ครบทุกขั้นตอนตั้งแต่การจองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาเรื่องโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา",
    imageUrl: "https://picsum.photos/seed/registration/800/600",
    imageHint: "business handshake",
  },
  {
    id: "expat",
    title: "Visa & Work Permit",
    fullTitle: "บริการทำ Visa & Work Permit (Expat Services)",
    description: "ทำ Visa: ดูแลการขอและต่ออายุวีซ่าทุกประเภท ให้พำนักในไทยได้อย่างถูกต้อง Work Permit: จัดการใบอนุญาตทำงานและประสานงานหน่วยงานราชการให้ครบทุกขั้นตอน",
    imageUrl: "https://picsum.photos/seed/expat/800/600",
    imageHint: "passport document",
  },
  {
    id: "system",
    title: "วางระบบองค์กร",
    fullTitle: "วางระบบองค์กร (Organization System Design)",
    description: "ปรับการจัดการหลังบ้าน สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนการเดินเอกสารให้เป็นระบบ ออกแบบระบบให้เหมาะสมกับธุรกิจที่สุด เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน",
    imageUrl: "https://picsum.photos/seed/system/800/600",
    imageHint: "team meeting",
  },
  {
    id: "media",
    title: "ผลิต Media Content",
    fullTitle: "ผลิต Media Content Online (Marketing Content)",
    description: "รับผลิตวิดีโอและกราฟิกคุณภาพสูงเพื่อสร้างภาพลักษณ์ให้น่าเชื่อถือและอัปเกรดแบรนด์ ช่วยให้ธุรกิจมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง",
    imageUrl: "https://picsum.photos/seed/media/800/600",
    imageHint: "camera setup",
  },
  {
    id: "support",
    title: "ดูแลลูกค้า",
    fullTitle: "บริการดูแลลูกค้า ซัพพอร์ต (Customer Support)",
    description: "พร้อมให้คำปรึกษาแบบใกล้ชิดและเป็นกันเองในฐานะ 'เลขาส่วนตัวธุรกิจ' ซัพพอร์ตทุกปัญหาเพื่อให้ธุรกิจของคุณลื่นไหลและไม่สะดุด",
    imageUrl: "https://picsum.photos/seed/support/800/600",
    imageHint: "customer service",
  },
];


export function ServicesSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          บริการของเรา
        </h2>
        
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {services.map((service, index) => (
            <Button
              key={service.id}
              variant={current === index ? "default" : "outline"}
              className={cn(
                "rounded-full transition-all duration-200 ease-in-out hover:scale-110 border-border/50",
                current === index
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-card text-foreground hover:bg-accent"
              )}
              onClick={() => scrollTo(index)}
            >
              {service.title}
            </Button>
          ))}
        </div>

        <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem key={service.id}>
                 <div className="p-1">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center bg-card p-8 md:p-12 rounded-xl shadow-sm">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.fullTitle}
                        fill
                        className="object-cover"
                        data-ai-hint={service.imageHint}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary">
                        {service.fullTitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden xl:inline-flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden xl:inline-flex" />
        </Carousel>
        
      </div>
    </section>
  );
}
