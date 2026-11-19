"use client";

import { Gallery, GalleryGrid, GalleryImage, type GalleryImageData } from "@/components/ui/shared-element-gallery";
import { fill, type HomeContent } from "./home-content";

/**
 * Behind The Scenes — รูปทีมงานจริงแบบ masonry กดแล้วขยายเต็มจอ (components/ui/shared-element-gallery.tsx)
 *
 * เดิมเป็นสไลด์ครอปทุกรูปเป็นแนวตั้ง 3:4 รูปแนวนอนจึงโดนตัดหัวตัดท้าย
 * แบบ masonry แสดงรูปตามสัดส่วนจริง จึงต้องใส่ width/height จริงของแต่ละไฟล์ไว้ด้วย
 *
 * ── เพิ่มรูปใหม่ ──
 * ย่อเป็น WebP ด้านยาวไม่เกิน 1600px คุณภาพ ~78 แล้ววางใน public/images/behind-the-scenes/
 * (รูปจากมือถือ 1.5–2 MB เหลือ ~100–200 KB และ next/image ย่อซ้ำตามขนาดจอให้อีกชั้น)
 * รูปชุดเก่าอยู่ใน Firebase Storage โฟลเดอร์ "Behide Scene" ใช้ได้ทั้งสองแหล่ง
 */
const STORAGE = "https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Behide%20Scene%2FBehide%20Scene%20";
const fb = (file: string) => `${STORAGE}${file}?alt=media`;
const local = (name: string) => `/images/behind-the-scenes/${name}.webp`;

const PHOTOS: [src: string, width: number, height: number][] = [
  [local("client-meeting"), 1600, 1200],
  [fb("04.jpg"), 709, 945],
  [local("rocq-training-dbd"), 1477, 1108],
  [local("team-training"), 1200, 1600],
  [fb("01.jpg"), 1260, 945],
  [local("client-visit-team"), 1600, 1200],
  [fb("05.jpg"), 709, 945],
  [local("client-consult-cafe"), 1200, 1600],
  [fb("03.jpg"), 1260, 945],
  [fb("17.png"), 1086, 1448],
  [fb("06.jpg"), 709, 945],
  [fb("02.jpg"), 1248, 955],
  [fb("12.jpg"), 1108, 1499],
  [fb("15.png"), 1448, 1086],
  [fb("09.jpg"), 698, 945],
  [fb("16.png"), 1448, 1086],
];

export function BehindTheScenesSection({ c }: { c: HomeContent["behindTheScenes"] }) {
  const images: GalleryImageData[] = PHOTOS.map(([src, width, height], i) => ({
    id: String(i),
    src,
    alt: fill(c.imageAlt, { n: i + 1 }),
    width,
    height,
  }));

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{c.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{c.lead}</p>
          <p className="mt-3 text-xs text-muted-foreground/80">{c.hint}</p>
        </div>

        <Gallery closeLabel={c.close}>
          <GalleryGrid>
            {images.map((image) => (
              <GalleryImage key={image.id} image={image} />
            ))}
          </GalleryGrid>
        </Gallery>
      </div>
    </section>
  );
}
