"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:pt-4"
        >
          <div className="flex items-center gap-2">
            <Briefcase
              className="h-4 w-4"
              style={{ color: "var(--accent)" }}
            />
            <span
              className="text-sm uppercase tracking-[0.3em] font-mono"
              style={{ color: "var(--accent)" }}
            >
              Trajectory
            </span>
          </div>
          <h3
            className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl xl:text-6xl"
            style={{ color: "var(--fg)" }}
          >
            Work
            <br />
            <span className="aurora-text">Timeline</span>
          </h3>
          <p
            className="mt-5 max-w-sm text-lg leading-relaxed"
            style={{ color: "var(--fg-soft)" }}
          >
            Production AI, defense-grade computer vision, cloud infra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-[30px] p-8 md:p-10"
        >
          <div className="relative">
            <div
              className="absolute left-2 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, var(--accent), var(--accent-2), transparent)",
              }}
            />

            <div className="space-y-10">
              {experience.map((e, i) => (
                <motion.div
                  key={e.role + e.company}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative grid gap-5 pl-10 md:grid-cols-[280px_1fr]"
                >
                  <div
                    className="absolute left-0 top-2 h-5 w-5 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 18px var(--accent)",
                    }}
                  />
                  <div>
                    <div
                      className="text-sm uppercase tracking-[0.28em] font-mono"
                      style={{ color: "var(--accent)" }}
                    >
                      {e.period}
                    </div>
                    <div
                      className="mt-2 font-display text-2xl font-bold leading-tight"
                      style={{ color: "var(--fg)" }}
                    >
                      {e.role}
                    </div>
                    <div
                      className="text-lg"
                      style={{ color: "var(--fg-soft)" }}
                    >
                      {e.company}
                    </div>
                  </div>
                  <ul
                    className="space-y-3 text-base leading-relaxed md:text-[1.05rem]"
                    style={{ color: "var(--fg-soft)" }}
                  >
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span
                          className="mt-2 inline-block h-2 w-2 flex-none rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
