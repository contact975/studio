import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { BarChart, ShieldCheck, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PromoCarousel } from '@/components/landing/promo-carousel';

export const metadata: Metadata = {
  title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
  description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี วางขั้นตอนเอกสารให้เป็นระบบ เพื่อการเติบโตที่ยั่งยืน',
  alternates: { canonical: 'https://icaccservice.com/organization-system' },
  openGraph: {
    title: 'วางระบบบัญชีองค์กรเชียงใหม่ | IC Accounting',
    description: 'บริการวางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ สอนใช้โปรแกรมบัญชี',
    url: 'https://icaccservice.com/organization-system',
  },
};

export default function OrganizationSystemPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <PromoCarousel />

        <section className="animate-gradient py-24 text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">วางระบบองค์กรและบัญชีดิจิทัล</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                ยกระดับธุรกิจของคุณด้วยระบบการจัดการที่แม่นยำ ลดความซ้ำซ้อน และเข้าถึงข้อมูลได้แบบ Real-time
                เปลี่ยน "งานเอกสาร" ให้เป็น "กลยุทธ์" ด้วยเทคโนโลยีล่าสุด
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline text-foreground">โซลูชันเพื่อการจัดการที่เหนือกว่า</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Card className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">ระบบบัญชีและภาษี Cloud</h3>
                <p className="text-muted-foreground">วางรากฐานการบันทึกบัญชีผ่านระบบ Cloud (Clero) เชื่อมโยงหน้าบ้านและหลังบ้านเข้าด้วยกันอย่างราบรื่น</p>
              </Card>
              <Card className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">ระบบควบคุมภายใน (Internal Control)</h3>
                <p className="text-muted-foreground">ออกแบบผังการอนุมัติ (Approval Flow) และการเช็คสต็อกสินค้า เพื่อป้องกันความผิดพลาดและการทุจริต</p>
              </Card>
              <Card className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">ระบบงานบุคคลและเงินเดือน</h3>
                <p className="text-muted-foreground">จัดระเบียบงาน HR ตั้งแต่การลงเวลาทำงาน จนถึงการจ่ายเงินเดือนและยื่นประกันสังคมอัตโนมัติ</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-foreground">ขั้นตอนการพัฒนาระบบร่วมกับเรา</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
              {[
                { step: '01', title: 'Audit & Analysis', desc: 'สำรวจขั้นตอนการทำงานปัจจุบันและค้นหาจุดที่ต้องการการปรับปรุง (Pain Points)' },
                { step: '02', title: 'Design & Tools', desc: 'ออกแบบ workflow ใหม่และเลือกใช้ซอฟต์แวร์ที่เหมาะสมกับขนาดธุรกิจ' },
                { step: '03', title: 'Implement & Training', desc: 'ติดตั้งระบบจริง พร้อมจัดอบรมทีมงานให้ใช้งานได้อย่างชำนาญ' },
                { step: '04', title: 'Support & Optimize', desc: 'ติดตามผลและปรับแต่งระบบให้เสถียรที่สุดเพื่อการเติบโตในระยะยาว' },
              ].map((item) => (
                <Card key={item.step} className="flex-1 bg-card p-6 rounded-xl shadow-sm border-l-4 border-primary">
                  <span className="text-primary font-bold">Step {item.step}</span>
                  <h4 className="font-bold mt-2 text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}