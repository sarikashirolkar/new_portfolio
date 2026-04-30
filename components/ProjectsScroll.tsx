"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import type { EnrichedProject } from "@/lib/github";

type Spread = [EnrichedProject | undefined, EnrichedProject | undefined];

export function ProjectsScroll({ projects }: { projects: EnrichedProject[] }) {
  const spreads = useMemo<Spread[]>(() => {
    const pairs: Spread[] = [];
    for (let i = 0; i < projects.length; i += 2) {
      pairs.push([projects[i], projects[i + 1]]);
    }
    return pairs;
  }, [projects]);

  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);

  const currentSpread = spreads[spreadIndex] ?? [];
  const canPrevious = spreadIndex > 0;
  const canNext = spreadIndex < spreads.length - 1;

  function turnPage(direction: 1 | -1) {
    if (direction === 1 && !canNext) return;
    if (direction === -1 && !canPrevious) return;
    setTurnDirection(direction);
    setSpreadIndex((index) => index + direction);
  }

  return (
    <div className="relative">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div
            className="font-mono text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Build Log
          </div>
          <h3
            className="mt-2 font-display text-4xl font-normal md:text-5xl"
            style={{ color: "var(--fg)" }}
          >
            Projects
          </h3>
        </div>

        <div
          className="font-mono text-xs uppercase tracking-[0.26em]"
          style={{ color: "var(--fg-soft)" }}
        >
          Spread {spreadIndex + 1} / {spreads.length}
        </div>
      </div>

      <div
        className="relative mx-auto max-w-[78rem]"
        style={{ perspective: "2200px" }}
      >
        <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_50%_45%,rgba(127,236,193,0.16),transparent_58%)] blur-2xl" />

        <motion.div
          initial={{ opacity: 0, rotateX: 8, y: 28 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative min-h-[540px] overflow-visible md:min-h-[600px] xl:min-h-[640px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute left-1/2 top-[52%] grid w-[92%] max-w-[66rem] -translate-x-1/2 -translate-y-1/2 grid-cols-1 gap-5 md:grid-cols-2 md:gap-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            <ProjectPage project={currentSpread[0]} side="left" />
            <ProjectPage project={currentSpread[1]} side="right" />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[52%] h-[78%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#7fecc1]/45 to-transparent shadow-[0_0_30px_rgba(127,236,193,0.2)]" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={spreadIndex}
              initial={{
                rotateY: turnDirection === 1 ? 0 : 0,
                opacity: 0,
              }}
              animate={{
                rotateY: turnDirection === 1 ? -158 : 158,
                opacity: [0, 0.92, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.65, 0.25, 1] }}
              className="pointer-events-none absolute top-[11%] hidden h-[80%] w-[45%] rounded-[10px] md:block"
              style={{
                left: turnDirection === 1 ? "50%" : "7%",
                transformOrigin: turnDirection === 1 ? "left center" : "right center",
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(110deg, rgba(17,132,123,0.96), rgba(7,73,88,0.9) 54%, rgba(127,236,193,0.22))",
                border: "1px solid rgba(127,236,193,0.28)",
                boxShadow: "0 28px 54px rgba(2,5,15,0.38), 0 0 44px rgba(127,236,193,0.2)",
              }}
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={() => turnPage(-1)}
            disabled={!canPrevious}
            aria-label="Previous project spread"
            className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-[#071331]/80 shadow-[0_16px_38px_rgba(2,5,15,0.34)] transition disabled:opacity-25 md:-left-5"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => turnPage(1)}
            disabled={!canNext}
            aria-label="Next project spread"
            className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-[#071331]/80 shadow-[0_16px_38px_rgba(2,5,15,0.34)] transition disabled:opacity-25 md:-right-5"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectPage({
  project,
  side,
}: {
  project?: EnrichedProject;
  side: "left" | "right";
}) {
  if (!project) {
    return (
      <div
        className="hidden min-h-[430px] rounded-[10px] border md:block xl:min-h-[500px]"
        style={{
          background: "rgba(7, 73, 88, 0.38)",
          borderColor: "rgba(127,236,193,0.18)",
        }}
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
      whileHover={{ y: -6, rotateZ: side === "left" ? -0.4 : 0.4 }}
      transition={{ duration: 0.22 }}
      className="relative min-h-[430px] overflow-hidden rounded-[10px] border p-5 text-left shadow-[0_24px_54px_rgba(2,5,15,0.28)] md:min-h-[500px] md:p-7 xl:min-h-[540px] xl:p-8"
      style={{
        background:
          side === "left"
            ? "linear-gradient(105deg, rgba(16,111,104,0.9), rgba(7,73,88,0.92))"
            : "linear-gradient(75deg, rgba(12,92,101,0.92), rgba(11,126,116,0.88))",
        borderColor: "rgba(127,236,193,0.28)",
        color: "var(--fg)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(127,236,193,0.22),transparent_36%),linear-gradient(90deg,rgba(127,236,193,0.12),transparent_12%,transparent_88%,rgba(127,236,193,0.1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_20%_20%,#d7fff3_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative flex h-full min-h-[380px] flex-col md:min-h-[440px] xl:min-h-[480px]">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[#7fecc1]">
            {project.group}
          </span>
          <ExternalLink className="h-4 w-4 flex-none text-[#7fecc1]" />
        </div>

        <h4 className="mt-4 font-display text-3xl leading-[1.02] text-[#effffb] md:text-[2.35rem] xl:text-[2.55rem]">
          {project.title}
        </h4>

        <div className="mt-5 space-y-4">
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#7fecc1]">
              Challenge
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#c9f4ec] md:text-[0.96rem]">
              {project.challenge}
            </p>
          </div>

          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#7fecc1]">
              Built
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#effffb] md:text-[0.96rem]">
              {project.solved}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 font-mono text-[0.68rem]"
                style={{
                  borderColor: "rgba(127,236,193,0.28)",
                  background: "rgba(2,5,15,0.22)",
                  color: "#c9f4ec",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#7fecc1]">
            Tap page for GitHub
          </div>
        </div>
      </div>
    </motion.button>
  );
}
