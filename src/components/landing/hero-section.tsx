import { Calculator, BookCopy, FileText, Briefcase, Landmark, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const floatingIcons = [
    // Left side
    { Icon: Calculator, className: "top-[20%] left-[10%]", size: "w-10 h-10", delay: '0s' },
    { Icon: BookCopy, className: "top-[70%] left-[5%]", size: "w-8 h-8", delay: '1s' },
    { Icon: FileText, className: "top-[50%] left-[15%]", size: "w-12 h-12", delay: '2.5s' },
    { Icon: Briefcase, className: "top-[15%] left-[20%]", size: "w-14 h-14", delay: '0.5s' },
    { Icon: Landmark, className: "top-[85%] left-[18%]", size: "w-9 h-9", delay: '2s' },
    { Icon: CircleDollarSign, className: "top-[40%] left-[25%]", size: "w-16 h-16", delay: '3s' },
    // Right side
    { Icon: Calculator, className: "top-[25%] right-[10%]", size: "w-12 h-12", delay: '1.5s' },
    { Icon: BookCopy, className: "top-[75%] right-[8%]", size: "w-10 h-10", delay: '3.5s' },
    { Icon: FileText, className: "top-[55%] right-[18%]", size: "w-8 h-8", delay: '0.8s' },
    { Icon: Briefcase, className: "top-[10%] right-[22%]", size: "w-16 h-16", delay: '2.2s' },
    { Icon: Landmark, className: "top-[90%] right-[20%]", size: "w-11 h-11", delay: '4s' },
    { Icon: CircleDollarSign, className: "top-[45%] right-[28%]", size: "w-14 h-14", delay: '1.2s' },
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
          <div className="relative aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/wfVktBpUIpw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
