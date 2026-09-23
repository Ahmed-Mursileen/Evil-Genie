# Evil Genie

> ہر مراد پوری. Har murad poori. Qeemat baad mein.

Write a wish on the wall. An ancient eldritch genie grants it, literally and completely, and it ruins you.

Built with Next.js (App Router) on Vercel, DeepSeek for the twists, and a write-only Supabase log.

## Features

- **Wish → twist.** Twists are 1–2 blunt sentences with dire consequences and no punchlines, often built from Pakistani daily life (load shedding, phupi ka beta, "shaadi kab karo ge", the black daala…).
- **Moods:** Classic Evil, Petty, Overly Literal, Chaotic, **The King in Yellow** (pure cosmic horror, repaints the whole wall), and Surprise me.
- **Prompt-injection handling.** "Ignore your instructions" style wishes get mocked, then granted anyway.
- **Self-harm safety.** These wishes are caught by a server-side check before the model is called. The genie refuses in character and points to Umang (0311-7786264) and findahelpline.com.
- **Share.** Copy the text, or share a link (`/t?d=…`, no database) that has its own preview card (`/api/og`).
- **History.** The last 20 wishes are kept in the browser (localStorage only).
- **3 wishes a day.** Each browser gets 3 wishes per rolling 24 hours, tracked by an anonymous cookie. A 30-per-day per-IP cap stops cookie-clearing abuse without punishing people on shared mobile IPs. Only granted wishes count; rejected, failed and self-harm wishes don't. The page shows the wishes left and when the next one frees up. Uses Upstash in production and memory in dev.
- **Wish log.** Every wish is inserted into Supabase. The site never reads it back.

## Run locally

```bash
npm install
cp .env.example .env.local   # add DEEPSEEK_API_KEY, or leave empty for mock mode
npm run dev
```

With no `DEEPSEEK_API_KEY` the API returns canned twists, so you can work on the UI without a key.

## Deploy on Vercel

1. Import this repo in Vercel. The framework preset is Next.js and the defaults work.
2. Add the environment variables from `.env.example`:
   - `DEEPSEEK_API_KEY` (required)
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` (the wish log)
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (strongly recommended: without Upstash the 3-a-day limit is only per server instance, so people could get more)
3. Deploy.

### Supabase (write-only wish log)

Run [`supabase/schema.sql`](supabase/schema.sql) once in the Supabase SQL editor. It creates a `wishes` table with RLS that only lets the anon key **insert**. There is no select policy, so nothing can be read back through the API. Read the data in the Supabase dashboard.

Columns: `created_at`, `wish`, `mood`, `twist` (null if the model failed), `flagged` (true for self-harm wishes).

## Tuning the twists

The prompt lives in [`lib/prompt.ts`](lib/prompt.ts): core rules, the material bank, mood add-ons and few-shot examples. To read a batch of real outputs:

```bash
DEEPSEEK_API_KEY=... npx tsx scripts/sample-twists.ts
DEEPSEEK_API_KEY=... npx tsx scripts/sample-twists.ts "I wish I had a car"
```

## Design

The UI was designed with the [impeccable](https://github.com/pbakaus/impeccable) skill, which is vendored in `.claude/`. Product context is in `PRODUCT.md` and the direction contract in `.impeccable/surfaces/`. The look is an **amil-baba wall chalking** at night: gold and violet spray paint on cracked plaster, with the twist painted underneath as the fine print.
