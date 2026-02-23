"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "accounting",
    title: "บริการทำบัญชี",
    fullTitle: "บริการจัดทำบัญชี (Accounting Services)",
    description: "จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง",
    imageUrl: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhY2NvdW50aW5nfGVufDB8fHx8MTc2OTE4ODE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "accounting paperwork",
    href: "/accounting-services"
  },
  {
    id: "audit",
    title: "ปิดงบประจำปี",
    fullTitle: "บริการตรวจสอบบัญชี (Audit Services)",
    description: "ตรวจสอบและจัดทำงบการเงินเพื่อยื่นต่อกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันตามกำหนด ดูแลโดยทีมงานคนรุ่นใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%",
    imageUrl: "https://images.unsplash.com/photo-1649209979970-f01d950cc5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmaW5hbmNlJTIwYXVkaXR8ZW58MHx8fHwxNzY5MTg5MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "financial report",
    href: "/audit-services"
  },
  {
    id: "registration",
    title: "จดทะเบียนบริษัท",
    fullTitle: "บริการจดทะเบียนธุรกิจ (Company Registration)",
    description: "เริ่มต้นธุรกิจให้ถูกกฎหมาย ครบทุกขั้นตอนตั้งแต่การจองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาเรื่องโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา",
    imageUrl: "https://images.unsplash.com/photo-1681505504714-4ded1bc247e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDb21wYW55JTIwUmVnaXN0cmF0aW9ufGVufDB8fHx8MTc2OTE4OTU5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "business handshake",
    href: "/company-registration"
  },
  {
    id: "expat",
    title: "Visa & Work Permit",
    fullTitle: "บริการทำ Visa & Work Permit (Expat Services)",
    description: "ทำ Visa: ดูแลการขอและต่ออายุวีซ่าทุกประเภท ให้พำนักในไทยได้อย่างถูกต้อง Work Permit: จัดการใบอนุญาตทำงานและประสานงานหน่วยงานราชการให้ครบทุกขั้นตอน",
    imageUrl: "https://images.unsplash.com/photo-1641939872097-8626e3134d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8VmlzYSUyMFdvcmtwZXJtaXR8ZW58MHx8fHwxNzY5MTg5NjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "passport document",
    href: "/visa-work-permit"
  },
  {
    id: "system",
    title: "วางระบบองค์กร",
    fullTitle: "วางระบบองค์กร (Organization System Design)",
    description: "ปรับการจัดการหลังบ้าน สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนการเดินเอกสารให้เป็นระบบ ออกแบบระบบให้เหมาะสมกับธุรกิจที่สุด เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน",
    imageUrl: "https://images.unsplash.com/photo-1743385779347-1549dabf1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxTeXN0ZW0lMjBEZXNpZ24lMjBPcmdhbml6YXRpb258ZW58MHx8fHwxNzY5MTkwMDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "team meeting",
    href: "/organization-system"
  },
  {
    id: "media",
    title: "ผลิต Media Content",
    fullTitle: "ผลิต Media Content Online (Marketing Content)",
    description: "รับผลิตวิดีโอและกราฟิกคุณภาพสูงเพื่อสร้างภาพลักษณ์ให้น่าเชื่อถือและอัปเกรดแบรนด์ ช่วยให้ธุรกิจมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง",
    imageUrl: "https://images.unsplash.com/photo-1764664035133-0d2ca12016dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxNZWRpYSUyMENvbnRlbnR8ZW58MHx8fHwxNzY5MTkwMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "camera setup",
    href: "/media-content"
  },
  {
    id: "support",
    title: "ดูแลลูกค้า",
    fullTitle: "นัดหมายปรึกษา (Customer Support)",
    description: "พร้อมให้คำปรึกษาแบบใกล้ชิดและเป็นกันเองในฐานะ 'เลขาส่วนตัวธุรกิจ' ซัพพอร์ตทุกปัญหาเพื่อให้ธุรกิจของคุณลื่นไหลและไม่สะดุด",
    imageUrl: "https://images.unsplash.com/photo-1604881990409-b9f246db39da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8c3VwcG9ydHxlbnwwfHx8fDE3NjkxOTAyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "customer service",
    href: "/quote"
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
      <div data-aos="fade-up" className="container mx-auto px-4 md:px-6">
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
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center bg-primary text-primary-foreground p-8 md:p-12 rounded-xl shadow-sm">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.fullTitle}
                        fill
                        className="object-cover"
                        data-ai-hint={service.imageHint}
                      />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-bold font-headline">
                        {service.fullTitle}
                      </h3>
                      <p className="opacity-90 leading-relaxed text-lg">
                        {service.description}
                      </p>
                      <Button asChild variant="secondary" className="rounded-full font-bold group">
                        <Link href={service.href}>
                          ดูรายละเอียดและอัตราค่าบริการ <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
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
