import { WISH_MAX } from "./moods";

export type SharedTwist = { wish: string; twist: string; mood: string };

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function encodeShare(t: SharedTwist): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify([t.wish, t.twist, t.mood])));
}

export function decodeShare(d: string | undefined | null): SharedTwist | null {
  if (!d || d.length > 4000) return null;
  try {
    const [wish, twist, mood] = JSON.parse(new TextDecoder().decode(fromBase64Url(d)));
    if (typeof wish !== "string" || typeof twist !== "string" || typeof mood !== "string") return null;
    return { wish: wish.slice(0, WISH_MAX), twist: twist.slice(0, 600), mood: mood.slice(0, 20) };
  } catch {
    return null;
  }
}
