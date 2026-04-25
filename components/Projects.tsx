"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Github } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="05 / Build Log"
          title="Selected Projects"
          description="Agents, deep-learning systems, automation workflows, and a publication."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="glass p-6 group block relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(127,236,193,0.15), transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-lg font-bold leading-tight">{project.title}</h3>
          <Github className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-soft)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
              style={{
                background: "rgba(127,236,193,0.08)",
                color: "var(--fg-soft)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
