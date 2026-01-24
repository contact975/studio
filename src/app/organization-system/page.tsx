'use client';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { BarChart, ShieldCheck, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function OrganizationSystemPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="animate-gradient py-24 text-primary-foreground">
          <div className="container mx-auto px-6">
            <div data-aos="fade-up" className="max-w-3xl">
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
            <div data-aos="fade-up" className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline text-foreground">โซลูชันเพื่อการจัดการที่เหนือกว่า</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Card data-aos="fade-up" data-aos-delay="0" className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">ระบบบัญชีและภาษี Cloud</h3>
                <p className="text-muted-foreground">วางรากฐานการบันทึกบัญชีผ่านระบบ Cloud (Clero) เชื่อมโยงหน้าบ้านและหลังบ้านเข้าด้วยกันอย่างราบรื่น</p>
              </Card>

              <Card data-aos="fade-up" data-aos-delay="100" className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">ระบบควบคุมภายใน (Internal Control)</h3>
                <p className="text-muted-foreground">ออกแบบผังการอนุมัติ (Approval Flow) และการเช็คสต็อกสินค้า เพื่อป้องกันความผิดพลาดและการทุจริต</p>
              </Card>

              <Card data-aos="fade-up" data-aos-delay="200" className="text-center p-8 border-0 shadow-sm hover:shadow-lg transition-shadow bg-card">
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
            <h2 data-aos="fade-up" className="text-2xl font-bold text-center mb-12 text-foreground">ขั้นตอนการพัฒนาระบบร่วมกับเรา</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
              <Card data-aos="fade-up" data-aos-delay="0" className="flex-1 bg-card p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <span className="text-primary font-bold">Step 01</span>
                <h4 className="font-bold mt-2 text-foreground">Audit & Analysis</h4>
                <p className="text-sm text-muted-foreground mt-2">สำรวจขั้นตอนการทำงานปัจจุบันและค้นหาจุดที่ต้องการการปรับปรุง (Pain Points)</p>
              </Card>
              <Card data-aos="fade-up" data-aos-delay="100" className="flex-1 bg-card p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <span className="text-primary font-bold">Step 02</span>
                <h4 className="font-bold mt-2 text-foreground">Design & Tools</h4>
                <p className="text-sm text-muted-foreground mt-2">ออกแบบ workflow ใหม่และเลือกใช้ซอฟต์แวร์ที่เหมาะสมกับขนาดธุรกิจ</p>
              </Card>
              <Card data-aos="fade-up" data-aos-delay="200" className="flex-1 bg-card p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <span className="text-primary font-bold">Step 03</span>
                <h4 className="font-bold mt-2 text-foreground">Implement & Training</h4>
                <p className="text-sm text-muted-foreground mt-2">ติดตั้งระบบจริง พร้อมจัดอบรมทีมงานให้ใช้งานได้อย่างชำนาญ</p>
              </Card>
              <Card data-aos="fade-up" data-aos-delay="300" className="flex-1 bg-card p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <span className="text-primary font-bold">Step 04</span>
                <h4 className="font-bold mt-2 text-foreground">Support & Optimize</h4>
                <p className="text-sm text-muted-foreground mt-2">ติดตามผลและปรับแต่งระบบให้เสถียรที่สุดเพื่อการเติบโตในระยะยาว</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
