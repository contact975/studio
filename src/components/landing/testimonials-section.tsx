"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { SphereImageGrid, type ImageData } from "@/components/ui/img-sphere";
import type { GoogleReviewsPayload } from "@/app/api/google-reviews/route";

/**
 * Section รีวิว — ดึงรีวิวจริงจาก Google ผ่าน /api/google-reviews
 * แล้วเอารูปโปรไฟล์ผู้รีวิวมาเรียงบนลูกบอล 3 มิติ (กดรูปเพื่ออ่านรีวิวเต็ม)
 *
 * - กล่องคะแนน 5.0 / จำนวนรีวิว ใช้ค่าจริงจาก Google ถ้าดึงได้ ไม่ได้ก็ใช้ค่าตั้งต้น
 * - Google ให้รีวิวสูงสุด 5 รายการ จึงวนซ้ำรูปให้เต็มลูกบอล (~24 จุด) เหมือน demo ต้นฉบับ
 * - ยังไม่ตั้งค่า API key → แสดงแค่หัวข้อ + กล่องคะแนน เหมือนเดิม ไม่ error
 */
const FALLBACK_RATING = "5.0";
const FALLBACK_TOTAL = "100+";
const MAPS_URL = "https://maps.google.com/?cid=11080561333861967427";
const SPHERE_NODE_TARGET = 30;

function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsPayload | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((json: GoogleReviewsPayload | null) => {
        if (!cancelled && json?.configured && json.reviews.length) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}

// ขนาดลูกบอลตามความกว้างจอ (มือถือเต็มความกว้าง, desktop สูงสุด 560px)
function useSphereSize() {
  const [size, setSize] = useState(420);
  useEffect(() => {
    const calc = () => setSize(Math.min(560, Math.max(280, window.innerWidth - 48)));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return size;
}

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const reviews = useGoogleReviews();
  const sphereSize = useSphereSize();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVis(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const sphereImages = React.useMemo<ImageData[]>(() => {
    if (!reviews) return [];
    const withPhoto = reviews.reviews.filter((r) => r.photo);
    if (!withPhoto.length) return [];
    const repeat = Math.max(1, Math.ceil(SPHERE_NODE_TARGET / withPhoto.length));
    const list: ImageData[] = [];
    for (let i = 0; i < repeat; i++) {
      withPhoto.forEach((r) => {
        list.push({
          id: `${r.id}-${i}`,
          src: r.photo as string,
          alt: `รีวิวจาก ${r.author}`,
          title: r.author,
          description: r.text,
          rating: r.rating,
          meta: `${r.relativeTime}${r.relativeTime ? " · " : ""}Google Reviews`,
        });
      });
    }
    return list;
  }, [reviews]);

  const ratingText = reviews?.rating ? reviews.rating.toFixed(1) : FALLBACK_RATING;
  const totalText = reviews?.total ? `${reviews.total}+` : FALLBACK_TOTAL;
  const roundedRating = Math.round(reviews?.rating ?? 5);
  const mapsUrl = reviews?.mapsUrl ?? MAPS_URL;

  return (
    <section id="testimonials" className="overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div
          ref={headerRef}
          style={{
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">Reviews</p>
            <h2 className="text-3xl font-black text-foreground md:text-4xl">
              สิ่งที่เราภูมิใจที่สุด
              <br className="hidden md:block" />
              คือเสียงของลูกค้า
            </h2>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              opacity: headerVis ? 1 : 0,
              transform: headerVis ? "scale(1)" : "scale(0.95)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: "150ms",
            }}
            className="group flex items-center gap-4 self-start rounded-2xl border border-border bg-secondary/40 px-6 py-4 transition-colors hover:border-primary/40 md:self-auto"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-foreground">{ratingText}</p>
              <div className="my-1 flex gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={i <= roundedRating ? "h-4 w-4 fill-yellow-400 text-yellow-400" : "h-4 w-4 text-gray-300"} />
                ))}
              </div>
              <p className="text-xs font-medium text-muted-foreground">Google Reviews</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-black text-foreground">{totalText}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">ลูกค้าที่ไว้วางใจ</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
        </div>

        {sphereImages.length > 0 && (
          <div className="flex flex-col items-center gap-6">
            <SphereImageGrid
              images={sphereImages}
              containerSize={sphereSize}
              sphereRadius={sphereSize * 0.34}
              baseImageScale={0.19}
              dragSensitivity={0.8}
              momentumDecay={0.96}
              maxRotationSpeed={6}
              hoverScale={1.3}
              autoRotate
              autoRotateSpeed={0.2}
            />
            <p className="text-center text-xs text-muted-foreground">
              ลากเพื่อหมุน · แตะรูปเพื่ออ่านรีวิว ·{" "}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                ดูรีวิวทั้งหมดบน Google
              </a>
            </p>

            {/* รายการรีวิวแบบข้อความ — ให้ Google และ screen reader อ่านได้ ไม่ต้องกดลูกบอล */}
            <ul className="sr-only">
              {reviews?.reviews.map((r) => (
                <li key={r.id}>
                  {r.author} ให้ {r.rating} ดาว: {r.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
