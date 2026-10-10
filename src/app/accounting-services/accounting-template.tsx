import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { SmartPackagePicker } from '@/components/landing/smart-package-picker';
import { PACKAGES, COMPARISON_ROWS, TOTAL_EXTRA_GROUPS, formatPrice as fmt } from '@/lib/accounting-packages';
import { CheckCircle, ArrowRight, Check, Minus, Info, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import type { AccountingContent } from './accounting-content';

/**
 * เทมเพลตหน้าบริการทำบัญชี ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทยและหน้าอังกฤษเรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามา
 *
 * หมายเหตุ: การตรวจสอบบัญชีประจำปีโดย CPA ไม่รวมในราคารายเดือน (คิดแยกตามรายได้ — หน้า /audit-services)
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

const gridBg = (size: number) => ({
  backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
  backgroundSize: `${size}px ${size}px`,
});

export function AccountingTemplate({ c, quoteHref }: { c: AccountingContent; quoteHref: string }) {
  const pkgCards = [
    { key: 'smart', pkg: PACKAGES.smart, text: c.packages.smart },
    { key: 'total', pkg: PACKAGES.total, text: c.packages.total },
  ] as const;

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
              {c.hero.h1Line1}<br />
              {c.hero.h1Line2}
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed mb-8">
              {c.hero.lead.intro}<strong className="font-bold text-white">{PACKAGES.smart.name}</strong>{c.hero.lead.smart}
              <strong className="font-bold text-white">{PACKAGES.total.name}</strong>{c.hero.lead.total}
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

        {/* ── PACKAGES ── */}
        <section id="packages" className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.packages.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.packages.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{c.packages.sublead}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {pkgCards.map(({ key, pkg, text }) => {
                const isTotal = key === 'total';
                return (
                  <div
                    key={key}
                    className={
                      isTotal
                        ? 'relative rounded-3xl border-2 border-primary overflow-hidden bg-card shadow-xl shadow-primary/10'
                        : 'rounded-3xl border border-border overflow-hidden bg-card'
                    }
                  >
                    {isTotal && (
                      <div className="absolute top-4 right-4 bg-white text-primary text-xs font-black px-3 py-1 rounded-full z-10">{c.packages.badge}</div>
                    )}
                    <div className={isTotal ? 'bg-primary text-primary-foreground p-8' : 'bg-[#163674] text-white p-8'}>
                      <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-70">Package {pkg.code}</p>
                      <h3 className="text-2xl md:text-3xl font-black mt-1">
                        {pkg.name} <span className="font-bold opacity-80">— {text.tagline.name}</span>
                      </h3>
                      <p className="text-sm opacity-70">{text.tagline.alt}</p>
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-5xl font-black">{fmt(pkg.price)}</span>
                        <span className="text-sm opacity-80">{c.packages.perMonth}</span>
                      </div>
                      <p className="text-xs opacity-70 mt-1">{text.priceNote}</p>
                    </div>
                    <div className="p-8">
                      <div className={`rounded-xl bg-primary/5 border-l-4 border-primary px-4 py-3 text-sm leading-relaxed ${isTotal ? 'mb-6' : 'mb-5'}`}>
                        <span className="font-bold text-primary">{c.packages.fitLabel}</span>
                        <span className="text-muted-foreground">{text.fit}</span>
                      </div>

                      {isTotal ? (
                        <>
                          <div className="space-y-4">
                            {TOTAL_EXTRA_GROUPS.map((id) => {
                              const group = c.totalExtras[id];
                              return (
                                <div key={id}>
                                  <p className="text-sm font-black text-foreground">
                                    {group.title.name} <span className="text-xs font-normal text-muted-foreground">/ {group.title.alt}</span>
                                  </p>
                                  <ul className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                                    {group.items.map((item) => (
                                      <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                          <Link
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            <MessageSquare className="h-4 w-4" /> {c.packages.totalCta}
                          </Link>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{c.packages.pickerHint}</p>
                          <SmartPackagePicker services={c.smartServices} labels={c.picker} />
                          <p className="mt-5 text-xs text-muted-foreground leading-relaxed rounded-xl bg-secondary/40 p-4">
                            {c.packages.smartDisclaimer}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── COMPARISON ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.comparison.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.comparison.title}</h2>
              <p className="text-muted-foreground">{c.comparison.sublead.replace('{n}', String(COMPARISON_ROWS.length))}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#163674] text-white">
                    <th scope="col" className="px-4 md:px-6 py-4 text-left font-bold">{c.comparison.colService}</th>
                    <th scope="col" className="w-24 md:w-36 px-2 py-4 text-center font-bold">
                      {PACKAGES.smart.name}
                      <span className="block text-[11px] font-medium opacity-80">{fmt(PACKAGES.smart.price)} {c.packages.perMonth}</span>
                    </th>
                    <th scope="col" className="w-24 md:w-36 px-2 py-4 text-center font-bold bg-primary">
                      {PACKAGES.total.name}
                      <span className="block text-[11px] font-medium opacity-80">{fmt(PACKAGES.total.price)} {c.packages.perMonth}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => {
                    const text = c.comparison.rows[row.id];
                    return (
                      <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/30'}>
                        <td className="px-4 md:px-6 py-3.5 align-top">
                          <p className="font-bold text-foreground">{text.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{text.desc}</p>
                        </td>
                        <td className="px-2 py-3.5 text-center align-middle">
                          {row.smart ? (
                            <Check className="inline h-5 w-5 text-green-500" aria-label={c.comparison.included} />
                          ) : (
                            <Minus className="inline h-4 w-4 text-muted-foreground/40" aria-label={c.comparison.notIncluded} />
                          )}
                        </td>
                        <td className="px-2 py-3.5 text-center align-middle bg-primary/[0.04]">
                          <Check className="inline h-5 w-5 text-green-500" aria-label={c.comparison.included} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── GUIDANCE ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.guidance.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.guidance.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(
                [
                  { key: 'smart', title: c.guidance.smartTitle, items: c.guidance.smart },
                  { key: 'total', title: c.guidance.totalTitle, items: c.guidance.total },
                ] as const
              ).map((col) => (
                <div key={col.key} className={`rounded-3xl border p-8 ${col.key === 'total' ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'}`}>
                  <h3 className="font-black text-xl text-primary mb-4">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GETTING STARTED ── */}
        <section className="py-20 md:py-24 bg-secondary/30" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.steps.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.steps.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.steps.items.map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                  <span className="text-4xl font-black text-primary/15">{s.step}</span>
                  <h3 className="font-black text-lg mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOTES + TERMS ── */}
        <section className="py-20 md:py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-3xl border border-border bg-card p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> {c.notes.scopeTitle}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {c.notes.scope.map((item) => (
                    <li key={item} className="flex gap-3"><Info className="h-4 w-4 text-primary mt-1 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-8">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-amber-900">
                  <Info className="h-5 w-5" /> {c.notes.separateTitle}
                </h3>
                <ul className="space-y-3 text-sm text-amber-900/80 leading-relaxed">
                  <li className="flex gap-3">
                    <Minus className="h-4 w-4 mt-1 shrink-0" />
                    <span>
                      {c.notes.audit.text}{' '}
                      <Link href={c.notes.audit.href} className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                        {c.notes.audit.link} <ExternalLink className="h-3 w-3" />
                      </Link>
                    </span>
                  </li>
                  <li className="flex gap-3"><Minus className="h-4 w-4 mt-1 shrink-0" />{c.notes.separateOther}</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <h2 className="font-black text-2xl mb-5">{c.terms.title}</h2>
              <ul className="space-y-3">
                {c.terms.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground border-t border-border pt-4">{c.terms.footnote}</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFaq faqs={c.faq.items} title={c.faq.title} intro={c.faq.intro} />

        {/* ── บทความที่เกี่ยวข้อง (ภาษาไทยทั้งหมด ฝั่งอังกฤษบอกไว้ในหัวข้อ) ── */}
        <RelatedArticles
          title={c.related.title}
          intro={c.related.intro}
          readLabel={c.related.readLabel}
          slugs={[
            'corporate-tax-calendar-thailand',
            'withholding-tax-guide-sme',
            'vat-registration-when-required',
            'accounting-fee-chiangmai',
          ]}
        />

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5" style={gridBg(30)} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">{c.cta.h3}</h3>
                <p className="opacity-80 mb-8">{c.cta.p}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href={quoteHref}
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all"
                  >
                    {c.cta.btnQuote} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={LINE_URL}
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all"
                  >
                    {c.cta.btnLine}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
