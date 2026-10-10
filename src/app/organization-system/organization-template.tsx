import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { BarChart, ShieldCheck, Users, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import type { OrganizationContent, SolutionIcon } from './organization-content';

/**
 * เทมเพลตหน้าวางระบบองค์กร ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทยและหน้าอังกฤษเรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามา
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

const ICONS: Record<SolutionIcon, React.ReactNode> = {
  chart: <BarChart className="h-6 w-6" />,
  shield: <ShieldCheck className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
};

const gridBg = (size: number) => ({
  backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
  backgroundSize: `${size}px ${size}px`,
});

export function OrganizationTemplate({ c, quoteHref }: { c: OrganizationContent; quoteHref: string }) {
  const steps = c.process.items;

  return (
    <>
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" หน้าอังกฤษจึงต้องประกาศทับตรงนี้ */}
      <main className="flex-1" lang={c.htmlLang}>

        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={gridBg(40)} />
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
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">{c.hero.lead}</p>
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

        {/* ── SOLUTIONS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.solutions.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.solutions.title}</h2>
              <p className="text-muted-foreground">{c.solutions.sublead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.solutions.items.map((s, i) => (
                <div key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      {ICONS[s.icon]}
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <h3 className="font-black text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.benefits.eyebrow}</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">{c.benefits.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{c.benefits.lead}</p>
                </div>
                <ul className="space-y-3">
                  {c.benefits.items.map((b, i) => (
                    <li key={i} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm" data-aos="fade-up">
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">{c.benefits.card.eyebrow}</p>
                {/*
                  เดิมการ์ดนี้ระบุชื่อ Clero ไว้ว่าเป็นพาร์ทเนอร์
                  ถอดชื่อออกเพราะโปรแกรมนั้นยังพัฒนาไม่เสร็จและเป็นผลิตภัณฑ์ของอีกนิติบุคคล
                  การประกาศชื่อไว้ก่อนทำให้ลูกค้าถามหาตอนคุยแล้วเราตอบไม่ได้
                  เนื้อหาที่เหลือยังจริงทั้งหมด เพราะเราวางระบบบนโปรแกรมบัญชีออนไลน์ให้ลูกค้าอยู่แล้ว
                */}
                <h3 className="text-2xl font-black mb-3">{c.benefits.card.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{c.benefits.card.desc}</p>
                <div className="space-y-3 mb-8">
                  {c.benefits.card.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={LINE_URL} target="_blank"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 transition-all">
                  <MessageSquare className="h-4 w-4" /> {c.benefits.card.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.process.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.process.title}</h2>
              <p className="text-muted-foreground">{c.process.sublead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((item, i) => (
                <div key={item.step}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="relative bg-secondary/40 rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-5xl font-black text-primary/10 mb-4 leading-none">{item.step}</div>
                  <span className="text-primary text-xs font-bold">{c.process.stepLabel} {item.step}</span>
                  <h4 className="font-black text-lg mt-1 mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 z-10 text-border">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5" style={gridBg(30)} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">{c.cta.h3}</h3>
                <p className="opacity-80 mb-8">{c.cta.p}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href={quoteHref}
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    {c.cta.btnQuote} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={LINE_URL} target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
                    {c.cta.btnLine}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ค่าบริการ — ไม่ผูกมัดตัวเลข แต่ต้องไม่เงียบ */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.pricing.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.pricing.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {c.pricing.lead.join(' ')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.pricing.factors.map((f) => (
                <div
                  key={f.n}
                  className="bg-background rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <p className="text-4xl font-black text-primary/15 leading-none mb-3">{f.n}</p>
                  <h3 className="font-black text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-primary/5 border border-primary/10 rounded-2xl p-8">
              <h3 className="font-black text-lg mb-3">{c.pricing.box.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{c.pricing.box.desc.join(' ')}</p>
              <p className="text-sm font-bold mb-2">{c.pricing.box.prepTitle}</p>
              <ul className="text-sm text-muted-foreground space-y-1.5 mb-6">
                {c.pricing.box.prepItems.map((item) => (
                  <li key={item}>{`· ${item}`}</li>
                ))}
              </ul>
              <Link
                href={quoteHref}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all"
              >
                {c.pricing.box.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <ServiceFaq faqs={c.faq.items} title={c.faq.title} intro={c.faq.intro} />

        {/* บทความเป็นภาษาไทยทั้งหมด ฝั่งอังกฤษบอกไว้ในหัวข้อ */}
        <RelatedArticles
          {...c.related}
          slugs={[
            'sme-chiang-mai-accounting-guide',
            '5-common-accounting-mistakes-sme-chiangmai',
            'how-to-choose-accounting-office-chiangmai',
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
