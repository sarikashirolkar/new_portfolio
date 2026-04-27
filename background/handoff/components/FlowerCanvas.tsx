// FlowerCanvas — Next.js client component for sarikashirolkar/new_portfolio
// Drop this into components/ and replace <AuroraCanvas /> with <FlowerCanvas /> in app/page.tsx.

"use client";

import { useEffect, useRef } from "react";

type Flower = { id: string; src: string; base: number };
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
  { id: "white",         src: "/flowers/white.png",         base: 0.22 },
  { id: "teal",          src: "/flowers/teal.png",          base: 0.30 },
  { id: "magenta",       src: "/flowers/magenta.png",       base: 0.32 },
  { id: "blue",          src: "/flowers/blue.png",          base: 0.30 },
  { id: "pink",          src: "/flowers/pink.png",          base: 0.30 },
  { id: "amber",         src: "/flowers/amber.png",         base: 0.28 },
  { id: "purple",        src: "/flowers/purple.png",        base: 0.28 },
  { id: "pink-sakura",   src: "/flowers/pink-sakura.png",   base: 0.20 },
  { id: "white-fractal", src: "/flowers/white-fractal.png", base: 0.34 },
];

const PLACEMENTS: Placement[] = [
  { id: "white-fractal", x: 0.85, y: 0.18, driftX: 70,  driftY: 60,  rotDeg: 6,  breath: 0.05, phase: 0.00, depth: 0.10, opacity: 0.55, blur: 1.5, scale: 1.10 },
  { id: "magenta",       x: 0.10, y: 0.78, driftX: 80,  driftY: 70,  rotDeg: 7,  breath: 0.06, phase: 0.55, depth: 0.18, opacity: 0.62, blur: 1.0, scale: 1.05 },
  { id: "teal",          x: 0.72, y: 0.55, driftX: 90,  driftY: 70,  rotDeg: 8,  breath: 0.06, phase: 0.20, depth: 0.30, opacity: 0.75, blur: 0.5, scale: 0.95 },
  { id: "purple",        x: 0.05, y: 0.32, driftX: 100, driftY: 80,  rotDeg: 9,  breath: 0.07, phase: 0.40, depth: 0.32, opacity: 0.72, blur: 0.5, scale: 0.90 },
  { id: "pink",          x: 0.50, y: 0.85, driftX: 110, driftY: 80,  rotDeg: 10, breath: 0.07, phase: 0.65, depth: 0.38, opacity: 0.78, blur: 0.0, scale: 0.85 },
  { id: "amber",         x: 0.92, y: 0.88, driftX: 120, driftY: 90,  rotDeg: 12, breath: 0.08, phase: 0.30, depth: 0.45, opacity: 0.85, blur: 0.0, scale: 0.80 },
  { id: "blue",          x: 0.32, y: 0.45, driftX: 130, driftY: 100, rotDeg: 12, breath: 0.08, phase: 0.10, depth: 0.50, opacity: 0.85, blur: 0.0, scale: 0.78 },
  { id: "white",         x: 0.20, y: 0.12, driftX: 150, driftY: 110, rotDeg: 16, breath: 0.10, phase: 0.75, depth: 0.58, opacity: 0.95, blur: 0.0, scale: 1.00 },
  { id: "pink-sakura",   x: 0.60, y: 0.25, driftX: 140, driftY: 110, rotDeg: 15, breath: 0.10, phase: 0.45, depth: 0.62, opacity: 0.95, blur: 0.0, scale: 1.00 },
];

const TAU = Math.PI * 2;
const LOOP_SEC = 28;        // length of seamless loop, in seconds
const DRIFT = 1.0;          // overall drift multiplier
const PARALLAX = 1.0;       // scroll parallax multiplier

export function FlowerCanvas() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes: Record<string, HTMLImageElement> = {};
    PLACEMENTS.forEach((p) => {
      const flower = FLOWERS.find((f) => f.id === p.id);
      if (!flower) return;
      const img = document.createElement("img");
      img.src = flower.src;
      img.alt = "";
      img.draggable = false;
      img.style.cssText =
        "position:absolute;left:0;top:0;will-change:transform,opacity,filter;user-select:none;opacity:0;";
      root.appendChild(img);
      nodes[p.id] = img;
    });

    let scrollPx = 0;
    const onScroll = () => {
      scrollPx = window.scrollY || document.documentElement.scrollTop || 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const tNorm = (elapsed / LOOP_SEC) % 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);

      for (const p of PLACEMENTS) {
        const node = nodes[p.id];
        if (!node) continue;
        const flower = FLOWERS.find((f) => f.id === p.id);
        if (!flower) continue;

        const a = (tNorm + p.phase) * TAU;
        const dx = Math.sin(a) * p.driftX * DRIFT;
        const dyLoop = Math.cos(a + p.phase * TAU * 0.5) * p.driftY * DRIFT;
        const rotLoop = Math.sin(a + p.phase * TAU * 0.7) * p.rotDeg * DRIFT;
        const breath = 1 + Math.cos(a + p.phase * TAU * 0.3) * p.breath;

        const parallaxY = -scrollPx * p.depth * PARALLAX;
        const scrollRot = scrollPx * 0.02 * p.depth * PARALLAX;
        const scrollFade = Math.max(0.15, 1 - scrollPx / (h * 1.5));

        const sizePx = minDim * flower.base * p.scale;
        const cx = p.x * w;
        const cy = p.y * h;
        const tx = cx + dx - sizePx / 2;
        const ty = cy + dyLoop + parallaxY - sizePx / 2;
        const totalRot = rotLoop + scrollRot;
        const finalOpacity = p.opacity * scrollFade;

        node.style.width = sizePx + "px";
        node.style.height = "auto";
        node.style.transform = `translate3d(${tx}px,${ty}px,0) rotate(${totalRot}deg) scale(${breath})`;
        node.style.opacity = String(finalOpacity);
        node.style.filter = p.blur > 0 ? `blur(${p.blur}px)` : "";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      Object.values(nodes).forEach((n) => n.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #0a1530 0%, #050b1c 55%, #02050f 100%)",
        }}
      />
      {/* color wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,232,178,0.04) 0%, rgba(139,92,246,0.05) 50%, rgba(8,16,42,0.4) 100%)",
          mixBlendMode: "screen",
        }}
      />
      {/* flowers get appended here imperatively */}
      <div ref={rootRef} className="absolute inset-0" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,11,28,0.55) 100%)",
        }}
      />
    </div>
  );
}
