"use client";

import { Award, Mic, GraduationCap, Heart, MapPin, Star, ArrowRight } from "lucide-react";

const activities = [
  { Icon: Award, tag: "อบรม & มาตรฐาน", date: "มิถุนายน 2569", title: "ยกระดับมาตรฐานสำนักงานบัญชีสู่คุณภาพระดับสากล", desc: "เข้าร่วมโครงการพัฒนาศักยภาพและรับรองคุณภาพสำนักงานบัญชี เพื่อยกระดับการให้บริการอย่างมืออาชีพ" },
  { Icon: Mic, tag: "วิทยากร", date: "พฤษภาคม 2569", title: "ได้รับเชิญเป็นวิทยากรบรรยายด้านบัญชีและภาษีธุรกิจ", desc: "แบ่งปันความรู้การวางแผนภาษีและการบริหารการเงิน ให้กับผู้ประกอบการรุ่นใหม่" },
  { Icon: GraduationCap, tag: "ฝึกประสบการณ์", date: "2569", title: "ต้อนรับนักศึกษาฝึกประสบการณ์วิชาชีพบัญชี", desc: "เปิดโอกาสให้นักศึกษาเรียนรู้และลงมือทำงานจริงร่วมกับทีมงานมืออาชีพของ IC" },
  { Icon: Heart, tag: "CSR", date: "พฤษภาคม 2569", title: "ร่วมกิจกรรมเพื่อสังคมและชุมชนในเชียงใหม่", desc: "ส่งต่อความสุขและช่วยเหลือชุมชน เป็นส่วนหนึ่งของพันธกิจด้านสังคมที่เราให้ความสำคัญ" },
  { Icon: MapPin, tag: "ลงพื้นที่", date: "2569", title: "ให้คำปรึกษาและวางระบบบัญชีถึงหน้างาน", desc: "เดินทางไปดูแลลูกค้าถึงที่ พร้อมวางระบบบัญชีให้เหมาะกับบริบทของแต่ละธุรกิจ" },
  { Icon: Star, tag: "รางวัล", date: "2569", title: "ความภาคภูมิใจจากมาตรฐานการให้บริการ", desc: "ผลลัพธ์จากความตั้งใจดูแลลูกค้าอย่างใกล้ชิด สะท้อนผ่านความไว้วางใจกว่า 100 ธุรกิจ" },
];

export function ActivitiesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-11">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.26em] uppercase mb-3">Our Activities</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">กิจกรรมของบริษัท</h2>
          </div>
          <p className="text-muted-foreground text-base max-w-md leading-relaxed">
            ความเคลื่อนไหวจริงของทีม IC — ทั้งการพัฒนาความรู้ การส่งต่อสู่สังคม และการดูแลลูกค้าถึงหน้างาน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a, i) => {
            const Icon = a.Icon;
            return (
              <article
                key={i}
                className="group flex flex-col rounded-[20px] border border-border overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-22px_rgba(37,99,235,0.35)]"
              >
                <div className="relative aspect-[16/10] bg-[#eef4ff] flex flex-col items-center justify-center gap-2">
                  <Icon className="h-8 w-8 text-primary/80" />
                  <span className="text-xs text-[#a9bfe6]">ภาพกิจกรรม</span>
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#eef4ff] text-[#1d4ed8] text-xs font-semibold px-3 py-1 rounded-full">{a.tag}</span>
                    <span className="text-slate-400 text-[13px]">{a.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{a.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                    อ่านต่อ <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 border-[1.5px] border-primary text-primary font-semibold text-[15px] px-8 py-3 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            ดูกิจกรรมทั้งหมด <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
