"use client";

import { Award, Laptop, Handshake, Briefcase, Smartphone, Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "./home-content";

const features = [
  {
    num: "01",
    icon: Award,
  },
  {
    num: "02",
    icon: Laptop,
  },
  {
    num: "03",
    icon: Handshake,
  },
  {
    num: "04",
    icon: Briefcase,
  },
  /**
   * สองข้อนี้แยกออกจากข้อ 02 โดยตั้งใจ ไม่ได้เขียนรวมกัน
   *
   * ข้อ 02 พูดถึงโปรแกรมบัญชีออนไลน์ที่ใช้ทำงานให้ลูกค้า
   * ข้อ 05 พูดถึงวิธีส่งเอกสาร ซึ่งเป็นสิ่งที่ลูกค้าสัมผัสเองทุกเดือน
   * ข้อ 06 พูดถึงระบบที่สำนักงานเขียนขึ้นใช้เอง
   *
   * ถ้ายุบรวมเป็นข้อเดียวว่า "เราใช้เทคโนโลยี" จะกลายเป็นคำกว้างๆ ที่ใครก็พูดได้
   * แยกเป็นสามข้อแล้วบอกให้ชัดว่าแต่ละอย่างทำให้ชีวิตลูกค้าง่ายขึ้นตรงไหน
   */
  {
    num: "05",
    icon: Smartphone,
  },
  {
    num: "06",
    icon: Code2,
  },
];

type Feature = (typeof features)[number] & HomeContent['whyUs']['items'][number];

function FeatureCard({ feature, index }: { feature: Feature, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
      className="group relative bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg hover:bg-secondary/60 transition-all duration-300"
    >
      {/* Number */}
      <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors leading-none mb-4">
        {feature.num}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <Icon className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="font-black text-lg text-foreground mb-1">{feature.title}</h3>
      <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">{feature.subtitle}</p>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export function WhyUsSection({ c }: { c: HomeContent['whyUs'] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="mb-16"
        >
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            {c.title}
          </h2>
        </div>

        {/*
          Cards — 3 คอลัมน์ ไม่ใช่ 4

          ตอนมี 4 ข้อ กริด 4 คอลัมน์ลงตัวพอดีแถวเดียว
          พอเพิ่มเป็น 6 ข้อ ถ้ายังใช้ 4 คอลัมน์จะได้ 4+2 แถวล่างเหลือที่ว่างครึ่งแถว
          เปลี่ยนเป็น 3 คอลัมน์จึงได้ 3+3 เต็มทั้งสองแถว และการ์ดกว้างขึ้น
          ซึ่งช่วยให้ข้อความไทยที่ยาวกว่าภาษาอังกฤษไม่ถูกบีบจนขึ้นบรรทัดถี่
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={{ ...feature, ...c.items[index] }} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}