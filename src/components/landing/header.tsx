"use client";

import Link from "next/link";
import {
  BookUser,
  Menu,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#", label: "หน้าแรก" },
  { href: "#services", label: "บริการของเรา" },
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#contact", label: "ติดต่อเรา" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
          <BookUser className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-primary">IC Accounting</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Button asChild className="hidden sm:flex bg-green-500 hover:bg-green-600 text-white rounded-full">
            <Link href="https://line.me/ti/p/~" target="_blank">
              <MessageCircle className="mr-2 h-5 w-5" />
              ติดต่อทาง Line
            </Link>
          </Button>
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                  prefetch={false}
                >
                  <BookUser className="h-6 w-6 text-primary" />
                  <span className="sr-only">IC Accounting</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full mt-4">
                  <Link href="https://line.me/ti/p/~" target="_blank">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    ติดต่อทาง Line
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
