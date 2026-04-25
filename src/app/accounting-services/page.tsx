import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { PromoCarousel } from '@/components/landing/promo-carousel';

export const metadata: Metadata = {
  title: 'รับทำบัญชีเชียงใหม่ เริ่ม 2,500/เดือน | IC Accounting',
  description: 'รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสาร บันทึกบัญชี ยื่นภาษีรายเดือน โดยทีมมืออาชีพ ประสบการณ์กว่า 10 ปี',
  alternates: { canonical: 'https://icaccservice.com/accounting-services' },
  openGraph: {
    title: 'รับทำบัญชีเชียงใหม่ เริ่ม 2,500/เดือน | IC Accounting',
    description: 'รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสาร บันทึกบัญชี ยื่นภาษีรายเดือน',
    url: 'https://icaccservice.com/accounting-services',
  },
};

const packages = [
  {
    size: 'S',
    name: 'Basic Package',
    price: '2500',
    description: 'เหมาะสำหรับธุรกิจขนาดเล็กที่เริ่มจัดระบบบัญชี',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 20 รายการ',
    bgColor: 'bg-blue-400',
    details: [
      'บันทึกรายการค้า (สมุดรายวันซื้อ, ขาย, รับ, จ่าย, ทั่วไป)',
      'จัดทำและยื่นภาษี (ภ.พ.30, ภ.ง.ด.1, 3, 53)',
      'จัดทำและยื่นประกันสังคม',
      'ให้คำปรึกษาทางบัญชีและภาษี (Line, โทรศัพท์)',
    ],
  },
  {
    size: 'M',
    name: 'Standard Package',
    price: '6000',
    description: 'เหมาะสำหรับธุรกิจที่ต้องการทีมซัพพอร์ตและข้อมูลเชิงลึกมากขึ้น',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 60 รายการ',
    bgColor: 'bg-blue-500',
    details: [
      'ทุกอย่างในแพ็กเกจ S',
      'จัดทำรายงานภาษีซื้อ-ภาษีขายประจำเดือน',
      'จัดทำหนังสือรับรองหัก ณ ที่จ่าย (e-Withholding Tax)',
      'จัดทำและนำส่งงบการเงินครึ่งปี (ภ.ง.ด.51)',
      'ให้คำปรึกษาเชิงลึกพร้อมวิเคราะห์ข้อมูลเบื้องต้น',
    ],
  },
  {
    size: 'L',
    name: 'Pro Package',
    price: '12000',
    description: 'เหมาะสำหรับธุรกิจที่ไม่มีเวลาจัดการเอกสารและต้องการความครบถ้วน',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 120 รายการ',
    bgColor: 'bg-blue-600',
    details: [
      'ทุกอย่างในแพ็กเกจ M',
      'บริการรับ-ส่งเอกสาร (ในพื้นที่จังหวัดเชียงใหม่)',
      'จัดทำและนำส่งงบการเงินประจำปี (ภ.ง.ด.50)',
      'เข้าพบและให้คำปรึกษาที่สำนักงานลูกค้า (ไตรมาสละ 1 ครั้ง)',
      'วางแผนภาษีบุคคลธรรมดาและนิติบุคคลประจำปี',
    ],
  },
  {
    size: 'XL',
    name: 'Pro Max Package',
    price: '24000',
    description: 'เหมาะสำหรับธุรกิจทุกขนาดที่ต้องการความต่อเนื่องและตรวจสอบได้',
    limit: 'จำนวนรายการต่อเดือนมากกว่า 120 รายการ',
    bgColor: 'bg-blue-700',
    details: [
      'ทุกอย่างในแพ็กเกจ L',
      'ไม่จำกัดจำนวนครั้งในการให้คำปรึกษา',
      'วางระบบบัญชีภายในและควบคุมภายในเบื้องต้น',
      'ติดต่อประสานงานกับผู้สอบบัญชีรับอนุญาต',
      'เป็นตัวแทนในการพบเจ้าหน้าที่สรรพากร (กรณีมีหนังสือเชิญพบ)',
    ],
  },
];

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-secondary/50 text-foreground">
      <Header />
      <main className="flex-1">
        <PromoCarousel />
        <section className="animate-gradient text-primary-foreground py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="text-sm mb-4 opacity-80">
              <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link> / <span>บริการทำบัญชี</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">บริการจัดทำบัญชี (Accounting Services)</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl">ดูแลครบวงจรตั้งแต่ลงบัญชี ยื่นภาษี จนถึงปิดงบฯ เราให้คุณมากกว่าแค่ตัวเลข ด้วยการวิเคราะห์ต้นทุนและสถานะการเงิน เสมือนมี CFO ส่วนตัว อยู่เคียงข้างธุรกิจคุณ</p>
          </div>
        </section>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-center mb-16 text-primary">
              แพ็กเกจบริการจัดทำบัญชี
            </h2>
            <div className="max-w-5xl mx-auto flex flex-col gap-16">
              {packages.map((pkg, index) => (
                <div key={pkg.name} className="grid md:grid-cols-2 gap-8 items-start">
                  <Card className="flex flex-col text-center items-center p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card h-full">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${pkg.bgColor} mb-6`}>
                      <span className="text-5xl font-bold text-white">{pkg.size}</span>
                    </div>
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-3xl font-bold">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-2xl font-semibold text-primary my-4">
                        เริ่มต้น ฿ {new Intl.NumberFormat('th-TH').format(Number(pkg.price))} ต่อเดือน
                      </p>
                      <p className="text-muted-foreground mb-4 min-h-[3rem]">{pkg.description}</p>
                      <p className="text-base text-muted-foreground font-semibold">{pkg.limit}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-8 w-full">
                      <Button asChild size="lg" className="w-full rounded-full">
                        <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank">ขอใบเสนอราคา</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="p-8 rounded-xl shadow-lg bg-card h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl font-bold text-primary">สิ่งที่ได้รับในแพ็กเกจ</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-3 text-left">
                        {pkg.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}