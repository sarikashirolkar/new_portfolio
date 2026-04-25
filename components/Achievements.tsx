"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Trophy } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="02 / Highlights"
          title="Wins & Recognition"
          description="A few moments that validate the builder mindset — IEEE peer review, hackathon wins, and academic standing."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass p-6 group relative overflow-hidden"
              style={{ transformPerspective: 1000 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(127,236,193,0.2), rgba(139,92,246,0.2))",
                    border: "1px solid var(--border)",
                  }}
                >
                  {a.badge}
                </div>
                <span
                  className="text-xs uppercase tracking-widest font-mono"
                  style={{ color: "var(--accent)" }}
                >
                  {a.year}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-2 leading-tight">{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
                {a.detail}
              </p>

              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle, rgba(127,236,193,0.3), transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 glass p-6 flex items-center gap-4"
        >
          <Trophy className="w-8 h-8" style={{ color: "var(--accent)" }} />
          <div>
            <div className="font-display font-bold">Builder mentality, validated.</div>
            <div className="text-sm" style={{ color: "var(--fg-soft)" }}>
              Time-constrained competition + peer-reviewed research + sustained academic standing.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
