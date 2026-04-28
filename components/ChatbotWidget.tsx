"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
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
      window.setTimeout(() => setShowNudge(false), 1500);
    }, 2000);

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
          {!isOpen && showNudge ? (
            <motion.div
              key="chat-nudge"
              initial={{ opacity: 0, x: 12, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="max-w-[220px] rounded-full border bg-[#071331] px-4 py-2 text-sm font-semibold shadow-[0_12px_34px_rgba(2,5,15,0.38)]"
              style={{ borderColor: "rgba(127,236,193,0.32)", color: "var(--fg)" }}
            >
              chat with sarika&apos;s ai assistant
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            setIsOpen((open) => !open);
            setShowNudge(false);
          }}
          aria-label={isOpen ? "Close Sarika's AI assistant" : "Open Sarika's AI assistant"}
          className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_34px_rgba(127,236,193,0.42)] transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
        >
          <span className="absolute inset-0 rounded-full border border-white/30" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#071331]">
            <Sparkles className="h-3 w-3 text-aurora-mint" />
          </span>
          {isOpen ? (
            <X className="h-7 w-7 text-[#08102a]" />
          ) : (
            <MessageCircle className="h-7 w-7 text-[#08102a]" />
          )}
        </button>
      </div>
    </div>
  );
}
