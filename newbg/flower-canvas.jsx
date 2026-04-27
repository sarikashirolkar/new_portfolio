// FlowerCanvas — animated flower background, seamless loop, scroll-reactive parallax.
//
// Looping technique: every animated value is sin/cos of (t / loopSec * 2π), so the
// state at t=0 equals the state at t=loopSec exactly. No discontinuity.

const FLOWERS = [
  // [src, naturalScale (0..1 of viewport min-dim), kind]
  // emerald large hero pieces
  { id: "em1", src: "src/flowers/emerald-large-1.png", base: 0.55, kind: "emerald" },
  { id: "em2", src: "src/flowers/emerald-large-2.png", base: 0.50, kind: "emerald" },
  { id: "em3", src: "src/flowers/emerald-large-3.png", base: 0.58, kind: "emerald" },
  // teal fractal
  { id: "tf1", src: "src/flowers/teal-fractal-1.png",  base: 0.48, kind: "teal" },
  { id: "tf2", src: "src/flowers/teal-fractal-2.png",  base: 0.45, kind: "teal" },
  // magenta fractal
  { id: "mf1", src: "src/flowers/magenta-fractal-1.png", base: 0.52, kind: "magenta" },
  { id: "mf2", src: "src/flowers/magenta-fractal-2.png", base: 0.46, kind: "magenta" },
  // small sakura accents
  { id: "ws1", src: "src/flowers/white-sakura-1.png",  base: 0.16, kind: "sakura" },
  { id: "ws2", src: "src/flowers/white-sakura-2.png",  base: 0.14, kind: "sakura" },
  { id: "ps1", src: "src/flowers/pink-sakura-1.png",   base: 0.13, kind: "sakura" },
  { id: "ps2", src: "src/flowers/pink-sakura-2.png",   base: 0.15, kind: "sakura" },
];

// Hand-tuned default placements + motion params per flower.
// pos: [-0.3 .. 1.3] across viewport (allow off-edge anchoring)
// driftPx: amplitude of drift in CSS px
// rotDeg: amplitude of slow rotation
// breath: scale wobble (0.05 = ±5%)
// phase: 0..1, offsets so all flowers don't pulse together
// depth: 0..1, parallax strength on scroll (0=fixed, 1=strong)
// opacity: base opacity multiplier
// blur: base blur in px (large flowers slightly blurred for depth)
const PLACEMENTS = [
  // big emeralds — back layer, slow, more blurred
  { id: "em3", x: 0.78, y: 0.18, driftX: 60, driftY: 80, rotDeg: 6, breath: 0.05, phase: 0.00, depth: 0.10, opacity: 0.70, blur: 1.5, scale: 1.05 },
  { id: "em2", x: 0.08, y: 0.55, driftX: 70, driftY: 60, rotDeg: 5, breath: 0.06, phase: 0.25, depth: 0.18, opacity: 0.75, blur: 1.0, scale: 1.00 },
  { id: "em1", x: 0.62, y: 0.78, driftX: 80, driftY: 70, rotDeg: 7, breath: 0.05, phase: 0.55, depth: 0.22, opacity: 0.72, blur: 1.0, scale: 1.10 },

  // magenta fractals — mid layer
  { id: "mf1", x: 0.04, y: 0.10, driftX: 90, driftY: 60, rotDeg: 8, breath: 0.07, phase: 0.40, depth: 0.30, opacity: 0.65, blur: 0.5, scale: 0.85 },
  { id: "mf2", x: 0.92, y: 0.65, driftX: 70, driftY: 90, rotDeg: 6, breath: 0.06, phase: 0.70, depth: 0.28, opacity: 0.62, blur: 0.5, scale: 0.80 },

  // teal fractals — mid-front
  { id: "tf1", x: 0.42, y: 0.32, driftX: 100, driftY: 80, rotDeg: 9, breath: 0.07, phase: 0.15, depth: 0.40, opacity: 0.68, blur: 0.0, scale: 0.75 },
  { id: "tf2", x: 0.30, y: 0.92, driftX: 80, driftY: 90, rotDeg: 8, breath: 0.06, phase: 0.85, depth: 0.45, opacity: 0.65, blur: 0.0, scale: 0.78 },

  // sakura accents — front layer, sharp, more drift
  { id: "ws1", x: 0.20, y: 0.22, driftX: 120, driftY: 100, rotDeg: 14, breath: 0.10, phase: 0.10, depth: 0.55, opacity: 0.95, blur: 0.0, scale: 1.00 },
  { id: "ps1", x: 0.55, y: 0.50, driftX: 140, driftY: 110, rotDeg: 16, breath: 0.10, phase: 0.45, depth: 0.62, opacity: 0.95, blur: 0.0, scale: 1.00 },
  { id: "ws2", x: 0.86, y: 0.40, driftX: 110, driftY: 90,  rotDeg: 12, breath: 0.09, phase: 0.65, depth: 0.50, opacity: 0.90, blur: 0.0, scale: 1.00 },
  { id: "ps2", x: 0.10, y: 0.82, driftX: 130, driftY: 100, rotDeg: 15, breath: 0.10, phase: 0.30, depth: 0.58, opacity: 0.92, blur: 0.0, scale: 1.00 },
];

const TAU = Math.PI * 2;

function FlowerCanvas({ tweaks }) {
  const { useEffect, useRef, useState } = React;
  const containerRef = useRef(null);
  const flowerRefs = useRef({});
  const rafRef = useRef(0);
  const scrollRef = useRef(0);
  // Hold tweaks in a ref so RAF reads latest values without remounting
  const tweaksRef = useRef(tweaks);
  useEffect(() => { tweaksRef.current = tweaks; }, [tweaks]);
  const [vp, setVp] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1200, h: typeof window !== 'undefined' ? window.innerHeight : 800 });

  // Track viewport size
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track scroll. Look up the scroller by id (works regardless of where the bg div lives in DOM).
  useEffect(() => {
    const scroller = document.getElementById('scroller') || document.scrollingElement || document.documentElement;
    const onScroll = () => { scrollRef.current = scroller.scrollTop || window.scrollY || 0; };
    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Animation loop — mount once, read tweaks from ref so we never remount.
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = tweaksRef.current;
      const elapsed = (now - start) / 1000;
      const loopSec = t.loopSec || 28;
      const tNorm = (elapsed / loopSec) % 1;
      const scrollPx = scrollRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);

      for (const p of PLACEMENTS) {
        const node = flowerRefs.current[p.id];
        if (!node) continue;
        const flower = FLOWERS.find(f => f.id === p.id);
        if (!flower) continue;

        const a = (tNorm + p.phase) * TAU;
        const dx     = Math.sin(a) * p.driftX * t.driftScale;
        const dyLoop = Math.cos(a + p.phase * TAU * 0.5) * p.driftY * t.driftScale;
        const rotLoop = Math.sin(a + p.phase * TAU * 0.7) * p.rotDeg * t.driftScale;
        const breath = 1 + Math.cos(a + p.phase * TAU * 0.3) * p.breath;

        const parallaxY = -scrollPx * p.depth * t.parallaxStrength;
        const scrollRot = (scrollPx * 0.02) * p.depth * t.parallaxStrength;
        const scrollFade = Math.max(0.15, 1 - scrollPx / (h * 1.5));

        const sizePx = minDim * flower.base * p.scale * t.sizeScale;
        const cx = p.x * w;
        const cy = p.y * h;
        const tx = cx + dx - sizePx / 2;
        const ty = cy + dyLoop + parallaxY - sizePx / 2;
        const totalRot = rotLoop + scrollRot;
        const finalOpacity = p.opacity * t.opacityScale * scrollFade;

        node.style.width = sizePx + 'px';
        node.style.height = 'auto';
        node.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${totalRot}deg) scale(${breath})`;
        node.style.opacity = finalOpacity;
        node.style.filter = p.blur > 0 ? `blur(${p.blur}px)` : '';
        node.style.mixBlendMode = t.screenBlend ? 'screen' : 'normal';
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Background grade + vignette
  const bg = tweaks.dim
    ? "radial-gradient(ellipse at 50% 30%, #0a1530 0%, #050b1c 55%, #02050f 100%)"
    : "radial-gradient(ellipse at 50% 30%, #0e1c40 0%, #060e22 55%, #02050f 100%)";

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: bg,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* tinted color wash to push toward the moody aurora palette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(56,232,178,0.04) 0%, rgba(139,92,246,0.05) 50%, rgba(8,16,42,0.4) 100%)",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}/>

      {PLACEMENTS.map(p => {
        const flower = FLOWERS.find(f => f.id === p.id);
        if (!flower) return null;
        return (
          <img
            key={p.id}
            ref={el => { flowerRefs.current[p.id] = el; }}
            src={flower.src}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              willChange: "transform, opacity, filter",
              userSelect: "none",
              mixBlendMode: tweaks.screenBlend ? "screen" : "normal",
              // initial — set before first RAF runs to avoid flash at top-left
              transform: `translate3d(${p.x * vp.w}px, ${p.y * vp.h}px, 0)`,
              opacity: 0,
            }}
          />
        );
      })}

      {/* heavy bottom vignette so text always wins */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,11,28,0.55) 100%)",
        pointerEvents: "none",
      }}/>
    </div>
  );
}

window.FlowerCanvas = FlowerCanvas;
