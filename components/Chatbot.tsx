"use client";

import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  images?: { src: string; alt: string }[];
};

type ChatbotProps = {
  embedded?: boolean;
};

const SUGGESTIONS = [
  "Tell me about Sarika's hackathon wins",
  "Give me a quick introduction about Sarika",
  "What does Sarika do at AI Workflow Automation",
  "Tell me about Sarika's IEEE research paper",
  "What are Sarika's skills and tech stack",
  "What are Sarika's hobbies and interests",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey! I'm Sarika's assistant. Ask me anything about what her tech brain has been building!",
};

const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ||
  "/api/chat";

const faqs = [
  {
    id: "intro",
    match: ["who are you", "tell me about yourself", "introduce yourself", "quick introduction", "summary"],
    answer:
      "Sarika S Shirolkar is an AI engineer and builder focused on agentic AI, LLM systems, ML workflows, and cloud deployment. She ships practical AI products, including Linkyro, voice scheduling agents, and computer vision research.",
  },
  {
    id: "current-role",
    match: ["current job", "where do you work", "ai workflow automate", "what does sarika do at ai workflow automation", "a2w"],
    answer:
      "Sarika works at AI Workflow Automate, building AI-native products end-to-end: voice agents, LLM workflows, automation systems, evaluation loops, and production cloud deployments.",
  },
  {
    id: "voice-agent",
    match: ["voice agent", "retell", "n8n", "google calendar", "appointment", "dental clinic"],
    answer:
      "Sarika built an AI voice scheduling agent using Retell AI, n8n, and Google Calendar. It can book, reschedule, cancel appointments, and check availability through phone calls while syncing calendar updates in real time.",
  },
  {
    id: "ieee-paper",
    match: ["ieee", "paper", "publication", "research", "yolov8", "object detection"],
    answer:
      "Sarika's IEEE research focuses on YOLOv8-based real-time object detection under adverse weather for autonomous systems, with benchmarking, robustness checks, and error analysis.",
  },
  {
    id: "skills",
    match: ["skills", "tech stack", "tools", "programming", "what are sarika's skills"],
    answer:
      "Sarika's stack includes Python, SQL, JavaScript/TypeScript, LLM orchestration, LangChain, n8n, Retell AI, YOLOv8, OpenCV, scikit-learn, TensorFlow/Keras, Azure, Linux, Docker, Databricks, and Power BI.",
  },
  {
    id: "hackathon-wins",
    match: ["hackathon", "hackathon wins", "databricks", "hackmarch", "agentic ai hackathon", "prizes"],
    answer:
      "Sarika secured 2nd Place at the Databricks Hackathon with Kisan Mitra, a dual-purpose AI assistant for farming families. She also won 1st Place at HackMarch 2.0, an Agentic AI Hackathon, with the Ebbinghaus Adaptive Memory Agent.",
    images: [
      { src: "/chatbot/hackathon-databricks.jpg", alt: "Sarika at the Databricks Hackathon" },
      { src: "/chatbot/hackathon-agenticai.jpg", alt: "Sarika at the Agentic AI Hackathon" },
    ],
  },
  {
    id: "hobbies",
    match: ["hobbies", "interests", "fun", "trekking", "outside work"],
    answer:
      "Sarika loves trekking and outdoor adventures. She also enjoys attending IEEE, Google Developer Group, and Microsoft events to stay connected with builder communities.",
    images: [
      { src: "/chatbot/hobby-trekking.jpg", alt: "Sarika trekking" },
      { src: "/chatbot/hobby-gdg.jpg", alt: "Sarika at a GDG event" },
    ],
  },
  {
    id: "contact",
    match: ["contact", "email", "linkedin", "phone"],
    answer:
      "You can reach Sarika at sarikashirolkar@gmail.com or on LinkedIn at linkedin.com/in/sarikashirolkar.",
  },
];

const knowledgeDocuments = [
  "Sarika S Shirolkar is an AI Engineer and builder based in Bengaluru, focused on agentic AI, LLM systems, multimodal ML, and cloud deployment.",
  "At AI Workflow Automate, Sarika builds AI voice agents, n8n automations, LLM workflows, evaluation pipelines, and production deployments.",
  "Linkyro is Sarika's solo-built AI-powered Chrome extension for context-aware comment generation using LLMs.",
  "Sarika's IEEE paper uses YOLOv8 for real-time object detection under adverse weather conditions for autonomous systems.",
  "Sarika's cloud experience includes Azure Linux VMs, Azure App Service, deployment practices, logging, monitoring, and rollback-friendly releases.",
  "Sarika's skills include Python, SQL, Java, JavaScript, TypeScript, LangChain, Retell AI, n8n, YOLOv8, OpenCV, TensorFlow, Keras, scikit-learn, Docker, Azure, Databricks, and Power BI.",
  "Sarika has a CGPA of 9.1 in B.E. CSE AI and ML at Sai Vidya Institute of Technology under VTU.",
];

const normalizeText = (value: string) =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

const tokenize = (value: string) =>
  normalizeText(value).split(/[^a-z0-9+.#-]+/).filter(Boolean);

function findLocalAnswer(question: string): Message | null {
  const normalized = normalizeText(question);
  const questionTokens = new Set(tokenize(question));

  let bestFaq: (typeof faqs)[number] | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    for (const phrase of faq.match) {
      const phraseTokens = tokenize(phrase);
      let score = normalized.includes(normalizeText(phrase)) ? 6 : 0;
      for (const token of phraseTokens) {
        if (questionTokens.has(token)) score += 1;
      }
      if (score > bestScore) {
        bestFaq = faq;
        bestScore = score;
      }
    }
  }

  if (bestFaq && bestScore >= 3) {
    return { role: "assistant", content: bestFaq.answer, images: bestFaq.images };
  }

  const ranked = knowledgeDocuments
    .map((document) => {
      const doc = normalizeText(document);
      let score = 0;
      for (const token of questionTokens) {
        if (doc.includes(token)) score += token.length > 4 ? 2 : 1;
      }
      return { document, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!ranked.length) return null;
  return {
    role: "assistant",
    content: ranked.map((item) => item.document).join(" "),
  };
}

function imagesForQuestion(question: string) {
  const normalized = normalizeText(question);
  if (normalized.includes("hackathon")) {
    return faqs.find((faq) => faq.id === "hackathon-wins")?.images;
  }
  if (
    normalized.includes("hobbies") ||
    normalized.includes("interests") ||
    normalized.includes("trekking")
  ) {
    return faqs.find((faq) => faq.id === "hobbies")?.images;
  }
  return undefined;
}

export function Chatbot({ embedded = false }: ChatbotProps) {
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
      const isOldWorker = !CHAT_API_URL.endsWith("/api/chat");
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isOldWorker ? { question: trimmed } : { messages: next }),
      });
      if (!res.ok) throw new Error("Bad response");
      const data = (await res.json()) as { reply?: string; answer?: string; sources?: string[]; error?: string };
      const reply =
        data.reply ??
        (data.answer
          ? `${data.answer}${data.sources?.length ? `\n\nSources: ${data.sources.join(", ")}` : ""}`
          : undefined) ??
        "Sorry, I had trouble answering that. You can email Sarika directly at sarikashirolkar@gmail.com.";
      setMessages([...next, { role: "assistant", content: reply, images: imagesForQuestion(trimmed) }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "The AI chatbot is not configured yet. Add GEMINI_API_KEY in Cloudflare Pages to enable it.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const panel = (
    <div className="flex h-full min-h-0 max-h-full flex-col overflow-hidden border" style={{ borderColor: "rgba(127,236,193,0.24)", background: "#071331" }}>
      <div className="flex items-center gap-2.5 border-b px-3 py-2.5" style={{ borderColor: "var(--border)" }}>
        <div
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
        >
          <Sparkles className="h-4 w-4 text-[#08102a]" />
        </div>
        <div className="min-w-0">
          <div className="font-accent text-xl font-semibold leading-none" style={{ color: "var(--fg)" }}>
            Sarika&apos;s Assistant
          </div>
          <div className="text-xs" style={{ color: "var(--fg-soft)" }}>
            Ask a question or choose a prompt.
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2.5">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs leading-relaxed md:text-sm ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
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
              {m.images?.length ? (
                <div className="mt-3 grid gap-2">
                  {m.images.map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="max-h-48 w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="flex gap-1 rounded-2xl rounded-bl-sm px-3 py-2.5"
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
          <div className="space-y-1.5 pt-1">
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--fg-soft)" }}>
              Suggested prompts
            </div>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-xl px-3 py-1.5 text-left text-xs transition-colors"
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
        className="flex items-center gap-2 border-t px-3 py-2"
        style={{ borderColor: "var(--border)" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sarika..."
          className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-xs outline-none md:text-sm"
          style={{ color: "var(--fg)" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full disabled:opacity-30"
          style={{ background: "linear-gradient(135deg, #7fecc1, #6d4ad6)" }}
        >
          <Send className="h-3.5 w-3.5 text-[#08102a]" />
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return <div className="h-full min-h-0 overflow-hidden">{panel}</div>;
  }

  return panel;
}
