/**
 * Cloudflare Pages Function - POST /api/contact
 *
 * Bindings expected:
 *   - RESEND_API_KEY: Resend API key
 *   - CONTACT_TO_EMAIL: inbox that receives portfolio contact messages
 *   - CONTACT_FROM_EMAIL: verified sender email in Resend
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { headers: corsHeaders() });

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    const body = (await ctx.request.json()) as ContactPayload;
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return json({ error: "Name, email ID, and message are required." }, 400);
    }

    if (name.length > 120 || email.length > 254 || phone.length > 30 || message.length > 1500) {
      return json({ error: "Input too long." }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Valid email ID is required." }, 400);
    }

    if (!ctx.env.RESEND_API_KEY) {
      return json({ error: "Email service is not configured." }, 503);
    }

    const toEmail = ctx.env.CONTACT_TO_EMAIL || "sarikashirolkar@gmail.com";
    const fromEmail = ctx.env.CONTACT_FROM_EMAIL || "sarikasharada123@gmail.com";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New portfolio connection request from ${name}`,
        text: [
          "Hey, somebody signed up on your website.",
          "",
          "Here are the connection details:",
          `Name: ${name}`,
          `Number: ${phone || "Not provided"}`,
          `Email ID: ${email}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return json({ error: "Email failed.", details }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: (err as Error).message || "Contact request failed." }, 500);
  }
};

export const onRequest: PagesFunction<Env> = async () =>
  json({ error: "Method not allowed." }, 405);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}
