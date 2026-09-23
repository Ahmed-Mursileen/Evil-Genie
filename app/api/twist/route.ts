import { after } from "next/server";
import { twistWish } from "@/lib/deepseek";
import { MOODS, WISH_MAX, WISH_MIN, isMood, type ConcreteMood } from "@/lib/moods";
import { allowRequest } from "@/lib/ratelimit";
import { SELF_HARM_RESPONSE, isSelfHarmWish } from "@/lib/safety";
import { logWish } from "@/lib/wishlog";

export const maxDuration = 30;

const CONCRETE = MOODS.map((m) => m.id).filter((id): id is ConcreteMood => id !== "random");

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

export async function POST(req: Request) {
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

  if (!(await allowRequest(clientIp(req)))) {
    return fail(429, "Bas. The wall has heard enough of you. Thori der ruko, chhotay insaan.");
  }

  if (isSelfHarmWish(wish)) {
    after(() => logWish({ wish, mood, twist: SELF_HARM_RESPONSE, flagged: true }));
    return Response.json({ twist: SELF_HARM_RESPONSE, mood, safety: true });
  }

  try {
    const twist = await twistWish(wish, mood);
    after(() => logWish({ wish, mood, twist, flagged: false }));
    return Response.json({ twist, mood });
  } catch (err) {
    console.error("twist failed", err);
    after(() => logWish({ wish, mood, twist: null, flagged: false }));
    return fail(502, "Woh so gaya. Something older than time is not answering. Try again.");
  }
}
