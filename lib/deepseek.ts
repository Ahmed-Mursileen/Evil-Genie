import OpenAI from "openai";
import type { ConcreteMood } from "./moods";
import { buildMessages, cleanTwist } from "./prompt";

const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

let client: OpenAI | null = null;
function getClient(): OpenAI | null {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;
  client ??= new OpenAI({ apiKey, baseURL: "https://api.deepseek.com", timeout: 40_000, maxRetries: 0 });
  return client;
}

// Canned twists so the site works locally without an API key.
const MOCK_TWISTS = [
  "You get it. It arrives every time the light goes out, which in your mohalla is forever.",
  "Granted in full. Your phupi's son receives it too, twice, and everyone at the wedding hears about it.",
  "It is yours. You also remember, with perfect clarity, the exact date you will lose it.",
  "Done. The black daala comes to deliver it personally, and it never drops you back home.",
  "You have it now, frozen at 1% battery, forever, with the wifi on one bar.",
];

export async function twistWish(wish: string, mood: ConcreteMood): Promise<string> {
  const ai = getClient();
  if (!ai) {
    return MOCK_TWISTS[Math.floor(Math.random() * MOCK_TWISTS.length)];
  }
  const res = await ai.chat.completions.create({
    model: MODEL,
    messages: buildMessages(wish, mood),
    temperature: 1.3,
    max_tokens: 160,
    // V4 models reason before answering by default; that eats the whole token
    // budget (empty reply) and ignores temperature. A twist needs no reasoning.
    // @ts-expect-error DeepSeek-specific parameter, passed through as-is.
    thinking: { type: "disabled" },
  });
  const choice = res.choices[0];
  const text = cleanTwist(choice?.message?.content ?? "");
  if (!text) throw new Error(`empty completion (finish_reason: ${choice?.finish_reason ?? "none"})`);
  return text;
}

/** One readable line for the server logs: HTTP status plus DeepSeek's message. */
export function describeError(err: unknown): string {
  if (err instanceof OpenAI.APIError) return `status ${err.status ?? "?"}: ${err.message}`;
  return err instanceof Error ? `${err.name}: ${err.message}` : String(err);
}

export const isMockMode = () => !process.env.DEEPSEEK_API_KEY;
