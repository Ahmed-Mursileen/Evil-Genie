import { cookies } from "next/headers";
import { after } from "next/server";
import { describeError, twistWish } from "@/lib/deepseek";
import { MOODS, WISH_MAX, WISH_MIN, isMood, type ConcreteMood } from "@/lib/moods";
import { WISHES_PER_DAY, checkQuota, consumeQuota } from "@/lib/ratelimit";
import { SELF_HARM_RESPONSE, isSelfHarmWish } from "@/lib/safety";
import { logWish } from "@/lib/wishlog";

export const maxDuration = 60;

const CONCRETE = MOODS.map((m) => m.id).filter((id): id is ConcreteMood => id !== "random");
const VISITOR_COOKIE = "eg_vid";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fail(status: number, error: string, extra?: object) {
  return Response.json({ error, ...extra }, { status });
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

// One anonymous ID per browser; the per-IP cap covers people who rotate it.
async function visitorId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(VISITOR_COOKIE)?.value;
  if (existing && UUID_RE.test(existing)) return existing;
  const id = crypto.randomUUID();
  jar.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return id;
}

export async function GET(req: Request) {
  const { remaining, resetAt } = await checkQuota(await visitorId(), clientIp(req));
  return Response.json({ remaining, limit: WISHES_PER_DAY, resetAt }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const visitor = await visitorId();
  const ip = clientIp(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Deewar pe sirf khwahish likhi jaati hai. Try again.");
  }
  const { wish: rawWish, mood: rawMood } = (body ?? {}) as { wish?: unknown; mood?: unknown };

  const wish = typeof rawWish === "string" ? rawWish.replace(/\s+/g, " ").trim() : "";
  if (wish.length < WISH_MIN) return fail(400, "Kuch toh likho, faani. The wall cannot grant silence.");
  if (wish.length > WISH_MAX) return fail(400, `Itni lambi khwahish? ${WISH_MAX} characters, bas.`);

  const picked = isMood(rawMood) ? rawMood : "classic";
  const mood: ConcreteMood =
    picked === "random" ? CONCRETE[Math.floor(Math.random() * CONCRETE.length)] : picked;

  // The safety response is always answered and never uses up a wish.
  if (isSelfHarmWish(wish)) {
    after(() => logWish({ wish, mood, twist: SELF_HARM_RESPONSE, flagged: true }));
    return Response.json({ twist: SELF_HARM_RESPONSE, mood, safety: true });
  }

  const quota = await checkQuota(visitor, ip);
  if (!quota.allowed) {
    return fail(429, "Aaj ki teen muradein poori ho gayin. The wall sleeps now. Wapas aana, faani.", {
      remaining: 0,
      resetAt: quota.resetAt,
    });
  }

  let twist: string;
  try {
    twist = await twistWish(wish, mood);
  } catch (err) {
    console.error(`deepseek failed (model ${process.env.DEEPSEEK_MODEL || "deepseek-chat"}) ${describeError(err)}`);
    after(() => logWish({ wish, mood, twist: null, flagged: false }));
    return fail(502, "Woh so gaya. Something older than time is not answering. Try again.", {
      remaining: quota.remaining,
      resetAt: quota.resetAt,
    });
  }

  after(() => logWish({ wish, mood, twist, flagged: false }));
  try {
    await consumeQuota(visitor, ip);
    const { remaining, resetAt } = await checkQuota(visitor, ip);
    return Response.json({ twist, mood, remaining, resetAt });
  } catch (err) {
    // The wish was granted; a quota-store hiccup shouldn't take it back.
    console.error("quota update failed", err);
    return Response.json({ twist, mood, remaining: Math.max(0, quota.remaining - 1), resetAt: quota.resetAt });
  }
}
