"use client";

import { Award, Laptop, Handshake, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    num: "01",
    icon: Award,
    title: "Professional Expertise",
    titleTh: "เชี่ยวชาญและรู้จริง",
    description: "เราคือทีมงานมืออาชีพที่มีประสบการณ์ตรงในเชียงใหม่ เราไม่ได้ทำแค่ตัวเลข แต่เราเข้าใจบริบทของธุรกิจในพื้นที่อย่างแท้จริง พร้อมจัดการทุกความซับซ้อนให้กลายเป็นความถูกต้อง",
  },
  {
    num: "02",
    icon: Laptop,
    title: "Tech-Driven Accounting",
    titleTh: "ขับเคลื่อนด้วยเทคโนโลยี",
    description: "ก้าวข้ามการทำบัญชีแบบเดิมด้วยซอฟต์แวร์ที่ทันสมัยอย่าง Clero ช่วยให้คุณเข้าถึงข้อมูลทางการเงินได้แบบ Real-time รวดเร็ว และแม่นยำ",
  },
  {
    num: "03",
    icon: Handshake,
    title: "Personalized Service",
    titleTh: "ดูแลอย่างใกล้ชิดและเป็นกันเอง",
    description: "เรายึดถือการบริการด้วยใจ ให้คำปรึกษาที่เข้าใจง่าย ไม่ซับซ้อน พร้อมเป็นที่ปรึกษาธุรกิจที่ลงพื้นที่ดูแลคุณถึงหน้างาน",
  },
  {
    num: "04",
    icon: Briefcase,
    title: "One Stop Solution",
    titleTh: "ครบจบในที่เดียว",
    description: "ประหยัดเวลาและลดความยุ่งยากด้วยบริการที่ครอบคลุม ทั้งงานบัญชี ภาษี จดทะเบียนบริษัท Visa/Work Permit ไปจนถึงการผลิต Media Content",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
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
      <p className="text-primary text-xs font-bold uppercase tracking-wider mb-4">{feature.titleTh}</p>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export function WhyUsSection() {
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
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Why IC</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            ทำไมต้องเลือก IC Accounting & Service?
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}