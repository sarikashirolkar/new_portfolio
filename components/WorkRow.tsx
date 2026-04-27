"use client";

import { motion } from "framer-motion";
import { Chatbot } from "./Chatbot";

const MILESTONES = [
  {
    flower: "/newbg/flowers/pink-sakura.png",
    alt: "",
    title: "Hackathons",
    detail: "2nd place at DataBricks Hackathon\n1st place at Agentic AI Hackathon - HackMarch 2.0",
    size: "h-36 w-36 md:h-44 md:w-44",
  },
  {
    flower: "/newbg/flowers/purple.png",
    alt: "",
    title: "IEEE Paper Publication",
    detail: 'Published our paper "Secure Object Identification Techniques for Autonomous Vehicles"',
    size: "h-32 w-32 md:h-40 md:w-40",
  },
  {
    flower: "/newbg/flowers/teal.png",
    alt: "",
    title: "Chair, IEEE CIS",
    detail: "@ Sai Vidya Institute of Technology",
    size: "h-32 w-32 md:h-40 md:w-40",
  },
  {
    flower: "/newbg/flowers/white-fractal.png",
    alt: "",
    title: "Volunteered at U&I as a Mentor Fundraiser",
    detail: "Taught underprivileged kids",
    size: "h-32 w-32 md:h-40 md:w-40",
  },
];

export function WorkRow() {
  return (
    <section id="work" className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div
        className="absolute inset-0 -z-10 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(127,236,193,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(127,236,193,0.08) 1px, transparent 1px)",
          backgroundSize: "86px 86px",
        }}
      />
      <div
        id="chatbot-anchor"
        className="mx-auto grid min-h-[720px] max-w-7xl gap-10 xl:grid-cols-[0.92fr_1.08fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative flex min-h-[700px] flex-col justify-center"
        >
          <div className="mb-10 md:ml-36">
            <p className="font-display text-4xl font-bold" style={{ color: "var(--fg)" }}>
              Milestones!
            </p>
          </div>

          <div className="grid gap-8 md:gap-10">
            {MILESTONES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="grid items-center gap-5 md:grid-cols-[190px_1fr]"
              >
                <div className="flex justify-center md:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.flower}
                    alt={item.alt}
                    className={`${item.size} object-contain`}
                    style={{
                      filter:
                        "drop-shadow(0 0 18px rgba(127,236,193,0.46)) drop-shadow(0 0 34px rgba(139,92,246,0.26))",
                    }}
                  />
                </div>
                <div
                  className="max-w-md whitespace-pre-line text-center md:text-left"
                  style={{
                    color: "var(--fg)",
                    textShadow:
                      "0 0 18px rgba(127,236,193,0.32), 0 0 34px rgba(139,92,246,0.2)",
                  }}
                >
                  <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xl font-bold leading-snug md:text-2xl">{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex min-h-[700px] flex-col justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/newbg/flowers/white.png"
            alt=""
            className="pointer-events-none absolute left-0 top-2 z-20 h-24 w-24 -translate-x-1/2 object-contain md:h-32 md:w-32"
            style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.72))" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/newbg/flowers/white.png"
            alt=""
            className="pointer-events-none absolute bottom-2 right-0 z-20 h-24 w-24 translate-x-1/3 object-contain md:h-32 md:w-32"
            style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.72))" }}
          />

          <div className="relative h-[640px] min-h-0 rounded-none border border-[rgba(127,236,193,0.32)] bg-[#071331] p-4 shadow-[0_0_55px_rgba(56,232,178,0.16)] md:h-[700px]">
            <Chatbot embedded />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
