"use client"

import Link from "next/link";
import Image from "next/image";
import { Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

/**
 * ลิงก์ในฟุตเตอร์ — ส่วนที่หายไปทั้งเว็บ
 *
 * เมนู "บริการของเรา" บน header สร้างลิงก์ต่อเมื่อผู้ใช้เอาเมาส์ไปชี้
 * ({isServicesOpen && ...}) แปลว่าใน HTML ที่ส่งให้ Google
 * ไม่มีลิงก์ไปหน้าบริการสักหน้าเดียว ทั้งเว็บมีลิงก์ภายในแค่ 3 ลิงก์
 *
 * Google ใช้โครงลิงก์ภายในเป็นตัวหลักในการเลือก sitelink และประเมินว่า
 * หน้าไหนสำคัญ เมื่อไม่มีลิงก์ให้เดินตาม จึงต้องเดาเอง — และไปหยิบ
 * alt ของโลโก้มาเป็นชื่อลิงก์แทน
 *
 * ฟุตเตอร์อยู่ทุกหน้าอยู่แล้ว การใส่ลิงก์ตรงนี้จึงทำให้ทุกหน้าบริการ
 * ได้ลิงก์จากทุกหน้าในเว็บทันที โดยไม่ต้องแตะโครงสร้าง header เลย
 */
const footerServiceLinks = [
  { href: "/accounting-services", label: "รับทำบัญชีและภาษี" },
  { href: "/company-registration", label: "จดทะเบียนบริษัท" },
  { href: "/audit-services", label: "ตรวจสอบบัญชี" },
  { href: "/visa-work-permit", label: "Visa & Work Permit" },
  { href: "/organization-system", label: "วางระบบองค์กร" },
  { href: "/media-content", label: "Exclusive Media Production" },
];

const footerCompanyLinks = [
  { href: "/expat-services", label: "IC Expat Services (English)" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blog", label: "บทความน่ารู้" },
  { href: "/quote", label: "นัดหมายปรึกษา" },
];

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState<number | string>("");

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">

          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media" 
                alt="IC Accounting & Service สำนักงานบัญชีเชียงใหม่" 
                width={200} 
                height={50}
                className="object-contain brightness-0 invert"
              />
            </Link>
            
            <div className="space-y-3 text-sm">
               <h3 className="font-headline text-xl font-bold text-primary-foreground">ติดต่อเรา (Contact Us)</h3>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <p className="text-primary-foreground/80">80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="tel:0957161422" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">095-716-1422</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="mailto:contact@icaccservice.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">contact@icaccservice.com</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-primary-foreground">ติดตามเรา (Follow Us)</h4>
              <div className="flex space-x-3">
                <Link href="https://www.facebook.com/icaccservice" target="_blank" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" prefetch={false}>
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" prefetch={false}>
                  <MessageCircle className="h-6 w-6" />
                  <span className="sr-only">Line</span>
                </Link>
              </div>
            </div>
          </div>

          <nav aria-label="ลิงก์บริการทั้งหมด" className="lg:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-headline text-lg font-bold mb-3 text-primary-foreground">บริการของเรา</h3>
              <ul className="space-y-2">
                {footerServiceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold mb-3 text-primary-foreground">เกี่ยวกับ IC</h3>
              <ul className="space-y-2">
                {footerCompanyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="relative w-full h-full min-h-[180px] md:min-h-[240px] lg:min-h-full lg:col-span-4 rounded-xl overflow-hidden shadow-lg border-2 border-primary-foreground/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.300649716109!2d99.0672194!3d18.7822907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da2518e755b42f%3A0x99c60fd368c56643!2sIC%20Accounting%20%26%20Service!5e0!3m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0"
            ></iframe>
          </div>
        </div>
        
        <Separator className="my-5 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-primary-foreground/70 text-xs">
          <p>© {currentYear} IC Accounting & Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
