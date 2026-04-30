"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { personal } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen px-5 pb-10 pt-28 md:px-8 lg:pt-32"
    >
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm md:text-base"
              style={{
                borderColor: "rgba(127,236,193,0.38)",
                boxShadow: "0 0 28px rgba(127,236,193,0.16)",
              }}
            >
              <Sparkles
                className="h-4 w-4 md:h-5 md:w-5"
                style={{ color: "var(--accent)" }}
              />
              <span
                style={{
                  color: "var(--fg)",
                  textShadow: "0 0 18px rgba(127,236,193,0.45)",
                }}
              >
                Available for AI engineering roles · {personal.location}
              </span>
            </div>

            <h1
              className="mt-7 font-display text-6xl leading-[0.95] tracking-tight md:text-7xl xl:text-[8rem]"
              style={{
                color: "var(--fg)",
                textShadow:
                  "0 0 26px rgba(127,236,193,0.42), 0 0 68px rgba(139,92,246,0.26)",
              }}
            >
              <span className="aurora-text">Sarika</span>
              <br />
              <span>Shirolkar</span>
            </h1>

            <p
              className="mt-6 font-display text-3xl leading-tight md:text-4xl"
              style={{
                color: "var(--fg)",
                textShadow: "0 0 22px rgba(127,236,193,0.35)",
              }}
            >
              AI Engineer
            </p>

            <p
              className="mt-5 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{
                color: "var(--fg-soft)",
                textShadow: "0 0 18px rgba(239,232,215,0.28)",
              }}
            >
              Building AI systems that actually work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headshot_withoutbg.png"
                alt="Sarika Shirolkar"
                className="relative z-10 h-auto w-[430px] select-none md:w-[620px] lg:w-[760px] xl:w-[900px]"
                draggable={false}
                style={{
                  filter:
                    "drop-shadow(0 34px 70px rgba(127,236,193,0.24)) drop-shadow(0 16px 34px rgba(139,92,246,0.24))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-2"
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
