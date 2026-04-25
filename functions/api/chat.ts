/**
 * Cloudflare Pages Function — POST /api/chat
 *
 * Bindings expected (configure in Pages dashboard or wrangler.toml):
 *   - AI: Workers AI binding (free tier covers Llama 3 8B for portfolio traffic)
 *
 * Optional fallback: ANTHROPIC_API_KEY env var → Claude Haiku
 */

import { RESUME_CONTEXT } from "../../lib/resume-context";

interface Env {
  AI?: {
    run: (model: string, input: unknown) => Promise<{ response?: string }>;
  };
  ANTHROPIC_API_KEY?: string;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const MAX_INPUT_CHARS = 4000;
const MAX_HISTORY = 12;

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    const { messages } = (await ctx.request.json()) as { messages?: ChatMessage[] };
    if (!messages || !Array.isArray(messages)) {
      return json({ error: "Invalid payload" }, 400);
    }

    const trimmed = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_CHARS) }));

    if (ctx.env.AI) {
      const result = await ctx.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [{ role: "system", content: RESUME_CONTEXT }, ...trimmed],
        max_tokens: 400,
        temperature: 0.4,
      });
      return json({ reply: result.response?.trim() ?? "" });
    }

    if (ctx.env.ANTHROPIC_API_KEY) {
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ctx.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          system: RESUME_CONTEXT,
          messages: trimmed,
        }),
      });
      const data = (await anthropicRes.json()) as {
        content?: { type: string; text?: string }[];
      };
      const reply =
        data.content?.filter((c) => c.type === "text").map((c) => c.text ?? "").join("\n").trim() ??
        "";
      return json({ reply });
    }

    return json(
      {
        error:
          "Chatbot not configured. Bind Workers AI (AI) or set ANTHROPIC_API_KEY in Cloudflare Pages settings.",
      },
      500
    );
  } catch (err) {
    return json({ error: (err as Error).message ?? "Unknown error" }, 500);
  }
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
