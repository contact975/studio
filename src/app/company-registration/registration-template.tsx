import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { REG_PRICES, type RegistrationContent } from './registration-content';

/**
 * เทมเพลตหน้าจดทะเบียนนิติบุคคล ใช้ร่วมกันทั้งสองภาษา
 *
 * markup อยู่ที่นี่ที่เดียว หน้าไทยและหน้าอังกฤษเรียกตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ต่างแค่ข้อความที่รับเข้ามา
 *
 * ── ส่วนบทความที่เกี่ยวข้อง ──
 * บทความทั้งหมดเป็นภาษาไทยและจะไม่แปล (ตกลงกันไว้ว่าเป็นเนื้อหาภาษีสำหรับ SME ไทย)
 * จึงคงส่วนนี้ไว้ทั้งสองภาษาเพื่อไม่ให้เลย์เอาต์ต่างกัน แต่หัวข้อฝั่งอังกฤษ
 * บอกตรงๆ ว่าบทความเป็นภาษาไทย คนอ่านจะได้ไม่คลิกไปแล้วงง
 */

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export function RegistrationTemplate({ c, quoteHref }: { c: RegistrationContent; quoteHref: string }) {
  const packages = [
    { ...c.packages.partnership, ...REG_PRICES.partnership, color: 'bg-[#163674]', highlight: false },
    { ...c.packages.company, ...REG_PRICES.company, color: 'bg-primary', highlight: true },
  ];

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
              <Link href="/" className="hover:opacity-100 transition-opacity">{c.crumb.home}</Link>
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

        {/* ── PACKAGES ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.packages.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.packages.title}</h2>
              <p className="text-muted-foreground">{c.packages.sublead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.name}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pkg.highlight ? 'border-2 border-primary shadow-xl shadow-primary/10' : 'border-border'}`}
                >
                  {pkg.highlight && (
                    <div className="absolute top-4 right-4 bg-white text-primary text-xs font-black px-3 py-1 rounded-full z-10 shadow">
                      ⭐ {pkg.tag}
                    </div>
                  )}
                  <div className={`${pkg.color} p-8 text-white`}>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{pkg.type}</span>
                    <h3 className="text-2xl md:text-3xl font-black mt-2 mb-4">{c.packages.namePrefix}{pkg.name}</h3>
                    <div className="flex items-end gap-3">
                      <div>
                        <p className="text-white/50 text-sm line-through mb-1">฿{pkg.original}</p>
                        <p className="text-4xl font-black">฿{pkg.price}</p>
                      </div>
                      <p className="text-white/70 text-sm mb-1">{c.packages.allInLabel}</p>
                    </div>
                  </div>
                  <div className="bg-card p-8">
                    <p className="text-muted-foreground text-sm mb-5">{pkg.description}</p>
                    <ul className="space-y-3 mb-6">
                      {c.packages.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-px" />
                          <span>{item}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-3 text-sm font-bold text-primary">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-px" />
                        <span>{c.packages.freebie}</span>
                      </li>
                    </ul>
                    <Link
                      href={LINE_URL}
                      target="_blank"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm transition-all ${pkg.highlight ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}
                    >
                      <MessageSquare className="h-4 w-4" /> {c.packages.quoteButton}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEW SETUP + CHANGES ── */}
        <section className="py-24 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.newSetup.eyebrow}</p>
                  <h2 className="text-3xl font-black mb-4">{c.newSetup.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{c.newSetup.body}</p>
                </div>
                <ul className="space-y-3">
                  {c.newSetup.items.map((item, i) => (
                    <li key={item} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.changes.eyebrow}</p>
                  <h2 className="text-3xl font-black mb-4">{c.changes.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{c.changes.body}</p>
                </div>
                <div className="space-y-3">
                  {c.changes.items.map((item, i) => (
                    <div key={item} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-4 bg-background rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
                      <span className="font-black text-primary text-sm w-8 flex-shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section className="py-24" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.steps.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.steps.title}</h2>
              <p className="text-muted-foreground">{c.steps.sublead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.steps.items.map((step, i) => (
                <div key={step.title} data-aos="fade-up" data-aos-delay={i * 100} className="relative bg-secondary/40 rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all text-center">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black">
                    {i + 1}
                  </div>
                  <h4 className="font-black text-xl mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  {i < c.steps.items.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-border">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFaq faqs={c.faq.items} title={c.faq.title} intro={c.faq.intro} />

        {/* ── บทความที่เกี่ยวข้อง ── */}
        <RelatedArticles
          title={c.related.title}
          slugs={[
            'company-registration-chiangmai',
            'company-vs-partnership-comparison',
            'director-salary-dividend-loan',
            'vat-registration-when-required',
          ]}
        />

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary/40" data-aos="fade-up">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden text-center">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3">{c.cta.h3}</h3>
                <p className="opacity-80 mb-8">{c.cta.p}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href={quoteHref} className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
                    {c.cta.btnQuote} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={LINE_URL} target="_blank" className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3 rounded-full hover:border-white transition-all">
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
