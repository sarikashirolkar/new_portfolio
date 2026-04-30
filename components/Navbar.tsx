"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";

type NavLink = {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
};

const links: NavLink[] = [
  { id: "top", label: "whoami" },
  { id: "work", label: "Milestones" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "connect", label: "Connect" },
  { id: "linkedin", label: "LinkedIn", href: personal.linkedin, external: true },
  { id: "github", label: "GitHub", href: personal.github, external: true },
  { id: "resume", label: "Resume", href: "/resume.pdf", external: true },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 180], [0.82, 0.94]);
  const blurAmount = useTransform(scrollY, [0, 180], [8, 16]);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-25% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-4 z-40 px-3 md:px-6">
      <motion.div
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(9, 14, 34, ${v})`
          ),
          backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(
            blurAmount,
            (v) => `blur(${v}px)`
          ),
        }}
        className="mx-auto max-w-[96rem] rounded-[28px] border border-white/[0.1] px-5 py-4 shadow-[0_22px_56px_rgba(2,5,15,0.45)] md:rounded-full md:px-7"
      >
        <div className="flex items-center justify-between gap-5">
          <a
            href="#top"
            className="flex-none text-2xl italic leading-none md:text-[2.2rem]"
            style={{
              fontFamily: '"Silver Garden", "Antigua", serif',
              fontStyle: "italic",
              color: "#efe8d7",
              letterSpacing: "0.01em",
            }}
          >
            hello world!
          </a>

          <div className="hidden min-w-0 flex-1 overflow-x-auto md:block">
            <div className="ml-auto flex w-max items-center gap-6 pl-6 md:gap-8 lg:gap-11">
              {links.map((l) => {
                const active = !l.external && activeId === l.id;
                return (
                  <a
                    key={l.id}
                    href={l.href ?? `#${l.id}`}
                    onClick={() => {
                      if (!l.external) setActiveId(l.id);
                    }}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer" : undefined}
                    aria-current={active ? "page" : undefined}
                    className="group font-nav text-[0.68rem] font-bold uppercase tracking-[0.34em] transition-colors"
                    style={{
                      color: active ? "#efe8d7" : "rgba(239,232,215,0.68)",
                    }}
                  >
                    <span className="transition-colors group-hover:text-[#efe8d7]">
                      {l.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/[0.14] text-[#efe8d7] transition-colors hover:bg-white/[0.06] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="overflow-hidden md:hidden"
            >
              <div
                className="mt-3 flex flex-col gap-1 border-t pt-3"
                style={{ borderColor: "rgba(239,232,215,0.12)" }}
              >
                {links.map((l) => {
                  const active = !l.external && activeId === l.id;
                  return (
                    <a
                      key={l.id}
                      href={l.href ?? `#${l.id}`}
                      onClick={() => {
                        if (!l.external) setActiveId(l.id);
                        setMenuOpen(false);
                      }}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer" : undefined}
                      aria-current={active ? "page" : undefined}
                      className="rounded-xl px-3 py-2.5 font-nav text-xs font-bold uppercase tracking-[0.32em] transition-colors hover:bg-white/[0.05]"
                      style={{
                        color: active ? "#efe8d7" : "rgba(239,232,215,0.72)",
                      }}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
