"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ChevronDown,
  FileText,
  Calculator,
  FileCheck,
  Briefcase,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/landing/language-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { isEnglishPath, toEnglishHref } from "@/lib/i18n-routes";

interface SubLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavLink {
  href: string;
  label: string;
  subLinks?: SubLink[];
}

/**
 * ข้อความเมนูทั้งสองภาษา — href เขียนเป็น URL ไทยชุดเดียว
 * ฝั่งอังกฤษแปลง href ผ่าน toEnglishHref() จาก lib/i18n-routes.ts
 * หน้าไหนยังไม่มีคู่ (เช่น /blog) ลิงก์จะไปหน้าไทยตรงๆ และป้ายบอกไว้ว่าเป็นภาษาไทย
 */
const COPY = {
  th: {
    services: {
      registration: "บริการจดทะเบียนบริษัท",
      accounting: "บริการทำบัญชี",
      audit: "บริการตรวจสอบบัญชี",
      orgSystem: "บริการวางระบบองค์กร",
    },
    nav: {
      home: "หน้าแรก",
      services: "บริการของเรา",
      about: "เกี่ยวกับเรา",
      blog: "บทความน่ารู้",
      internship: "นักศึกษาฝึกงาน",
      quote: "นัดหมาย",
    },
    contact: "ติดต่อ",
  },
  en: {
    services: {
      registration: "Company Registration",
      accounting: "Accounting Services",
      audit: "Audit Services",
      orgSystem: "Organization System Setup",
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      blog: "Articles (Thai)",
      internship: "Internship",
      quote: "Book a Meeting",
    },
    contact: "Contact",
  },
} as const;

function buildNav(lang: "th" | "en") {
  const c = COPY[lang];
  const href = (h: string) => (lang === "en" ? toEnglishHref(h) : h);
  const serviceSubLinks: SubLink[] = [
    { href: href("/company-registration"), label: c.services.registration, icon: FileText },
    { href: href("/accounting-services"), label: c.services.accounting, icon: Calculator },
    { href: href("/audit-services"), label: c.services.audit, icon: FileCheck },
    { href: href("/visa-work-permit"), label: "IC Visa / Work Permit", icon: Briefcase },
    { href: href("/organization-system"), label: c.services.orgSystem, icon: Workflow },
  ];
  const navLinks: NavLink[] = [
    { href: href("/"), label: c.nav.home },
    { href: href("/#services"), label: c.nav.services, subLinks: serviceSubLinks },
    { href: href("/about"), label: c.nav.about },
    { href: "/blog", label: c.nav.blog },
    { href: href("/internship"), label: c.nav.internship },
    { href: href("/quote"), label: c.nav.quote },
  ];
  return {
    navLinks,
    homeHref: href("/"),
    visaHref: href("/visa-work-permit"),
    mediaHref: href("/media-content"),
    contact: c.contact,
  };
}

export function Header() {
  const lang = isEnglishPath(usePathname()) ? "en" : "th";
  const { navLinks, homeHref, visaHref, mediaHref, contact } = buildNav(lang);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Background Blur Overlay */}
      {isClient && (
        <div
          className={cn(
            "fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-500 pointer-events-none z-[-1]",
            isServicesOpen ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        />
      )}

      <div className="relative bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        {/* Main Navigation Bar */}
        <div>
          {/* ไม่ใช้ container เพราะ container ล็อกความกว้างไว้ 1280px จนกว่าจอจะถึง 1536px
              จอ MacBook (1440–1512px) จึงได้พื้นที่เท่าจอ 1280px เมนูภาษาไทยตกเป็นสองบรรทัด */}
          <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 md:px-6">
            <Link href={homeHref} className="mr-6 flex items-center gap-2" prefetch={false}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media"
                alt="IC Accounting & Service สำนักงานบัญชีเชียงใหม่"
                width={180}
                height={45}
                className="object-contain h-10 w-auto"
                priority
              />
            </Link>
            <nav className="hidden flex-1 items-center justify-center gap-6 text-base font-medium md:flex">
              {navLinks.map((link) =>
                link.subLinks ? (
                  <div
                    key={link.label}
                    className="relative h-16 flex items-center"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="flex items-center gap-1 text-foreground/70 transition-colors hover:text-primary outline-none cursor-default py-4">
                      {link.label} <ChevronDown className={cn("relative top-[1px] h-4 w-4 transition-transform duration-200", isServicesOpen ? "rotate-180" : "")} />
                    </div>
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 z-50 pt-0">
                        <div className="overflow-hidden rounded-xl border bg-popover p-2 text-popover-foreground shadow-2xl animate-in fade-in-0 slide-in-from-top-5 duration-500 fill-mode-both">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.label}
                              href={subLink.href}
                              className="relative flex select-none items-center gap-3 rounded-lg px-4 py-3 text-base outline-none transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <subLink.icon className="h-5 w-5" />
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-foreground/70 transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
            <div className="flex items-center gap-2 ml-auto">
              {/* ปุ่มสลับภาษา โผล่เฉพาะหน้าที่มีครบสองภาษา ดูเงื่อนไขในคอมโพเนนต์ */}
              {/* ต้องเห็นบนมือถือด้วย ไม่ใช่ซ่อนไว้เฉพาะจอใหญ่
                  เพราะชาวต่างชาติที่หาข้อมูลวีซ่าส่วนใหญ่เปิดจากมือถือ
                  ถ้าซ่อน เขาจะไม่รู้เลยว่ามีฉบับภาษาอังกฤษอยู่ */}
              <LanguageSwitcher className="mr-1" />
              <Button asChild className="hidden md:flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:opacity-90 transition-opacity">
                <Link href={visaHref}>IC Visa / Work Permit</Link>
              </Button>
              <Button asChild className="hidden md:flex rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                <Link href={mediaHref}>Exclusive Media</Link>
              </Button>
              <Button asChild className="hidden sm:flex rounded-full">
                <Link href="https://qr-official.line.me/gs/M_374jshvh_GW.png?oat_content=qr" target="_blank">
                  {contact}
                </Link>
              </Button>

              {isClient && (
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col h-full">
                      <nav className="grid gap-6 text-lg font-medium mt-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Image
                            src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media"
                            alt="IC Accounting & Service สำนักงานบัญชีเชียงใหม่"
                            width={150}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        {navLinks.map((link) =>
                          link.subLinks ? (
                            <Accordion key={link.label} type="single" collapsible className="w-full">
                              <AccordionItem value="services" className="border-b-0">
                                <AccordionTrigger className="py-0 text-lg font-medium text-muted-foreground hover:text-primary hover:no-underline">
                                  {link.label}
                                </AccordionTrigger>
                                <AccordionContent className="pt-4 pl-4">
                                  <div className="grid gap-4">
                                    {link.subLinks.map((subLink) => (
                                      <Link
                                        key={subLink.label}
                                        href={subLink.href}
                                        onClick={() => setIsSheetOpen(false)}
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                                        prefetch={false}
                                      >
                                        <subLink.icon className="h-5 w-5" />
                                        {subLink.label}
                                      </Link>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ) : (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={() => setIsSheetOpen(false)}
                              className="text-muted-foreground hover:text-primary"
                              prefetch={false}
                            >
                              {link.label}
                            </Link>
                          )
                        )}
                        <Button asChild className="rounded-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:opacity-90 transition-opacity">
                          <Link href={visaHref} onClick={() => setIsSheetOpen(false)}>IC Visa / Work Permit</Link>
                        </Button>
                        <Button asChild className="rounded-full mt-4 bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                          <Link href={mediaHref} onClick={() => setIsSheetOpen(false)}>Exclusive Media</Link>
                        </Button>
                        <Button asChild className="rounded-full mt-4">
                          <Link href="https://qr-official.line.me/gs/M_374jshvh_GW.png?oat_content=qr" onClick={() => setIsSheetOpen(false)} target="_blank">
                            {contact}
                          </Link>
                        </Button>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
