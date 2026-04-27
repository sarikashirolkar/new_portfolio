"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { EnrichedProject } from "@/lib/github";

export function ProjectsScroll({ projects }: { projects: EnrichedProject[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function nudge(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step * 1.2, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <div
            className="text-sm uppercase tracking-[0.3em] font-mono"
            style={{ color: "var(--accent)" }}
          >
            Build Log
          </div>
          <h3
            className="font-display text-4xl font-normal md:text-5xl"
            style={{ color: "var(--fg)" }}
          >
            Projects from GitHub
          </h3>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => nudge(-1)}
            disabled={!canLeft}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => nudge(1)}
            disabled={!canRight}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8"
        style={{ scrollbarWidth: "thin" }}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            data-project-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.3) }}
            whileHover={{ y: -4 }}
            className="glass group relative flex min-h-[520px] w-[340px] flex-none snap-start flex-col overflow-hidden rounded-[28px] p-7 md:w-[460px] xl:w-[520px]"
            role="link"
            tabIndex={0}
            onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.open(p.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(127,236,193,0.18), transparent 60%)",
              }}
            />

            <div className="relative flex flex-1 flex-col">
              <div className="mb-2 flex items-start justify-between gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider"
                  style={{
                    background: "rgba(127,236,193,0.08)",
                    color: "var(--accent)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {p.group}
                </span>
                <Github
                  className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--fg-soft)" }}
                />
              </div>

              <h4
                className="font-accent text-3xl font-semibold leading-tight"
                style={{ color: "var(--fg)" }}
              >
                {p.title}
              </h4>

              <div className="mt-5 space-y-4">
                <div>
                  <div
                    className="text-xs uppercase tracking-[0.25em] font-mono"
                    style={{ color: "var(--fg-soft)" }}
                  >
                    Challenge
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--fg-soft)" }}
                  >
                    {p.challenge}
                  </p>
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-[0.25em] font-mono"
                    style={{ color: "var(--accent)" }}
                  >
                    Solved
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--fg)" }}
                  >
                    {p.solved}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-3 py-1 text-xs font-mono"
                      style={{
                        background: "rgba(127,236,193,0.06)",
                        color: "var(--fg-soft)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.extraLinks && p.extraLinks.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.extraLinks.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs underline"
                        style={{ color: "var(--accent)" }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
