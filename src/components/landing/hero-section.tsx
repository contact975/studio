import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight">
          บริการรับทำบัญชีและจดทะเบียนบริษัท
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
          ดูแลครอบคลุมทุกเรื่องบัญชีและภาษี เพื่อให้คุณโฟกัสกับธุรกิจได้อย่างเต็มที่
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
            <Link href="#services">ดูบริการทั้งหมด</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
            <Link href="#contact">ปรึกษาฟรี</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
