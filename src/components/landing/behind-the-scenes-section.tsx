"use client";

import { Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Slide = {
  image?: string;
};

const slides: Slide[] = [{}, {}, {}, {}, {}, {}];

export function BehindTheScenesSection() {
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 520) setPerView(1);
      else if (w <= 768) setPerView(2);
      else if (w <= 1024) setPerView(3);
      else setPerView(4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, slides.length - perView);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3200);
    return () => clearInterval(t);
  }, [maxIndex]);

  const gap = "1.25rem";

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Behind The Scenes
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            ทีมงานจริง ดูแลทุกขั้นตอนการทำงาน
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ตั้งแต่ทีมนักบัญชี ระบบตรวจสอบ การยื่นเอกสารราชการ ไปจนถึงการแบ่งปันความรู้ให้ธุรกิจของคุณ
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${index} * (100% + ${gap}) / ${perView}))`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="relative shrink-0 rounded-[22px] overflow-hidden aspect-[3/4] bg-[#0b1a3a] shadow-[0_20px_40px_-24px_rgba(30,64,175,0.45)]"
                style={{
                  width: `calc((100% - (${perView} - 1) * ${gap}) / ${perView})`,
                }}
              >
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt="ผลงานและกิจกรรมของ IC"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#3b82f6] text-blue-100">
                    <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-dashed border-blue-100/70 bg-white/10">
                      <Upload className="h-8 w-8 text-blue-50" />
                    </div>
                    <span className="text-sm font-medium opacity-90">อัปโหลดรูปการทำงาน</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex justify-center gap-3">
          <button
            type="button"
            aria-label="ก่อนหน้า"
            onClick={() => setIndex((i) => (i <= 0 ? maxIndex : i - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="ถัดไป"
            onClick={() => setIndex((i) => (i >= maxIndex ? 0 : i + 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`ไปสไลด์ ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
