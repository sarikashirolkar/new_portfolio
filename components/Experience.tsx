"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { WindingTimeline, type WindingNode } from "./WindingTimeline";

const WORK_ITEMS: WindingNode[] = [
  {
    eyebrow: "Oct 2025 - Present",
    title: "AI Engineer, AI Workflow Automate",
    subtitle: "AI agents and product engineering",
    bullets: [
      "Building voice-agent and automation systems that need to work outside demos: phone calls, calendars, structured outputs, and handoffs.",
      "Owning the messy middle between prototype and product: prompts, backend glue, deployment, testing, and iteration.",
      "Setting up evaluation loops so failures become visible instead of getting hidden in chat transcripts.",
    ],
  },
  {
    eyebrow: "Mar 2025 - Sep 2025",
    title: "Software Engineer, AI Workflow Automate",
    subtitle: "Cloud and AI infrastructure",
    bullets: [
      "Deployed backend services on Azure Linux VMs and tightened the basics: environment config, logs, monitoring, and rollback-friendly releases.",
      "Used AI-assisted development where it saved time, while keeping manual review and testing in the loop.",
    ],
  },
  {
    eyebrow: "Jul 2025 - Sep 2025",
    title: "AI & ML Intern, Bharat Electronics Limited",
    subtitle: "Computer vision",
    bullets: [
      "Worked on object-detection pipelines for difficult visual conditions, using custom annotations and YOLOv8 experiments.",
      "Focused on model behavior under real constraints: accuracy, latency, and failure cases.",
    ],
  },
  {
    eyebrow: "Apr 2025 - Sep 2025",
    title: "Project Intern, IEEE IAMPro'25",
    subtitle: "Research to publication",
    bullets: [
      "Turned the autonomous-vehicle object-identification project into a first-author IEEE conference paper.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <div className="flex items-center gap-2">
            <Briefcase
              className="h-4 w-4"
              style={{ color: "var(--accent)" }}
            />
            <span
              className="text-sm uppercase tracking-[0.3em] font-mono"
              style={{ color: "var(--accent)" }}
            >
              Trajectory
            </span>
          </div>
          <h3
            className="mt-4 font-display text-4xl font-normal leading-tight md:text-5xl xl:text-6xl"
            style={{ color: "var(--fg)" }}
          >
            Intern/Work Experience
          </h3>
          <p
            className="mt-5 text-lg leading-relaxed"
            style={{ color: "var(--fg-soft)" }}
          >
            The parts of the work I actually touched, not just the job titles.
          </p>
        </motion.div>

        <WindingTimeline
          items={WORK_ITEMS}
          accent="#7fecc1"
          nodeRem={20}
          circleRem={18.75}
        />
      </div>
    </section>
  );
}
