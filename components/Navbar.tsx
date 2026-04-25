"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Profile", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "Shipped", href: "#shipped" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [0, 12]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(8,16,42,0)", "rgba(8,16,42,0.6)"]);

  return (
    <motion.nav
      style={{ backdropFilter: `blur(${blur.get?.() ?? 0}px)`, background: bg as unknown as string }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <motion.div
        style={{ backdropFilter: blur as unknown as string }}
        className="max-w-6xl mx-auto flex items-center justify-between"
      >
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          <span className="aurora-text">Sarika</span>
        </a>

        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full glass">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm rounded-full hover:text-aurora-mint transition-colors"
              style={{ color: "var(--fg-soft)" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <ThemeToggle />
      </motion.div>
    </motion.nav>
  );
}
