# Flower Background — drop-in for `new_portfolio`

This folder mirrors the structure of your Next.js repo. Just copy the two folders
(`components/` and `public/flowers/`) into your repo root.

## What goes where

```
new_portfolio/
├── components/
│   └── FlowerCanvas.tsx        ← NEW (from handoff/components/)
├── public/
│   └── flowers/                ← NEW (9 PNGs, from handoff/public/flowers/)
│       ├── white.png
│       ├── teal.png
│       ├── magenta.png
│       ├── blue.png
│       ├── pink.png
│       ├── amber.png
│       ├── purple.png
│       ├── pink-sakura.png
│       └── white-fractal.png
└── app/
    └── page.tsx                ← EDIT: swap AuroraCanvas → FlowerCanvas
```

## Step-by-step (3 commands + 1 edit)

From your repo root:

```bash
# 1. copy the component
cp /path/to/handoff/components/FlowerCanvas.tsx components/

# 2. copy the flower images
mkdir -p public/flowers
cp /path/to/handoff/public/flowers/*.png public/flowers/

# 3. edit app/page.tsx — replace the AuroraCanvas import + usage:
#    - import { AuroraCanvas } from "@/components/AuroraCanvas";
#    + import { FlowerCanvas } from "@/components/FlowerCanvas";
#
#    - <AuroraCanvas />
#    + <FlowerCanvas />
```

Then `npm run dev` and visit localhost:3000 — flowers should drift in the background.

## How it works

- 9 flower PNGs (cut out from your reference grid, alpha-keyed off black).
- `requestAnimationFrame` loop with all motion as `sin/cos((t / loopSec) * 2π + offset)`.
  This means **frame at t=0 is mathematically identical to frame at t=loopSec** —
  truly seamless, no crossfade hack.
- Scroll parallax: each flower has a `depth` (0.10–0.62). Front-layer sakura translate
  fastest, back-layer fractals barely move.
- Flowers fade slightly as you scroll deep so text always wins.

## Tuning knobs (top of `FlowerCanvas.tsx`)

```ts
const LOOP_SEC = 28;    // longer = more organic, less repetitive
const DRIFT = 1.0;      // overall drift amount
const PARALLAX = 1.0;   // scroll parallax strength
```

Per-flower placements (`PLACEMENTS` array) control x/y position, drift amplitude,
rotation amount, depth, opacity, blur, and scale. Edit freely.

## Working with Claude Code from here

In your repo, just run `claude` in the terminal. Claude Code can read this whole
codebase and you can ask it to:

- "Move the magenta flower to the top right"
- "Add a fade-out for flowers when entering the projects section"
- "Make the white fractal pulse more"
- "Add a Tweaks panel that lets me adjust LOOP_SEC live"

Anything you'd ask me, but with full file-system + git access and the ability to
actually push to your repo.

## I can't push to GitHub from here

This sandbox doesn't have GitHub write access to your repo. Two options:

1. **Download this `handoff/` folder**, drop the files into your local clone, commit & push yourself.
2. **Open Claude Code in your repo**, paste the `FlowerCanvas.tsx` source from here,
   ask it to wire it up, and let it commit.

Either way takes about 30 seconds.
