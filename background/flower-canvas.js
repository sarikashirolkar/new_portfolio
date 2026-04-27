// FlowerCanvas — vanilla JS implementation.
// Renders flower <img> elements into a target container and runs a plain
// requestAnimationFrame loop. Loop is seamless: every motion value is sin/cos
// of (t / loopSec * 2π + offset), so frame(0) === frame(loopSec) exactly.

(function () {
  // 9 hero flowers — using image cells from the flower grid the user provided.
  const FLOWERS = [
    { id: "white",         src: "src/flowers2/white.png",         base: 0.22 },
    { id: "teal",          src: "src/flowers2/teal.png",          base: 0.30 },
    { id: "magenta",       src: "src/flowers2/magenta.png",       base: 0.32 },
    { id: "blue",          src: "src/flowers2/blue.png",          base: 0.30 },
    { id: "pink",          src: "src/flowers2/pink.png",          base: 0.30 },
    { id: "amber",         src: "src/flowers2/amber.png",         base: 0.28 },
    { id: "purple",        src: "src/flowers2/purple.png",        base: 0.28 },
    { id: "pink-sakura",   src: "src/flowers2/pink-sakura.png",   base: 0.20 },
    { id: "white-fractal", src: "src/flowers2/white-fractal.png", base: 0.34 },
  ];

  // Placements: spread across viewport, mix of small/large, varied depth so parallax feels layered.
  // depth 0..0.65, opacity tuned so flowers are visible but text wins.
  const PLACEMENTS = [
    // back layer — large, slightly blurred fractals
    { id: "white-fractal", x: 0.85, y: 0.18, driftX: 70,  driftY: 60,  rotDeg: 6,  breath: 0.05, phase: 0.00, depth: 0.10, opacity: 0.55, blur: 1.5, scale: 1.10 },
    { id: "magenta",       x: 0.10, y: 0.78, driftX: 80,  driftY: 70,  rotDeg: 7,  breath: 0.06, phase: 0.55, depth: 0.18, opacity: 0.62, blur: 1.0, scale: 1.05 },

    // mid layer — colorful glass blooms
    { id: "teal",          x: 0.72, y: 0.55, driftX: 90,  driftY: 70,  rotDeg: 8,  breath: 0.06, phase: 0.20, depth: 0.30, opacity: 0.75, blur: 0.5, scale: 0.95 },
    { id: "purple",        x: 0.05, y: 0.32, driftX: 100, driftY: 80,  rotDeg: 9,  breath: 0.07, phase: 0.40, depth: 0.32, opacity: 0.72, blur: 0.5, scale: 0.90 },
    { id: "pink",          x: 0.50, y: 0.85, driftX: 110, driftY: 80,  rotDeg: 10, breath: 0.07, phase: 0.65, depth: 0.38, opacity: 0.78, blur: 0.0, scale: 0.85 },

    // front layer — sharp, more drift, smaller
    { id: "amber",         x: 0.92, y: 0.88, driftX: 120, driftY: 90,  rotDeg: 12, breath: 0.08, phase: 0.30, depth: 0.45, opacity: 0.85, blur: 0.0, scale: 0.80 },
    { id: "blue",          x: 0.32, y: 0.45, driftX: 130, driftY: 100, rotDeg: 12, breath: 0.08, phase: 0.10, depth: 0.50, opacity: 0.85, blur: 0.0, scale: 0.78 },

    // top layer — small accent sakura, most movement
    { id: "white",         x: 0.20, y: 0.12, driftX: 150, driftY: 110, rotDeg: 16, breath: 0.10, phase: 0.75, depth: 0.58, opacity: 0.95, blur: 0.0, scale: 1.00 },
    { id: "pink-sakura",   x: 0.60, y: 0.25, driftX: 140, driftY: 110, rotDeg: 15, breath: 0.10, phase: 0.45, depth: 0.62, opacity: 0.95, blur: 0.0, scale: 1.00 },
  ];

  const TAU = Math.PI * 2;

  // Live tweak state — exposed on window so the Tweaks panel can mutate it.
  const tweakState = window.__flowerTweaks = window.__flowerTweaks || {
    loopSec: 28,
    driftScale: 1.0,
    parallaxStrength: 1.0,
    sizeScale: 1.0,
    opacityScale: 1.0,
    dim: true,
    screenBlend: false,
  };

  function mountFlowerCanvas(targetEl) {
    if (!targetEl) return;
    targetEl.innerHTML = ""; // clear

    // structure
    const root = document.createElement("div");
    root.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;";
    root.dataset.flowerRoot = "1";

    const bg = document.createElement("div");
    bg.style.cssText = "position:absolute;inset:0;";
    function paintBg() {
      bg.style.background = tweakState.dim
        ? "radial-gradient(ellipse at 50% 30%, #0a1530 0%, #050b1c 55%, #02050f 100%)"
        : "radial-gradient(ellipse at 50% 30%, #0e1c40 0%, #060e22 55%, #02050f 100%)";
    }
    paintBg();
    root.appendChild(bg);

    const wash = document.createElement("div");
    wash.style.cssText = "position:absolute;inset:0;background:linear-gradient(180deg, rgba(56,232,178,0.04) 0%, rgba(139,92,246,0.05) 50%, rgba(8,16,42,0.4) 100%);mix-blend-mode:screen;pointer-events:none;";
    root.appendChild(wash);

    // create flower imgs
    const nodes = {};
    for (const p of PLACEMENTS) {
      const flower = FLOWERS.find(f => f.id === p.id);
      if (!flower) continue;
      const img = document.createElement("img");
      img.src = flower.src;
      img.alt = "";
      img.draggable = false;
      img.style.cssText = "position:absolute;left:0;top:0;will-change:transform,opacity,filter;user-select:none;opacity:0;";
      root.appendChild(img);
      nodes[p.id] = img;
    }

    const vignette = document.createElement("div");
    vignette.style.cssText = "position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,11,28,0.55) 100%);pointer-events:none;";
    root.appendChild(vignette);

    targetEl.appendChild(root);

    // scroll tracking
    let scrollPx = 0;
    const scroller = document.getElementById("scroller") || document.scrollingElement || document.documentElement;
    const onScroll = () => { scrollPx = scroller.scrollTop || window.scrollY || 0; };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // animation loop
    const start = performance.now();
    function tick(now) {
      const t = tweakState;
      const elapsed = (now - start) / 1000;
      const loopSec = t.loopSec || 28;
      const tNorm = (elapsed / loopSec) % 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);

      for (const p of PLACEMENTS) {
        const node = nodes[p.id];
        if (!node) continue;
        const flower = FLOWERS.find(f => f.id === p.id);
        if (!flower) continue;

        const a = (tNorm + p.phase) * TAU;
        const dx      = Math.sin(a) * p.driftX * t.driftScale;
        const dyLoop  = Math.cos(a + p.phase * TAU * 0.5) * p.driftY * t.driftScale;
        const rotLoop = Math.sin(a + p.phase * TAU * 0.7) * p.rotDeg * t.driftScale;
        const breath  = 1 + Math.cos(a + p.phase * TAU * 0.3) * p.breath;

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

        node.style.width = sizePx + "px";
        node.style.height = "auto";
        node.style.transform = "translate3d(" + tx + "px," + ty + "px,0) rotate(" + totalRot + "deg) scale(" + breath + ")";
        node.style.opacity = finalOpacity;
        node.style.filter = p.blur > 0 ? "blur(" + p.blur + "px)" : "";
        node.style.mixBlendMode = t.screenBlend ? "screen" : "normal";
      }

      rafId = requestAnimationFrame(tick);
    }
    let rafId = requestAnimationFrame(tick);

    // Tweaks listen for change broadcasts
    window.__flowerRepaintBg = paintBg;
  }

  // Public API
  window.mountFlowerCanvas = mountFlowerCanvas;
  window.__flowerTweaks = tweakState;
})();
