"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

const ORBIT_STARS = [
  { x: -34, y: -30, size: 9, dur: 2.6, delay: 0 },
  { x: 30, y: -38, size: 7, dur: 2.9, delay: 0.45 },
  { x: -38, y: 16, size: 6, dur: 3.1, delay: 0.9 },
  { x: 36, y: 22, size: 8, dur: 2.7, delay: 1.3 },
  { x: -8, y: -44, size: 5, dur: 3.0, delay: 1.7 },
  { x: 14, y: 38, size: 6, dur: 2.8, delay: 2.1 },
];

function FourPointStar({
  size = 12,
  color = "#fff5ec",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
    >
      <path d="M12 0 C12.6 7.4 16.6 11.4 24 12 C16.6 12.6 12.6 16.6 12 24 C11.4 16.6 7.4 12.6 0 12 C7.4 11.4 11.4 7.4 12 0 Z" />
    </svg>
  );
}
import { useEffect, useState } from "react";
import { Chatbot } from "./Chatbot";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(true);

  useEffect(() => {
    function openChatbot() {
      setIsOpen(true);
      setShowNudge(false);
    }

    window.addEventListener("open-chatbot", openChatbot);
    if (window.location.hash === "#assistant") openChatbot();

    return () => window.removeEventListener("open-chatbot", openChatbot);
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const interval = window.setInterval(() => {
      setShowNudge(true);
      window.setTimeout(() => setShowNudge(false), 2600);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="h-[min(620px,calc(100vh-7.5rem))] w-[min(420px,calc(100vw-2.5rem))] overflow-hidden border border-[rgba(127,236,193,0.32)] bg-[#071331] p-3 shadow-[0_22px_70px_rgba(2,5,15,0.55)]"
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Sarika's AI assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:text-aurora-mint"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-[calc(100%-2.5rem)] min-h-0 overflow-hidden">
              <Chatbot embedded />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="chat-nudge"
              initial={{ opacity: 0, x: 12, scale: 0.98 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: showNudge ? [1, 1.04, 1] : 1,
              }}
              exit={{ opacity: 0, x: 8, scale: 0.98 }}
              transition={{
                duration: showNudge ? 1.2 : 0.18,
                repeat: showNudge ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2 rounded-full border bg-[#071331] px-4 py-2.5 text-sm font-semibold shadow-[0_12px_34px_rgba(2,5,15,0.45)]"
              style={{
                borderColor: "rgba(127,236,193,0.45)",
                color: "var(--fg)",
              }}
            >
              <Sparkles
                className="h-4 w-4 flex-none"
                style={{ color: "var(--accent)" }}
              />
              <span className="max-w-[220px] whitespace-nowrap">
                Ask my AI anything
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex"
                aria-hidden
              >
                <ArrowRight
                  className="h-4 w-4"
                  style={{ color: "var(--accent)" }}
                />
              </motion.span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="relative">
          {!isOpen ? (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              aria-hidden
            >
              {ORBIT_STARS.map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute"
                  style={{
                    left: 0,
                    top: 0,
                    marginLeft: -s.size / 2,
                    marginTop: -s.size / 2,
                    color: i % 2 === 0 ? "#fff5ec" : "#ffd9c4",
                    filter: `drop-shadow(0 0 6px ${
                      i % 2 === 0
                        ? "rgba(255,245,236,0.7)"
                        : "rgba(244,168,156,0.7)"
                    })`,
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    x: [0, s.x * 0.45, s.x],
                    y: [0, s.y * 0.45, s.y],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 60, 120],
                  }}
                  transition={{
                    duration: s.dur,
                    repeat: Infinity,
                    delay: s.delay,
                    ease: "easeOut",
                  }}
                >
                  <FourPointStar size={s.size} color="currentColor" />
                </motion.span>
              ))}
            </div>
          ) : null}

          <motion.button
            type="button"
            onClick={() => {
              setIsOpen((open) => !open);
              setShowNudge(false);
            }}
            aria-label={
              isOpen
                ? "Close Sarika's AI assistant"
                : "Open Sarika's AI assistant"
            }
            className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full transition-transform hover:scale-105 md:h-[76px] md:w-[76px]"
            style={{
              background:
                "radial-gradient(circle at 30% 28%, #ffeede 0%, #f5b7a4 28%, #c084fc 62%, #6d4ad6 100%)",
              boxShadow:
                "0 14px 36px rgba(2,5,15,0.5), 0 0 0 1px rgba(255,245,236,0.18) inset, 0 0 24px rgba(244,168,156,0.35)",
            }}
            animate={{
              boxShadow: [
                "0 14px 36px rgba(2,5,15,0.5), 0 0 0 1px rgba(255,245,236,0.18) inset, 0 0 24px rgba(244,168,156,0.35)",
                "0 14px 40px rgba(2,5,15,0.55), 0 0 0 1px rgba(255,245,236,0.28) inset, 0 0 38px rgba(244,168,156,0.55)",
                "0 14px 36px rgba(2,5,15,0.5), 0 0 0 1px rgba(255,245,236,0.18) inset, 0 0 24px rgba(244,168,156,0.35)",
              ],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              aria-hidden
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  border: "1.5px solid rgba(255,245,236,0.7)",
                }}
              />
            </span>

            {isOpen ? (
              <X
                className="relative h-7 w-7"
                style={{ color: "#3b1d4a" }}
                strokeWidth={2.4}
              />
            ) : (
              <span className="relative flex items-center justify-center">
                <Sparkles
                  className="h-7 w-7 md:h-8 md:w-8"
                  style={{ color: "#3b1d4a" }}
                  strokeWidth={1.8}
                />
                <motion.span
                  className="absolute -right-1.5 -top-2"
                  animate={{
                    scale: [0.8, 1.15, 0.8],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                >
                  <FourPointStar size={9} color="#fff5ec" />
                </motion.span>
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
