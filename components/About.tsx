"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { personal } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 12 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 12 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="01 / Profile" title="Hello, I'm Sarika." />

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden glass glow-accent tilt-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/headshot.png"
              alt="Sarika Shirolkar"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(135deg, rgba(127,236,193,0.2), transparent 40%, rgba(139,92,246,0.25))",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              {personal.about}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Stat label="Shipped products" value="2" hint="live with users" />
              <Stat label="IEEE Publication" value="1st author" hint="autonomous systems" />
              <Stat label="Hackathons won" value="2" hint="1st & 2nd place" />
              <Stat label="CGPA" value="9.1" hint="ranked 2nd in dept" />
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
                LinkedIn
              </a>
              <a href={personal.github} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
                GitHub
              </a>
              <a href={`mailto:${personal.email}`} className="btn-ghost text-sm">
                {personal.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="glass p-4">
      <div className="text-xs uppercase tracking-widest" style={{ color: "var(--fg-soft)" }}>
        {label}
      </div>
      <div className="font-accent mt-1 text-3xl font-semibold aurora-text">{value}</div>
      <div className="text-xs mt-0.5" style={{ color: "var(--fg-soft)" }}>
        {hint}
      </div>
    </div>
  );
}
