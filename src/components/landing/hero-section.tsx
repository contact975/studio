import { PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="bg-primary text-primary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
          บริการรับทำบัญชีและจดทะเบียนบริษัท
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
          ดูแลครอบคลุมทุกเรื่องบัญชีและภาษี เพื่อให้คุณโฟกัสกับธุรกิจได้อย่างเต็มที่
        </p>
        <div className="mt-12">
          <div className="relative aspect-video max-w-3xl mx-auto bg-black/20 rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/20 to-transparent">
              <PlayCircle className="w-16 h-16 md:w-20 md:h-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
