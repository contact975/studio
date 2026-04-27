'use client';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { ArrowRight, PlayCircle, ChevronRight, MessageSquare } from 'lucide-react';
import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
    }
  }
}

const services = [
  {
    id: '01',
    name: 'Art Work &\nGraphic Design',
    nameEn: 'Artwork & Graphic',
    desc: 'ออกแบบ Key Visual, โปสเตอร์, Content Graphic สำหรับทุกช่องทางออนไลน์ ให้แบรนด์มีเอกลักษณ์ที่ชัดเจนและดูแพงในทุกงาน',
    price: '2,000',
    tag: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
  },
  {
    id: '02',
    name: 'Ads Motion',
    nameEn: 'Motion Graphics',
    desc: 'สร้าง Motion Graphic สำหรับโฆษณาที่ดึงดูดสายตา เพิ่ม Engagement และทำให้แบรนด์โดดเด่นกว่าคู่แข่ง',
    price: '3,500',
    tag: 'Motion',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
  },
  {
    id: '03',
    name: 'Video\nContent',
    nameEn: 'Video Production',
    desc: 'ถ่ายทำวิดีโอคุณภาพสูง ตั้งแต่ Reels, โฆษณาสินค้า ไปจนถึง Brand Film ที่เล่าเรื่องราวของแบรนด์ได้อย่างทรงพลัง',
    price: '6,000',
    tag: 'Video',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071',
  },
  {
    id: '04',
    name: 'Motion\nVideo',
    nameEn: 'Cinematic Motion',
    desc: 'งาน Motion Video ระดับ Cinematic ผสมผสานการถ่ายทำและ VFX เพื่อยกระดับภาพลักษณ์แบรนด์ให้ดูพรีเมียมในระดับเดียวกับแบรนด์ระดับโลก',
    price: '8,000',
    tag: 'Cinematic',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070',
  },
  {
    id: '05',
    name: 'Media\nConsult',
    nameEn: 'Strategy Consulting',
    desc: 'ให้คำปรึกษาด้าน Media Strategy วาง Mood & Tone ของแบรนด์ และวางแผน Content Calendar ให้ตรงกลุ่มเป้าหมาย',
    price: 'ฟรี',
    tag: 'Consulting',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070',
  },
];

const clients = [
  'SURR Bar', "Smash Daddy's", 'Art Mai Gallery Hotel',
  'Jarid Thai Food', 'La.moon', 'Into You Clinic',
  'CAMP', 'Carebeau', 'Apex Foods', 'The Meka Property',
  'Yoskarn', 'Twitamins',
];

const stats = [
  { num: '12+', label: 'แบรนด์ที่ดูแลอยู่' },
  { num: '18.5K', label: 'Engagement สูงสุด' },
  { num: '50+', label: 'โปรเจคที่ผ่านมา' },
  { num: '5', label: 'ประเภทบริการ' },
];

const process = [
  { num: '01', title: 'Brief & Consult', desc: 'รับโจทย์ เข้าใจแบรนด์ และวาง Mood & Tone ก่อนเริ่มงานจริง' },
  { num: '02', title: 'Concept & Planning', desc: 'พัฒนา Concept วาง Storyboard และ Moodboard ให้เห็นภาพชัดเจน' },
  { num: '03', title: 'Production', desc: 'ลงมือผลิตด้วยทีมงานมืออาชีพ กล้อง ไฟ กราฟิก และ Motion' },
  { num: '04', title: 'Deliver & Revise', desc: 'ส่งงานพร้อม Revision จนกว่าจะพอใจ 100%' },
];

const differences = [
  { label: 'คอนเทนต์ทั่วไป', items: ['ถ่ายเร็ว ง่าย แต่ขาดคุณภาพ', 'ไม่มีทิศทางของแบรนด์', 'ไม่สร้างภาพลักษณ์'], negative: true },
  { label: 'IC Production', items: ['วางแผนอย่างเป็นระบบ', 'มีการจัดแสงแบบสตูดิโอ', 'Mood & Tone เดียวกันทุกชิ้น', 'ยกระดับแบรนด์ให้ดูพรีเมียม'], negative: false },
];

export default function MediaClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-[#080810] text-white min-h-screen font-body overflow-x-hidden">
      <Header />
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto relative z-10" data-aos="fade-up">
            <div className="max-w-6xl">
              <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-blue-400" />IC Production Studio
              </p>
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight mb-8">
                <span className="block text-white">ELEVATE</span>
                <span className="block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)', color: 'transparent' }}>YOUR BRAND</span>
                <span className="block text-blue-500">IDENTITY.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                ไม่ใช่แค่คนทำคอนเทนต์ — เราคือผู้สร้างภาพลักษณ์ระดับพรีเมียม <br className="hidden md:block" /> ด้วยมาตรฐานโปรดัคชั่นที่เปลี่ยนวิสัยทัศน์ให้กลายเป็นความจริง
              </p>
              <div className="flex flex-wrap gap-4 mb-20">
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-14 rounded-full transition-all hover:scale-105 text-base">
                  เริ่มต้นโปรเจคของคุณ <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#showreel" className="inline-flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-8 h-14 rounded-full transition-all text-base">
                  <PlayCircle className="h-5 w-5 text-blue-400" /> ดู Showreel
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10" data-aos="fade-up" data-aos-delay="200">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.num}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CLIENT MARQUEE ── */}
        <section className="py-12 border-y border-white/5 overflow-hidden" data-aos="fade-up">
          <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="text-white/20 text-sm font-bold uppercase tracking-widest hover:text-white/50 transition-colors cursor-default">{c}</span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* ── SHOWREEL ── */}
        <section id="showreel" className="py-24 container mx-auto px-6" data-aos="fade-up">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-400" /> Our Work
              </p>
              <h2 className="text-4xl md:text-5xl font-black">Showreel</h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm text-right">ตัวอย่างงานที่เราภูมิใจ นำเสนอผ่านทุกรูปแบบของ Media Production</p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-900" suppressHydrationWarning>
            {isMounted ? (
              <Fragment>
                <style dangerouslySetInnerHTML={{ __html: `
                  wistia-player[media-id='le8f20crj0']:not(:defined) {
                    background: center/contain no-repeat url('https://fast.wistia.com/embed/medias/le8f20crj0/swatch');
                    display: block;
                    filter: blur(5px);
                    padding-top: 56.25%;
                  }
                `}} />
                <wistia-player
                  media-id="le8f20crj0"
                  aspect="1.7777777777777777"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  muted="true"
                  autoplay="true"
                  silent-autoplay="true"
                  play-button="false"
                ></wistia-player>
              </Fragment>
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <span className="text-white/10 text-sm">Loading...</span>
              </div>
            )}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24 bg-zinc-950/50" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-400" /> บริการของเรา
              </p>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Services & Pricing</h2>
              <p className="text-gray-500">ราคาเริ่มต้น — สอบถามรายละเอียดเพิ่มเติมเพื่อรับใบเสนอราคา</p>
            </div>
            <div className="flex gap-3 flex-wrap mb-12">
              {services.map((s, i) => (
                <button key={i} onClick={() => setActiveService(i)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${activeService === i ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                  {s.tag}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={services[activeService].image} alt={services[activeService].nameEn} fill className="object-cover transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-blue-400 text-xs tracking-widest uppercase mb-1">{services[activeService].tag}</p>
                    <p className="text-white font-black text-2xl whitespace-pre-line">{services[activeService].name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-xs mb-1">เริ่มต้นที่</p>
                    <p className={`font-black text-2xl ${services[activeService].isFree ? 'text-green-400' : 'text-blue-400'}`}>
                      {services[activeService].isFree ? 'FREE' : `฿${services[activeService].price}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-8xl font-black text-white/5">{services[activeService].id}</span>
                  <h3 className="text-3xl font-black -mt-8 whitespace-pre-line">{services[activeService].name}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">{services[activeService].desc}</p>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">ราคาเริ่มต้น</p>
                  <p className={`text-3xl font-black ${services[activeService].isFree ? 'text-green-400' : 'text-white'}`}>
                    {services[activeService].isFree ? 'ฟรี' : `฿${services[activeService].price}`}
                  </p>
                </div>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-3 border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-8 h-12 rounded-full transition-all font-bold text-sm">
                  <MessageSquare className="h-4 w-4" /> สอบถามราคา
                </Link>
                <div className="flex gap-2 pt-4">
                  {services.map((_, i) => (
                    <button key={i} onClick={() => setActiveService(i)}
                      className={`transition-all rounded-full ${activeService === i ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-4">
              {services.map((s, i) => (
                <button key={i} onClick={() => setActiveService(i)}
                  className={`p-5 rounded-2xl border text-left transition-all ${activeService === i ? 'border-blue-500/50 bg-blue-600/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
                  <p className="text-white/30 text-xs font-mono mb-2">{s.id}</p>
                  <p className="text-sm font-bold text-white leading-tight whitespace-pre-line mb-3">{s.name}</p>
                  <p className={`text-sm font-black ${s.isFree ? 'text-green-400' : 'text-blue-400'}`}>
                    {s.isFree ? 'ฟรี' : `฿${s.price}+`}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="py-24 container mx-auto px-6" data-aos="fade-up">
          <div className="mb-16">
            <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-400" /> ผลงาน
            </p>
            <h2 className="text-4xl md:text-5xl font-black">Portfolio</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Post Ads Content', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', span: 'col-span-1 row-span-2' },
              { label: 'Video Content', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800', span: 'col-span-1' },
              { label: 'Photo Content', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800', span: 'col-span-1' },
              { label: 'Motion Media', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', span: 'col-span-2' },
            ].map((item, i) => (
              <div key={i} data-aos="zoom-in" data-aos-delay={i * 100} className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer`} style={{ minHeight: '200px' }}>
                <Image src={item.img} alt={item.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm border border-blue-500/30 hover:border-blue-400 px-6 py-3 rounded-full transition-all">
              ดูผลงานทั้งหมด <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── DIFFERENCES ── */}
        <section className="py-24 bg-zinc-950/50" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2 justify-center">
                <span className="w-6 h-px bg-blue-400" /> ความแตกต่าง
              </p>
              <h2 className="text-4xl md:text-5xl font-black mb-4">ทำไมต้องเลือก Production Quality?</h2>
              <p className="text-gray-500 max-w-xl mx-auto">ความแตกต่างระหว่างคอนเทนต์ทั่วไปกับงานแบบโปรดัคชั่น</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {differences.map((d, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className={`rounded-2xl p-8 border ${d.negative ? 'border-white/5 bg-white/[0.02]' : 'border-blue-500/30 bg-blue-600/10'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-2 rounded-full ${d.negative ? 'bg-red-500/50' : 'bg-blue-500'}`} />
                    <p className={`font-bold text-sm uppercase tracking-wider ${d.negative ? 'text-gray-500' : 'text-blue-400'}`}>{d.label}</p>
                  </div>
                  <ul className="space-y-3">
                    {d.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.negative ? 'bg-red-500/40' : 'bg-blue-400'}`} />
                        <span className={`text-sm leading-relaxed ${d.negative ? 'text-gray-600' : 'text-gray-300'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24 container mx-auto px-6" data-aos="fade-up">
          <div className="mb-16">
            <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-400" /> กระบวนการ
            </p>
            <h2 className="text-4xl md:text-5xl font-black">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-600/5 transition-all group">
                <div className="text-6xl font-black text-white/[0.04] group-hover:text-blue-600/10 transition-colors mb-4 leading-none">{p.num}</div>
                <h3 className="text-lg font-black mb-3 text-white">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 z-10">
                    <ChevronRight className="h-5 w-5 text-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CLIENTS ── */}
        <section className="py-24 bg-zinc-950/50" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2 justify-center">
                <span className="w-6 h-px bg-blue-400" /> ลูกค้าของเรา
              </p>
              <h2 className="text-4xl md:text-5xl font-black">Trusted By</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {clients.map((c, i) => (
                <div key={i} data-aos="zoom-in" data-aos-delay={i * 50} className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-600/5 transition-all cursor-default">
                  <span className="text-gray-400 text-sm font-medium">{c}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { num: '18.5K', label: 'Views สูงสุด' },
                { num: '12.2K', label: 'Engagement' },
                { num: '14.9K', label: 'Reach' },
                { num: '10.4K', label: 'Interactions' },
              ].map((s, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <p className="text-2xl font-black text-blue-400 mb-1">{s.num}</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 container mx-auto px-6" data-aos="fade-up">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-blue-500/20"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.3) 0%, transparent 70%), #0a0a14' }}>
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-2 justify-center">
                <span className="w-6 h-px bg-blue-400" /> เริ่มต้นวันนี้
              </p>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                พร้อมยกระดับ<br />แบรนด์ของคุณ?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงาน IC Production พร้อมรับโจทย์ของคุณทุกวัน
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 h-14 rounded-full transition-all hover:scale-105 text-base">
                  คุยกับทีมงาน <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank"
                  className="inline-flex items-center gap-3 border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-10 h-14 rounded-full transition-all text-base">
                  ดูพอร์ตฟอลิโอ
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
