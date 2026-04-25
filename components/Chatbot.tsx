"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

type ChatbotProps = {
  embedded?: boolean;
};

const SUGGESTIONS = [
  "What has Sarika shipped?",
  "Tell me about her IEEE paper",
  "Is she a good fit for an AI engineer role?",
  "What's her experience with agentic AI?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi. Ask me about Sarika's shipped products, research, hackathon wins, stack, or fit for a role.",
};

export function Chatbot({ embedded = false }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [heroDocked, setHeroDocked] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open, heroDocked]);

  useEffect(() => {
    const updateDocked = () => {
      const hero = document.getElementById("top");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setHeroDocked(rect.bottom > window.innerHeight * 0.35);
    };

    updateDocked();
    window.addEventListener("scroll", updateDocked, { passive: true });
    window.addEventListener("resize", updateDocked);
    return () => {
      window.removeEventListener("scroll", updateDocked);
      window.removeEventListener("resize", updateDocked);
    };
  }, []);

  useEffect(() => {
    if (heroDocked) {
      setOpen(false);
    }
  }, [heroDocked]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("Bad response");
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        "Sorry, I had trouble answering that. You can email Sarika directly at sarikashirolkar@gmail.com.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "The chatbot is unavailable right now. Reach Sarika at sarikashirolkar@gmail.com if needed.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const panel = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[22px] border" style={{ borderColor: "var(--border)", background: "rgba(6, 14, 34, 0.66)" }}>
      <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
        >
          <Sparkles className="h-5 w-5 text-[#08102a]" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-bold" style={{ color: "var(--fg)" }}>
            Ask about Sarika
          </div>
          <div className="text-xs" style={{ color: "var(--fg-soft)" }}>
            Resume-aware assistant
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
              style={
                m.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #7fecc1, #6d4ad6)",
                      color: "#08102a",
                    }
                  : {
                      background: "rgba(127,236,193,0.08)",
                      border: "1px solid var(--border)",
                      color: "var(--fg)",
                    }
              }
            >
              {m.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="flex gap-1 rounded-2xl rounded-bl-sm px-4 py-3"
              style={{ background: "rgba(127,236,193,0.08)", border: "1px solid var(--border)" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              ))}
            </div>
          </div>
        )}

        {messages.length === 1 && !loading && (
          <div className="space-y-2 pt-2">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--fg-soft)" }}>
              Suggested prompts
            </div>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-xl px-3 py-2 text-left text-sm transition-colors"
                style={{
                  background: "rgba(127,236,193,0.05)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t px-3 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sarika..."
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          style={{ color: "var(--fg)" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-30"
          style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
        >
          <Send className="h-4 w-4 text-[#08102a]" />
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return (
      <>
        {heroDocked ? (
          <div className="h-full">{panel}</div>
        ) : null}

        {!heroDocked ? (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close chat" : "Open chat"}
              className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full glow-accent"
              style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="h-6 w-6 text-[#08102a]" />
                  </motion.span>
                ) : (
                  <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <MessageSquare className="h-6 w-6 text-[#08102a]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.96 }}
                  className="fixed bottom-24 right-6 z-50 h-[min(620px,calc(100vh-8rem))] w-[calc(100vw-3rem)] max-w-md"
                >
                  {panel}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        ) : null}
      </>
    );
  }

  return panel;
}
