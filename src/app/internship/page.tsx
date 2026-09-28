import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, MessageSquare, CheckCircle, Users, Building2, CalendarDays } from 'lucide-react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo';
import { COHORTS, LEARNING_POINTS, PARTNER_UNIVERSITIES, TOTAL_INTERNS } from '@/lib/interns';

/**
 * หน้านักศึกษาฝึกงาน
 *
 * ── ทำไมถึงมีหน้านี้ ──
 * 1. สถาบันการศึกษาในเชียงใหม่ค้นหาสถานประกอบการรับนักศึกษาฝึกงานทุกปี
 *    หน้านี้ทำให้เราถูกเจอในคำค้นกลุ่มนั้น ซึ่งไม่มีคู่แข่งรายไหนในพื้นที่ทำจริงจัง
 * 2. เป็นแหล่งลิงก์จากเว็บมหาวิทยาลัย ซึ่งเป็นลิงก์ที่มีน้ำหนักและหาได้ยาก
 * 3. แสดงว่าเรามีทีมและระบบที่สอนคนได้ ไม่ใช่สำนักงานคนเดียว (ช่วยเรื่องความน่าเชื่อถือ)
 *
 * ── หมายเหตุเรื่องข้อมูล ──
 * รายชื่อนักศึกษาอยู่ใน lib/interns.ts ถ้ายังไม่มีข้อมูล ส่วนทำเนียบจะแสดง
 * สถานะ "กำลังรวบรวม" แทนการโชว์พื้นที่ว่าง
 */
export const metadata: Metadata = {
  title: 'รับนักศึกษาฝึกงานบัญชี เชียงใหม่ | IC Accounting',
  description:
    'IC Accounting & Service รับนักศึกษาฝึกงานสาขาบัญชีในเชียงใหม่ ได้ทำงานกับเอกสารลูกค้าจริง ใช้โปรแกรมบัญชีออนไลน์ และมีพี่เลี้ยงดูแลตลอดการฝึก พร้อมทำเนียบนักศึกษาฝึกงานแต่ละรุ่น',
  alternates: { canonical: 'https://icaccservice.com/internship' },
  openGraph: {
    title: 'รับนักศึกษาฝึกงานบัญชี เชียงใหม่ | IC Accounting',
    description:
      'ฝึกงานบัญชีกับสำนักงานบัญชีเชียงใหม่ที่ดูแลธุรกิจกว่า 100 ราย ได้ทำงานจริง มีพี่เลี้ยง และใช้โปรแกรมบัญชีออนไลน์',
    url: 'https://icaccservice.com/internship',
    type: 'website',
    locale: 'th_TH',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

/** อักษรย่อจากชื่อ ใช้แทนรูปเมื่อยังไม่มีภาพถ่าย */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export default function InternshipPage() {
  const hasCohorts = COHORTS.length > 0;

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'หน้าแรก', path: '/' },
          { name: 'นักศึกษาฝึกงาน', path: '/internship' },
        ])}
      />
      <Header />
      <main className="flex-1">

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
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>นักศึกษาฝึกงาน</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Internship Program</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              รับนักศึกษาฝึกงานบัญชี<br />ที่ได้ลงมือทำงานจริง
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              เราเปิดรับนักศึกษาสาขาบัญชีเข้าฝึกประสบการณ์วิชาชีพทุกปี
              โดยให้ทำงานกับเอกสารของลูกค้าจริง มีพี่เลี้ยงดูแล และได้เห็นงานบัญชีครบทั้งวงจร
              ไม่ใช่แค่ถ่ายเอกสารหรือนั่งดูคนอื่นทำ
            </p>
            <div className="flex flex-wrap gap-3">
              {['ทำงานกับลูกค้าจริง', 'มีพี่เลี้ยงประจำ', 'ใช้โปรแกรมบัญชีออนไลน์', 'ออฟฟิศดอยสะเก็ด'].map((item) => (
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
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">What You Will Learn</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">ฝึกงานที่นี่ได้ทำอะไรบ้าง</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                เราออกแบบการฝึกงานจากงานที่สำนักงานทำจริงทุกวัน
                เพื่อให้สิ่งที่นักศึกษาได้กลับไปใช้ต่อได้จริงในการทำงาน
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNING_POINTS.map((point, i) => (
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
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">Hall of Interns</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">ทำเนียบนักศึกษาฝึกงาน</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                ขอบคุณนักศึกษาทุกคนที่เลือกมาฝึกประสบการณ์กับเรา
                และขอบคุณสถาบันที่ไว้วางใจส่งนักศึกษามาให้เราดูแล
              </p>
            </div>

            {hasCohorts ? (
              <>
                {/* สรุปตัวเลข */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto">
                  <div className="rounded-2xl bg-background border border-border p-6 text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{TOTAL_INTERNS}</p>
                    <p className="text-sm text-muted-foreground">นักศึกษาที่ฝึกงานกับเรา</p>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-6 text-center">
                    <CalendarDays className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{COHORTS.length}</p>
                    <p className="text-sm text-muted-foreground">รุ่นที่ผ่านมา</p>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-6 text-center col-span-2 md:col-span-1">
                    <Building2 className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-black">{PARTNER_UNIVERSITIES.length}</p>
                    <p className="text-sm text-muted-foreground">สถาบันที่ร่วมงาน</p>
                  </div>
                </div>

                {/* รายชื่อแยกตามรุ่น */}
                <div className="space-y-14">
                  {COHORTS.map((cohort) => (
                    <div key={cohort.year}>
                      <div className="flex flex-wrap items-baseline gap-3 mb-6 pb-3 border-b border-border">
                        <h3 className="text-2xl font-black text-primary">รุ่นปี {cohort.year}</h3>
                        {cohort.period && (
                          <span className="text-sm text-muted-foreground">{cohort.period}</span>
                        )}
                        <span className="text-sm text-muted-foreground ml-auto">
                          {cohort.interns.length} คน
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
                                  alt={`${intern.name} นักศึกษาฝึกงาน IC Accounting & Service รุ่นปี ${cohort.year}`}
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
                  ))}
                </div>
              </>
            ) : (
              /* ยังไม่มีข้อมูล — แสดงสถานะแทนพื้นที่ว่าง */
              <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-border bg-background p-10 text-center">
                <GraduationCap className="h-10 w-10 text-primary/40 mx-auto mb-4" />
                <p className="font-bold text-lg mb-2">กำลังรวบรวมข้อมูลนักศึกษาแต่ละรุ่น</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  เรากำลังจัดทำทำเนียบนักศึกษาที่เคยฝึกประสบการณ์กับเรา
                  หากคุณเป็นนักศึกษาที่สนใจเข้าฝึกงานกับ IC สามารถทักมาคุยกันได้เลย
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── สมัครฝึกงาน ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="rounded-3xl bg-[#163674] text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative z-10">
                <GraduationCap className="h-10 w-10 mx-auto mb-5 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-black mb-4">สนใจฝึกงานกับเรา</h2>
                <p className="opacity-80 leading-relaxed max-w-xl mx-auto mb-8">
                  ส่งข้อมูลมาคุยกันได้เลย บอกชื่อสถาบัน สาขาวิชา และช่วงเวลาที่ต้องฝึกงาน
                  ทีมงานจะติดต่อกลับเพื่อนัดคุยรายละเอียด ทั้งนักศึกษาที่ติดต่อเองและอาจารย์นิเทศที่ติดต่อมาแทน
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="https://line.me/R/ti/p/@icacc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#163674] font-black px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare className="h-5 w-5" /> ทักมาทาง LINE @icacc
                  </Link>
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/60 font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#163674] transition-colors"
                  >
                    กรอกแบบฟอร์มติดต่อ
                  </Link>
                </div>
                <p className="text-sm opacity-60 mt-6">
                  สำนักงานอยู่ที่ 80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ · จันทร์ – เสาร์ 09:00 – 18:00 น.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
