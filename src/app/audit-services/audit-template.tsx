import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { AuditPricing } from '@/components/landing/audit-pricing';
import { AUDIT_TIERS, AUDIT_DORMANT, formatAuditPrice as fmt } from '@/lib/audit-packages';
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  UserCheck,
  Users,
  CalendarDays,
  CalendarCheck,
  BadgeCheck,
  Info,
  HelpCircle,
} from 'lucide-react';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { tierLabel, type AuditContent } from './audit-content';

/**
 * เทมเพลตหน้าบริการตรวจสอบบัญชี ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทย /audit-services และหน้าอังกฤษ /en/audit-services เรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามาจาก audit-content.ts
 * ตัวเลขทั้งหมดอยู่ที่ lib/audit-packages.ts
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export function AuditTemplate({ c }: { c: AuditContent }) {
  const ch = c.choose;
  return (
    <>
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" หน้าอังกฤษจึงต้องประกาศทับตรงนี้ */}
      <main className="flex-1" lang={c.htmlLang}>

        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
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
                  <CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── เลือกแบบไหนดี ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{ch.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{ch.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto inline-flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">{ch.question}</strong>
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* แบบที่ 1 */}
              <div className="rounded-3xl border border-border bg-card overflow-hidden">
                <div className="bg-[#163674] text-white p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <UserCheck className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">{ch.auditOnly.step}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">{ch.auditOnly.name}</h3>
                  <p className="text-base opacity-90 mt-1">{ch.auditOnly.short}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-sm opacity-80">{ch.from}</span>
                    <span className="text-5xl font-black">{fmt(AUDIT_DORMANT.auditOnly)}</span>
                    <span className="text-sm opacity-80">{ch.perYear}</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{ch.auditOnly.note}</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-6 text-sm leading-relaxed">
                    <span className="font-bold text-primary">{ch.fitLabel}</span>
                    <span className="text-muted-foreground">{ch.auditOnly.fit}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{ch.auditOnly.scopeTitle}</p>
                  <ul className="space-y-3">
                    {ch.auditOnly.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* แบบที่ 2 */}
              <div className="relative rounded-3xl border-2 border-primary bg-card overflow-hidden shadow-xl shadow-primary/10">
                <div className="absolute top-4 right-4 bg-white text-primary text-xs font-black px-3 py-1 rounded-full z-10">{ch.bundle.badge}</div>
                <div className="bg-primary text-primary-foreground p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <Users className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">{ch.bundle.step}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">{ch.bundle.name}</h3>
                  <p className="text-base opacity-90 mt-1">{ch.bundle.short}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-sm opacity-80">{ch.from}</span>
                    <span className="text-5xl font-black">{fmt(AUDIT_DORMANT.bundle)}</span>
                    <span className="text-sm opacity-80">{ch.perYear}</span>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{ch.bundle.note}</p>
                </div>
                <div className="p-8">
                  <div className="rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 mb-6 text-sm leading-relaxed">
                    <span className="font-bold text-primary">{ch.fitLabel}</span>
                    <span className="text-muted-foreground">{ch.bundle.fit}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        <CalendarDays className="h-4 w-4 text-primary" /> {ch.bundle.monthlyTitle}
                      </p>
                      <ul className="space-y-2.5">
                        {ch.bundle.monthly.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        <CalendarCheck className="h-4 w-4 text-primary" /> {ch.bundle.yearEndTitle}
                      </p>
                      <ul className="space-y-2.5">
                        {ch.bundle.yearEnd.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {ch.accountingPrompt}{' '}
              <Link href={ch.accountingHref} className="font-bold text-primary hover:underline">
                {ch.accountingLink}
              </Link>
            </p>
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section id="pricing" className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.pricing.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.pricing.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {c.pricing.sublead}
              </p>
            </div>
            <AuditPricing labels={c.table} tierLabels={AUDIT_TIERS.map((t) => tierLabel(c, t))} />
          </div>
        </section>

        {/* ── เงื่อนไข ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.terms.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.terms.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" /> {c.terms.auditOnlyTitle}
                </h3>
                <ul className="space-y-3">
                  {c.terms.auditOnly.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-primary/40 bg-primary/5 p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" /> {c.terms.bundleTitle}
                </h3>
                <ul className="space-y-3">
                  {c.terms.bundle.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              {c.terms.footnote}
            </p>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.why.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.why.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.why.items.map((item, i) => (
                <div key={item.num} data-aos="fade-up" data-aos-delay={i * 100} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-6xl font-black text-primary/10 mb-4 leading-none">{item.num}</div>
                  <h3 className="font-black text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">{c.cta.h3}</h3>
                <p className="opacity-80 mb-8">{c.cta.p}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href={c.cta.quoteHref} className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    {c.cta.btnQuote} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={LINE_URL}
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all"
                  >
                    <MessageSquare className="h-4 w-4" /> {c.cta.btnLine}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceFaq faqs={c.faq.items} title={c.faq.title} intro={c.faq.intro} />

        <RelatedArticles
          title={c.related.title}
          intro={c.related.intro}
          readLabel={c.related.readLabel}
          slugs={['deductible-expenses-sme', 'director-salary-dividend-loan', 'corporate-tax-chiangmai-guide', '5-common-accounting-mistakes-sme-chiangmai']}
        />
      </main>
      <Footer />
    </>
  );
}
