import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';

export default function MediaContentPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative h-[80vh] flex items-center bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <Image 
                    src="https://images.unsplash.com/photo-1492691523567-6170c82e8ec4?q=80&w=2071"
                    alt="Media production background"
                    fill
                    className="w-full h-full object-cover"
                    data-ai-hint="media production"
                />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div data-aos="fade-up" data-aos-duration="1200">
                    <h2 className="text-primary font-medium tracking-widest mb-4 uppercase text-xs">Exclusive Media</h2>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Crafting Your Brand <br /> 
                        Into a <span className="text-primary">Masterpiece</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                        ยกระดับตัวตนธุรกิจด้วยงานโปรดัคชั่นคุณภาพสูง สร้างความน่าเชื่อถือระดับมืออาชีพ
                    </p>
                </div>
            </div>
        </section>

        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-up">
                        <h3 className="text-2xl font-bold mb-6 text-foreground">Brand Engineering</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            เราดูแลการผลิตสื่อออนไลน์ทุกขั้นตอนด้วยมาตรฐานระดับสูง 
                            เพื่อให้แบรนด์ของคุณโดดเด่นและเป็นผู้นำในอุตสาหกรรม
                        </p>
                        <ul className="space-y-4 text-foreground">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Creative Storytelling
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Cinema-Grade Quality
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" className="relative">
                        <Image 
                            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800" 
                            alt="Brand Engineering"
                            width={800}
                            height={533}
                            className="rounded-lg shadow-xl"
                            data-ai-hint="camera film"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div data-aos="fade-up" className="group cursor-pointer">
                        <div className="overflow-hidden rounded-lg mb-4">
                            <Image 
                                src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800"
                                alt="Corporate Identity Film"
                                width={800}
                                height={450}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                data-ai-hint="film reel"
                            />
                        </div>
                        <h4 className="font-bold text-lg text-foreground">Corporate Identity Film</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Production</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" className="group cursor-pointer">
                        <div className="overflow-hidden rounded-lg mb-4">
                            <Image 
                                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800"
                                alt="Executive Interview"
                                width={800}
                                height={533}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                data-ai-hint="business interview"
                            />
                        </div>
                        <h4 className="font-bold text-lg text-foreground">Executive Interview</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Interview</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
