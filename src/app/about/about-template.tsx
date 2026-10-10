import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CheckCircle, ArrowRight, UserCheck, MessageCircle, Users, MapPinned, Cloud, LayoutDashboard, ShieldCheck } from 'lucide-react';
import type { AboutContent, ServiceId, TeamSupportId, TechId, TimelineId, ValueId } from './about-content';

/**
 * เทมเพลตหน้าเกี่ยวกับเรา ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทย /about และหน้าอังกฤษ /en/about เรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามา (about-content.ts)
 *
 * สิ่งที่ไม่ต้องแปล (ไอคอน สี ป้ายภาษาอังกฤษที่หน้าไทยใช้อยู่แล้ว) อยู่ในไฟล์นี้ ลำดับของแต่ละรายการก็กำหนดที่นี่
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

const timeline: { id: TimelineId; tag: string; color: string }[] = [
  { id: 'foundation', tag: 'Foundation', color: 'bg-blue-500' },
  { id: 'growth', tag: 'Growth', color: 'bg-indigo-500' },
  { id: 'independence', tag: 'Independence', color: 'bg-violet-500' },
  { id: 'launch', tag: 'Official Launch', color: 'bg-primary' },
];

const values: { id: ValueId; title: string }[] = [
  { id: 'partner', title: 'Modern & Partner Mindset' },
  { id: 'oneStop', title: 'One Stop Solution' },
  { id: 'action', title: 'Action Oriented' },
  { id: 'creative', title: 'Creative Thinking' },
];

/**
 * จุดที่ทีมงานซัพพอร์ตลูกค้า — อ้างอิงจากสิ่งที่ประกาศอยู่แล้วบนเว็บและใบเสนอราคา
 * (ผู้ดูแลบัญชีประจำ / ตอบ LINE ภายใน 1 วันทำการ / ประชุมทบทวนรายไตรมาส / ลงพื้นที่จริง) ไม่ได้เพิ่มคำสัญญาใหม่
 */
const teamSupport: { id: TeamSupportId; icon: typeof UserCheck }[] = [
  { id: 'dedicated', icon: UserCheck },
  { id: 'line', icon: MessageCircle },
  { id: 'fullTeam', icon: Users },
  { id: 'onSite', icon: MapPinned },
];

/**
 * Ecosystem ที่สำนักงานสร้างขึ้นเอง — เขียนจากสิ่งที่ทำจริง ไม่ใช่คำโฆษณากว้างๆ
 *
 * เรียงจากสิ่งที่ลูกค้าสัมผัสได้มากที่สุดไปน้อยที่สุด
 * (ส่งเอกสาร → เห็นตัวเลข → ข้อมูลเก็บที่ไหน → ปลอดภัยแค่ไหน)
 * ไม่ได้เรียงตามความซับซ้อนทางเทคนิค เพราะคนอ่านคือเจ้าของธุรกิจ ไม่ใช่โปรแกรมเมอร์
 *
 * เรื่องความปลอดภัยเขียนแบบระบุสิ่งที่ตรวจสอบได้ ไม่อ้างมาตรฐานหรือใบรับรองใดๆ
 * เพราะเป็นข้อมูลการเงินของลูกค้า การเคลมเกินจริงมีผลทางกฎหมายและความเชื่อใจจริง
 */
const techHighlights: { id: TechId; icon: typeof Cloud }[] = [
  { id: 'docs', icon: Cloud },
  { id: 'internal', icon: LayoutDashboard },
  { id: 'data', icon: ShieldCheck },
];

const services: { id: ServiceId; label: string }[] = [
  { id: 'accounting', label: 'Accounting & Tax' },
  { id: 'registration', label: 'Business Registration' },
  { id: 'visa', label: 'IC Visa / Work Permit' },
  { id: 'system', label: 'Organization System' },
  { id: 'media', label: 'Creative Media' },
];

export function AboutTemplate({ c, quoteHref }: { c: AboutContent; quoteHref: string }) {
  return (
    <>
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" หน้าอังกฤษจึงต้องประกาศทับตรงนี้ */}
      <main className="flex-1" lang={c.htmlLang}>

        {/* ── HERO ── */}
        <section className="relative bg-[#163674] text-primary-foreground py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-70">{c.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              {c.hero.h1Line1}<br />{c.hero.h1Line2}
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              {c.hero.lead}
            </p>
          </div>
        </section>

        {/* ── FOUNDER STORY ── */}
        <section className="py-24 container mx-auto px-6 max-w-6xl" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://live.staticflickr.com/65535/55057964151_2951cd7360_b.jpg"
                  alt={c.founder.imageAlt}
                  fill
                  /* ไม่ใส่ sizes = Next ตั้งให้เป็น "100vw" อัตโนมัติ
                     ทำให้จอ 1920 ไปโหลด w=1920 ทั้งที่คอลัมน์กว้างจริงแค่ ~544px
                     (container max-w-6xl 1152px, grid 2 คอลัมน์, gap-16) */
                  sizes="(max-width: 768px) 100vw, 544px"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-xl">{c.founder.captionName}</p>
                  <p className="text-white/70 text-sm">{c.founder.captionRole}</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg text-sm font-bold">
                {c.founder.badge}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.founder.eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  {c.founder.h2Line1}<br />{c.founder.h2Line2}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {c.founder.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {c.founder.p2}
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2">
                <p className="text-lg italic text-foreground font-medium">
                  {c.founder.quote}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{c.founder.quoteBy}</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* ข้อความอยู่ซ้าย สลับกับ section ผู้ก่อตั้งด้านบนที่รูปอยู่ซ้าย */}
              <div className="space-y-6 order-2 md:order-1">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.team.eyebrow}</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                    {c.team.h2Line1}<br />{c.team.h2Line2}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {c.team.lead}
                </p>
                <ul className="space-y-4">
                  {teamSupport.map((item) => (
                    <li key={item.id} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black text-foreground">{c.team.items[item.id].title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.team.items[item.id].desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href={quoteHref}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all"
                >
                  {c.team.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative order-1 md:order-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Behide%20Scene%2FBehide%20Scene%2015.png?alt=media"
                    alt={c.team.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 544px"
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-black text-xl">{c.team.captionTitle}</p>
                    <p className="text-white/70 text-sm">{c.team.captionSub}</p>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg text-sm font-bold">
                  {c.team.badge}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
          ── TECHNOLOGY ──
          วางต่อจากส่วนทีมงาน เพราะเล่าต่อเนื่องกันว่า "ทีมเป็นใคร" แล้ว "ทำงานกันอย่างไร"

          ใช้พื้นหลังสีกรมท่าเหมือน hero ไม่ใช่เพื่อความสวยอย่างเดียว
          แต่เพราะหน้านี้สลับขาว/เทามาตลอด ถ้าใส่สีเดิมอีกจะกลืนไปกับส่วนอื่น
          ทั้งที่นี่คือจุดต่างที่คู่แข่งในเชียงใหม่ส่วนใหญ่ยังไม่มี จึงควรสะดุดตา
        */}
        <section className="py-24 bg-[#163674] text-white" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="max-w-3xl mb-14">
              <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.tech.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5">
                {c.tech.h2Line1}<br />{c.tech.h2Line2}
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {c.tech.p1}
              </p>
              <p className="text-white/70 leading-relaxed text-lg mt-4">
                {c.tech.p2}
              </p>
              {/*
                บอกสถานะตามจริงว่ายังพัฒนาไม่เสร็จ ไม่เขียนรวมไปกับการ์ดด้านล่าง
                ที่เป็นของที่ใช้งานอยู่จริงแล้ว เพื่อไม่ให้ลูกค้าเข้าใจว่ามีให้ใช้วันนี้
              */}
              <p className="text-white/50 leading-relaxed text-sm mt-6">
                {c.tech.inProgress}
              </p>
            </div>

            {/* 3 ส่วนของ ecosystem ที่ใช้งานอยู่จริงแล้ว — โปรแกรมบัญชียังพัฒนาไม่เสร็จ จึงพูดถึงในย่อหน้านำแทน */}
            <div className="grid md:grid-cols-3 gap-6">
              {techHighlights.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white mb-5">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-black text-lg mb-3 leading-snug">{c.tech.items[item.id].title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{c.tech.items[item.id].desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.timeline.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.timeline.title}</h2>
              <p className="text-muted-foreground mt-3">{c.timeline.sub}</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, i) => {
                  const t = c.timeline.items[item.id];
                  return (
                    <div key={item.id} className="md:flex gap-8 items-start" data-aos="fade-up" data-aos-delay={i * 100}>
                      {/* Dot */}
                      <div className="hidden md:flex flex-col items-center flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full ${item.color} ring-4 ring-background shadow-lg mt-1`} />
                      </div>
                      {/* Card */}
                      <div className="flex-1 bg-background rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full text-white ${item.color} mb-2`}>
                              {item.tag}
                            </span>
                            <h3 className="text-xl font-black text-foreground">{t.title}</h3>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full whitespace-nowrap">
                            {t.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CO-FOUNDER ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.cofounder.eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  {c.cofounder.h2Line1}<br />{c.cofounder.h2Line2}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {c.cofounder.p1Before}<strong>{c.cofounder.p1Strong}</strong>{c.cofounder.p1After}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {c.cofounder.p2Before}<strong>{c.cofounder.p2Strong}</strong>{c.cofounder.p2After}
              </p>
              <div className="flex flex-wrap gap-3">
                {c.cofounder.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-black text-primary">IC</span>
                  </div>
                  <h3 className="text-xl font-black">IC Accounting & Service</h3>
                  <p className="text-muted-foreground text-sm mt-1">{c.cofounder.cardRegistered}</p>
                </div>
                <div className="space-y-3">
                  {services.map((s) => (
                    <div key={s.id} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-sm">{s.label}</span>
                        <span className="text-muted-foreground text-sm"> — {c.cofounder.services[s.id]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.values.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.values.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={v.id} className="bg-background rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-black text-lg mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-black text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.values.items[v.id]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION + CTA ── */}
        <section className="py-24 container mx-auto px-6 max-w-4xl text-center" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.mission.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-black mb-6">{c.mission.title}</h2>
          <blockquote className="text-xl md:text-2xl italic text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            {c.mission.quote}
          </blockquote>

          <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-4">{c.mission.ctaTitle}</h3>
              <p className="opacity-80 mb-8 text-lg">{c.mission.ctaText}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={quoteHref}
                  className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                  {c.mission.btnQuote} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={LINE_URL} target="_blank"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
                  {c.mission.btnLine}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
