import { PlayCircle, Calculator, BookCopy, FileText, Briefcase, Landmark, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const floatingIcons = [
    { Icon: Calculator, className: "top-[20%] left-[10%]", size: "w-10 h-10", delay: '0s' },
    { Icon: BookCopy, className: "top-[70%] left-[30%]", size: "w-8 h-8", delay: '1s' },
    { Icon: FileText, className: "top-[50%] left-[50%]", size: "w-12 h-12", delay: '2.5s' },
    { Icon: Briefcase, className: "top-[15%] right-[15%]", size: "w-14 h-14", delay: '0.5s' },
    { Icon: Landmark, className: "top-[75%] right-[20%]", size: "w-9 h-9", delay: '2s' },
    { Icon: CircleDollarSign, className: "top-[40%] right-[5%]", size: "w-16 h-16", delay: '3s' },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-primary text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 z-0">
            {floatingIcons.map(({ Icon, className, size, delay }, index) => (
            <Icon
                key={index}
                className={cn(
                "absolute text-white/10 animate-float",
                className,
                size
                )}
                style={{ animationDelay: delay }}
            />
            ))}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
          เลขาส่วนตัวที่ช่วยให้เรื่องบัญชีและภาษีเป็นเรื่องง่ายสำหรับคุณ
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
          ดูแลครบทั้งระบบบัญชีและงานมีเดียคอนเทนต์ ให้คำปรึกษาพร้อมวางระบบหลังบ้านถึงที่ เพื่อการเติบโตของธุรกิจคุณอย่างมั่นคง
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
