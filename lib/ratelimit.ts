import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Each person (browser cookie) gets 3 wishes per rolling 24 hours. A looser
// per-IP cap stops someone clearing cookies over and over, while leaving room
// for many people sharing one mobile-network IP.
export const WISHES_PER_DAY = 3;
const IP_PER_DAY = 30;
const DAY_MS = 86_400_000;

export type Quota = { allowed: boolean; remaining: number; resetAt: number | null };

type Limiters = { visitor: Ratelimit; ip: Ratelimit };
let upstash: Limiters | null | undefined;

function getUpstash(): Limiters | null {
  if (upstash !== undefined) return upstash;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return (upstash = null);
  const redis = new Redis({ url, token });
  upstash = {
    visitor: new Ratelimit({ redis, prefix: "eg:v", limiter: Ratelimit.slidingWindow(WISHES_PER_DAY, "24 h") }),
    ip: new Ratelimit({ redis, prefix: "eg:ip", limiter: Ratelimit.slidingWindow(IP_PER_DAY, "24 h") }),
  };
  return upstash;
}

// Best-effort fallback for local dev. On Vercel each instance has its own
// memory, so set the Upstash env vars in production.
const memory = new Map<string, number[]>();

function recent(key: string): number[] {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < DAY_MS);
  memory.set(key, hits);
  return hits;
}

function memoryCheck(visitor: string, ip: string): Quota {
  const v = recent(`v:${visitor}`);
  const i = recent(`ip:${ip}`);
  const ipBlocked = i.length >= IP_PER_DAY;
  const remaining = ipBlocked ? 0 : Math.max(0, WISHES_PER_DAY - v.length);
  // When the next wish frees up: the oldest wish in whichever window is full.
  const oldest = v.length >= WISHES_PER_DAY ? v[0] : ipBlocked ? i[0] : v[0];
  return { allowed: remaining > 0, remaining, resetAt: oldest ? oldest + DAY_MS : null };
}

function memoryConsume(visitor: string, ip: string) {
  const now = Date.now();
  recent(`v:${visitor}`).push(now);
  recent(`ip:${ip}`).push(now);
  if (memory.size > 20_000) memory.clear();
}

/** Looks at the quota without using up a wish. */
export async function checkQuota(visitor: string, ip: string): Promise<Quota> {
  const limiter = getUpstash();
  if (!limiter) return memoryCheck(visitor, ip);
  const [v, i] = await Promise.all([limiter.visitor.getRemaining(visitor), limiter.ip.getRemaining(ip)]);
  const ipBlocked = i.remaining <= 0;
  const remaining = ipBlocked ? 0 : Math.max(0, v.remaining);
  const resetAt = remaining < WISHES_PER_DAY ? (v.remaining <= 0 ? v.reset : ipBlocked ? i.reset : v.reset) : null;
  return { allowed: remaining > 0, remaining, resetAt };
}

/** Uses up one wish. Call only after a twist was actually granted. */
export async function consumeQuota(visitor: string, ip: string): Promise<void> {
  const limiter = getUpstash();
  if (!limiter) return memoryConsume(visitor, ip);
  await Promise.all([limiter.visitor.limit(visitor), limiter.ip.limit(ip)]);
}
