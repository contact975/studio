"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const serviceSubLinks = [
  { href: "/#services", label: "บริการจดทะเบียนบริษัท" },
  { href: "/#services", label: "บริการทำบัญชี" },
  { href: "/#services", label: "บริการตรวจสอบบัญชี" },
  { href: "/#services", label: "บริการทำ Visa & Work Permit" },
  { href: "/#services", label: "บริการ วางระบบองค์กร" },
  { href: "/#services", label: "บริการผลิต Media Content Online" },
];

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { 
    href: "/#services", 
    label: "บริการของเรา",
    subLinks: serviceSubLinks,
  },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/#contact", label: "ติดต่อเรา" },
];

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2" prefetch={false}>
          <Image src="https://live.staticflickr.com/65535/55057079017_ab04e1a929_q.jpg" alt="IC Accounting Logo" width={40} height={40} />
          <Image src="https://live.staticflickr.com/65535/55057990986_3f24fbba55_w.jpg" alt="IC Accounting" width={120} height={35} />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 text-base font-medium md:flex">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div className="flex items-center gap-1 text-foreground/70 transition-colors hover:text-foreground outline-none cursor-default h-16">
                  {link.label} <ChevronDown className={`relative top-[1px] h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </div>
                {isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 slide-in-from-top-2">
                     {link.subLinks.map((subLink) => (
                      <Link 
                        key={subLink.label} 
                        href={subLink.href}
                        className="relative flex select-none items-center gap-2 rounded-sm px-3 py-2 text-base outline-none transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/70 transition-colors hover:text-foreground"
                prefetch={false}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Button asChild className="hidden sm:flex rounded-full">
            <Link href="https://line.me/ti/p/~" target="_blank">
              ติดต่อเรา
            </Link>
          </Button>
          {isClient && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    <Image src="https://live.staticflickr.com/65535/55057079017_ab04e1a929_q.jpg" alt="IC Accounting Logo" width={24} height={24} />
                    <span className="sr-only">IC Accounting</span>
                  </Link>
                  {navLinks.map((link) =>
                    link.subLinks ? (
                      <Accordion key={link.label} type="single" collapsible className="w-full">
                          <AccordionItem value="services" className="border-b-0">
                            <AccordionTrigger className="py-0 text-lg font-medium text-muted-foreground hover:text-foreground hover:no-underline">
                              {link.label}
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pl-4">
                              <div className="grid gap-4">
                                {link.subLinks.map((subLink) => (
                                  <Link
                                    key={subLink.label}
                                    href={subLink.href}
                                    className="text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                  >
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
                        className="text-muted-foreground hover:text-foreground"
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  <Button asChild className="rounded-full mt-4">
                    <Link href="https://line.me/ti/p/~" target="_blank">
                      ติดต่อเรา
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
