"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqItems = [
  {
    question: "ทำบัญชีเชียงใหม่ที่ไหนดี?",
    answer: "หากคุณกำลังมองหา สำนักงานบัญชีเชียงใหม่ ที่มีความเชี่ยวชาญ IC Accounting Service คือคำตอบ เราให้บริการรับทำบัญชีครบวงจร วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่เข้าใจบริบทธุรกิจในเชียงใหม่และภาคเหนือ พร้อมให้คำปรึกษาที่ใกล้ชิดและถูกต้องตามกฎหมาย",
  },
  {
    question: "บริการรับทำบัญชีของ IC Accounting ครอบคลุมอะไรบ้าง?",
    answer: "บริการของเราครอบคลุมตั้งแต่การบันทึกรายการบัญชีรายเดือน, จัดทำงบการเงิน, ยื่นภาษี (ภ.ง.ด. 1, 3, 53, 54), ยื่นภาษีมูลค่าเพิ่ม (ภ.พ. 30), ไปจนถึงการปิดงบการเงินประจำปี และการให้คำปรึกษาด้านการวางแผนภาษีเพื่อลดหย่อนภาษีอย่างถูกต้อง",
  },
  {
    question: "จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?",
    answer: "การจดทะเบียนบริษัทกับ IC Accounting โดยปกติจะใช้เวลาเพียง 1-3 วันทำการ (หลังจากเตรียมเอกสารครบถ้วน) เราช่วยดูแลตั้งแต่การจองชื่อนิติบุคคล, จัดทำหนังสือบริคณห์สนธิ, ไปจนถึงการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) ทำให้ผู้ประกอบการเริ่มต้นธุรกิจได้อย่างรวดเร็ว",
  },
  {
    question: "สำนักงานบัญชี IC Accounting ตั้งอยู่ที่ไหนในเชียงใหม่?",
    answer: "สำนักงานของเราตั้งอยู่ในจังหวัดเชียงใหม่ พร้อมให้บริการลูกค้าทั้งในตัวเมืองและอำเภอใกล้เคียง (เช่น สันทราย, หางดง, สารภี) รวมถึงให้บริการผ่านระบบบัญชีออนไลน์ (Cloud Accounting) สำหรับลูกค้าทั่วประเทศ",
  },
  {
    question: "ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?",
    answer: "ค่าบริการของ IC Accounting เริ่มต้นในราคาที่เหมาะสมสำหรับ SME และ Start-up โดยพิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เราเน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง และช่วยประหยัดค่าใช้จ่ายแฝงจากความผิดพลาดทางภาษี",
  },
];

export function FaqSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          FAQ: คำถามที่พบบ่อยเกี่ยวกับเรา
        </h2>
        <div data-aos="fade-up" data-aos-delay="200" className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 rounded-lg shadow-sm">
                <AccordionTrigger className="p-6 text-left font-semibold text-lg hover:no-underline text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
