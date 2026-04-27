"use client";

import { motion } from "framer-motion";
import { Chatbot } from "./Chatbot";
import { Achievements } from "./Achievements";

export function WorkRow() {
  return (
    <section id="work" className="px-5 py-16 md:px-8 md:py-20">
      <div
        id="chatbot-anchor"
        className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex h-[560px] min-h-0 items-stretch xl:h-[620px]"
        >
          <Achievements />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass flex min-h-[560px] flex-col rounded-[28px] p-4 md:p-5"
          style={{ background: "rgba(10, 20, 45, 0.48)" }}
        >
          <div className="mb-3 px-2">
            <div
              className="font-accent text-2xl font-semibold"
              style={{ color: "var(--fg)" }}
            >
              RAG Chatbot
            </div>
            <div className="text-sm" style={{ color: "var(--fg-soft)" }}>
              Ask about projects, experience, fit.
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <Chatbot embedded />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
