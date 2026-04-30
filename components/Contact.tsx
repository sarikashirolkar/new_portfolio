"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { personal } from "@/lib/data";

const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ||
  "https://script.google.com/macros/s/AKfycbzLTOuWPxz5nIwfgZfhz4v38s0k6f27Hb7-3TpLLkjBunQl1azuO3Hn76HGEl9tiTBGTg/exec";

export function Contact() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPanelOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please add your name, email ID, and message.");
      return;
    }

    setIsSending(true);
    setStatus("Sending your message...");

    try {
      const isGoogleAppsScript = /script\.google\.com/i.test(CONTACT_API_URL);
      const response = await fetch(
        CONTACT_API_URL,
        isGoogleAppsScript
          ? {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(payload),
            }
          : {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
      );

      if (!isGoogleAppsScript && !response.ok) {
        throw new Error("Unable to send message.");
      }

      form.reset();
      setStatus("Message sent. I will receive the connection details by email.");
    } catch {
      setStatus(`Message could not be sent. Please email ${personal.email} directly.`);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="connect" className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[18px] border px-5 py-10 text-center shadow-[0_20px_54px_rgba(2,5,15,0.42),0_0_54px_rgba(127,236,193,0.1)] md:px-8 md:py-14"
          style={{
            background: "rgba(0,0,0,0.78)",
            borderColor: "rgba(127,236,193,0.18)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(127,236,193,0.12),transparent_42%),radial-gradient(circle_at_80%_72%,rgba(139,92,246,0.12),transparent_36%)]" />
          <div
            className="relative text-xs uppercase tracking-[0.32em] md:text-sm"
            style={{
              color: "#7fecc1",
              textShadow: "0 0 20px rgba(127,236,193,0.48)",
            }}
          >
            Let&apos;s build together
          </div>
          <h2 className="relative mt-4 font-display text-5xl font-normal leading-tight md:text-6xl xl:text-7xl">
            <span
              className="aurora-text"
              style={{ textShadow: "0 0 42px rgba(127,236,193,0.45)" }}
            >
              Let&apos;s connect!
            </span>
          </h2>
          <p
            className="relative mx-auto mt-5 max-w-2xl font-display text-3xl leading-tight md:text-4xl"
            style={{
              color: "#efe8d7",
              textShadow:
                "0 0 28px rgba(239,232,215,0.28), 0 0 46px rgba(139,92,246,0.25)",
            }}
          >
            let&apos;s build <span className="aurora-text">something!</span>
          </p>

          <motion.button
            type="button"
            onClick={() => setIsPanelOpen(true)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary relative mt-6 inline-flex"
          >
            <Mail className="h-4 w-4" />
            Let&apos;s connect
          </motion.button>

          <div
            className="relative mt-8 text-xs font-mono md:text-sm"
            style={{
              color: "rgba(239,232,215,0.72)",
              textShadow: "0 0 18px rgba(127,236,193,0.2)",
            }}
          >
            © {new Date().getFullYear()} Sarika Shirolkar ·{" "}
            {personal.domain}
          </div>
        </motion.div>
      </div>

      {isPanelOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050f]/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-panel-title"
          onClick={() => setIsPanelOpen(false)}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="glass relative grid max-h-[92dvh] w-full max-w-2xl gap-4 overflow-y-auto rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] p-5 text-left shadow-2xl md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em]" style={{ color: "var(--accent)" }}>
                  Let&apos;s connect
                </p>
                <h3 id="connect-panel-title" className="font-accent mt-2 text-4xl font-semibold">
                  Connection Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--fg)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                aria-label="Close contact form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-4 py-3 text-base text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Number <span className="font-normal text-[color:var(--fg-soft)]">Optional</span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-4 py-3 text-base text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Email ID
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-4 py-3 text-base text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Message
              <textarea
                name="message"
                required
                rows={5}
                maxLength={1500}
                className="resize-y rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-4 py-3 text-base text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)]"
              />
            </label>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button className="btn-primary" type="submit" disabled={isSending}>
                <Mail className="h-4 w-4" />
                {isSending ? "Sending..." : "Send Message"}
              </button>
              <p className="min-h-5 text-sm" style={{ color: "var(--fg-soft)" }} aria-live="polite">
                {status}
              </p>
            </div>
          </motion.form>
        </div>
      ) : null}
    </section>
  );
}
