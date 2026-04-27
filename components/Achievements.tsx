"use client";

import { motion } from "framer-motion";
import { Trophy, FileText, GraduationCap, Award, Sparkles } from "lucide-react";

type Item = {
  icon: typeof Trophy;
  label: string;
  detail: string;
  accent: string;
};

const ITEMS: Item[] = [
  {
    icon: Trophy,
    label: "Hackathon Wins",
    detail: "1st — HackMarch 2.0 · 2nd — Databricks",
    accent: "from-aurora-mint to-aurora-teal",
  },
  {
    icon: FileText,
    label: "IEEE Publication",
    detail: "First-author paper on YOLOv8 in adverse weather",
    accent: "from-aurora-purple to-aurora-violet",
  },
  {
    icon: Award,
    label: "IEEE CIS Chair",
    detail: "Led ML workshops + mentored peers",
    accent: "from-aurora-dawn to-aurora-purple",
  },
  {
    icon: GraduationCap,
    label: "Volunteered at U&I",
    detail: "Taught underprivileged kids — community work",
    accent: "from-aurora-sky to-aurora-mint",
  },
];

export function Achievements() {
  return (
    <div className="relative flex h-full min-h-full flex-col justify-center">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5" style={{ color: "var(--accent)" }} />
        <span
          className="text-sm uppercase tracking-[0.3em] font-mono"
          style={{ color: "var(--accent)" }}
        >
          Achievements
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              className="glass relative flex items-center gap-4 overflow-hidden rounded-[28px] p-5 md:p-6"
            >
              <div
                className={`absolute -left-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-xl`}
              />
              <div
                className="relative flex h-16 w-16 flex-none items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(127,236,193,0.18), rgba(139,92,246,0.18))",
                  border: "1px solid var(--border)",
                }}
              >
                <Icon
                  className="h-7 w-7"
                  style={{ color: "var(--accent)" }}
                />
              </div>
              <div className="relative min-w-0 flex-1">
                <div
                  className="font-accent text-3xl font-semibold leading-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {item.label}
                </div>
                <div
                  className="mt-1 text-base leading-snug"
                  style={{ color: "var(--fg-soft)" }}
                >
                  {item.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
