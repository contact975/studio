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
import type { FaqAnswer, HomeContent } from './home-content';

/** คำตอบที่มีลิงก์กลางประโยค เก็บเป็นชิ้นๆ ใน home-content.ts แล้วประกอบกลับตรงนี้ */
function renderAnswer(answer: FaqAnswer) {
  if (typeof answer === 'string') return answer;
  return (
    <span>
      {answer.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <Link
            key={i}
            href={part.href}
            className={part.spaced ? 'text-primary font-bold hover:underline mx-1' : 'text-primary font-bold hover:underline'}
          >
            {part.text}
          </Link>
        )
      )}
    </span>
  );
}

export function FaqSection({ c }: { c: HomeContent['faq'] }) {
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
          {c.title}
        </h2>
        <div data-aos="fade-up" data-aos-delay="200" className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {c.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 rounded-lg shadow-sm">
                <AccordionTrigger className="p-6 text-left font-semibold text-lg hover:no-underline text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground whitespace-pre-line">
                  {renderAnswer(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
