import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Image from 'next/image';

export default function MediaContentPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0 opacity-40">
                <Image 
                    src="https://images.unsplash.com/photo-1492691523567-6170c82e8ec4?q=80&w=2071" 
                    alt="Media Production background"
                    fill
                    className="w-full h-full object-cover"
                    data-ai-hint="media production"
                />
            </div>
            <div className="container mx-auto px-6 relative z-10 text-center" data-aos="zoom-in" data-aos-duration="1500">
                <h2 className="text-blue-400 font-bold tracking-widest mb-4 uppercase text-sm">Exclusive Media Service</h2>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Crafting Your Brand <br /> Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Masterpiece</span></h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    ยกระดับตัวตนธุรกิจของคุณด้วย Media Content ระดับมืออาชีพ 
                    เปลี่ยนความเชี่ยวชาญให้กลายเป็นงานภาพที่ทรงพลังและน่าเชื่อถือ
                </p>
            </div>
        </section>

        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap items-center -mx-6">
                    <div className="w-full lg:w-1/2 px-6 mb-12 lg:mb-0" data-aos="fade-right">
                        <div className="relative">
                            <Image 
                                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800" 
                                alt="Brand Engineering"
                                width={800}
                                height={1200}
                                className="rounded-2xl shadow-2xl relative z-10 w-full h-auto"
                                data-ai-hint="camera film"
                            />
                            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary rounded-2xl z-0"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-6" data-aos="fade-left">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Beyond Content Creation: <br />It’s Brand Engineering</h2>
                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            เพราะเราเข้าใจว่า "ภาพลักษณ์" คือหัวใจสำคัญของความน่าเชื่อถือ เราจึงดูแลการผลิตสื่อออนไลน์ทุกขั้นตอนด้วยมาตรฐานเดียวกับการทำโฆษณา (TVC) เพื่อให้แบรนด์ของคุณดูโดดเด่นและเป็นผู้นำในอุตสาหกรรม
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="text-primary text-xl font-bold">01</span>
                                <div>
                                    <h4 className="font-bold text-foreground">Creative Storytelling</h4>
                                    <p className="text-muted-foreground text-sm">ร้อยเรียงเรื่องราวธุรกิจให้น่าสนใจและเข้าถึงกลุ่มเป้าหมาย</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-primary text-xl font-bold">02</span>
                                <div>
                                    <h4 className="font-bold text-foreground">Cinema-Grade Quality</h4>
                                    <p className="text-muted-foreground text-sm">การจัดแสง มุมกล้อง และการตัดต่อในระดับมืออาชีพ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-4" data-aos="fade-up">Featured Production</h2>
                <p className="text-muted-foreground" data-aos="fade-up" data-aos-delay="200">ตัวอย่างงานสร้างสรรค์สื่อที่เราภาคภูมิใจ</p>
            </div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative overflow-hidden rounded-3xl bg-black" data-aos="zoom-in-up" data-aos-delay="100">
                    <Image src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200" alt="Featured Production 1" width={1200} height={800} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" data-ai-hint="tech video" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white p-8">
                            <h3 className="text-2xl font-bold mb-2">Corporate Video</h3>
                            <p>วิดีโอแนะนำองค์กรสำหรับบริษัทเทคโนโลยี</p>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl bg-black" data-aos="zoom-in-up" data-aos-delay="200">
                     <Image src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1200" alt="Featured Production 2" width={1200} height={800} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" data-ai-hint="product launch" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white p-8">
                            <h3 className="text-2xl font-bold mb-2">Product Launch</h3>
                            <p>วิดีโอเปิดตัวสินค้าสไตล์ย้อนยุค</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
