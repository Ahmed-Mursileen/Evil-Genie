import { Redis } from "@upstash/redis";

// Each person (browser cookie) gets 3 wishes per rolling 24 hours. A looser
// per-IP cap stops someone clearing cookies over and over, while leaving room
// for many people sharing one mobile-network IP.
//
// Both limits keep the exact timestamp of every granted wish (a Redis sorted
// set per key), so "next wish in" is precisely 24h after the oldest one.
export const WISHES_PER_DAY = 3;
const IP_PER_DAY = 30;
const DAY_MS = 86_400_000;

export type Quota = { allowed: boolean; remaining: number; resetAt: number | null };

type Store = {
  /** Timestamps (ms) of wishes in the last 24h, oldest first. */
  recent(key: string): Promise<number[]>;
  add(key: string, at: number): Promise<void>;
};

let redis: Redis | null | undefined;
function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return (redis = url && token ? new Redis({ url, token }) : null);
}

const redisStore = (r: Redis): Store => ({
  async recent(key) {
    const p = r.pipeline();
    p.zremrangebyscore(key, 0, Date.now() - DAY_MS);
    p.zrange(key, 0, -1, { withScores: true });
    const [, flat] = (await p.exec()) as [number, (string | number)[]];
    // withScores returns [member, score, member, score, ...]
    const times: number[] = [];
    for (let i = 1; i < flat.length; i += 2) times.push(Number(flat[i]));
    return times;
  },
  async add(key, at) {
    const p = r.pipeline();
    p.zadd(key, { score: at, member: `${at}-${Math.random().toString(36).slice(2, 8)}` });
    p.pexpire(key, DAY_MS);
    await p.exec();
  },
});

// Fallback for local dev. On Vercel each instance has its own memory, so set
// the Upstash env vars in production.
const memory = new Map<string, number[]>();
const memoryStore: Store = {
  async recent(key) {
    const now = Date.now();
    const times = (memory.get(key) ?? []).filter((t) => now - t < DAY_MS);
    memory.set(key, times);
    return times;
  },
  async add(key, at) {
    memory.set(key, [...(memory.get(key) ?? []), at]);
    if (memory.size > 20_000) memory.clear();
  },
};

function store(): Store {
  const r = getRedis();
  return r ? redisStore(r) : memoryStore;
}

const visitorKey = (id: string) => `eg:v:${id}`;
const ipKey = (ip: string) => `eg:ip:${ip}`;

/** Looks at the quota without using up a wish. */
export async function checkQuota(visitor: string, ip: string): Promise<Quota> {
  const s = store();
  const [v, i] = await Promise.all([s.recent(visitorKey(visitor)), s.recent(ipKey(ip))]);
  const visitorLeft = Math.max(0, WISHES_PER_DAY - v.length);
  const ipFull = i.length >= IP_PER_DAY;
  const remaining = ipFull ? 0 : visitorLeft;

  // When the next wish frees up: 24h after the oldest wish in whichever window is blocking.
  let resetAt: number | null = null;
  if (visitorLeft === 0) resetAt = v[v.length - WISHES_PER_DAY] + DAY_MS;
  else if (ipFull) resetAt = i[i.length - IP_PER_DAY] + DAY_MS;
  else if (v.length) resetAt = v[0] + DAY_MS;

  return { allowed: remaining > 0, remaining, resetAt };
}

/** Uses up one wish. Call only after a twist was actually granted. */
export async function consumeQuota(visitor: string, ip: string): Promise<void> {
  const s = store();
  const now = Date.now();
  await Promise.all([s.add(visitorKey(visitor), now), s.add(ipKey(ip), now)]);
}
