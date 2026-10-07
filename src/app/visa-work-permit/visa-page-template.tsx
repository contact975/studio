import Link from 'next/link';
import Image from 'next/image';
import { Sora, Inter, Kanit } from 'next/font/google';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { GoogleRatingBadge } from '@/components/seo/google-rating-badge';
import { visaPageCss } from './visa-page-styles';
import type { VisaContent } from './visa-content';

/**
 * เทมเพลตหน้า Visa & Work Permit ที่ใช้ร่วมกันทั้งสองภาษา
 *
 * ── ทำไมต้องเป็นเทมเพลตเดียว ──
 * ตอนแยกหน้าสองภาษาครั้งแรก ผมเขียนหน้าไทยขึ้นใหม่ด้วยคอมโพเนนต์มาตรฐานของเว็บ
 * ส่วนหน้าอังกฤษใช้ดีไซน์เฉพาะตัวของมัน ผลคือกดสลับภาษาแล้วเหมือนหลุดไปอีกเว็บ
 *
 * ตอนนี้ markup ทั้งหมดอยู่ในไฟล์นี้ไฟล์เดียว ทั้งสองภาษาเรียกใช้ตัวเดียวกัน
 * ดีไซน์จึงต่างกันไม่ได้โดยโครงสร้าง ไม่ใช่เพราะคนเขียนคอยระวัง
 * สิ่งเดียวที่ต่างกันคือข้อความที่รับเข้ามาทาง props
 *
 * ── เรื่องฟอนต์ ──
 * CSS ชุดนี้ออกแบบมากับ Sora (หัวข้อ) และ Inter (เนื้อความ) ซึ่งเป็นฟอนต์ละติน
 * ไม่มีอักษรไทย ถ้าหน้าไทยใช้ตรงๆ ตัวอักษรจะตกไปใช้ฟอนต์ระบบแล้วหน้าตาเพี้ยน
 *
 * จึงให้หน้าไทย override ตัวแปร --font-sora และ --font-inter ให้ชี้ไป Kanit
 * ซึ่งเป็นฟอนต์เดียวกับทั้งเว็บ โครงสร้าง สี ระยะห่าง และขนาดยังเหมือนกันทุกจุด
 * ต่างกันแค่ชุดอักษร ซึ่งเป็นสิ่งที่ต่างกันไม่ได้อยู่แล้วเพราะคนละภาษา
 */

const sora = Sora({ subsets: ['latin'], display: 'swap', variable: '--font-sora' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
});

/** ไอคอนของการ์ดบริการ 7 ใบ — เรียงตรงกับลำดับ cards ในไฟล์เนื้อหา */
const serviceIcons = [
  <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></>,
  <path key="wp" d="M20 7h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />,
  <path key="reg" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
  <path key="tax" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  <path key="boi" d="M12 2l3 6 6 .9-4.5 4.3 1 6.1L12 17l-5.5 2.3 1-6.1L3 8.9 9 8z" />,
  <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></>,
  <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
];

const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export function VisaPageTemplate({ c }: { c: VisaContent }) {
  const isThai = c.htmlLang === 'th';

  // หน้าไทยชี้ตัวแปรฟอนต์ไปที่ Kanit โดยที่ค่าอื่นใน CSS ไม่ขยับเลย
  const fontVars = isThai
    ? ({ ['--font-sora']: 'var(--font-kanit)', ['--font-inter']: 'var(--font-kanit)' } as React.CSSProperties)
    : undefined;

  return (
    <>
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" ไว้ หน้าอังกฤษจึงต้องประกาศ lang="en" ตรงนี้
          ไม่งั้นทั้ง Google และโปรแกรมอ่านหน้าจอจะเข้าใจว่าเนื้อหาเป็นภาษาไทย */}
      <main
        className={`flex-1 exp ${sora.variable} ${inter.variable} ${kanit.variable}`}
        lang={c.htmlLang}
        style={fontVars}
      >
        <style dangerouslySetInnerHTML={{ __html: visaPageCss }} />

        <section className="hero">
          <div className="w">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">{c.crumb.home}</Link>
              <span aria-hidden="true">/</span>
              <span>{c.crumb.current}</span>
            </nav>
            <span className="kb"><span className="dot" />{c.hero.badge}</span>
            <h1>
              {c.hero.h1Before}
              <span className="g">{c.hero.h1Highlight}</span>
              {c.hero.h1After}
            </h1>
            <p className="lead">{c.hero.lead}</p>
            <p className="kws">{c.hero.kws}</p>
            <div className="hbtns">
              <a className="btn btn-g" href="#process">{c.hero.btnProcess}</a>
              <a className="btn btn-ghost" href={LINE_URL} target="_blank" rel="noopener noreferrer">{c.hero.btnLine}</a>
              <a className="btn btn-ghost" href="#services">{c.hero.btnServices}</a>
            </div>
            <div className="hstats">
              {c.hero.stats.map((s) => (
                <div className="hstat" key={s.b}><b>{s.b}</b><span>{s.span}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="sec alt">
          <div className="w center">
            <p className="eyebrow">{c.services.eyebrow}</p>
            <h2 className="title">{c.services.title}</h2>
            <p className="sublead">{c.services.sublead}</p>
            <div className="grid">
              {c.services.cards.map((card, i) => (
                <div className="card" key={card.h3}>
                  <div className="no">{String(i + 1).padStart(2, '0')}</div>
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {serviceIcons[i]}
                    </svg>
                  </div>
                  <h3>{card.h3}</h3>
                  <p>{card.p}</p>
                  <span className="kw">{card.kw}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w">
            <div className="why">
              <div className="panel">
                <p className="eyebrow" style={{ color: '#22d3ee' }}>{c.why.eyebrow}</p>
                <h2>{c.why.h2}</h2>
                <p>{c.why.p}</p>
              </div>
              <div className="whys">
                {c.why.rows.map((r, i) => (
                  <div className="wrow" key={r.h3}>
                    <div className="n f">{i + 1}</div>
                    <div><h3>{r.h3}</h3><p>{r.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*
          เนื้อหาส่วนนี้ยกมาจากคู่มือ Non-B Visa & Work Permit ฉบับ ก.ค. 2569 ของ IC
          เพื่อให้สิ่งที่ลูกค้าเห็นบนเว็บตรงกับเอกสารที่ทีมงานส่งให้ลูกค้าจริงทุกตัวเลข
        */}
        <section id="process" className="sec" style={{ scrollMarginTop: 90 }}>
          <div className="w center">
            <p className="eyebrow">{c.process.eyebrow}</p>
            <h2 className="title">{c.process.title}</h2>
            <p className="sublead">{c.process.sublead}</p>

            <div className="facts">
              {c.process.facts.map((f) => (
                <div className="factbox" key={f.b}><b>{f.b}</b><span>{f.span}</span></div>
              ))}
            </div>
            <p className="sublead center" style={{ marginTop: 16, fontSize: 14.5 }}>{c.process.factNote}</p>

            <div className="steps">
              {c.process.steps.map((s, i) => (
                <div className="step" key={s.h3}>
                  <span className="sn">{i + 1}</span>
                  <div>
                    <h3>{s.h3}</h3>
                    <ul>
                      {s.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    {s.when && <span className="when">{s.when}</span>}
                    {s.pay && <span className="pay">{s.pay}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="callout">
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
              </svg>
              <p><b>{c.process.calloutLabel}</b> {c.process.calloutText}</p>
            </div>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">{c.process.timelineCaption}</caption>
                <thead>
                  <tr>{c.process.timelineHead.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {c.process.timelineRows.map((r) => (
                    <tr key={r.stage}>
                      <td><b>{r.stage}</b>{r.sub && <span className="sm">{r.sub}</span>}</td>
                      <td className="num">{r.duration}</td>
                      <td>{r.authority}</td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td><b>{c.process.timelineTotal.label}</b></td>
                    <td className="num" colSpan={2}>{c.process.timelineTotal.value}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="w center">
            <p className="eyebrow">{c.fees.eyebrow}</p>
            <h2 className="title">{c.fees.title}</h2>
            <p className="sublead">{c.fees.sublead}</p>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">{c.fees.title}</caption>
                <thead>
                  <tr>{c.fees.head.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {c.fees.rows.map((r) => (
                    <tr key={r.label}>
                      <td><b>{r.label}</b></td>
                      <td>{r.when}</td>
                      <td className="num">{r.amount}</td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td><b>{c.fees.totalRow.label}</b></td>
                    <td>{c.fees.totalRow.when}</td>
                    <td className="num">{c.fees.totalRow.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="tblwrap">
              <table className="tbl">
                <caption className="sr-only">{c.fees.renewHead[0]}</caption>
                <thead>
                  <tr>{c.fees.renewHead.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {c.fees.renewRows.map((r) => (
                    <tr key={r.label}>
                      <td><b>{r.label}</b></td>
                      <td className="num">{r.amount}</td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td><b>{c.fees.renewTotal.label}</b></td>
                    <td className="num">{c.fees.renewTotal.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="sublead center" style={{ marginTop: 20, fontSize: 14, color: '#8ea6d4' }}>{c.fees.note}</p>
          </div>
        </section>

        <section id="documents" className="sec" style={{ scrollMarginTop: 90 }}>
          <div className="w center">
            <p className="eyebrow">{c.docs.eyebrow}</p>
            <h2 className="title">{c.docs.title}</h2>
            <p className="sublead">{c.docs.sublead}</p>
            <div className="docs">
              <div className="doccol">
                <h3>{c.docs.companyTitle}<span className="cnt">{c.docs.companyCount}</span></h3>
                <p style={{ fontSize: 13.5, color: '#8ea6d4', marginBottom: 14 }}>{c.docs.companyNote}</p>
                <ol>
                  {c.docs.companyItems.map((d) => (
                    <li key={d.t}><span><span className="th">{d.t}</span>{d.d}</span></li>
                  ))}
                </ol>
              </div>
              <div className="doccol">
                <h3>{c.docs.applicantTitle}<span className="cnt">{c.docs.applicantCount}</span></h3>
                <p style={{ fontSize: 13.5, color: '#8ea6d4', marginBottom: 14 }}>{c.docs.applicantNote}</p>
                <ol>
                  {c.docs.applicantItems.map((d) => (
                    <li key={d.t}><span><span className="th">{d.t}</span>{d.d}</span></li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="center" style={{ marginTop: 30, fontSize: 14.5, color: '#5b6b86' }}>
              {c.docs.guideBefore}
              <Link href="/blog/work-permit-chiangmai" hrefLang="th" style={{ color: '#2563eb', fontWeight: 600 }}>
                {c.docs.guideLink}
              </Link>
            </p>
          </div>
        </section>

        <section className="sec alt">
          <div className="w center">
            <p className="eyebrow">{c.notes.eyebrow}</p>
            <h2 className="title">{c.notes.title}</h2>
            <p className="sublead">{c.notes.sublead}</p>
            <div className="notes">
              {c.notes.items.map((n) => (
                <div className={`note${n.warn ? ' warn' : ''}`} key={n.h3}>
                  <div><h3>{n.h3}</h3><p>{n.p}</p></div>
                </div>
              ))}
            </div>
            <p
              className="center"
              style={{ marginTop: 28, fontSize: 13.5, color: '#8ea6d4', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}
            >
              {c.notes.disclaimer}
            </p>
          </div>
        </section>

        <section className="sec">
          <div className="w center">
            <p className="eyebrow">{c.whoFor.eyebrow}</p>
            <h2 className="title">{c.whoFor.title}</h2>
            <p className="sublead">{c.whoFor.sublead}</p>
            <div className="whofor">
              {c.whoFor.rows.map((r) => (
                <div className="whorow" key={r.h3}>
                  <span className="tick">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 5.5 5.5L20 7" /></svg>
                  </span>
                  <div><h3>{r.h3}</h3><p>{r.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="w">
            <p className="eyebrow center">{c.faq.eyebrow}</p>
            <h2 className="title center">{c.faq.title}</h2>
            <div className="faq">
              {c.faq.items.map((f) => (
                <div className="qa" key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>
              ))}
            </div>
            <p className="center" style={{ marginTop: 28, fontSize: 14.5, color: '#5b6b86' }}>
              {c.faq.footerBefore}
              <Link href="/company-registration" hrefLang="th" style={{ color: '#2563eb', fontWeight: 600 }}>
                {c.faq.footerLink}
              </Link>
            </p>
          </div>
        </section>

        <section className="sec">
          <div className="w center">
            <p className="eyebrow">{c.office.eyebrow}</p>
            <h2 className="title">{c.office.title}</h2>
            <p className="sublead">{c.office.sublead}</p>
            <div style={{ marginTop: 22 }}>
              <GoogleRatingBadge label={c.office.ratingLabel} reviewsLabel={c.office.reviewsLabel} />
            </div>
            <div className="officegrid">
              <div className="officeshot">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Behide%20Scene%2FBehide%20Scene%2015.png?alt=media"
                  alt={c.office.imgAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                />
              </div>
              <div className="facts" style={{ textAlign: 'left' }}>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>{c.office.companyName}</b>
                  <span>{c.office.address}</span>
                  <span style={{ marginTop: 8 }}>
                    <a href="https://maps.google.com/?cid=11080561333861967427" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>
                      {c.office.mapsText}
                    </a>
                  </span>
                </div>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>{c.office.contactTitle}</b>
                  <span>{c.office.phoneLabel} <a href="tel:0957161422" style={{ color: '#2563eb', fontWeight: 600 }}>095-716-1422</a></span>
                  <span>{c.office.lineLabel} <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>@icacc</a></span>
                  <span>{c.office.emailLabel} contact@icaccservice.com</span>
                </div>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>{c.office.hoursTitle}</b>
                  <span>{c.office.hours}</span>
                  <span>{c.office.hoursNote}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bandwrap">
          <div className="band">
            <h2>{c.cta.h2}</h2>
            <p>{c.cta.p}</p>
            <div className="hbtns">
              <a className="btn btn-w" href={LINE_URL} target="_blank" rel="noopener noreferrer">{c.cta.btnLine}</a>
              <a className="btn btn-t" href="/quote">{c.cta.btnQuote}</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
