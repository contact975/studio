"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import { ArrowUp, MapPin, Mail, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ลงทะเบียน ScrollTrigger เฉพาะฝั่ง client (ไฟล์นี้ถูก import ตอน SSR ด้วย)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. STYLES
//
// ต้นฉบับเขียนด้วย color-mix(in oklch, var(--foreground) …) สำหรับ Tailwind v4
// แต่โปรเจกต์นี้ใช้ Tailwind v3 ที่เก็บ token เป็น "221 65% 45%" (ช่อง HSL ล้วน)
// จึงต้องเขียนเป็น hsl(var(--token) / alpha) แทน ไม่งั้นสีจะกลายเป็นค่า invalid ทั้งหมด
//
// ฟุตเตอร์นี้ override token เป็นโทนกรมท่าเข้มเฉพาะในตัวเอง (คลาส cinematic-footer-wrapper)
// class ของ Tailwind อย่าง bg-background / text-muted-foreground ข้างในจึงกลายเป็นโทนมืดตาม
// โดยไม่กระทบส่วนอื่นของเว็บ — สีเดียวกับ section "รู้จัก IC" (#050d1f) เพื่อให้ดูเป็นชุดเดียวกัน
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  /* โทนน้ำเงิน CI: ไล่จากน้ำเงิน CTA (#1a3f8f) ด้านบน ลงไปน้ำเงินเข้มด้านล่าง */
  --background: 221 64% 16%;
  --foreground: 0 0% 100%;
  --muted-foreground: 219 50% 82%;
  --border: 221 45% 55%;
  background-image: linear-gradient(180deg, hsl(221 60% 26%) 0%, hsl(221 64% 16%) 45%, hsl(222 66% 10%) 100%);

  --pill-bg-1: hsl(var(--foreground) / 0.06);
  --pill-bg-2: hsl(var(--foreground) / 0.02);
  --pill-shadow: hsl(var(--background) / 0.5);
  --pill-highlight: hsl(var(--foreground) / 0.12);
  --pill-inset-shadow: hsl(var(--background) / 0.8);
  --pill-border: hsl(var(--foreground) / 0.1);

  --pill-bg-1-hover: hsl(var(--foreground) / 0.12);
  --pill-bg-2-hover: hsl(var(--foreground) / 0.04);
  --pill-border-hover: hsl(var(--foreground) / 0.28);
  --pill-shadow-hover: hsl(var(--background) / 0.7);
  --pill-highlight-hover: hsl(var(--foreground) / 0.25);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    hsl(212 90% 62% / 0.45) 0%,
    hsl(var(--primary) / 0.25) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: hsl(var(--foreground));
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 700;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px hsl(var(--foreground) / 0.06);
  background: linear-gradient(180deg, hsl(var(--foreground) / 0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.55) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px hsl(var(--primary) / 0.35));
}

/*
 * โหมด "ม่านเปิด" — เปิดเฉพาะจอที่กว้าง ≥ 768px และสูง ≥ 600px
 * เพราะ footer ต้องเป็น fixed สูงเท่าจอพอดี ถ้าจอเตี้ยกว่านั้นลิงก์แถวล่างจะถูกตัดหาย
 * จอเล็กกว่าเงื่อนไขนี้จะได้ footer แบบ flow ปกติ (สูงตามเนื้อหา) แทน
 */
@media (min-width: 768px) and (min-height: 600px) {
  .cinematic-footer-curtain { height: 100vh; }
  .cinematic-footer-curtain > .cinematic-footer-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100vh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee { animation: none; }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON
// ปุ่ม/ลิงก์ที่ "ดูด" ตามเมาส์ด้วย GSAP — ใช้ได้ทั้ง <button>, <a> และ next/link ผ่าน prop `as`
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element || prefersReducedMotion()) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. TYPES
// -------------------------------------------------------------------------
export interface FooterLink {
  href: string;
  label: string;
  /** ลิงก์ออกนอกเว็บ (LINE, Facebook, Google Maps) จะเปิดแท็บใหม่ */
  external?: boolean;
}

export interface FooterAction extends FooterLink {
  icon: LucideIcon;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface CinematicFooterProps {
  /** ข้อความยักษ์จางๆ ด้านหลัง (ควรสั้น ≤ 6 ตัวอักษร เพราะขนาด 26vw) */
  brandText: string;
  heading: React.ReactNode;
  /** ข้อความวิ่งด้านบน (เช่น รายชื่อบริการ) */
  marqueeItems: string[];
  /** ปุ่มหลัก เช่น LINE / โทร / นัดหมาย */
  primaryActions: FooterAction[];
  /** กลุ่มลิงก์ภายในเว็บ — สำคัญต่อ SEO ต้องเป็น <a> จริงใน HTML */
  linkGroups: FooterLinkGroup[];
  contact: {
    /** ที่ทำการจริง (ตรงกับหมุด Google Business Profile) */
    address: string;
    mapUrl: string;
    email: string;
    /** ที่อยู่จดทะเบียน + เลขผู้เสียภาษี — แสดงเป็นข้อมูลรอง ไม่ใส่ใน schema */
    registeredAddress?: string;
  };
  social: FooterAction[];
  companyName: string;
  className?: string;
}

// -------------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------------
function Marquee({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-10 px-5">
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <span className="whitespace-nowrap">{item}</span>
          <span className={i % 2 === 0 ? "text-primary" : "text-muted-foreground/60"}>✦</span>
        </React.Fragment>
      ))}
    </div>
  );
}

// เปิดแท็บใหม่เฉพาะลิงก์ http(s) — tel:/mailto: ต้องเปิดในแท็บเดิมถึงจะเรียกแอปโทร/อีเมลได้
const linkTargetProps = (link: FooterLink) =>
  link.external && /^https?:/.test(link.href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

export function CinematicFooter({
  brandText,
  heading,
  marqueeItems,
  primaryActions,
  linkGroups,
  contact,
  social,
  companyName,
  className,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // ปีลิขสิทธิ์คำนวณฝั่ง client เหมือนฟุตเตอร์เดิม เลี่ยง hydration mismatch ช่วงข้ามปี
  const [year, setYear] = React.useState<number | string>("");
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || prefersReducedMotion()) return;

    // gsap.context ทำให้ cleanup ถูกต้องใน React Strict Mode
    const ctx = gsap.context(() => {
      // ตัวหนังสือยักษ์ด้านหลังค่อยๆ ลอยขึ้นตามการเลื่อน
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // หัวข้อ + ลิงก์โผล่ทีละชุด
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/*
        เอฟเฟกต์ "ม่านเปิด": wrapper อยู่ใน flow ปกติแต่มี clip-path
        ตัว <footer> ข้างในเป็น fixed ติดขอบล่างจอ จึงมองเห็นได้เฉพาะภายในกรอบ wrapper
        พอผู้ใช้เลื่อนลงมาถึง wrapper เนื้อหาด้านบนจะค่อยๆ เปิดออกให้เห็นฟุตเตอร์ที่รออยู่ข้างใต้

        บนมือถือ/จอเตี้ย ใช้ flow ปกติแทน (ดู media query ใน STYLES) เพราะ 100vh บนมือถือ
        เล็กเกินกว่าจะใส่ลิงก์ทั้งหมด และ URL bar ที่ยืดหดจะทำให้ส่วนล่างของ fixed element โดนบังได้
      */}
      <div
        ref={wrapperRef}
        className={cn("cinematic-footer-curtain relative w-full", className)}
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          id="contact"
          className="cinematic-footer-wrapper relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-background text-foreground"
        >
          {/* แสงและกริดพื้นหลัง */}
          <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          {/* ตัวหนังสือยักษ์ด้านหลัง */}
          <div
            ref={giantTextRef}
            aria-hidden="true"
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            {brandText}
          </div>

          {/* 1. แถบข้อความวิ่งเอียงด้านบน */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-10 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/40 bg-background/60 py-3 shadow-2xl backdrop-blur-md md:top-12 md:py-4"
          >
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-semibold tracking-wide text-muted-foreground md:text-sm">
              <Marquee items={marqueeItems} />
              <Marquee items={marqueeItems} />
            </div>
          </div>

          {/* 2. เนื้อหากลาง */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-6 pt-28 md:pt-32">
            <p
              ref={headingRef}
              className="footer-text-glow mb-6 max-w-4xl text-center text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:mb-8 lg:text-6xl xl:text-7xl"
            >
              {heading}
            </p>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-4">
              {/* ปุ่มหลัก: LINE / โทร / นัดหมาย */}
              <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
                {primaryActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <MagneticButton
                      key={action.href}
                      as={action.external ? "a" : Link}
                      href={action.href}
                      {...linkTargetProps(action)}
                      className="footer-glass-pill group flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold text-foreground md:px-9 md:py-4 md:text-base"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground md:h-6 md:w-6" />
                      {action.label}
                    </MagneticButton>
                  );
                })}
              </div>

              {/* ลิงก์ภายในเว็บ — บริการ / เกี่ยวกับ IC */}
              {linkGroups.map((group) => (
                <nav
                  key={group.title}
                  aria-label={group.title}
                  className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-3"
                >
                  <span className="mr-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 md:text-xs">
                    {group.title}
                  </span>
                  {group.links.map((link) => (
                    <MagneticButton
                      key={link.href}
                      as={link.external ? "a" : Link}
                      href={link.href}
                      {...linkTargetProps(link)}
                      className="footer-glass-pill rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground md:px-5 md:py-2.5 md:text-sm"
                    >
                      {link.label}
                    </MagneticButton>
                  ))}
                </nav>
              ))}
            </div>
          </div>

          {/* 3. แถวล่าง: ที่อยู่ / badge / โซเชียล + กลับขึ้นบน */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 px-6 pb-6 md:flex-row md:px-12">
            <div className="order-2 flex flex-col items-center gap-1.5 text-center text-[11px] text-muted-foreground md:order-1 md:items-start md:text-left md:text-xs">
              <p className="font-semibold uppercase tracking-widest">
                © {year} {companyName}. All rights reserved.
              </p>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {contact.address}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {contact.email}
              </a>
              {contact.registeredAddress && (
                <p className="flex items-start gap-1.5 text-muted-foreground/70">
                  <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{contact.registeredAddress}</span>
                </p>
              )}
            </div>

            <div className="order-3 flex items-center gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <MagneticButton
                    key={item.href}
                    as="a"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="footer-glass-pill flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </MagneticButton>
                );
              })}
              <MagneticButton
                as="button"
                type="button"
                onClick={scrollToTop}
                aria-label="กลับขึ้นด้านบน"
                className="footer-glass-pill group flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <ArrowUp className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
