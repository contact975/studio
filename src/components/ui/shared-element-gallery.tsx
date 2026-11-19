"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * แกลเลอรีแบบ masonry ที่กดรูปแล้วรูปขยายเต็มจอแบบต่อเนื่อง (shared-element transition)
 * ดัดแปลงจากคอมโพเนนต์ shared-element-gallery ของ 21st.dev ให้เข้ากับเว็บนี้
 *
 * ── ต่างจากต้นฉบับ ──
 * - ใช้ next/image แทน <img> ต้นฉบับโหลดไฟล์เต็มขนาด (รูปทีมงานบางรูป 3,600px / 600 KB)
 *   ซึ่งจะดึงคะแนนความเร็วมือถือลง — next/image ย่อและแปลงเป็น WebP ให้ตามขนาดจอ
 * - ต้องส่ง width/height จริงของรูปมาด้วย คอลัมน์ masonry จะได้จองที่ไว้ก่อนรูปโหลด (ไม่มี layout shift)
 * - รูปย่อเป็น <button> และหน้าต่างขยายเป็น role="dialog" ใช้คีย์บอร์ดได้ กด Esc ปิดได้
 * - คืนค่า overflow ของ body เป็นค่าเดิม ('') ไม่ใช่ 'auto' ไม่งั้นไปทับ style อื่นของหน้า
 * - เคารพการตั้งค่าลดการเคลื่อนไหวของผู้ใช้ (MotionConfig reducedMotion="user")
 * - หน้าต่างขยาย render ผ่าน portal ไปที่ <body> เพราะ section ในหน้าแรกอยู่ใต้ element ที่มี transform
 *   ซึ่งทำให้ position: fixed อิงกับ element นั้นแทนจอ หน้าต่างจึงไปโผล่กลางหน้าแทนที่จะเต็มจอ
 */

export interface GalleryImageData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryContextType {
  selected: GalleryImageData | null;
  setSelected: (image: GalleryImageData | null) => void;
  closeLabel: string;
}

const GalleryContext = React.createContext<GalleryContextType | null>(null);

const spring = { type: "spring", stiffness: 350, damping: 35, mass: 1 } as const;

export function Gallery({ children, closeLabel = "Close" }: { children: React.ReactNode; closeLabel?: string }) {
  const [selected, setSelected] = React.useState<GalleryImageData | null>(null);

  React.useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <MotionConfig reducedMotion="user">
      <GalleryContext.Provider value={{ selected, setSelected, closeLabel }}>
        {children}
        <GalleryModal />
      </GalleryContext.Provider>
    </MotionConfig>
  );
}

export function GalleryGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4", className)}>{children}</div>;
}

export function GalleryImage({
  image,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px",
  className,
}: {
  image: GalleryImageData;
  sizes?: string;
  className?: string;
}) {
  const context = React.useContext(GalleryContext);
  if (!context) throw new Error("GalleryImage must be used within a Gallery");
  const isOpen = context.selected?.id === image.id;

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      onClick={() => context.setSelected(image)}
      aria-label={image.alt}
      className={cn(
        "group relative mb-3 md:mb-4 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      {/* ซ่อนรูปย่อระหว่างเปิด เพื่อให้ดูเหมือนรูปเดียวกันลอยออกไป */}
      <motion.div
        layoutId={`gallery-${image.id}`}
        variants={{ hover: { scale: 0.98 }, tap: { scale: 0.95 } }}
        transition={spring}
        className={cn("relative overflow-hidden rounded-2xl", isOpen && "opacity-0")}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <Image src={image.src} alt="" fill sizes={sizes} quality={72} loading="lazy" className="object-cover" />
      </motion.div>
      <motion.div
        variants={{ hover: { opacity: 1 }, tap: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-black/10"
      />
    </motion.button>
  );
}

function GalleryModal() {
  const context = React.useContext(GalleryContext);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const selected = context?.selected ?? null;

  React.useEffect(() => {
    if (selected) closeRef.current?.focus();
  }, [selected]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!context || !mounted) return null;
  const { setSelected, closeLabel } = context;
  const close = () => setSelected(null);

  return createPortal(
    <AnimatePresence>
      {selected && (
        <div role="dialog" aria-modal="true" aria-label={selected.alt} className="fixed inset-0 z-[60] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={close}
          />

          {/* ลากขึ้น/ลงเพื่อปิด แบบเดียวกับแอปรูปภาพบนมือถือ */}
          <motion.div
            className="relative z-10 flex h-full w-full cursor-zoom-out items-center justify-center p-4"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 300) close();
            }}
            onClick={close}
          >
            <motion.div
              layoutId={`gallery-${selected.id}`}
              transition={spring}
              className="relative overflow-hidden rounded-2xl shadow-2xl will-change-transform"
              style={{
                aspectRatio: `${selected.width} / ${selected.height}`,
                width: `min(95vw, calc(90vh * ${selected.width} / ${selected.height}))`,
              }}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="95vw"
                quality={75}
                draggable={false}
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.button
            ref={closeRef}
            type="button"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            onClick={close}
            aria-label={closeLabel}
            className="absolute right-6 top-6 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
