import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="flex items-center justify-center animate-gradient text-white" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight font-headline">
          IC Accounting & Service <br />
          <span className="text-blue-300">พาร์ทเนอร์ที่ช่วยให้เรื่องภาษีและบัญชีเป็นเรื่องง่าย</span>
        </h1>
        <p className="text-xl opacity-90 mb-10 max-w-2xl">
          เราดูแลบัญชี ภาษี และวางระบบองค์กรด้วยเทคโนโลยีสมัยใหม่ในเชียงใหม่ 
          เพื่อให้คุณมีเวลาโฟกัสกับการเติบโตของธุรกิจได้อย่างเต็มที่
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow-xl"
          >
            <Link href="https://www.facebook.com/icaccservice" target="_blank" rel="noopener noreferrer">ปรึกษาเราฟรี</Link>
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
