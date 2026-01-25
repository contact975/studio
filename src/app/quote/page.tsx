'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function QuotePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-secondary/50">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">ขอใบเสนอราคา</h1>
            <p className="text-muted-foreground">กรอกข้อมูลเบื้องต้นเพื่อให้ทีมงาน IC Accounting ประเมินค่าบริการที่เหมาะสมสำหรับธุรกิจคุณ</p>
          </div>

          <Card className="rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <CardContent className="p-8 md:p-12">
              <form id="quoteForm">
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">1</span>
                    ข้อมูลกิจการ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-foreground mb-2">ประเภทนิติบุคคล *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">บริษัทจำกัด</SelectItem>
                          <SelectItem value="partnership">ห้างหุ้นส่วนจำกัด</SelectItem>
                          <SelectItem value="individual">บุคคลธรรมดา / จด VAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-foreground mb-2">จำนวนรายการต่อเดือน (ประมาณ) *</Label>
                      <Select required>
                        <SelectTrigger>
                            <SelectValue placeholder="เลือกจำนวนรายการ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-15">1 - 15 รายการ</SelectItem>
                          <SelectItem value="16-50">16 - 50 รายการ</SelectItem>
                          <SelectItem value="51-100">51 - 100 รายการ</SelectItem>
                          <SelectItem value="100+">มากกว่า 100 รายการ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">2</span>
                    บริการที่ต้องการ
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Label className="cursor-pointer group">
                      <Checkbox className="hidden peer" name="service" value="accounting" />
                      <div className="p-4 border border-border rounded-xl text-center peer-checked:border-primary peer-checked:bg-accent transition">
                        <span className="text-xs font-semibold block text-foreground">ทำบัญชี/ภาษี</span>
                      </div>
                    </Label>
                    <Label className="cursor-pointer group">
                      <Checkbox className="hidden peer" name="service" value="audit" />
                      <div className="p-4 border border-border rounded-xl text-center peer-checked:border-primary peer-checked:bg-accent transition">
                        <span className="text-xs font-semibold block text-foreground">ตรวจสอบบัญชี</span>
                      </div>
                    </Label>
                    <Label className="cursor-pointer group">
                      <Checkbox className="hidden peer" name="service" value="registration" />
                      <div className="p-4 border border-border rounded-xl text-center peer-checked:border-primary peer-checked:bg-accent transition">
                        <span className="text-xs font-semibold block text-foreground">จดทะเบียนธุรกิจ</span>
                      </div>
                    </Label>
                    <Label className="cursor-pointer group">
                        <Checkbox className="hidden peer" name="service" value="media" />
                      <div className="p-4 border border-border rounded-xl text-center peer-checked:border-primary peer-checked:bg-accent transition">
                        <span className="text-xs font-semibold block text-foreground">Exclusive Media</span>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">3</span>
                    ข้อมูลผู้ติดต่อ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input type="text" placeholder="ชื่อ-นามสกุล *" required />
                    <Input type="tel" placeholder="เบอร์โทรศัพท์ *" required />
                    <Input type="email" placeholder="อีเมล" className="md:col-span-2" />
                  </div>
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="w-full md:w-auto rounded-full font-bold shadow-lg hover:-translate-y-1 transition-transform duration-300">
                    ส่งคำขอใบเสนอราคา
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">* ทีมงานจะติดต่อกลับภายใน 24 ชม. ในวันทำการ</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
