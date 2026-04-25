"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="04 / Trajectory"
          title="Where I've built."
          description="Production AI systems, defense-grade computer vision, and cloud infrastructure."
        />

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, var(--accent), var(--accent-2), transparent)" }}
          />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <motion.div
                key={e.role + e.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid md:grid-cols-2 gap-6 items-start ${i % 2 === 0 ? "md:[&>*:first-child]:order-1" : ""}`}
              >
                <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10" style={{ background: "var(--accent)", boxShadow: "0 0 16px var(--accent)" }} />

                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    {e.period}
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-1">{e.role}</h3>
                  <div className="text-sm mt-1" style={{ color: "var(--fg-soft)" }}>
                    {e.company}
                  </div>
                </div>

                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <div className="glass p-5 space-y-2 text-sm" style={{ color: "var(--fg-soft)" }}>
                    {e.bullets.map((b, j) => (
                      <p key={j} className={i % 2 === 0 ? "md:text-left" : "md:text-left"}>
                        {b}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
