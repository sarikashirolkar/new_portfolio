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
5. Custom domain: **Settings → Custom domains → Set up** → enter `sarika.aiworkflowautomate.com`. Cloudflare will auto-add the DNS record because the parent zone is already in your account.

## Replacing the headshot

Drop your headshot at `public/headshot.jpg` (it ships with a placeholder). 3:4 aspect works best.

## Editing content

All resume-driven content lives in [`lib/data.ts`](lib/data.ts). The chatbot's knowledge lives in [`lib/resume-context.ts`](lib/resume-context.ts) — keep them in sync when you update your resume.
