"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MILESTONES = [
  {
    tab: "Hackathons",
    number: "01",
    accent: "#e98c42",
    tabX: 5,
    text: (
      <>
        1<sup>st</sup> place — <em>HackMarch 2.0</em> · 2nd at Databricks
      </>
    ),
    detailTitle: "Adaptive Memory Agent + Kisan Mitra",
    details: [
      "At HackMarch 2.0, I built an Ebbinghaus-inspired adaptive memory agent that adjusts revision schedules based on how a learner forgets. The project combined a FastAPI backend, SQLite storage, a Streamlit dashboard, n8n automations, Telegram reminders, and AI-generated quiz/chat support.",
      "At the Databricks Hackathon, I worked on Kisan Mitra, a chat-first AI assistant for farming families. It handled crop advisory and scholarship discovery, with matching logic built around Delta Lake, Spark SQL, and Databricks workflows.",
    ],
    chips: ["FastAPI", "Streamlit", "n8n", "Telegram", "Databricks", "Spark SQL"],
  },
  {
    tab: "Research",
    number: "02",
    accent: "#b5659b",
    tabX: 28,
    text: (
      <>
        First-author <em>IEEE</em> publication
      </>
    ),
    detailTitle: "Secure Object Identification for Autonomous Vehicles",
    details: [
      "I was the first author on a paper about secure object identification for autonomous systems. The work centered on a YOLOv8 object-detection pipeline tested under adverse weather conditions like fog, rain, and low light.",
      "Most of the value came from the engineering around the model: custom annotations, benchmarking, failure-case review, and understanding where detection quality drops in safety-critical driving scenarios.",
    ],
    chips: ["YOLOv8", "OpenCV", "PyTorch", "Computer Vision", "IEEE"],
  },
  {
    tab: "Leadership",
    number: "03",
    accent: "#d95842",
    tabX: 52,
    text: (
      <>
        Chair, IEEE CIS — <em>Sai Vidya</em>
      </>
    ),
    detailTitle: "IEEE Computational Intelligence Society",
    details: [
      "As Chair of IEEE CIS at Sai Vidya Institute of Technology, I helped run applied ML sessions, guided juniors through project ideas, and pushed the chapter toward hands-on building rather than only theory.",
      "The role shaped how I explain technical ideas: break the problem down, show the working system, then help people build their own version.",
    ],
    chips: ["IEEE CIS", "Mentorship", "Workshops", "Applied ML"],
  },
  {
    tab: "Community",
    number: "04",
    accent: "#a89770",
    tabX: 75,
    text: (
      <>
        Mentor, <em>U &amp; I</em>
      </>
    ),
    detailTitle: "Teaching and fundraiser work",
    details: [
      "With U&I, I volunteered as a mentor and fundraiser, teaching maths, science, and English to underprivileged kids.",
      "It was quieter work than hackathons or research, but it mattered. It taught me patience, clarity, and how to meet someone at their current level before trying to teach the next step.",
    ],
    chips: ["Teaching", "Volunteer", "Fundraising"],
  },
];

const AUTO_CLOSE_MS = 9000;

export function WorkRow() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (openIndex === null) return;
    const timer = window.setTimeout(() => setOpenIndex(null), AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [openIndex]);

  return (
    <section id="work" className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-display text-3xl leading-none md:text-4xl" style={{ color: "#efe8d7" }}>
            <em>Milestones.</em>
          </h3>
          <p className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: "rgba(239,232,215,0.82)" }}>
            tap on a milestone!
          </p>
        </motion.div>

        <div className="space-y-8 pt-6">
          {MILESTONES.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.article
                key={item.tab}
                layout
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="relative"
                style={{ zIndex: isOpen ? 20 : 5 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="absolute -top-8 z-20 transition-transform hover:-translate-y-0.5 max-md:!left-4"
                  style={{ left: `${item.tabX}%` }}
                  animate={
                    isOpen
                      ? {
                          filter: `drop-shadow(0 0 6px ${item.accent}99) drop-shadow(0 0 14px ${item.accent}55)`,
                        }
                      : {
                          filter: [
                            `drop-shadow(0 0 4px ${item.accent}66) drop-shadow(0 0 10px ${item.accent}33)`,
                            `drop-shadow(0 0 12px ${item.accent}cc) drop-shadow(0 0 24px ${item.accent}88)`,
                            `drop-shadow(0 0 4px ${item.accent}66) drop-shadow(0 0 10px ${item.accent}33)`,
                          ],
                        }
                  }
                  transition={
                    isOpen
                      ? { duration: 0.3 }
                      : {
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.35,
                        }
                  }
                >
                  <span
                    className="block px-5 py-2 text-[0.78rem] uppercase tracking-[0.32em]"
                    style={{
                      background: item.accent,
                      color: "#0b1026",
                      clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
                      fontFamily: '"Antigua", Ubuntu, sans-serif',
                    }}
                  >
                    {item.tab}
                  </span>
                </motion.button>

                <div
                  className="paper-grain overflow-hidden rounded-[4px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(12,22,52,0.96), rgba(9,17,42,0.96))",
                    borderTop: `2px solid ${item.accent}`,
                    boxShadow: isOpen
                      ? `0 22px 48px rgba(2,5,15,0.34), 0 0 28px ${item.accent}22`
                      : "0 14px 30px rgba(2,5,15,0.22)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center px-7 py-5 text-left md:px-8"
                  >
                    <span
                      className="font-display text-2xl leading-tight md:text-3xl"
                      style={{ color: "#efe8d7" }}
                    >
                      {item.text}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-7 pb-7 md:px-8"
                          style={{ borderTop: `1px solid ${item.accent}22` }}
                        >
                          <div className="grid gap-5 py-5 md:grid-cols-[0.9fr_1.6fr]">
                            <h4
                              className="font-display text-2xl leading-tight md:text-3xl"
                              style={{ color: "#efe8d7" }}
                            >
                              {item.detailTitle}
                            </h4>
                            <div className="space-y-3">
                              {item.details.map((detail) => (
                                <p
                                  key={detail}
                                  className="text-sm leading-relaxed md:text-base"
                                  style={{ color: "rgba(239,232,215,0.78)" }}
                                >
                                  {detail}
                                </p>
                              ))}
                              <div className="flex flex-wrap gap-2 pt-1">
                                {item.chips.map((chip) => (
                                  <span
                                    key={chip}
                                    className="rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
                                    style={{
                                      border: `1px solid ${item.accent}44`,
                                      background: `${item.accent}12`,
                                      color: "#efe8d7",
                                    }}
                                  >
                                    {chip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <motion.div
                            key={`${item.tab}-${isOpen}`}
                            initial={{ width: "100%" }}
                            animate={{ width: 0 }}
                            transition={{ duration: AUTO_CLOSE_MS / 1000, ease: "linear" }}
                            className="h-px"
                            style={{ background: item.accent }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
