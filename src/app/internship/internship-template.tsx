import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, CheckCircle, Users, Building2, CalendarDays } from 'lucide-react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { COHORTS, PARTNER_UNIVERSITIES, TOTAL_INTERNS } from '@/lib/interns';
import { InternshipForm } from '@/components/landing/internship-form';
import type { InternshipContent } from './internship-content';

/**
 * เทมเพลตหน้านักศึกษาฝึกงาน ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทยและหน้าอังกฤษเรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามา
 *
 * รายชื่อนักศึกษาอยู่ใน lib/interns.ts ถ้ายังไม่มีข้อมูล ส่วนทำเนียบจะแสดง
 * สถานะ "กำลังรวบรวม" แทนการโชว์พื้นที่ว่าง
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

/** อักษรย่อจากชื่อ ใช้แทนรูปเมื่อยังไม่มีภาพถ่าย */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export function InternshipTemplate({ c, basePath }: { c: InternshipContent; basePath: string }) {
  const hasCohorts = COHORTS.length > 0;
  const d = c.directory;
  const showYear = (year: string) => {
    const n = Number(year);
    return Number.isFinite(n) ? String(n + d.yearOffset) : year;
  };

  return (
    <>
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" หน้าอังกฤษจึงต้องประกาศทับตรงนี้ */}
      <main className="flex-1" lang={c.htmlLang}>

        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl" data-aos="fade-up">
            <nav className="text-sm mb-6 opacity-70">
              <Link href={c.crumb.homeHref} className="hover:opacity-100 transition-opacity">{c.crumb.home}</Link>
              <span className="mx-2">/</span>
              <span>{c.crumb.current}</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">{c.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              {c.hero.h1Line1}<br />{c.hero.h1Line2}
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              {c.hero.lead}
            </p>
            <div className="flex flex-wrap gap-3">
              {c.hero.chips.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── สิ่งที่จะได้เรียนรู้ ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.learn.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.learn.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {c.learn.lead}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.learn.points.map((point, i) => (
                <div
                  key={point.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                  className="rounded-2xl border border-border bg-card p-7 hover:shadow-lg transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ทำเนียบนักศึกษาฝึกงาน ── */}
        <section id="directory" className="py-24 bg-secondary/40 scroll-mt-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{d.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{d.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {d.lead}
              </p>
            </div>

            {hasCohorts ? (
              <>
                {/* สรุปตัวเลข */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto">
                  <div className="rounded-2xl bg-background border border-border p-6 text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{TOTAL_INTERNS}</p>
                    <p className="text-sm text-muted-foreground">{d.statInterns}</p>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-6 text-center">
                    <CalendarDays className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{COHORTS.length}</p>
                    <p className="text-sm text-muted-foreground">{d.statCohorts}</p>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-6 text-center col-span-2 md:col-span-1">
                    <Building2 className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{PARTNER_UNIVERSITIES.length}</p>
                    <p className="text-sm text-muted-foreground">{d.statUniversities}</p>
                  </div>
                </div>

                {/* รายชื่อแยกตามรุ่น */}
                <div className="space-y-14">
                  {COHORTS.map((cohort) => {
                    const year = showYear(cohort.year);
                    const n = cohort.interns.length;
                    return (
                      <div key={cohort.year}>
                        <div className="flex flex-wrap items-baseline gap-3 mb-6 pb-3 border-b border-border">
                          <h3 className="text-2xl font-black text-primary">{d.cohortHeading.replace('{year}', year)}</h3>
                          {cohort.period && (
                            <span className="text-sm text-muted-foreground">{cohort.period}</span>
                          )}
                          <span className="text-sm text-muted-foreground ml-auto">
                            {(n === 1 ? d.countOne : d.countOther).replace('{n}', String(n))}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                          {cohort.interns.map((intern) => (
                            <div
                              key={intern.name}
                              className="rounded-2xl bg-background border border-border p-5 text-center hover:shadow-md transition-shadow"
                            >
                              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                                {intern.photo ? (
                                  <Image
                                    src={intern.photo}
                                    alt={d.photoAlt.replace('{name}', intern.name).replace('{year}', year)}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-xl font-black text-primary">{initials(intern.name)}</span>
                                )}
                              </div>
                              <p className="font-bold leading-snug mb-1">{intern.name}</p>
                              <p className="text-sm text-muted-foreground leading-snug">{intern.university}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {intern.level}
                                {intern.major ? ` · ${intern.major}` : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* ยังไม่มีข้อมูล — แสดงสถานะแทนพื้นที่ว่าง */
              <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-border bg-background p-10 text-center">
                <GraduationCap className="h-10 w-10 text-primary/40 mx-auto mb-4" />
                <p className="font-bold text-lg mb-2">{d.emptyTitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.emptyBody}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── สมัครฝึกงาน ── */}
        <section id="apply" className="py-24 scroll-mt-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.apply.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.apply.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {c.apply.lead}
              </p>
            </div>

            <InternshipForm copy={c.form} basePath={basePath} />

            <p className="text-center text-sm text-muted-foreground mt-8 leading-relaxed">
              {c.apply.chatBefore}{' '}
              <Link
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline"
              >
                LINE @icacc
              </Link>{' '}
              {c.apply.chatAfter}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
