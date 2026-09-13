"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SphereImageGrid — รูปวงกลมเรียงบนทรงกลม 3 มิติ ลากหมุนได้ มีแรงเฉื่อย หมุนเองได้
 * กดรูปเพื่อเปิดกล่องรายละเอียด (ใช้แสดงรีวิว: ดาว + ข้อความ + ชื่อผู้รีวิว)
 *
 * ปรับจากต้นฉบับ img-sphere:
 * - ImageData รับ rating / meta เพิ่ม เพื่อใช้กับรีวิว Google
 * - กล่อง modal แสดงดาวและข้อความรีวิวแทนรูปเต็ม (รูปโปรไฟล์ Google เล็กเกินกว่าจะขยาย)
 * - ใช้ hoverScale จริง (ต้นฉบับประกาศ prop ไว้แต่ไม่ได้ใช้)
 * - ใช้ <img> ธรรมดา เพราะรูปโปรไฟล์มาจาก lh3.googleusercontent.com หลายโดเมนย่อย
 */

// ==========================================
// TYPES
// ==========================================
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  /** คะแนน 1–5 (แสดงเป็นดาวในกล่องรายละเอียด) */
  rating?: number;
  /** ข้อความเสริมใต้ชื่อ เช่น "2 เดือนที่แล้ว · Google" */
  meta?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}
interface VelocityState {
  x: number;
  y: number;
}
interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// MATH
// ==========================================
const SPHERE_MATH = {
  degreesToRadians: (degrees: number) => degrees * (Math.PI / 180),
  normalizeAngle: (angle: number) => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  },
};

// ==========================================
// COMPONENT
// ==========================================
export function SphereImageGrid({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = "",
}: SphereImageGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  // แยกแยะ "แตะเพื่อเปิด" กับ "ลากเพื่อหมุน" — ถ้าลากเกิน 6px จะไม่เปิดกล่อง
  const dragDistance = useRef(0);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  // ------------------------------------------
  // กระจายตำแหน่งบนทรงกลมแบบ Fibonacci
  // ------------------------------------------
  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      phi = phi < 90 ? Math.max(5, phi - poleBonus) : Math.min(175, phi + poleBonus);
      phi = 15 + (phi / 180) * 150;

      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({ theta, phi, radius: actualSphereRadius });
    }
    return positions;
  }, [images.length, actualSphereRadius]);

  // ------------------------------------------
  // แปลงเป็นพิกัดบนจอ + คำนวณ scale / ความลึก / กันซ้อนทับ
  // ------------------------------------------
  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = z > fadeZoneEnd;
      let fadeOpacity = 1;
      if (z <= fadeZoneStart) {
        fadeOpacity = Math.max(0, (z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      const isPoleImage = pos.phi < 30 || pos.phi > 150;
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const distanceRatio = Math.min(distanceFromCenter / actualSphereRadius, 1);
      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);
      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, originalIndex: index };
    });

    const adjusted = [...positions];
    for (let i = 0; i < adjusted.length; i++) {
      const pos = adjusted[i];
      if (!pos.isVisible) continue;
      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjusted.length; j++) {
        if (i === j) continue;
        const other = adjusted[j];
        if (!other.isVisible) continue;
        const otherSize = baseImageSize * other.scale;
        const distance = Math.hypot(pos.x - other.x, pos.y - other.y);
        const minDistance = (imageSize + otherSize) / 2 + 25;
        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }
      adjusted[i] = { ...pos, scale: Math.max(0.25, adjustedScale) };
    }
    return adjusted;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback(
    (speed: number) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
    [maxRotationSpeed]
  );

  // ------------------------------------------
  // แรงเฉื่อย + หมุนอัตโนมัติ
  // ------------------------------------------
  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity((prev) => {
      const next = { x: prev.x * momentumDecay, y: prev.y * momentumDecay };
      if (!autoRotate && Math.abs(next.x) < 0.01 && Math.abs(next.y) < 0.01) return { x: 0, y: 0 };
      return next;
    });

    setRotation((prev) => {
      let newY = prev.y;
      if (autoRotate) newY += autoRotateSpeed;
      newY += clampRotationSpeed(velocity.y);
      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z,
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  // ------------------------------------------
  // Event handlers (เมาส์ + สัมผัส)
  // ------------------------------------------
  const applyDrag = useCallback(
    (clientX: number, clientY: number) => {
      const deltaX = clientX - lastMousePos.current.x;
      const deltaY = clientY - lastMousePos.current.y;
      dragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

      const rotationDelta = { x: -deltaY * dragSensitivity, y: deltaX * dragSensitivity };
      setRotation((prev) => ({
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
        y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
        z: prev.z,
      }));
      setVelocity({ x: clampRotationSpeed(rotationDelta.x), y: clampRotationSpeed(rotationDelta.y) });
      lastMousePos.current = { x: clientX, y: clientY };
    },
    [dragSensitivity, clampRotationSpeed]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    dragDistance.current = 0;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) applyDrag(e.clientX, e.clientY);
    },
    [isDragging, applyDrag]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    dragDistance.current = 0;
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      applyDrag(touch.clientX, touch.clientY);
    },
    [isDragging, applyDrag]
  );

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  // ------------------------------------------
  // Lifecycle
  // ------------------------------------------
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    if (!isMounted) return;
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ปิดกล่องด้วย Esc
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedImage]);

  // ------------------------------------------
  // Render
  // ------------------------------------------
  const worldPositions = calculateWorldPositions();

  const openImage = (image: ImageData) => {
    if (dragDistance.current > 6) return;
    setSelectedImage(image);
  };

  const renderImageNode = (image: ImageData, index: number) => {
    const position = worldPositions[index];
    if (!position || !position.isVisible) return null;

    const imageSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(hoverScale, hoverScale / position.scale) : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `${containerSize / 2 + position.x}px`,
          top: `${containerSize / 2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => openImage(image)}
        role="button"
        aria-label={image.alt}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white bg-white shadow-lg ring-1 ring-primary/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            draggable={false}
            loading={index < 3 ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  };

  // วาดผ่าน portal ไปที่ <body> — ถ้าวางไว้ในต้นไม้เดิม ancestor ที่มี transform (เช่น wrapper ของ AOS)
  // จะกลายเป็น containing block ของ position: fixed ทำให้กล่องถูก header ทับและซ้อนผิดชั้น
  const renderModal = () => {
    if (!selectedImage) return null;
    return createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        onClick={() => setSelectedImage(null)}
        style={{ animation: "sphere-fade-in 0.25s ease-out" }}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "sphere-scale-in 0.25s ease-out" }}
        >
          <div className="flex items-start gap-4 p-6 pb-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              {selectedImage.title && <h3 className="truncate text-lg font-bold text-foreground">{selectedImage.title}</h3>}
              {selectedImage.rating !== undefined && (
                <div className="mt-0.5 flex gap-0.5" aria-label={`${selectedImage.rating} ดาว`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", i <= (selectedImage.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
                    />
                  ))}
                </div>
              )}
              {selectedImage.meta && <p className="mt-1 text-xs text-muted-foreground">{selectedImage.meta}</p>}
            </div>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="ปิด"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
            >
              <X size={16} />
            </button>
          </div>
          {selectedImage.description && (
            <p className="max-h-[50vh] overflow-y-auto whitespace-pre-line p-6 text-sm leading-relaxed text-gray-600">
              {selectedImage.description}
            </p>
          )}
        </div>
      </div>
      ,
      document.body
    );
  };

  if (!isMounted) {
    return <div className={cn("animate-pulse rounded-full bg-primary/5", className)} style={{ width: containerSize, height: containerSize }} />;
  }

  if (!images.length) return null;

  return (
    <>
      <style>{`
        @keyframes sphere-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sphere-scale-in { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        ref={containerRef}
        className={cn("relative touch-none select-none cursor-grab active:cursor-grabbing", className)}
        style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative h-full w-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderModal()}
    </>
  );
}

export default SphereImageGrid;
