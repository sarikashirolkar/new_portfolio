"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Bot } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Connect", href: "#connect" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [0, 12]);
  const bg = useTransform(scrollY, [0, 200], ["rgba(8,16,42,0.35)", "rgba(8,16,42,0.7)"]);
  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
    window.history.replaceState(null, "", "#assistant");
  };

  return (
    <motion.nav
      style={{ backdropFilter: `blur(${blur.get?.() ?? 0}px)`, background: bg as unknown as string }}
      className="fixed top-5 left-0 right-0 z-40 px-6"
    >
      <motion.div
        style={{ backdropFilter: blur as unknown as string }}
        className="max-w-7xl mx-auto flex items-center justify-between gap-4 rounded-[24px] border px-5 py-4 glass"
        data-taskbar="true"
      >
        <a href="#top" className="min-w-[120px] font-display text-xl font-normal">
          <span className="aurora-text">Sarika</span>
        </a>

        <div className="hidden md:flex items-center justify-center gap-1 flex-1">
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

        <div className="flex min-w-[120px] items-center justify-end gap-2">
          <button
            type="button"
            onClick={openAssistant}
            className="flex h-9 items-center gap-2 rounded-full border px-3 text-sm transition-colors hover:text-aurora-mint"
            style={{ borderColor: "var(--border)", color: "var(--fg-soft)" }}
          >
            <Bot className="h-4 w-4" />
            <span className="hidden lg:inline">AI Assistant</span>
          </button>
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
}
