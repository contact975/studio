
'use client';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
    }
  }
}

export default function MediaContentPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen selection:bg-blue-500 selection:text-white">
      <Header />
      <main>
        <section className="pt-32 pb-20 px-6 container mx-auto border-b border-white/10">
            <div data-aos="fade-up" data-aos-duration="1500">
                <h2 className="text-blue-500 font-semibold tracking-tighter text-lg mb-4">01 / EXCLUSIVE MEDIA</h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-10">
                    IC <br /> PRODUCTION <br /> <span className="text-blue-600">STUDIO.</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                    <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                        ไม่ใช่แค่คนทำคอนเทนต์ แต่เราคือผู้สร้าง "ภาพลักษณ์" ระดับพรีเมียมให้ธุรกิจของคุณ ด้วยมาตรฐานงานโปรดัคชั่นระดับ Cinematic
                    </p>
                    <div className="flex justify-end">
                        <Link href="#portfolio" className="border border-white/20 px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase text-sm tracking-widest font-bold">
                            View Showreel
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section id="portfolio" className="py-24 container mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-32 group" data-aos="fade-up">
                <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-zinc-900 relative aspect-video">
                    {isMounted ? (
                        <div className="w-full h-full relative">
                           <style dangerouslySetInnerHTML={{ __html: `
                             wistia-player[media-id='le8f20crj0']:not(:defined) { 
                               background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/le8f20crj0/swatch'); 
                               display: block; 
                               filter: blur(5px); 
                               padding-top:56.25%; 
                             }
                           `}} />
                           <wistia-player 
                             media-id="le8f20crj0" 
                             aspect="1.7777777777777777"
                             muted="true"
                             autoplay="true"
                             silent-autoplay="true"
                             playButton="false"
                             style={{ width: '100%', height: '100%' }}
                           ></wistia-player>
                        </div>
                    ) : (
                      <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                        <span className="text-white/20">Loading Showreel...</span>
                      </div>
                    )}
                </div>
                <div className="lg:col-span-5">
                    <span className="text-blue-500 text-sm font-mono mb-4 block">Visual Storytelling</span>
                    <h3 className="text-4xl font-bold mb-6">Corporate <br /> Masterpiece.</h3>
                    <p className="text-gray-500 mb-8">
                        เปลี่ยนวิสัยทัศน์ของคุณให้กลายเป็นสื่อที่ทรงพลัง ดึงดูดความไว้วางใจจากลูกค้าด้วยภาพและเสียงระดับพรีเมียม
                    </p>
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group" data-aos="fade-up">
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <span className="text-blue-500 text-sm font-mono mb-4 block">Executive Content</span>
                    <h3 className="text-4xl font-bold mb-6">Online <br /> Branding.</h3>
                    <p className="text-gray-500 mb-8">
                        สร้างตัวตนผู้บริหารให้ดูน่าเชื่อถือและทันสมัย เหมาะสำหรับคอนเทนต์ยุคใหม่ที่ต้องการความชัดเจนและคุณภาพระดับสูง
                    </p>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 overflow-hidden rounded-2xl bg-zinc-900 relative h-[500px]">
                    <Image src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071"
                         alt="Online Branding"
                         fill
                         className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                         data-ai-hint="business interview"
                         />
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
