'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calculator, FileText, TrendingUp, Clapperboard, Camera, PlayCircle, BarChart2 } from 'lucide-react';

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const floatingIcons = [
    { Icon: Calculator, size: 'h-16 w-16', position: 'top-1/4 left-[15%]', delay: '0s' },
    { Icon: FileText, size: 'h-12 w-12', position: 'top-2/3 left-[10%]', delay: '1.5s' },
    { Icon: TrendingUp, size: 'h-20 w-20', position: 'top-1/2 right-[12%]', delay: '0.5s' },
    { Icon: Clapperboard, size: 'h-14 w-14', position: 'top-[15%] right-[20%]', delay: '2s' },
    { Icon: Camera, size: 'h-12 w-12', position: 'bottom-[15%] left-[30%]', delay: '2.5s' },
    { Icon: PlayCircle, size: 'h-24 w-24', position: 'bottom-[20%] right-[25%]', delay: '1s' },
    { Icon: BarChart2, size: 'h-16 w-16', position: 'top-1/3 left-[45%]', delay: '3s' },
  ];

  return (
    <section id="hero" className="relative flex items-center justify-center animate-gradient text-white overflow-hidden" style={{ minHeight: 'calc(100vh - 4rem)' }}>
       <div className="absolute inset-0 pointer-events-none z-0">
        {floatingIcons.map(({ Icon, size, position, delay }, index) => (
          <Icon
            key={index}
            className={`absolute ${size} ${position} text-white/10 animate-float`}
            style={{ animationDelay: delay }}
          />
        ))}
      </div>
      
      <div data-aos="fade-up" className="container mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-relaxed font-headline">
          <span className="text-blue-300">พาร์ทเนอร์ที่ช่วยให้เรื่องภาษีและบัญชีเป็นเรื่องง่าย</span>
        </h1>
        <p className="text-xl opacity-90 mb-10 max-w-2xl">
          เราดูแลบัญชี ภาษี และวางระบบองค์กรด้วยเทคโนโลยีสมัยใหม่ในเชียงใหม่ 
          เพื่อให้คุณมีเวลาโฟกัสกับการเติบโตของธุรกิจได้อย่างเต็มที่
        </p>

        <div data-aos="fade-up" data-aos-delay="200" className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl mb-12 bg-black/20">
           {isMounted ? (
            <div
                className="wistia_responsive_padding"
                style={{ paddingTop: '56.25%', position: 'relative' }}
            >
                <div
                    className="wistia_responsive_wrapper"
                    style={{
                        height: '100%',
                        left: 0,
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                    }}
                >
                    <div
                        className="wistia_embed wistia_async_hd04a418nd videoFoam=true silentAutoPlay=true"
                        style={{
                            height: '100%',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        &nbsp;
                    </div>
                </div>
            </div>
           ) : (
             <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
               <span className="text-white/20">Loading Video...</span>
             </div>
           )}
        </div>

        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow-xl"
          >
            <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank" rel="noopener noreferrer">ปรึกษาเราฟรี</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-white bg-transparent px-8 py-4 rounded-full font-bold text-white hover:bg-white hover:text-blue-900 transition"
          >
            <Link href="/#services">ดูบริการทั้งหมด</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
