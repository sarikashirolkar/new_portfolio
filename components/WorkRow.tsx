"use client";

import { motion } from "framer-motion";
import { Chatbot } from "./Chatbot";

const MILESTONES = [
  {
    flower: "/newbg/flowers/pink-sakura.png",
    alt: "",
    title: "Hackathons",
    detail: "2nd place at DataBricks Hackathon\n1st place at Agentic AI Hackathon - HackMarch 2.0",
    size: "h-28 w-28 md:h-36 md:w-36",
  },
  {
    flower: "/newbg/flowers/purple.png",
    alt: "",
    title: "IEEE Paper Publication",
    detail: 'Published our paper "Secure Object Identification Techniques for Autonomous Vehicles"',
    size: "h-24 w-24 md:h-32 md:w-32",
  },
  {
    flower: "/newbg/flowers/teal.png",
    alt: "",
    title: "Chair, IEEE CIS",
    detail: "@ Sai Vidya Institute of Technology",
    size: "h-24 w-24 md:h-32 md:w-32",
  },
  {
    flower: "/newbg/flowers/white-fractal.png",
    alt: "",
    title: "Volunteered at U&I as a Mentor Fundraiser",
    detail: "Taught underprivileged kids",
    size: "h-24 w-24 md:h-32 md:w-32",
  },
];

export function WorkRow() {
  return (
    <section id="work" className="relative overflow-hidden px-5 py-12 md:px-8 md:py-16">
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
        className="mx-auto grid min-h-[560px] max-w-6xl gap-8 xl:grid-cols-[0.92fr_1.08fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative flex min-h-[540px] flex-col justify-center"
        >
          <div className="mb-6 md:ml-28">
            <p className="font-display text-3xl font-bold md:text-4xl" style={{ color: "var(--fg)" }}>
              Milestones!
            </p>
          </div>

          <div className="grid gap-5 md:gap-7">
            {MILESTONES.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="grid items-center gap-4 md:grid-cols-[150px_1fr]"
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
                  <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base font-bold leading-snug md:text-lg">{item.detail}</p>
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
          className="relative flex min-h-[540px] flex-col justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/newbg/flowers/white.png"
            alt=""
            className="pointer-events-none absolute left-0 top-2 z-20 h-20 w-20 -translate-x-1/2 object-contain md:h-24 md:w-24"
            style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.72))" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/newbg/flowers/white.png"
            alt=""
            className="pointer-events-none absolute bottom-2 right-0 z-20 h-20 w-20 translate-x-1/3 object-contain md:h-24 md:w-24"
            style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.72))" }}
          />

          <div className="relative h-[500px] min-h-0 rounded-none border border-[rgba(127,236,193,0.32)] bg-[#071331] p-3 shadow-[0_0_45px_rgba(56,232,178,0.14)] md:h-[560px]">
            <Chatbot embedded />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
