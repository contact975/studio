import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sora, Inter } from 'next/font/google';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { GoogleRatingBadge } from '@/components/seo/google-rating-badge';
import { visaPageCss } from '@/app/visa-work-permit/visa-page-styles';

/**
 * หน้ารวมภาษาอังกฤษ — ประตูเข้าสำหรับชาวต่างชาติ
 *
 * ── ทำไมต้องมีหน้านี้ ──
 * ปุ่มสลับภาษาต้องมีทุกหน้า แต่ตอนนี้ยังแปลครบแค่หน้า visa หน้าเดียว
 * ถ้าปุ่มในหน้าอื่นพาไป 404 ก็แย่กว่าไม่มีปุ่ม หน้านี้จึงเป็นปลายทางสำรอง
 * บอกว่าเราทำอะไร ติดต่อยังไง และพาไปหน้าอังกฤษที่มีอยู่จริง
 *
 * ── ตั้งใจให้สั้น ──
 * ไม่ใช่การแปลหน้าแรกทั้งหน้า เพราะหน้าแรกภาษาไทยมีเนื้อหาเยอะมาก
 * และเป้าหมายของสองภาษาคือความสะดวกของลูกค้าต่างชาติ ไม่ใช่การไล่อันดับคำอังกฤษ
 * หน้านี้จึงตอบแค่สามคำถามที่ฝรั่งถามจริง คือ คุณทำอะไร เชื่อถือได้ไหม ติดต่อยังไง
 *
 * ── ไม่ประกาศ hreflang คู่กับหน้าแรกภาษาไทย ──
 * เพราะหน้านี้ไม่ใช่คำแปลของหน้าแรก เป็นคนละเนื้อหากัน
 * ถ้าประกาศเป็นคู่ทั้งที่ไม่ใช่ Google อาจเอาหน้านี้ไปแทนหน้าแรกในผลค้นหา
 * ซึ่งไม่ใช่สิ่งที่ต้องการ เป้าหมายของหน้านี้คือรองรับคนที่อยู่ในเว็บแล้ว
 */

const sora = Sora({ subsets: ['latin'], display: 'swap', variable: '--font-sora' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const EN_URL = 'https://icaccservice.com/en';
const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export const metadata: Metadata = {
  title: 'English-Speaking Accountants in Chiang Mai | IC Accounting & Service',
  description:
    'Thai accounting, tax, company registration and work permit services for foreigners in Chiang Mai. Licensed Thai accounting firm with an English-speaking team.',
  alternates: { canonical: EN_URL },
  openGraph: {
    title: 'English-Speaking Accountants in Chiang Mai | IC Accounting & Service',
    description:
      'Thai accounting, tax, company registration and work permit services for foreigners in Chiang Mai.',
    url: EN_URL,
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://icaccservice.com/share-preview.jpg', width: 1200, height: 630 }],
  },
};

const services = [
  {
    h3: 'Work Permit & Non-B Visa',
    p: 'Business visas, work permits and the annual renewals that follow — handled end to end.',
    href: '/en/visa-work-permit',
    linkText: 'Read the full guide',
  },
  {
    h3: 'Company Registration',
    p: 'Register a Thai Limited Company, VAT and social security, with shareholder structuring for foreigners.',
    href: '/en/company-registration',
    linkText: 'See packages and prices',
  },
  {
    h3: 'Accounting & Tax',
    p: 'Monthly bookkeeping, tax filing and year-end accounts for foreign-owned businesses in Thailand.',
    href: '/en/accounting-services',
    linkText: 'See packages and prices',
  },
  {
    h3: 'Audit & Financial Statements',
    p: 'Annual financial statements certified by a licensed Thai auditor (CPA).',
    href: '/audit-services',
    linkText: 'See Thai page',
  },
];

export default function EnglishLandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      {/* <html> ของเว็บตั้ง lang="th" หน้านี้เป็นอังกฤษล้วนจึงต้องประกาศทับ */}
      <main className={`flex-1 exp ${sora.variable} ${inter.variable}`} lang="en">
        <style dangerouslySetInnerHTML={{ __html: visaPageCss }} />

        <section className="hero">
          <div className="w">
            <span className="kb"><span className="dot" />Chiang Mai, Thailand · Licensed Thai accounting firm</span>
            <h1>Accounting and visa support, in <span className="g">English</span>.</h1>
            <p className="lead">
              We are IC Accounting &amp; Service, a Thai accounting firm in Chiang Mai. We keep the books, file the
              taxes and handle the work permits for foreigners living, working and running businesses in Thailand.
            </p>
            <p className="kws">
              Most of our website is written in Thai for local business owners. This page covers what you need in
              English — and our team answers in English on LINE, by phone or by email.
            </p>
            <div className="hbtns">
              <Link className="btn btn-g" href="/en/visa-work-permit">Work permit &amp; visa services</Link>
              <a className="btn btn-ghost" href={LINE_URL} target="_blank" rel="noopener noreferrer">Talk to us on LINE</a>
            </div>
            <div className="hstats">
              <div className="hstat"><b>10+ yrs</b><span>Serving Chiang Mai</span></div>
              <div className="hstat"><b>100+</b><span>Businesses looked after</span></div>
              <div className="hstat"><b>English</b><span>Speaking team</span></div>
            </div>
          </div>
        </section>

        <section className="sec alt">
          <div className="w center">
            <p className="eyebrow">What we do</p>
            <h2 className="title">Everything behind the scenes of a Thai business</h2>
            <p className="sublead">
              Only the work permit page is fully translated so far. The other pages are in Thai — but the service and
              the team behind them are the same, and we will walk you through any of it in English.
            </p>
            <div className="grid">
              {services.map((s, i) => (
                <div className="card" key={s.h3}>
                  <div className="no">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{s.h3}</h3>
                  <p>{s.p}</p>
                  <Link href={s.href} style={{ color: '#2563eb', fontWeight: 600, fontSize: 14 }}>
                    {s.linkText} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w center">
            <p className="eyebrow">Visit us</p>
            <h2 className="title">Our office in Chiang Mai</h2>
            <p className="sublead">
              We are a licensed Thai accounting firm, not a visa broker — the same team that files your work permit
              also keeps your company&rsquo;s books and tax filings in order.
            </p>
            <div style={{ marginTop: 22 }}>
              <GoogleRatingBadge label="on Google" reviewsLabel="reviews" />
            </div>
            <div className="officegrid">
              <div className="officeshot">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Behide%20Scene%2FBehide%20Scene%2015.png?alt=media"
                  alt="The IC Accounting &amp; Service team at work in our Doi Saket office, Chiang Mai"
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                />
              </div>
              <div className="facts" style={{ textAlign: 'left' }}>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>IC Accounting &amp; Service Co., Ltd.</b>
                  <span>80/142 Tambon San Pu Loei, Doi Saket District, Chiang Mai 50220, Thailand</span>
                  <span style={{ marginTop: 8 }}>
                    <a href="https://maps.google.com/?cid=11080561333861967427" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>
                      Open in Google Maps
                    </a>
                  </span>
                </div>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>Talk to us</b>
                  <span>Phone <a href="tel:0957161422" style={{ color: '#2563eb', fontWeight: 600 }}>095-716-1422</a></span>
                  <span>LINE <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>@icacc</a></span>
                  <span>Email contact@icaccservice.com</span>
                </div>
                <div className="factbox">
                  <b style={{ fontSize: 17 }}>Office hours</b>
                  <span>Monday to Saturday, 09:00&ndash;18:00</span>
                  <span>Appointments outside these hours can be arranged on LINE.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bandwrap">
          <div className="band">
            <h2>Not sure where to start?</h2>
            <p>
              Message us on LINE in English and tell us your situation — whether you need a work permit, a Thai
              company, or just someone to take the accounting off your hands. The first consultation is free.
            </p>
            <div className="hbtns">
              <a className="btn btn-w" href={LINE_URL} target="_blank" rel="noopener noreferrer">Chat with us on LINE</a>
              <a className="btn btn-t" href="tel:0957161422">Call 095-716-1422</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
