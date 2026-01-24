"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "IC Accounting & Service แตกต่างจากสำนักงานบัญชีทั่วไปอย่างไร?",
    answer: `เราไม่ได้เป็นเพียงคนทำบัญชี แต่เราคือ "เลขาส่วนตัวธุรกิจ" ที่เน้นการบริหารจัดการแบบคนรุ่นใหม่

เราพร้อมลงพื้นที่ Consult และวางระบบให้ลูกค้าถึงหน้างานจริง เพื่อให้ระบบหลังบ้านเหมาะสมกับธุรกิจคุณที่สุด

นอกจากงานบัญชีและภาษี เรายังมีบริการด้าน Media Content เพื่อช่วยยกระดับแบรนด์ให้ดูเป็นมืออาชีพควบคู่กันไป`,
  },
  {
    question: "จดบริษัทกับ IC ดีกว่าจดเองอย่างไร?",
    answer: `ช่วยประหยัดเวลาและลดความยุ่งยากในขั้นตอนเอกสารราชการ

ได้รับคำปรึกษาเรื่องโครงสร้างภาษีและการวางรากฐานธุรกิจที่ถูกต้องตั้งแต่ก้าวแรก

มั่นใจในความถูกต้อง แม่นยำ และไม่มีค่าใช้จ่ายแฝงหรือค่าปรับบานปลายในภายหลัง`,
  },
  {
    question: "บริการ \"วางระบบองค์กร\" ของ IC คืออะไร?",
    answer: `คือการเข้าไปปรับการจัดการหลังบ้าน ตั้งแต่การวางขั้นตอนเดินเอกสารให้ตรวจสอบได้จริง

มีการสอนใช้งานโปรแกรมบัญชีที่ทันสมัย (เช่น Clero) เพื่อให้เจ้าของธุรกิจดูข้อมูลเองได้แบบ Real-time`,
  },
  {
    question: "มีบริการสำหรับชาวต่างชาติที่ทำธุรกิจในไทยด้วยไหม?",
    answer: `เรามีบริการครบวงจรทั้งการขอและต่ออายุ Visa ทุกประเภท

ดูแลการขอใบอนุญาตทำงาน (Work Permit) และประสานงานหน่วยงานราชการให้ทุกขั้นตอน`,
  },
  {
    question: "ถ้ายังไม่จ้างทำบัญชีรายเดือน สามารถปรึกษาเบื้องต้นก่อนได้ไหม?",
    answer: "เราพร้อมให้คำปรึกษาเบื้องต้นฟรี เพื่อช่วยประเมินสถานภาพธุรกิจและวางแนวทางที่คุ้มค่าที่สุดให้คุณ",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28 animate-gradient-soft">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          FAQ: คำถามที่พบบ่อยเกี่ยวกับเรา
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-secondary/50 border border-border/50 rounded-lg shadow-sm">
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
