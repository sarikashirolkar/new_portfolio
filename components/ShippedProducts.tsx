"use client";

import { motion } from "framer-motion";
import { shippedProducts } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ExternalLink, Zap } from "lucide-react";

export function ShippedProducts() {
  return (
    <section id="shipped" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="03 / Live Products"
          title="Shipped & in production."
          description="Real users. Real traffic. Owned end-to-end — discovery through deployment."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {shippedProducts.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass p-8 group relative overflow-hidden block"
            >
              <div
                className={`absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-30 blur-3xl bg-gradient-to-br ${p.accent} group-hover:opacity-60 transition-opacity duration-700`}
              />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--accent)" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent)" }} />
                  </span>
                  <span className="text-xs uppercase tracking-widest font-mono" style={{ color: "var(--accent)" }}>
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-accent mb-4 flex items-start justify-between gap-3 text-3xl font-semibold">
                  <span>{p.title}</span>
                  <ExternalLink className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }} />
                </h3>

                <p className="leading-relaxed mb-6" style={{ color: "var(--fg-soft)" }}>
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full font-mono"
                      style={{
                        background: "rgba(127,236,193,0.1)",
                        border: "1px solid var(--border)",
                        color: "var(--fg-soft)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
