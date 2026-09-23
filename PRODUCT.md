# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) deployed on Vercel. The AI provider is DeepSeek (OpenAI-compatible API). Wishes are logged to a write-only Supabase table.

## Users

Pakistani students and young adults, on their phones most of the time, usually arriving from a link a friend shared. Their job is simple: type a wish, get a horrifying or absurd twist, and send it to friends or the group chat.

## Product Purpose

Evil Genie grants any wish, but always with a twist: dark, dire, often absurd, frequently rooted in everyday Pakistani life (load shedding, phupi ka beta, "shaadi kab karo ge", Matric/FSC results, the black daala). Success means people laugh or wince and share the twist.

## Positioning

The genie is not a jokester. It is an ancient eldritch being, and the twists are stated flatly, like a sentence being handed down, without punchlines. The horror comes from how literally and completely the wish is granted.

## Operating Context

- Mostly mobile, often on slow Wi-Fi or during load shedding, so pages must be light.
- Twists get shared as a link or as copied text into WhatsApp and Instagram DMs.
- Each visit is a few wishes in a row, and the user often tries different moods.

## Capabilities and Constraints

- One wish in, one twist out (1–2 sentences). Wishes are limited to 3–200 characters.
- Moods: Classic Evil (default), Petty, Overly Literal, Chaotic, The King in Yellow (pure cosmic horror), Surprise me.
- Local wish history (in the browser only), copy and share, a shareable link with a preview image.
- Every wish is logged to Supabase (write-only; the site never reads it back).
- Per-IP rate limiting.
- Self-harm wishes are never granted. The genie refuses in character and points to a crisis line (Umang Pakistan 0311-7786264, findahelpline.com).
- No racism, slurs or punching down, in any mood.

## Brand Commitments

- Name: **Evil Genie**.
- Voice: an eldritch horror being. It is ancient, vast and indifferent, and it speaks to the user as a small, temporary creature. UI copy mixes English with Roman Urdu.
- Twists are terse and have no punchline. The only exception is prompt-injection attempts, which get a contemptuous one-liner.

## Evidence on Hand

None. Do not fabricate user counts, testimonials or press.

## Product Principles

1. The twist is the product. Everything else gets out of its way.
2. Dread over jokes: state the consequence and don't wink at it.
3. Make it local: Pakistani daily life is the richest material.
4. Sharing takes one tap.
5. It must work well on a cheap phone with a bad connection.

## Accessibility & Inclusion

Respect `prefers-reduced-motion`, and keep twist text at readable contrast even in the King in Yellow palette.
