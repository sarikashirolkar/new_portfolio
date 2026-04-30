"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

export type WindingNode = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
};

type Props = {
  items: WindingNode[];
  accent: string;
  nodeRem?: number;
  circleRem?: number;
};

export function WindingTimeline({
  items,
  accent,
  nodeRem = 22,
  circleRem = 10,
}: Props) {
  const N = items.length;
  const radius = circleRem / 2;

  const cx = (i: number) => (i % 2 === 0 ? 22 : 78);
  const cy = (i: number) => (i + 0.5) * (100 / N);

  let d = `M ${cx(0)} 0`;
  for (let i = 0; i < N; i++) {
    if (i === 0) {
      d += ` L ${cx(0)} ${cy(0)}`;
    } else {
      const px = cx(i - 1);
      const py = cy(i - 1);
      const x = cx(i);
      const y = cy(i);
      const midY = (py + y) / 2;
      d += ` C ${px} ${midY - 1}, ${x} ${midY + 1}, ${x} ${y}`;
    }
  }
  d += ` L ${cx(N - 1)} 100`;

  const walkerY = (cy(0) + cy(1)) / 2;

  return (
    <>
      <div className="space-y-12 md:hidden">
        {items.map((m, i) => (
          <article key={i} className="flex gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/star_no_background.png"
              alt=""
              className="mt-1 h-[72px] w-[72px] flex-none object-contain sm:h-[96px] sm:w-[96px]"
              draggable={false}
            />
            <NodeContent node={m} accent={accent} />
          </article>
        ))}
      </div>

      <div
        className="relative hidden md:block"
        style={{ height: `${N * nodeRem}rem` }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className="pointer-events-none absolute"
          style={{
            top: `calc(${walkerY}% - 14px)`,
            left: "calc(50% - 9px)",
            width: 18,
            height: 28,
            color: "var(--fg-soft)",
            opacity: 0.55,
          }}
          aria-hidden
        >
          <WalkingFigure />
        </div>

        {items.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="absolute"
                style={{
                  top: `calc(${cy(i)}% - ${radius}rem)`,
                  left: `calc(${cx(i)}% - ${radius}rem)`,
                  width: `${circleRem}rem`,
                  height: `${circleRem}rem`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/star_no_background.png"
                  alt=""
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: isLeft ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: i * 0.08 + 0.1 }}
                className="absolute"
                style={{
                  top: `calc(${cy(i)}% - 5.5rem)`,
                  left: isLeft ? "42%" : "6%",
                  width: "52%",
                }}
              >
                <NodeContent node={m} accent={accent} />
              </motion.div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

function NodeContent({
  node,
  accent,
}: {
  node: WindingNode;
  accent: string;
}) {
  return (
    <div>
      {node.eyebrow && (
        <div
          className="font-mono text-[0.7rem] uppercase tracking-[0.32em]"
          style={{ color: accent }}
        >
          {node.eyebrow}
        </div>
      )}
      <h4
        className="mt-3 font-display text-2xl leading-tight md:text-[1.75rem]"
        style={{ color: "var(--fg)" }}
      >
        {node.title}
      </h4>
      {node.subtitle && (
        <div
          className="mt-1 text-base italic md:text-lg"
          style={{ color: "var(--fg-soft)" }}
        >
          {node.subtitle}
        </div>
      )}
      {node.body && (
        <p
          className="mt-4 text-base leading-relaxed md:text-[1.05rem]"
          style={{ color: "var(--fg-soft)", maxWidth: "32rem" }}
        >
          {node.body}
        </p>
      )}
      {node.bullets && (
        <ul
          className="mt-4 space-y-2.5 text-base leading-relaxed md:text-[1.05rem]"
          style={{ color: "var(--fg-soft)" }}
        >
          {node.bullets.map((b, j) => (
            <li key={j} className="flex gap-3">
              <span
                className="mt-2.5 inline-block h-px w-4 flex-none"
                style={{ background: accent }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WalkingFigure() {
  return (
    <svg
      viewBox="0 0 18 28"
      className="h-full w-full"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="3" r="2.4" />
      <path d="M 9 6 L 9.5 14" fill="none" />
      <path d="M 9.5 14 L 6 21" fill="none" />
      <path d="M 9.5 14 L 13 22" fill="none" />
      <path d="M 9 9 L 5.5 12" fill="none" />
      <path d="M 9 9 L 13 11.5" fill="none" />
    </svg>
  );
}
