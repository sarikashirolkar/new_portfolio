"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

const skillPalette = [
  {
    accent: "#38e8b2",
    glow: "rgba(56, 232, 178, 0.24)",
    chip: "rgba(56, 232, 178, 0.13)",
    text: "#baffea",
  },
  {
    accent: "#ff4fb8",
    glow: "rgba(255, 79, 184, 0.24)",
    chip: "rgba(255, 79, 184, 0.13)",
    text: "#ffd1ec",
  },
  {
    accent: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.24)",
    chip: "rgba(96, 165, 250, 0.13)",
    text: "#d4e9ff",
  },
  {
    accent: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.24)",
    chip: "rgba(251, 191, 36, 0.13)",
    text: "#fff0bc",
  },
  {
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.24)",
    chip: "rgba(167, 139, 250, 0.13)",
    text: "#e8ddff",
  },
  {
    accent: "#fb7185",
    glow: "rgba(251, 113, 133, 0.24)",
    chip: "rgba(251, 113, 133, 0.13)",
    text: "#ffe0e5",
  },
];

export function SkillsRow() {
  return (
    <section id="skills" className="px-5 py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6">
          <div
            className="font-mono text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Toolkit
          </div>
          <h3
            className="mt-3 font-display text-4xl font-normal md:text-5xl xl:text-6xl"
            style={{ color: "var(--fg)" }}
          >
            Skills &amp; <span className="aurora-text">Techstack</span>
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const tone = skillPalette[index % skillPalette.length];

            return (
              <motion.article
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[8px] border p-6 shadow-[0_18px_45px_rgba(2,5,15,0.48)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,0.9))",
                  borderColor: tone.accent,
                  boxShadow: `0 18px 45px rgba(2, 5, 15, 0.48), 0 0 22px ${tone.glow}`,
                }}
              >
                <div
                  className="mb-5 h-1 w-16 rounded-full"
                  style={{ background: tone.accent, boxShadow: `0 0 18px ${tone.glow}` }}
                />
                <h4
                  className="font-display text-2xl leading-tight md:text-3xl"
                  style={{
                    color: "var(--fg)",
                    textShadow: `0 0 18px ${tone.glow}`,
                  }}
                >
                  {group.label}
                </h4>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1.5 font-mono text-[0.78rem] font-bold"
                      style={{
                        background: tone.chip,
                        borderColor: tone.accent,
                        color: tone.text,
                        boxShadow: `0 0 12px ${tone.glow}`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
