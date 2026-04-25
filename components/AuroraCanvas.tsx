"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function AuroraCanvas() {
  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Background pans/scales as you scroll through the hero
  const y = useTransform(scrollY, [0, vh], [0, -vh * 0.35]);
  const scale = useTransform(scrollY, [0, vh], [1.05, 1.18]);
  const brightness = useTransform(scrollY, [0, vh, vh * 2], [1, 0.55, 0.3]);
  const blur = useTransform(scrollY, [0, vh, vh * 2], [0, 4, 8]);
  const filter = useTransform([brightness, blur], ([b, bl]: number[]) => `brightness(${b}) blur(${bl}px)`);

  // Star layer — slow drift
  const starsY = useTransform(scrollY, [0, vh * 3], [0, -200]);

  // Below-hero overlay fades the dark navy in
  const overlayOpacity = useTransform(scrollY, [0, vh * 0.6, vh * 1.2], [0, 0.35, 0.85]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Aurora photograph */}
      <motion.div
        style={{
          y,
          scale,
          filter: filter as unknown as string,
          backgroundImage: "url(/aurora-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        className="absolute inset-0 will-change-transform"
      />

      {/* Color grade — push toward the Polaris cool-green palette */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,30,45,0.35) 0%, rgba(20,40,55,0.5) 60%, rgba(5,15,30,0.8) 100%)",
          opacity: resolvedTheme === "light" ? 0.15 : 0.55,
        }}
      />

      {/* Animated star drift */}
      <motion.div
        style={{ y: starsY }}
        className="absolute inset-0 starfield-photo opacity-60 mix-blend-screen"
      />

      {/* Subtle aurora-pulse shimmer (very gentle moving gradient) */}
      <div className="absolute inset-0 aurora-shimmer mix-blend-screen pointer-events-none" />

      {/* Bottom fade to deep navy so content below hero is readable */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(8,16,42,0.7) 60%, var(--bg) 100%)",
        }}
      />

      {/* Scroll-driven dark wash */}
      <motion.div
        style={{ opacity: overlayOpacity, background: "var(--bg)" }}
        className="absolute inset-0"
      />
    </div>
  );
}
