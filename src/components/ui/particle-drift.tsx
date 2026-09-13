"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ParticleDrift — พื้นหลังอนุภาคตัวอักษร ASCII ลอยลง + ลำแสงพุ่งขึ้น + เส้นเชื่อมตามเมาส์
 *
 * พอร์ตมาจากสคริปต์ canvas ใน particle-drift.html ต้นฉบับ (ที่เดิมรันใน iframe
 * พร้อม Tailwind CDN / GSAP / Iconify ทั้งหน้า) ให้เหลือแค่ canvas ตัวเดียว
 * วาดด้วย requestAnimationFrame ตรงๆ ไม่มี dependency ภายนอก
 *
 * - หยุดวาดเมื่อ element หลุดจากจอ (IntersectionObserver) และเมื่อผู้ใช้ตั้ง
 *   prefers-reduced-motion จะวาดเฟรมนิ่งเฟรมเดียว
 * - pointer-events: none — รับตำแหน่งเมาส์จาก window แล้วแปลงเป็นพิกัดใน canvas
 *   จึงวางทับเนื้อหาได้โดยไม่บังการคลิก
 */
export type ParticleDriftProps = {
  /** สีหลัก (ลำแสง, เส้นเชื่อมเมาส์, ตัวอักษรใกล้เมาส์) ในรูป "r, g, b" */
  color?: string;
  /** สีตัวอักษรและเส้นเชื่อมระหว่างอนุภาคตอนปกติ ในรูป "r, g, b" */
  nodeColor?: string;
  /** ตัวคูณจำนวนอนุภาค (1 = 90 ตัวอักษร / 25 ลำแสง ต่อพื้นที่ ~1440×650) */
  density?: number;
  /** ตัวคูณความเร็ว */
  speed?: number;
  /** ความโปร่งใสรวมของทั้งชั้น 0–1 */
  opacity?: number;
  /** แสดงลำแสงพุ่งขึ้นหรือไม่ */
  beams?: boolean;
  /** รัศมีที่เมาส์มีผล (px) */
  interactionRadius?: number;
  className?: string;
  style?: React.CSSProperties;
};

type Node = { x: number; y: number; vy: number; char: string };
type Beam = { x: number; y: number; length: number; speed: number; opacity: number };

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()".split("");
const LINK_DISTANCE = 120;
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function ParticleDrift({
  color = "38, 87, 193", // #2657c1 — primary ของเว็บ
  nodeColor = "38, 87, 193",
  density = 1,
  speed = 1,
  opacity = 1,
  beams: showBeams = true,
  interactionRadius = 180,
  className,
  style,
}: ParticleDriftProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let beams: Beam[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -1000, y: -1000 };

    // จำนวนอนุภาคสเกลตามพื้นที่ จอมือถือจะได้น้อยลงเองไม่ต้องตั้งแยก
    const countFor = (base: number, minimum: number) => {
      const areaFactor = Math.min(1.5, (width * height) / (1440 * 650));
      return Math.max(minimum, Math.round(base * density * areaFactor));
    };

    const initParticles = () => {
      nodes = Array.from({ length: countFor(90, 20) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.4 + 0.1,
        char: randomChar(),
      }));
      beams = Array.from({ length: showBeams ? countFor(25, 6) : 0 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. ลำแสงพุ่งขึ้น
      for (const b of beams) {
        b.y -= b.speed * speed;
        if (b.y + b.length < 0) {
          b.y = height + 100;
          b.x = Math.random() * width;
        }
        const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
        g.addColorStop(0, `rgba(${color}, ${b.opacity})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + b.length);
        ctx.stroke();
      }

      // 2. เส้นเชื่อมระหว่างอนุภาคที่อยู่ใกล้กัน
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${nodeColor}, ${0.18 * (1 - d / LINK_DISTANCE)})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 3. ตัวอักษรลอยลง + ตอบสนองเมาส์
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        n.y += n.vy * speed;
        if (n.y > height + 20) {
          n.y = -20;
          n.x = Math.random() * width;
        }

        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        const near = dist < interactionRadius;
        if (near || Math.random() > 0.98) n.char = randomChar();

        if (near) {
          ctx.strokeStyle = `rgba(${color}, ${0.5 * (1 - dist / interactionRadius)})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = near ? `rgb(${color})` : `rgba(${nodeColor}, 0.45)`;
        ctx.fillText(n.char, n.x, n.y);
      }
    };

    const loop = () => {
      draw();
      raf = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || reduceMotion || !visible) return;
      raf = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    resize();
    if (reduceMotion) draw();
    else start();

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, nodeColor, density, speed, showBeams, interactionRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
      style={{ opacity, ...style }}
    />
  );
}

export default ParticleDrift;
