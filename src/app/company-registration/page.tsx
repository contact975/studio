
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const registrationPackages = [
    {
        type: "Partnership",
        name: "ห้างหุ้นส่วน",
        price: "6000",
        description: "ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว",
        buttonText: "ขอใบเสนอราคา"
    },
    {
        type: "Company",
        name: "บริษัท",
        price: "12000",
        description: "ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว",
        buttonText: "ขอใบเสนอราคา"
    }
];

export default function CompanyRegistrationPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
              <nav className="text-sm mb-4 opacity-80">
                  <Link href="/" className="hover:opacity-100 transition-opacity">หน้าแรก</Link> / <span>บริการจดทะเบียนนิติบุคคล</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">บริการจดทะเบียนนิติบุคคล</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-3xl">เริ่มต้นธุรกิจอย่างมั่นใจ บริการจดทะเบียนบริษัทและห้างหุ้นส่วนแบบครบวงจร ให้คุณเริ่มต้นก้าวแรกของธุรกิจได้อย่างถูกต้องและรวดเร็ว</p>
          </div>
        </section>
        
        <section className="py-20 md:py-28 bg-secondary/60">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-16 text-foreground">
                แพ็กเกจบริการจดทะเบียน
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {registrationPackages.map((pkg) => (
                    <Card key={pkg.name} className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-card flex flex-col">
                        <CardHeader className="flex-shrink-0 p-0 mb-4">
                            <div className="flex justify-center mb-4">
                                <div className="inline-block px-6 py-2 rounded-full bg-primary/90 text-primary-foreground font-semibold text-sm">
                                    {pkg.type}
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow p-0">
                            <p className="text-3xl font-bold text-primary my-4">฿ {new Intl.NumberFormat('th-TH').format(Number(pkg.price))}</p>
                            <p className="text-muted-foreground text-sm min-h-[40px]">
                                {pkg.description}
                            </p>
                        </CardContent>
                        <CardFooter className="justify-center pt-6 flex-shrink-0 p-0">
                            <Button asChild className="w-full rounded-full" size="lg">
                                <Link href="/#contact">{pkg.buttonText}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-headline">จดทะเบียนธุรกิจใหม่ (New Setup)</h2>
                <p className="text-primary-foreground/90 leading-relaxed">
                  เราช่วยดูแลตั้งแต่การจองชื่อนิติบุคคล จัดเตรียมเอกสารข้อบังคับบริษัท จนถึงการยื่นจดทะเบียนต่อกรมพัฒนาธุรกิจการค้า (DBD) พร้อมให้คำปรึกษาเรื่องโครงสร้างผู้ถือหุ้นและทุนจดทะเบียนที่เหมาะสมกับประเภทธุรกิจของคุณ
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span>จดทะเบียนบริษัทจำกัด / ห้างหุ้นส่วนจำกัด</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span>ขอหนังสือรับรอง และเอกสารสำคัญของบริษัท</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span>ขึ้นทะเบียนนายจ้าง (ประกันสังคม)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span>จดทะเบียนภาษีมูลค่าเพิ่ม (VAT)</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-card text-card-foreground p-8 rounded-2xl">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-primary">บริการเปลี่ยนแปลงทางทะเบียน</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-6">สำหรับการขยายธุรกิจหรือการปรับปรุงโครงสร้างนิติบุคคล</p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-lg shadow-sm">
                      <span className="font-bold text-primary mr-2">01.</span> เปลี่ยนแปลงชื่อบริษัท/ตราประทับ
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg shadow-sm">
                      <span className="font-bold text-primary mr-2">02.</span> เพิ่ม/ลดทุนจดทะเบียน
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg shadow-sm">
                      <span className="font-bold text-primary mr-2">03.</span> เปลี่ยนแปลงกรรมการ/ที่ตั้งสำนักงาน
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg shadow-sm">
                      <span className="font-bold text-primary mr-2">04.</span> จดทะเบียนเลิกและชำระบัญชี
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-secondary">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-foreground">เริ่มต้นธุรกิจใน 1 วัน</h2>
                <p className="text-muted-foreground mb-12 max-w-xl mx-auto">เราจัดการทุกขั้นตอนให้คุณพร้อมดำเนินธุรกิจได้ทันที</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="p-6 bg-card text-left">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
                        <h4 className="font-bold mb-2 text-xl">ให้คำปรึกษา</h4>
                        <p className="text-sm text-muted-foreground">วิเคราะห์ประเภทธุรกิจและวางแผนโครงสร้างผู้ถือหุ้น</p>
                    </Card>
                    <Card className="p-6 bg-card text-left">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
                        <h4 className="font-bold mb-2 text-xl">เตรียมเอกสาร</h4>
                        <p className="text-sm text-muted-foreground">รวบรวมข้อมูลและเซ็นเอกสารผ่านระบบออนไลน์หรือที่สำนักงาน</p>
                    </Card>
                    <Card className="p-6 bg-card text-left">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
                        <h4 className="font-bold mb-2 text-xl">ได้รับเอกสาร</h4>
                        <p className="text-sm text-muted-foreground">รับหนังสือรับรองบริษัทและเปิดบัญชีธนาคารได้ทันที</p>
                    </Card>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
