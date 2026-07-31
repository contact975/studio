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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface SubLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const serviceSubLinks: SubLink[] = [
  { href: "/company-registration", label: "บริการจดทะเบียนบริษัท", icon: FileText },
  { href: "/accounting-services", label: "บริการทำบัญชี", icon: Calculator },
  { href: "/audit-services", label: "บริการตรวจสอบบัญชี", icon: FileCheck },
  { href: "/visa-work-permit", label: "บริการทำ Visa & Work Permit", icon: Briefcase },
  { href: "/organization-system", label: "บริการวางระบบองค์กร", icon: Workflow },
];

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  {
    href: "/#services",
    label: "บริการของเรา",
    subLinks: serviceSubLinks,
  },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blog", label: "บทความน่ารู้" },
  { href: "/quote", label: "นัดหมาย" },
];

export function Header() {
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
          <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
            <Link href="/" className="mr-6 flex items-center gap-2" prefetch={false}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Logo%20ic.png?alt=media"
                alt="IC Accounting & Service Logo"
                width={180}
                height={45}
                className="object-contain h-10 w-auto"
                priority
              />
            </Link>
            <nav className="hidden flex-1 items-center justify-center gap-8 text-base font-medium md:flex">
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
              <Button asChild className="hidden md:flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:opacity-90 transition-opacity">
                <Link href="/expat-services">IC Expat Services</Link>
              </Button>
              <Button asChild className="hidden md:flex rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                <Link href="/media-content">บริการ Exclusive Media</Link>
              </Button>
              <Button asChild className="hidden sm:flex rounded-full">
                <Link href="https://qr-official.line.me/gs/M_374jshvh_GW.png?oat_content=qr" target="_blank">
                  ติดต่อ
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
                            alt="IC Accounting & Service Logo"
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
                          <Link href="/expat-services" onClick={() => setIsSheetOpen(false)}>IC Expat Services</Link>
                        </Button>
                        <Button asChild className="rounded-full mt-4 bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                          <Link href="/media-content" onClick={() => setIsSheetOpen(false)}>บริการ Exclusive Media</Link>
                        </Button>
                        <Button asChild className="rounded-full mt-4">
                          <Link href="https://qr-official.line.me/gs/M_374jshvh_GW.png?oat_content=qr" onClick={() => setIsSheetOpen(false)} target="_blank">
                            ติดต่อ
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
