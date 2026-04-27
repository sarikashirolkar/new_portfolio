# Sarika Shirolkar — Portfolio

Aurora-borealis themed portfolio for [sarika.aiworkflowautomate.com](https://sarika.aiworkflowautomate.com).

## Stack

- Next.js 14 (App Router, static export) + TypeScript
- Tailwind CSS with custom aurora palette
- React Three Fiber + custom GLSL shader for the animated aurora background
- Framer Motion for scroll-driven 3D effects
- next-themes for light/dark switching
- Cloudflare Pages (hosting) + Pages Functions (chatbot API)
- Cloudflare Workers AI (Llama 3 8B) for the resume-aware chatbot — free tier; falls back to Anthropic Claude if configured

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> The chatbot will return a 500 in local dev unless you proxy `/api/chat` to a deployed Cloudflare environment, or run `wrangler pages dev`. The rest of the site works fully offline.

## Build (static export)

```bash
npm run build
# output → ./out
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (already pointed at `sarikashirolkar/new_portfolio`).
2. In Cloudflare → Pages → **Create application** → **Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Bind Workers AI: **Settings → Functions → Bindings → Workers AI** → variable name `AI`.
5. Configure the chatbot under **Settings → Environment variables**:
   - `GEMINI_API_KEY`: Google Gemini API key for Sarika's low-cost portfolio assistant
   - `GEMINI_MODEL`: optional model override, defaults to `gemini-2.5-flash-lite`
   - `OPENAI_API_KEY`: optional OpenAI fallback
   - `OPENAI_MODEL`: optional OpenAI model override, defaults to `gpt-5-mini`

6. Contact form delivery currently posts to the Google Apps Script endpoint used by the old portfolio. That script should be deployed from `sarikasharada123@gmail.com` and send notifications to `sarikashirolkar@gmail.com`.
   To override it at build time, set:
   - `NEXT_PUBLIC_CONTACT_API_URL`: contact form endpoint

   If you use the Cloudflare `/api/contact` function instead, configure:
   - `RESEND_API_KEY`: Resend API key
   - `CONTACT_TO_EMAIL`: `sarikashirolkar@gmail.com`
   - `CONTACT_FROM_EMAIL`: verified sender email in Resend, such as `sarikasharada123@gmail.com` if verified
7. Custom domain: **Settings → Custom domains → Set up** → enter `sarika.aiworkflowautomate.com`. Cloudflare will auto-add the DNS record because the parent zone is already in your account.

## Replacing the headshot

Drop your headshot at `public/headshot.jpg` (it ships with a placeholder). 3:4 aspect works best.

## Editing content

All resume-driven content lives in [`lib/data.ts`](lib/data.ts). The chatbot's knowledge lives in [`lib/resume-context.ts`](lib/resume-context.ts) — keep them in sync when you update your resume.
