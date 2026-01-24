
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const packages = [
  {
    size: 'S',
    name: 'Orbit Starter',
    price: '2000',
    description: 'เหมาะสำหรับธุรกิจขนาดเล็กที่เริ่มจัดระบบบัญชี',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 20 รายการ',
    bgColor: 'bg-blue-400',
  },
  {
    size: 'M',
    name: 'Orbit Growth',
    price: '6000',
    description: 'เหมาะสำหรับธุรกิจที่ต้องการทีมซัพพอร์ตและข้อมูลเชิงลึกมากขึ้น',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 60 รายการ',
    bgColor: 'bg-blue-500',
  },
  {
    size: 'L',
    name: 'Orbit Pro',
    price: '12000',
    description: 'เหมาะสำหรับธุรกิจที่ไม่มีเวลาจัดการเอกสารและต้องการความครบถ้วน',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 120 รายการ',
    bgColor: 'bg-blue-600',
  },
  {
    size: 'XL',
    name: 'Orbit Enterprise',
    price: '24000',
    description: 'เหมาะสำหรับธุรกิจทุกขนาดที่ต้องการความต่อเนื่องและตรวจสอบได้',
    limit: 'จำนวนรายการต่อเดือนไม่เกิน 120 รายการ',
    bgColor: 'bg-blue-700',
  },
];

export default function AccountingServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-secondary/50 text-foreground">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-16 text-primary">
              แพ็กเกจบริการจัดทำบัญชี
            </h1>
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.name} className="flex flex-col text-center items-center p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card">
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
                    <p className="text-muted-foreground mb-4 h-12">{pkg.description}</p>
                    <p className="text-base text-muted-foreground font-semibold">{pkg.limit}</p>
                  </CardContent>
                  <CardFooter className="p-0 pt-8 w-full">
                    <Button asChild size="lg" className="w-full rounded-full">
                      <Link href="/#contact">ขอใบเสนอราคา</Link>
                    </Button>
                  </CardFooter>
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
