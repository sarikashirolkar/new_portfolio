"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Layers } from "lucide-react";

export function SkillsRow() {
  return (
    <section id="skills" className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2">
          <Layers className="h-5 w-5" style={{ color: "var(--accent)" }} />
          <span
            className="text-sm uppercase tracking-[0.3em] font-mono"
            style={{ color: "var(--accent)" }}
          >
            Toolkit
          </span>
        </div>

        <h3
          className="mb-10 font-display text-4xl font-bold md:text-5xl xl:text-6xl"
          style={{ color: "var(--fg)" }}
        >
          Skills &amp; <span className="aurora-text">Techstack</span>
        </h3>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-[28px] p-6 md:min-h-[190px]"
            >
              <div
                className="mb-4 text-xs uppercase tracking-[0.28em] font-mono"
                style={{ color: "var(--accent)" }}
              >
                {g.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full px-4 py-1.5 text-base"
                    style={{
                      background: "rgba(127,236,193,0.06)",
                      border: "1px solid var(--border)",
                      color: "var(--fg)",
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
