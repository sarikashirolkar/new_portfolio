"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    title: "Hackathons",
    detail:
      "2nd place at DataBricks Hackathon\n1st place at Agentic AI Hackathon - HackMarch 2.0",
  },
  {
    title: "IEEE Paper Publication",
    detail:
      'Published our paper "Secure Object Identification Techniques for Autonomous Vehicles"',
  },
  {
    title: "Chair, IEEE CIS",
    detail: "@ Sai Vidya Institute of Technology",
  },
  {
    title: "Volunteered at U&I as a Mentor Fundraiser",
    detail: "Taught underprivileged kids\nmaths, science, english",
  },
];

export function WorkRow() {
  return (
    <section
      id="work"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f4f4f1] px-4 py-20 text-[#111827] md:px-8"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,24,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.06) 1px, transparent 1px)",
          backgroundSize: "67px 67px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,24,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.04) 1px, transparent 1px)",
          backgroundSize: "33.5px 33.5px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl border-2 border-[#222] px-6 py-12 md:px-12 md:py-16">
        <div className="grid min-h-[560px] gap-x-10 gap-y-16 md:grid-cols-2">
          {MILESTONES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="grid items-center gap-6 sm:grid-cols-[132px_1fr] md:gap-8 lg:grid-cols-[170px_1fr]"
            >
              <div className="flex justify-center sm:justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/butterfly-white.png"
                  alt=""
                  className="h-28 w-28 object-contain md:h-36 md:w-36"
                />
              </div>
              <div className="max-w-xl text-center font-display text-lg font-bold leading-tight sm:text-left md:text-xl">
                <span className="box-decoration-clone bg-[#090e1f] px-1 text-[#f8fbff]">
                  {item.title}
                  <br />
                  {item.detail}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
