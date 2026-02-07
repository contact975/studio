
'use client';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lightbulb, UserCheck, Cpu, Video, Zap, Palette, ArrowRight, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <div className="bg-slate-950 text-white min-h-screen selection:bg-blue-500 selection:text-white font-body">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="container mx-auto">
                <div data-aos="fade-up" data-aos-duration="1500" className="max-w-5xl">
                    <h2 className="text-blue-500 font-semibold tracking-widest text-sm mb-4 uppercase">Premium Production</h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8 font-headline">
                        IC PRODUCTION <br /> 
                        <span className="text-blue-600 underline decoration-blue-900/50 underline-offset-8">STUDIO.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
                        ไม่ใช่แค่คนทำคอนเทนต์ แต่เราคือผู้สร้าง "ภาพลักษณ์" ระดับพรีเมียมให้ธุรกิจของคุณ ด้วยมาตรฐานงานโปรดัคชั่นระดับ Cinematic ที่เปลี่ยนวิสัยทัศน์ให้กลายเป็นความจริง
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg font-bold transition-all hover:scale-105">
                            <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">ปรึกษาทีมโปรดัคชั่น</Link>
                        </Button>
                        <Link href="#portfolio" className="inline-flex items-center gap-2 border border-white/20 px-8 h-14 rounded-full hover:bg-white/10 transition-all duration-300 uppercase text-sm tracking-widest font-bold">
                            View Showreel <PlayCircle className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Expert Production Team Section */}
        <section className="py-24 bg-zinc-950 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">ทีมโปรดัคชั่นมืออาชีพ (Expert Production Team)</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        เบื้องหลังผลงานที่มีคุณภาพ คือทีมงานที่มีความถนัดเฉพาะทางและมากประสบการณ์ เราคือคู่คิดที่ช่วยถ่ายทอด Identity ของธุรกิจคุณผ่านงานวิชวลที่ทรงพลัง
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card data-aos="fade-up" data-aos-delay="0" className="bg-zinc-900/50 border-white/5 p-8 hover:border-blue-500/50 transition-colors">
                        <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                            <Lightbulb className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Creative Strategy</h3>
                        <p className="text-gray-400 leading-relaxed">ทีมคิดสร้างสรรค์ที่เปลี่ยนโจทย์ธุรกิจให้เป็น Storytelling ที่น่าสนใจและเข้าถึงกลุ่มเป้าหมาย</p>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="100" className="bg-zinc-900/50 border-white/5 p-8 hover:border-blue-500/50 transition-colors">
                        <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                            <UserCheck className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Specialized Expertise</h3>
                        <p className="text-gray-400 leading-relaxed">ทีมงานเฉพาะทางในแต่ละด้าน ตั้งแต่ผู้กำกับ, มือตัดต่อ, ไปจนถึงศิลปินด้าน Motion Graphics</p>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="200" className="bg-zinc-900/50 border-white/5 p-8 hover:border-blue-500/50 transition-colors">
                        <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                            <Cpu className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">High-End Technology</h3>
                        <p className="text-gray-400 leading-relaxed">เลือกใช้เครื่องมือและซอฟต์แวร์ระดับมาตรฐานอุตสาหกรรม เพื่อผลงานที่คมชัดและทันสมัยที่สุด</p>
                    </Card>
                </div>
            </div>
        </section>

        {/* Main Promo Video Section */}
        <section id="portfolio" className="py-24 container mx-auto px-6">
            <div data-aos="fade-up" className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline">The Core Story</h2>
                <p className="text-blue-500 text-lg">สื่อสารแบรนด์ให้เข้าถึงใจลูกค้า</p>
            </div>
            
            <div className="overflow-hidden rounded-3xl bg-zinc-900 relative aspect-video shadow-2xl border border-white/10" data-aos="zoom-in">
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
            <p className="mt-8 text-center text-gray-500 max-w-2xl mx-auto italic">
                นำเสนอวิดีโอ Promo ที่รวบรวมความโดดเด่นของธุรกิจคุณในคลิปเดียว เพื่อการนำเสนอที่เป็นมืออาชีพและน่าจดจำ
            </p>
        </section>

        {/* Specialized Production Services */}
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div data-aos="fade-up" className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline">เฉพาะทางด้านการผลิต</h2>
                    <p className="text-blue-500 text-lg mt-2">(Specialized Production Services)</p>
                </div>

                <div className="space-y-32">
                    {/* 3.1 Video Production */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-aos="fade-up">
                        <div className="order-2 lg:order-1">
                            <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full"></div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Video Production <br /> <span className="text-gray-500 text-2xl font-normal">(งานถ่ายทำและตัดต่อวิดีโอ)</span></h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                "เนรมิตภาพในจินตนาการให้กลายเป็นความจริง ด้วยการถ่ายทำที่ใส่ใจทุกรายละเอียด แสง สี และอารมณ์ของภาพ เพื่อสร้างวิดีโอโฆษณา, รีวิวสินค้า หรือคอนเทนต์ลงโซเชียลมีเดียที่ดึงดูดสายตา"
                            </p>
                            <Button asChild variant="outline" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white px-8 h-12 font-bold group">
                                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">
                                    ขอดูผลงานเพิ่มเติม <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                        <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071"
                                 alt="Video Production"
                                 fill
                                 className="object-cover transition-transform duration-1000 hover:scale-110"
                                 data-ai-hint="camera filming"
                                 />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <Video className="h-6 w-6 text-blue-500" />
                                <span className="font-bold tracking-widest text-sm uppercase">Cinematic Experience</span>
                            </div>
                        </div>
                    </div>

                    {/* 3.2 Motion Graphics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-aos="fade-up">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
                                 alt="Motion Graphics"
                                 fill
                                 className="object-cover transition-transform duration-1000 hover:scale-110"
                                 data-ai-hint="abstract motion"
                                 />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <Zap className="h-6 w-6 text-blue-500" />
                                <span className="font-bold tracking-widest text-sm uppercase">Visual Effects</span>
                            </div>
                        </div>
                        <div>
                            <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full"></div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Motion Graphics & VFX <br /> <span className="text-gray-500 text-2xl font-normal">(งานโมชั่นและวิชวลเอฟเฟกต์)</span></h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                "เพิ่มความน่าตื่นตาตื่นใจด้วยงานกราฟิกเคลื่อนที่ (Motion Graphics) และเทคนิคพิเศษ (VFX) ที่ช่วยให้ข้อมูลที่ซับซ้อนดูง่ายขึ้น และสร้างความโดดเด่นที่วิดีโอทั่วไปทำไม่ได้"
                            </p>
                            <Button asChild variant="outline" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white px-8 h-12 font-bold group">
                                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">
                                    ปรึกษาทีมโปรดัคชั่น <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* 3.3 Artwork */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-aos="fade-up">
                        <div className="order-2 lg:order-1">
                            <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full"></div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Artwork & Graphic Design <br /> <span className="text-gray-500 text-2xl font-normal">(งานออกแบบอาร์ตเวิร์คและกราฟิก)</span></h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                "ดีไซน์ที่สะท้อนตัวตนของแบรนด์ ตั้งแต่การออกแบบ Key Visual, โปสเตอร์ประชาสัมพันธ์ ไปจนถึง Content Graphic สำหรับสื่อออนไลน์ เพื่อภาพลักษณ์ที่สม่ำเสมอและดูแพงในทุกช่องทาง"
                            </p>
                            <Button asChild variant="outline" className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white px-8 h-12 font-bold group">
                                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">
                                    ขอดูพอร์ตฟอลิโอ <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                        <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000"
                                 alt="Graphic Design"
                                 fill
                                 className="object-cover transition-transform duration-1000 hover:scale-110"
                                 data-ai-hint="graphic design mockup"
                                 />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <Palette className="h-6 w-6 text-blue-500" />
                                <span className="font-bold tracking-widest text-sm uppercase">Creative Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 container mx-auto px-6">
            <div data-aos="zoom-in" className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-headline">เริ่มปั้นแบรนด์ให้พรีเมียมวันนี้</h2>
                    <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        ให้ IC PRODUCTION เป็นเบื้องหลังที่เปลี่ยนธุรกิจคุณให้ดูเป็นมืออาชีพและน่าเชื่อถือในทุกมิติ
                    </p>
                    <Button asChild size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50 px-12 h-16 text-xl font-bold shadow-2xl">
                        <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">พูดคุยกับทีมงาน</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
