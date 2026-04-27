/**
 * Cloudflare Pages Function — POST /api/chat
 *
 * Bindings expected (configure in Pages dashboard or wrangler.toml):
 *   - GEMINI_API_KEY: Google Gemini API key for the low-cost portfolio assistant
 *   - GEMINI_MODEL: optional, defaults to gemini-2.5-flash-lite
 *   - OPENAI_API_KEY: optional OpenAI fallback
 *   - AI: Workers AI binding (free tier covers Llama 3 8B for portfolio traffic)
 *
 * Optional fallback: ANTHROPIC_API_KEY env var → Claude Haiku
 */

import { RESUME_CONTEXT } from "../../lib/resume-context";

interface Env {
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
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
const OFF_TOPIC_REPLY = "Let's only talk about Sarika!";

const ASSISTANT_INSTRUCTIONS = `You are Sarika Shirolkar's portfolio chatbot.

Answer only questions about Sarika Shirolkar: her background, resume, education, experience, projects, skills, achievements, research, hobbies, contact details, and role fit.

If the user asks anything unrelated to Sarika, reply exactly:
${OFF_TOPIC_REPLY}

Use only the provided Sarika context. Do not invent facts. If the question is about Sarika but the context does not contain the answer, say that you do not have that detail and suggest contacting Sarika.

Keep answers concise, specific, and recruiter-friendly.

Sarika context:
${RESUME_CONTEXT}`;

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

    if (ctx.env.GEMINI_API_KEY) {
      const model = (ctx.env.GEMINI_MODEL || "gemini-2.5-flash-lite")
        .trim()
        .replace(/^models\//, "")
        .replace(/^["']|["']$/g, "");
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(ctx.env.GEMINI_API_KEY)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: ASSISTANT_INSTRUCTIONS }],
            },
            contents: trimmed.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: {
              maxOutputTokens: 450,
              temperature: 0.2,
            },
          }),
        }
      );

      const data = (await geminiRes.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
        error?: { message?: string };
      };

      if (!geminiRes.ok) {
        return json({ error: data.error?.message || "Gemini request failed" }, 502);
      }

      const reply =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("\n")
          .trim() || "";

      return json({ reply: reply || OFF_TOPIC_REPLY });
    }

    if (ctx.env.OPENAI_API_KEY) {
      const openaiRes = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: ctx.env.OPENAI_MODEL || "gpt-5-mini",
          instructions: ASSISTANT_INSTRUCTIONS,
          input: trimmed.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          max_output_tokens: 450,
        }),
      });

      const data = (await openaiRes.json()) as {
        output_text?: string;
        output?: { content?: { text?: string; type?: string }[] }[];
        error?: { message?: string };
      };

      if (!openaiRes.ok) {
        return json({ error: data.error?.message || "OpenAI request failed" }, 502);
      }

      const reply =
        data.output_text?.trim() ||
        data.output
          ?.flatMap((item) => item.content || [])
          .map((content) => content.text || "")
          .join("\n")
          .trim() ||
        "";

      return json({ reply: reply || OFF_TOPIC_REPLY });
    }

    if (ctx.env.AI) {
      const result = await ctx.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [{ role: "system", content: ASSISTANT_INSTRUCTIONS }, ...trimmed],
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
          system: ASSISTANT_INSTRUCTIONS,
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
          "Chatbot not configured. Set GEMINI_API_KEY, OPENAI_API_KEY, bind Workers AI (AI), or set ANTHROPIC_API_KEY in Cloudflare Pages settings.",
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
