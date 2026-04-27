"use client";

import { useEffect, useRef } from "react";

type Flower = {
  id: string;
  src: string;
  base: number;
};

type Placement = {
  id: string;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  rotDeg: number;
  breath: number;
  phase: number;
  depth: number;
  opacity: number;
  blur: number;
  scale: number;
};

const FLOWERS: Flower[] = [
  { id: "white", src: "/newbg/flowers/white.png", base: 0.22 },
  { id: "teal", src: "/newbg/flowers/teal.png", base: 0.30 },
  { id: "magenta", src: "/newbg/flowers/magenta.png", base: 0.32 },
  { id: "blue", src: "/newbg/flowers/blue.png", base: 0.30 },
  { id: "pink", src: "/newbg/flowers/pink.png", base: 0.30 },
  { id: "amber", src: "/newbg/flowers/amber.png", base: 0.28 },
  { id: "purple", src: "/newbg/flowers/purple.png", base: 0.28 },
  { id: "pink-sakura", src: "/newbg/flowers/pink-sakura.png", base: 0.20 },
  { id: "white-fractal", src: "/newbg/flowers/white-fractal.png", base: 0.34 },
];

const PLACEMENTS: Placement[] = [
  { id: "white-fractal", x: 0.85, y: 0.18, driftX: 70, driftY: 60, rotDeg: 6, breath: 0.05, phase: 0, depth: 0.1, opacity: 0.55, blur: 1.5, scale: 1.1 },
  { id: "magenta", x: 0.1, y: 0.78, driftX: 80, driftY: 70, rotDeg: 7, breath: 0.06, phase: 0.55, depth: 0.18, opacity: 0.62, blur: 1, scale: 1.05 },
  { id: "teal", x: 0.72, y: 0.55, driftX: 90, driftY: 70, rotDeg: 8, breath: 0.06, phase: 0.2, depth: 0.3, opacity: 0.75, blur: 0.5, scale: 0.95 },
  { id: "purple", x: 0.05, y: 0.32, driftX: 100, driftY: 80, rotDeg: 9, breath: 0.07, phase: 0.4, depth: 0.32, opacity: 0.72, blur: 0.5, scale: 0.9 },
  { id: "pink", x: 0.5, y: 0.85, driftX: 110, driftY: 80, rotDeg: 10, breath: 0.07, phase: 0.65, depth: 0.38, opacity: 0.78, blur: 0, scale: 0.85 },
  { id: "amber", x: 0.92, y: 0.88, driftX: 120, driftY: 90, rotDeg: 12, breath: 0.08, phase: 0.3, depth: 0.45, opacity: 0.85, blur: 0, scale: 0.8 },
  { id: "blue", x: 0.32, y: 0.45, driftX: 130, driftY: 100, rotDeg: 12, breath: 0.08, phase: 0.1, depth: 0.5, opacity: 0.85, blur: 0, scale: 0.78 },
  { id: "white", x: 0.2, y: 0.12, driftX: 150, driftY: 110, rotDeg: 16, breath: 0.1, phase: 0.75, depth: 0.58, opacity: 0.95, blur: 0, scale: 1 },
  { id: "pink-sakura", x: 0.6, y: 0.25, driftX: 140, driftY: 110, rotDeg: 15, breath: 0.1, phase: 0.45, depth: 0.62, opacity: 0.95, blur: 0, scale: 1 },
];

const TAU = Math.PI * 2;
const LOOP_SEC = 28;
const DRIFT = 1;
const PARALLAX = 1;
const SIZE_SCALE = 1.12;
const OPACITY_SCALE = 1.45;

export function FlowerCanvas() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes: Record<string, HTMLImageElement> = {};
    for (const placement of PLACEMENTS) {
      const flower = FLOWERS.find((item) => item.id === placement.id);
      if (!flower) continue;

      const img = document.createElement("img");
      img.src = flower.src;
      img.alt = "";
      img.draggable = false;
      img.style.cssText =
        "position:absolute;left:0;top:0;will-change:transform,opacity,filter;user-select:none;opacity:0;";
      root.appendChild(img);
      nodes[placement.id] = img;
    }

    let scrollPx = 0;
    const updateScroll = () => {
      scrollPx = window.scrollY || document.documentElement.scrollTop || 0;
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const tNorm = (elapsed / LOOP_SEC) % 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);

      for (const placement of PLACEMENTS) {
        const node = nodes[placement.id];
        const flower = FLOWERS.find((item) => item.id === placement.id);
        if (!node || !flower) continue;

        const angle = (tNorm + placement.phase) * TAU;
        const dx = Math.sin(angle) * placement.driftX * DRIFT;
        const dyLoop = Math.cos(angle + placement.phase * TAU * 0.5) * placement.driftY * DRIFT;
        const rotLoop = Math.sin(angle + placement.phase * TAU * 0.7) * placement.rotDeg * DRIFT;
        const breath = 1 + Math.cos(angle + placement.phase * TAU * 0.3) * placement.breath;
        const parallaxY = -scrollPx * placement.depth * PARALLAX;
        const scrollRot = scrollPx * 0.02 * placement.depth * PARALLAX;
        const scrollFade = Math.max(0.15, 1 - scrollPx / (h * 1.5));
        const sizePx = minDim * flower.base * placement.scale * SIZE_SCALE;
        const tx = placement.x * w + dx - sizePx / 2;
        const ty = placement.y * h + dyLoop + parallaxY - sizePx / 2;

        node.style.width = `${sizePx}px`;
        node.style.height = "auto";
        node.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rotLoop + scrollRot}deg) scale(${breath})`;
        node.style.opacity = String(Math.min(1, placement.opacity * OPACITY_SCALE * scrollFade));
        node.style.filter = placement.blur > 0 ? `blur(${placement.blur}px)` : "";
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateScroll);
      Object.values(nodes).forEach((node) => node.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div ref={rootRef} className="absolute inset-0" />
    </div>
  );
}
