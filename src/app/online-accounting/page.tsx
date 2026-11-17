import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, MessageSquare, Check } from 'lucide-react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { ServiceFaq } from '@/components/seo/service-faq';
import { RelatedArticles } from '@/components/seo/related-articles';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { SMART_MIN_PRICE, TOTAL_PRICE } from '@/lib/accounting-packages';
import { AUDIT_DORMANT } from '@/lib/audit-packages';
import { onlineContent as c } from './online-content';

/**
 * หน้ารับทำบัญชีออนไลน์ทั่วประเทศ — ภาษาไทยอย่างเดียว ไม่มีคู่ใน PAIRS
 * (ปุ่มสลับภาษาพาไป /en เหมือนบทความ) เหตุผลและกติกาเนื้อหาอยู่ใน online-content.ts
 */

const URL = 'https://icaccservice.com/online-accounting';
const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: URL },
  openGraph: {
    title: c.meta.title,
    description: c.meta.ogDescription,
    url: URL,
    locale: 'th_TH',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

const gridBg = {
  backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
  backgroundSize: '40px 40px',
};

export default function OnlineAccountingPage() {
  const faqs = [...c.faq.items];
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <JsonLd
        data={[
          {
            ...serviceSchema({
              name: 'รับทำบัญชีออนไลน์ทั่วประเทศ',
              description:
                'บริการทำบัญชีและยื่นภาษีรายเดือนแบบออนไลน์สำหรับธุรกิจทุกจังหวัด ส่งเอกสารผ่านระบบออนไลน์ ยื่นแบบภาษีและประกันสังคมตรงกำหนด พร้อมปิดงบประจำปีโดยผู้สอบบัญชีรับอนุญาต ราคารวม VAT',
              path: '/online-accounting',
              offers: [
                { name: 'IC Smart — ยื่นภาษีรายเดือน (ราคาเริ่มต้นเมื่อเลือกเฉพาะรายการ)', price: String(SMART_MIN_PRICE), description: 'ต่อเดือน รวม VAT ราคาเพิ่มตามรายการที่เลือก' },
                { name: 'IC Total — ดูแลบัญชีทั้งระบบ', price: String(TOTAL_PRICE), description: 'ต่อเดือน รวม VAT สัญญา 1 ปี' },
                { name: 'ปิดงบประจำปี — งบเปล่า', price: String(AUDIT_DORMANT.auditOnly), description: 'ต่อปี รวม VAT คิดตามช่วงรายได้' },
              ],
            }),
            // หน้านี้ขายให้ทั้งประเทศ ไม่ต้องย้ำเชียงใหม่ซ้ำเหมือนหน้าบริการอื่น
            areaServed: { '@type': 'Country', name: 'ประเทศไทย' },
          },
          breadcrumbSchema([
            { name: 'หน้าแรก', path: '/' },
            { name: c.crumb, path: '/online-accounting' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="bg-[#163674] text-primary-foreground py-24 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={gridBg} />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <nav className="text-sm mb-6 opacity-70">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link>
              <span className="mx-2">/</span>
              <span>{c.crumb}</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-70">{c.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              {c.hero.h1Line1}<br />
              {c.hero.h1Line2}
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

        {/* ── ขั้นตอน ── */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.how.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.how.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{c.how.sublead}</p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.how.steps.map((s) => (
                <li key={s.step} className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-4xl font-black text-primary/30 mb-3">{s.step}</p>
                  <h3 className="text-lg font-black mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── ขอบเขตงาน ── */}
        <section className="py-20 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.scope.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.scope.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-card border border-border p-8">
                <h3 className="text-xl font-black mb-4">{c.scope.onlineTitle}</h3>
                <ul className="space-y-3">
                  {c.scope.online.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-card border border-border p-8">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> {c.scope.onsiteTitle}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{c.scope.onsite}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ราคา (สรุป แล้วลิงก์ไปหน้าเต็ม ไม่ทำตารางซ้ำ) ── */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.pricing.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{c.pricing.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{c.pricing.sublead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.pricing.cards.map((card) => (
                <div key={card.name} className="rounded-3xl border border-border bg-card overflow-hidden">
                  <div className="bg-[#163674] text-white p-6">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">{card.tag}</p>
                    <h3 className="text-2xl font-black mt-1">{card.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-black">{card.price}</span>
                      <span className="text-sm opacity-80">{card.unit}</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3 text-sm leading-relaxed">
                    <p className="text-muted-foreground">{card.note}</p>
                    <p>
                      <span className="font-bold text-primary">เหมาะกับ </span>
                      <span className="text-muted-foreground">{card.fit}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-center">
              <Link href="/accounting-services" className="font-bold text-primary hover:underline">{c.pricing.accountingLink}</Link>
              <Link href="/audit-services" className="font-bold text-primary hover:underline">{c.pricing.auditLink}</Link>
            </div>
          </div>
        </section>

        {/* ── ทำไม IC ── */}
        <section className="py-20 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.why.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-black">{c.why.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {c.why.items.map((item) => (
                <div key={item.title} className="rounded-3xl bg-card border border-border p-8">
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceFaq faqs={faqs} title={c.faq.title} intro={c.faq.intro} />

        <RelatedArticles
          title={c.related.title}
          intro={c.related.intro}
          readLabel={c.related.readLabel}
          slugs={[...c.related.slugs]}
        />

        {/* ── CTA ── */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="rounded-3xl bg-[#163674] text-white p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{c.cta.title}</h2>
              <p className="opacity-80 max-w-2xl mx-auto mb-8 leading-relaxed">{c.cta.desc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary px-8 py-3 font-bold transition-opacity hover:opacity-90"
                >
                  <MessageSquare className="h-4 w-4" /> {c.cta.line}
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-8 py-3 font-bold transition hover:bg-white hover:text-primary"
                >
                  {c.cta.quote} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
