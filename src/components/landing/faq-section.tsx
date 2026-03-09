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
import Link from 'next/link';

export function FaqSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const faqItems = [
    {
      question: "ทำบัญชีเชียงใหม่ที่ไหนดี?",
      answer: (
        <span>
          หากคุณกำลังมองหา สำนักงานบัญชีเชียงใหม่ ที่มีความเชี่ยวชาญ{" "}
          <Link href="/accounting-services" className="text-primary font-bold hover:underline">
            IC Accounting Service
          </Link>{" "}
          คือคำตอบ เรามี
          <Link href="/accounting-services" className="text-primary font-bold hover:underline mx-1">
            บริการรับทำบัญชีครบวงจร
          </Link>
          วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่เข้าใจบริบทธุรกิจในเชียงใหม่และภาคเหนือ พร้อมให้คำปรึกษาที่ใกล้ชิดและถูกต้องตามกฎหมาย
        </span>
      ),
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
    {
      question: "IC Accounting & Service แตกต่างจากสำนักงานบัญชีทั่วไปอย่างไร?",
      answer: "เราไม่ได้ทำแค่ตัวเลข แต่เราคือ 'เลขาส่วนตัวธุรกิจ' ที่เดินเคียงข้างคุณ เรานำเทคโนโลยี Cloud Accounting มาใช้เพื่อให้คุณเห็นข้อมูล Real-time พร้อมทีมงานที่ลงพื้นที่จริง (Consult) และยังมีบริการผลิต Media Content เพื่อช่วยปั้นแบรนด์ของคุณให้ดูเป็นมืออาชีพควบคู่ไปกับระบบหลังบ้านที่แข็งแรงค่ะ",
    },
    {
      question: "จดบริษัทกับ IC ดีกว่าจดเองอย่างไร?",
      answer: "เราช่วยลดความยุ่งยากและป้องกันความผิดพลาดที่อาจเกิดขึ้นในอนาคต ตั้งแต่การวางโครงสร้างผู้ถือหุ้นที่เหมาะสม การจองชื่อนิติบุคคล จนถึงการได้รับหนังสือรับรองและขึ้นทะเบียนต่างๆ ครบจบในที่เดียว พร้อมให้คำปรึกษาเรื่องการวางระบบบัญชีตั้งแต่ก้าวแรกเพื่อให้คุณเริ่มธุรกิจได้อย่างถูกต้อง 100% ค่ะ",
    },
    {
      question: "บริการ 'วางระบบองค์กร' ของ IC คืออะไร?",
      answer: "คือการเข้าไปช่วยจัดระเบียบ 'หลังบ้าน' ของธุรกิจคุณค่ะ ตั้งแต่การออกแบบขั้นตอนการไหลของเอกสาร (Workflow) การเลือกใช้โปรแกรมบัญชีที่เหมาะสม การวางระบบควบคุมภายในเพื่อป้องกันการทุจริต ไปจนถึงการอบรมพนักงานให้ใช้งานระบบได้อย่างมีประสิทธิภาพ เพื่อให้เจ้าของธุรกิจทำงานง่ายขึ้นและตรวจสอบได้ทุกขั้นตอนค่ะ",
    },
    {
      question: "มีบริการสำหรับชาวต่างชาติที่ทำธุรกิจในไทยด้วยไหม?",
      answer: "มีค่ะ เรามีบริการ Expat Services ที่ดูแลทั้งเรื่องการยื่นขอและต่ออายุ Visa ประเภทต่างๆ รวมถึงใบอนุญาตทำงาน (Work Permit) โดยทีมงานที่สื่อสารภาษาอังกฤษได้ดีและเข้าใจระเบียบข้อบังคับของราชการไทยอย่างละเอียด ช่วยให้ชาวต่างชาติทำธุรกิจในไทยได้อย่างราบรื่นค่ะ",
    },
    {
      question: "ถ้ายังไม่จ้างทำบัญชีรายเดือน สามารถปรึกษาเบื้องต้นก่อนได้ไหม?",
      answer: "ได้แน่นอนค่ะ! เรายินดีให้คำปรึกษาเบื้องต้นฟรีสำหรับผู้ประกอบการที่กำลังเริ่มต้น หรือผู้ที่มีข้อสงสัยเกี่ยวกับเรื่องบัญชีและภาษี คุณสามารถนัดหมายเข้ามาพูดคุย หรือทักมาทาง Line เพื่อประเมินความต้องการเบื้องต้นก่อนได้ เพื่อให้มั่นใจว่าเราคือพาร์ทเนอร์ที่ตอบโจทย์ธุรกิจของคุณจริงๆ ค่ะ",
    },
  ];

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
