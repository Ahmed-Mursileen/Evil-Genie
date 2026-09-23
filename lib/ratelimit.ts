import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const PER_MINUTE = 10;
const PER_DAY = 100;

type Limiter = { minute: Ratelimit; day: Ratelimit };
let upstash: Limiter | null | undefined;

function getUpstash(): Limiter | null {
  if (upstash !== undefined) return upstash;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return (upstash = null);
  const redis = new Redis({ url, token });
  upstash = {
    minute: new Ratelimit({ redis, prefix: "eg:m", limiter: Ratelimit.slidingWindow(PER_MINUTE, "1 m") }),
    day: new Ratelimit({ redis, prefix: "eg:d", limiter: Ratelimit.fixedWindow(PER_DAY, "1 d") }),
  };
  return upstash;
}

// Best-effort fallback for local dev. On Vercel each instance has its own
// memory, so set the Upstash env vars in production.
const memory = new Map<string, number[]>();

function memoryLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (memory.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const lastMinute = hits.filter((t) => now - t < 60_000).length;
  if (lastMinute >= PER_MINUTE || hits.length >= PER_DAY) {
    memory.set(ip, hits);
    return false;
  }
  hits.push(now);
  memory.set(ip, hits);
  if (memory.size > 10_000) memory.clear();
  return true;
}

export async function allowRequest(ip: string): Promise<boolean> {
  const limiter = getUpstash();
  if (!limiter) return memoryLimit(ip);
  const [m, d] = await Promise.all([limiter.minute.limit(ip), limiter.day.limit(ip)]);
  return m.success && d.success;
}
