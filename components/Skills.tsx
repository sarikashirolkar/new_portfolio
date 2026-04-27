"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Layers } from "lucide-react";

export function Skills() {
  return (
    <div className="h-full">
      <div className="mb-3 flex items-center gap-2">
        <Layers className="h-4 w-4" style={{ color: "var(--accent)" }} />
        <span
          className="text-[11px] uppercase tracking-[0.25em] font-mono"
          style={{ color: "var(--accent)" }}
        >
          Toolkit
        </span>
      </div>

      <h3
        className="font-accent mb-4 text-3xl font-semibold"
        style={{ color: "var(--fg)" }}
      >
        Skills &amp; Techstack
      </h3>

      <div className="space-y-3">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="glass rounded-2xl p-3"
          >
            <div
              className="mb-2 text-[10px] uppercase tracking-[0.22em] font-mono"
              style={{ color: "var(--accent)" }}
            >
              {g.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full px-2 py-0.5 text-xs"
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
  );
}
