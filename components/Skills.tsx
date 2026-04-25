"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="06 / Toolkit" title="Skills & Stack" />

        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass p-6"
            >
              <h3
                className="text-xs uppercase tracking-[0.25em] mb-4 font-mono"
                style={{ color: "var(--accent)" }}
              >
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="text-sm px-3 py-1 rounded-full"
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
