"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { personal } from "@/lib/data";
import { Chatbot } from "./Chatbot";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-6 pb-10 pt-28 lg:pt-36">
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-9rem)] flex flex-col">
        <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:grid-rows-[auto_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:row-span-2"
          >
            <div className="glass h-full min-h-[420px] overflow-hidden rounded-[28px] border border-[color:var(--border)] p-3 lg:min-h-[720px]">
              <div className="relative h-full overflow-hidden rounded-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/headshot.png"
                  alt="Sarika Shirolkar"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(2,5,15,0.02) 0%, rgba(2,5,15,0.18) 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="glass rounded-[28px] border border-[color:var(--border)] p-7 md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm" style={{ borderColor: "var(--border)" }}>
                <Sparkles className="h-4 w-4" style={{ color: "var(--accent)" }} />
                <span style={{ color: "var(--fg-soft)" }}>
                  Available for AI engineering roles · {personal.location}
                </span>
              </div>

              <div className="mt-7 space-y-4">
                <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl" style={{ color: "var(--fg)" }}>
                  Sarika Shirolkar
                </h1>
                <p className="max-w-xl font-display text-2xl leading-tight md:text-[2rem]" style={{ color: "var(--fg-soft)" }}>
                  AI engineer building AI that actually works.
                </p>
                <p className="max-w-2xl text-base leading-7 md:text-lg" style={{ color: "var(--fg-soft)" }}>
                  {personal.about}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            className="order-3 lg:order-3"
          >
            <div className="glass flex min-h-[340px] flex-col rounded-[28px] border border-[color:var(--border)] p-4 md:p-5 lg:min-h-[360px]">
              <div className="mb-3 px-2">
                <div className="font-display text-lg font-semibold" style={{ color: "var(--fg)" }}>
                  RAG chatbot
                </div>
                <div className="text-sm" style={{ color: "var(--fg-soft)" }}>
                  Ask about projects, experience, shipped work, and fit.
                </div>
              </div>
              <div className="min-h-0 flex-1">
                <Chatbot embedded />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2 pb-2"
          style={{ color: "var(--fg-soft)" }}
        >
          <span className="text-xs uppercase tracking-[0.28em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
