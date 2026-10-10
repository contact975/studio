"use client";

import { Award, Mic, GraduationCap, Heart, MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { HomeContent } from "./home-content";

/** ไอคอนและรูปของแต่ละการ์ด เรียงตรงกับ activities.items ใน home-content.ts */
const activities: { Icon: typeof Award; image?: string }[] = [
  { Icon: Award, image: "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Event%20Company%2FEvent%2001.jpg?alt=media" },
  { Icon: Mic },
  { Icon: GraduationCap },
  { Icon: Heart },
  { Icon: MapPin },
  { Icon: Star },
];

export function ActivitiesSection({ c }: { c: HomeContent['activities'] }) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-11">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.26em] uppercase mb-3">{c.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">{c.title}</h2>
          </div>
          <p className="text-muted-foreground text-base max-w-md leading-relaxed">
            {c.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, i) => {
            const a = { ...item, ...c.items[i] };
            const Icon = a.Icon;
            return (
              <article
                key={i}
                className="group flex flex-col rounded-[20px] border border-border overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-22px_rgba(37,99,235,0.35)]"
              >
                <div className="relative aspect-[16/10] bg-[#eef4ff] overflow-hidden">
                  {a.image ? (
                    <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Icon className="h-8 w-8 text-primary/80" />
                      <span className="text-xs text-[#a9bfe6]">{c.imagePlaceholder}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#eef4ff] text-[#1d4ed8] text-xs font-semibold px-3 py-1 rounded-full">{a.tag}</span>
                    <span className="text-slate-400 text-[13px]">{a.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{a.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                    {c.readMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            {c.seeAll} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
