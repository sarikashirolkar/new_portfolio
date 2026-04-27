"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { personal } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen px-5 pb-10 pt-24 md:px-8 lg:pt-28"
    >
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="max-w-[44rem]">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm"
                style={{
                  borderColor: "rgba(56, 232, 178, 0.28)",
                  background: "rgba(6, 14, 34, 0.18)",
                  boxShadow:
                    "0 0 28px rgba(56, 232, 178, 0.08), inset 0 0 24px rgba(6, 14, 34, 0.18)",
                }}
              >
                <Sparkles
                  className="h-4 w-4"
                  style={{
                    color: "var(--accent)",
                    filter: "drop-shadow(0 0 10px rgba(56, 232, 178, 0.6))",
                  }}
                />
                <span
                  style={{
                    color: "var(--fg)",
                    textShadow: "0 0 18px rgba(255,255,255,0.12)",
                  }}
                >
                  Available for AI engineering roles · {personal.location}
                </span>
              </div>

              <h1
                className="mt-8 font-display text-6xl font-bold leading-[0.98] tracking-tight md:text-7xl xl:text-[7rem]"
                style={{
                  color: "var(--fg)",
                  textShadow:
                    "0 0 30px rgba(8, 16, 42, 0.9), 0 0 70px rgba(139, 92, 246, 0.18)",
                }}
              >
                <span
                  className="aurora-text"
                  style={{
                    filter:
                      "drop-shadow(0 0 22px rgba(139, 92, 246, 0.26)) drop-shadow(0 0 40px rgba(56, 232, 178, 0.12))",
                  }}
                >
                  Sarika
                </span>
                <br />
                <span>Shirolkar</span>
              </h1>

              <p
                className="mt-5 font-display text-3xl leading-tight md:text-4xl"
                style={{
                  color: "var(--fg)",
                  textShadow: "0 0 26px rgba(8, 16, 42, 0.85)",
                }}
              >
                AI Engineer
              </p>

              <p
                className="mt-4 max-w-lg text-lg leading-relaxed md:text-xl"
                style={{
                  color: "rgba(232, 239, 255, 0.92)",
                  textShadow: "0 0 22px rgba(8, 16, 42, 0.9)",
                }}
              >
                Building AI systems that actually work.
              </p>
            </div>
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
                className="relative z-10 h-auto w-[300px] select-none md:w-[390px] lg:w-[480px] xl:w-[540px]"
                draggable={false}
                style={{
                  filter:
                    "drop-shadow(0 30px 60px rgba(127,236,193,0.18)) drop-shadow(0 12px 24px rgba(139,92,246,0.20))",
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
