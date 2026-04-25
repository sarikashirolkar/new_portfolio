"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Sarika shipped?",
  "Tell me about her IEEE paper",
  "Is she a good fit for an AI engineer role?",
  "What's her experience with agentic AI?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm trained on Sarika's resume and projects. Ask me anything — her shipped products, hackathon wins, the IEEE paper, her stack, or whether she's a fit for a role you have in mind.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

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
            "Hmm, my brain is offline right now. Try again in a moment, or reach Sarika at sarikashirolkar@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask AI about Sarika"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center glow-accent"
        style={{
          background: "linear-gradient(135deg, #7fecc1, #6d4ad6)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-[#08102a]" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6 text-[#08102a]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[min(600px,calc(100vh-9rem))] glass flex flex-col overflow-hidden"
          >
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
              >
                <Sparkles className="w-5 h-5 text-[#08102a]" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">Ask about Sarika</div>
                <div className="text-xs flex items-center gap-1.5" style={{ color: "var(--fg-soft)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  AI assistant · resume-aware
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm rounded-2xl whitespace-pre-wrap ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
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
                    className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1"
                    style={{ background: "rgba(127,236,193,0.08)", border: "1px solid var(--border)" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <div className="text-xs uppercase tracking-widest" style={{ color: "var(--fg-soft)" }}>
                    Try asking
                  </div>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="w-full text-left text-sm px-3 py-2 rounded-xl transition-colors"
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
              className="flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Sarika…"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                style={{ color: "var(--fg)" }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
              >
                <Send className="w-4 h-4 text-[#08102a]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
